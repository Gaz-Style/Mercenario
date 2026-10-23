/**
 * SHIPIT CHILE — Integración Multi-Courier
 * ==========================================
 * Shipit es un agregador logístico que conecta en una sola API a:
 * Starken, Chilexpress, Blue Express, Correos de Chile, Shippify y más.
 *
 * Documentación oficial: https://developers.shipit.cl
 *
 * Variables de entorno requeridas en .env.local:
 *   SHIPIT_EMAIL=tu-email@empresa.cl
 *   SHIPIT_ACCESS_TOKEN=tu-token-de-shipit
 *   SHIPIT_ORIGIN_COMMUNE_ID=308   (ID de la comuna de origen/bodega)
 */

const SHIPIT_BASE_URL = 'https://api.shipit.cl';

/**
 * Headers de autenticación estándar para todas las llamadas a Shipit.
 */
function getShipitHeaders(): HeadersInit {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.shipit.v4',
        'X-Shipit-Email': process.env.SHIPIT_EMAIL || '',
        'X-Shipit-Access-Token': process.env.SHIPIT_ACCESS_TOKEN || '',
    };
}

// ─── TIPOS ────────────────────────────────────────────────────────────────────

export interface ShipitCommune {
    id: number;
    name: string;
    region_id: number;
    region_name: string;
}

export interface ShipitRate {
    courier_id: number;
    courier_name: string;         // "Starken", "Chilexpress", etc.
    service_name: string;         // "Económico", "Express", etc.
    total_price: number;          // En CLP (incluye IVA)
    estimated_days: number;       // Días hábiles de entrega
    courier_logo?: string;
}

export interface ShipitQuotePayload {
    /** ID de la comuna de destino (obtenido de /v/communes) */
    destiny_commune_id: number;
    /** Peso en kg */
    weight: number;
    /** Alto en cm */
    height: number;
    /** Ancho en cm */
    width: number;
    /** Largo en cm */
    length: number;
}

export interface ShipitShipmentPayload {
    /** ID del courier seleccionado por el cliente */
    courier_id: number;
    /** ID de la comuna de destino */
    destiny_commune_id: number;
    /** Dirección de despacho exacta */
    destiny_street: string;
    destiny_number: string;
    /** Nombre completo del destinatario */
    receiver_name: string;
    receiver_phone: string;
    receiver_email: string;
    /** Datos del paquete */
    weight: number;
    height: number;
    width: number;
    length: number;
    /** Referencia interna (número de orden Mercenario) */
    reference_code: string;
}

export interface ShipitShipmentResult {
    success: boolean;
    shipment_id?: number;
    tracking_number?: string;
    label_pdf_url?: string;       // URL para imprimir la etiqueta de despacho
    error?: string;
}

export interface ShipitTrackingResult {
    success: boolean;
    status?: string;              // "En bodega", "En tránsito", "Entregado"
    status_detail?: string;
    estimated_delivery?: string;
    events?: Array<{
        date: string;
        description: string;
        location?: string;
    }>;
    error?: string;
}

// ─── FUNCIONES ────────────────────────────────────────────────────────────────

/**
 * Obtiene el listado de comunas habilitadas para despacho en Chile.
 * Cachear esta respuesta en producción para evitar llamadas repetidas.
 */
export async function getShipitCommunes(): Promise<ShipitCommune[]> {
    try {
        const res = await fetch(`${SHIPIT_BASE_URL}/v/communes`, {
            headers: getShipitHeaders(),
            // Cache 24h en Next.js
            next: { revalidate: 86400 },
        });

        if (!res.ok) {
            console.error('[SHIPIT] Error al obtener comunas:', res.status, await res.text());
            return [];
        }

        const data = await res.json();
        return data as ShipitCommune[];
    } catch (error) {
        console.error('[SHIPIT] getShipitCommunes error:', error);
        return [];
    }
}

/**
 * Cotiza el envío en tiempo real.
 * Llamar desde el checkout cuando el cliente ingresa su dirección.
 * Devuelve las tarifas de todos los couriers disponibles ordenadas por precio.
 */
export async function quoteCourierRates(payload: ShipitQuotePayload): Promise<ShipitRate[]> {
    try {
        const body = {
            parcel: {
                weight: payload.weight,
                height: payload.height,
                width: payload.width,
                length: payload.length,
            },
            origin: {
                commune_id: parseInt(process.env.SHIPIT_ORIGIN_COMMUNE_ID || '308'), // 308 = Vitacura (default)
            },
            destiny: {
                commune_id: payload.destiny_commune_id,
            },
        };

        const res = await fetch(`${SHIPIT_BASE_URL}/v/rates`, {
            method: 'POST',
            headers: getShipitHeaders(),
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('[SHIPIT] Error en cotización:', res.status, errorText);
            return [];
        }

        const data = await res.json();

        // Normalizar la respuesta al formato interno
        const rates: ShipitRate[] = (data || []).map((r: any) => ({
            courier_id: r.courier_id || r.courier?.id,
            courier_name: r.courier_name || r.courier?.name || 'Courier',
            service_name: r.service_name || r.service || 'Estándar',
            total_price: Math.round(r.total_price || r.price || 0),
            estimated_days: r.estimated_days || r.days || 3,
            courier_logo: r.courier_logo,
        }));

        // Ordenar por precio ascendente
        return rates.sort((a, b) => a.total_price - b.total_price);
    } catch (error) {
        console.error('[SHIPIT] quoteCourierRates error:', error);
        return [];
    }
}

/**
 * Crea un envío formal en Shipit al confirmar la compra.
 * Genera la OD (Orden de Despacho), el número de seguimiento y la etiqueta PDF.
 * Llamar DESPUÉS de confirmar el pago (desde el webhook de Transbank/Mercado Pago).
 */
export async function createShipitShipment(payload: ShipitShipmentPayload): Promise<ShipitShipmentResult> {
    try {
        const body = {
            shipment: {
                courier_id: payload.courier_id,
                service: 'Estándar',
                reference: payload.reference_code,
                destiny: {
                    commune_id: payload.destiny_commune_id,
                    street: payload.destiny_street,
                    number: payload.destiny_number,
                    receiver: {
                        name: payload.receiver_name,
                        phone: payload.receiver_phone,
                        email: payload.receiver_email,
                    },
                },
                parcel: {
                    weight: payload.weight,
                    height: payload.height,
                    width: payload.width,
                    length: payload.length,
                },
            },
        };

        const res = await fetch(`${SHIPIT_BASE_URL}/v/shipments`, {
            method: 'POST',
            headers: getShipitHeaders(),
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('[SHIPIT] Error al crear envío:', res.status, errorText);
            return { success: false, error: `Shipit error ${res.status}: ${errorText}` };
        }

        const data = await res.json();

        return {
            success: true,
            shipment_id: data.id || data.shipment_id,
            tracking_number: data.tracking_number || data.tracking || data.id?.toString(),
            label_pdf_url: data.label_url || data.pdf_url || data.sticker_url,
        };
    } catch (error: any) {
        console.error('[SHIPIT] createShipitShipment error:', error);
        return { success: false, error: error.message || 'Error desconocido en Shipit' };
    }
}

/**
 * Consulta el estado de seguimiento de un envío en tiempo real.
 * Llamar desde el panel de admin o para notificaciones proactivas al cliente.
 */
export async function getShipitTracking(trackingNumber: string): Promise<ShipitTrackingResult> {
    try {
        const res = await fetch(
            `https://courierstatus.shipit.cl/api/trackings/number/${trackingNumber}`,
            { headers: getShipitHeaders() }
        );

        if (!res.ok) {
            return { success: false, error: `Tracking error: ${res.status}` };
        }

        const data = await res.json();

        return {
            success: true,
            status: data.status || data.state,
            status_detail: data.status_detail || data.description,
            estimated_delivery: data.estimated_delivery,
            events: (data.events || data.history || []).map((e: any) => ({
                date: e.date || e.created_at,
                description: e.description || e.status,
                location: e.location,
            })),
        };
    } catch (error: any) {
        console.error('[SHIPIT] getShipitTracking error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Obtiene la lista de couriers disponibles para la cuenta.
 */
export async function getAvailableCouriers(): Promise<Array<{ id: number; name: string }>> {
    try {
        const res = await fetch(`${SHIPIT_BASE_URL}/v/couriers`, {
            headers: getShipitHeaders(),
            next: { revalidate: 3600 },
        });

        if (!res.ok) return [];

        const data = await res.json();
        return (data || []).map((c: any) => ({ id: c.id, name: c.name }));
    } catch (error) {
        console.error('[SHIPIT] getAvailableCouriers error:', error);
        return [];
    }
}
