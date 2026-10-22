# Catálogo Oficial de Plantillas Meta WhatsApp Cloud API — Mercenario OS & WEKE Studio

Este documento contiene la especificación técnica completa y los payloads JSON listos para copiar y pegar en **Meta Business Suite** (`business.facebook.com/wa/manage/message-templates/`) o enviar mediante la **Graph API v21.0** para la homologación oficial de las 8 plantillas del ecosistema.

---

## 📌 Resumen de Plantillas Homologadas

| # | Nombre Técnico (`name`) | Categoría | Propósito Estratégico | Triggers / Automatización |
|---|---|---|---|---|
| **1** | `asistencia_humana_weke` | `UTILITY` | Derivación a Asesor Humano (Handoff) | Bot se silencia por solicitud del cliente o alta complejidad. |
| **2** | `recuperacion_carrito_abandonado` | `MARKETING` | Rescate de Carritos / Reservas Caídas | Cron Job a los 20 min de abandono en checkout. |
| **3** | `confirmacion_pedido_reserva` | `UTILITY` | Confirmación Transaccional de Cobro | Inmediato tras confirmación Webpay Plus (Transbank). |
| **4** | `recordatorio_cita_24h` | `UTILITY` | Recordatorio Anti No-Show (24h antes) | Cron Job 24 horas antes con botones táctiles de confirmación. |
| **5** | `alerta_nueva_venta_admin` | `UTILITY` | Alerta Privada al Celular del Dueño | Inmediato al procesarse una compra en el ERP. |
| **6** | `alerta_lead_caliente_admin` | `UTILITY` | Alerta de Prospecto B2B Calificado | Al superar scoring de lead caliente en CRM. |
| **7** | `encuesta_satisfaccion_nps` | `UTILITY` | Feedback y Reseñas Google 5 Estrellas | Cron Job 48 horas post-atención o entrega. |
| **8** | `alerta_operador_humano` | `UTILITY` | Notificación Interna de Pausa del Bot | Al pasar el chat a modo operador humano en LiveChat. |

---

## 1. `asistencia_humana_weke` (Derivación Humana / Handoff)

- **Nombre en Meta:** `asistencia_humana_weke`
- **Categoría:** `UTILITY`
- **Idioma:** `es` (Español)
- **Variables:** `{{1}}` (Nombre cliente), `{{2}}` (Motivo o prenda)

```json
{
  "name": "asistencia_humana_weke",
  "category": "UTILITY",
  "language": "es",
  "components": [
    {
      "type": "HEADER",
      "format": "TEXT",
      "text": "Atención Personalizada WEKE"
    },
    {
      "type": "BODY",
      "text": "Estimado/a {{1}}, hemos transferido su solicitud a un asesor humano de nuestro equipo. Un especialista se comunicará con usted a la brevedad para asistirle con su consulta sobre {{2}}.\n\nHorario de atención: Lunes a Viernes de 9:00 a 18:00 hrs.",
      "example": {
        "body_text": [
          ["Carlos", "asesoría de tallas y chaquetas 3 capas"]
        ]
      }
    },
    {
      "type": "FOOTER",
      "text": "Mercenario • Atención Omnicanal Conectada"
    },
    {
      "type": "BUTTONS",
      "buttons": [
        {
          "type": "PHONE_NUMBER",
          "text": "Llamar a Soporte",
          "phone_number": "+56957958467"
        },
        {
          "type": "URL",
          "text": "Ver Catálogo Web",
          "url": "https://mercenario.cl/tienda"
        }
      ]
    }
  ]
}
```

---

## 2. `recuperacion_carrito_abandonado` (Recuperador de Carritos / 20 min)

- **Nombre en Meta:** `recuperacion_carrito_abandonado`
- **Categoría:** `MARKETING`
- **Idioma:** `es`
- **Variables:** `{{1}}` (Nombre cliente), `{{2}}` (Prenda o servicio seleccionado)

```json
{
  "name": "recuperacion_carrito_abandonado",
  "category": "MARKETING",
  "language": "es",
  "components": [
    {
      "type": "HEADER",
      "format": "TEXT",
      "text": "Tu pedido quedó pendiente"
    },
    {
      "type": "BODY",
      "text": "¡Hola {{1}}! Notamos que dejaste tu selección de {{2}} pendiente en nuestra web.\n\n¿Tuviste algún inconveniente con el banco o necesitas ayuda para concretar tu pedido? Tus artículos están reservados temporalmente.",
      "example": {
        "body_text": [
          ["Valentina", "Chaqueta Alpina Impermeable Pro (Talla M)"]
        ]
      }
    },
    {
      "type": "FOOTER",
      "text": "Mercenario OS • Fricción Cero en Pagos"
    },
    {
      "type": "BUTTONS",
      "buttons": [
        {
          "type": "URL",
          "text": "Retomar Compra",
          "url": "https://mercenario.cl/tienda/checkout"
        },
        {
          "type": "QUICK_REPLY",
          "text": "Necesito Asistencia"
        }
      ]
    }
  ]
}
```

---

## 3. `confirmacion_pedido_reserva` (Confirmación de Pago Transbank)

- **Nombre en Meta:** `confirmacion_pedido_reserva`
- **Categoría:** `UTILITY`
- **Idioma:** `es`
- **Variables:** `{{1}}` (Nombre cliente), `{{2}}` (Monto pagado), `{{3}}` (ID de orden)

```json
{
  "name": "confirmacion_pedido_reserva",
  "category": "UTILITY",
  "language": "es",
  "components": [
    {
      "type": "HEADER",
      "format": "TEXT",
      "text": "✅ Pago Confirmado con Éxito"
    },
    {
      "type": "BODY",
      "text": "¡Hola {{1}}! Hemos recibido tu pago por un monto de {{2}} correspondiente a tu orden #{{3}}.\n\nYa comenzamos a preparar tu solicitud. Puedes revisar el detalle y descargar tu comprobante en el enlace oficial.",
      "example": {
        "body_text": [
          ["Rodrigo Morales", "$89.900 CLP", "ORD-2026-9481"]
        ]
      }
    },
    {
      "type": "FOOTER",
      "text": "Transbank Webpay Plus • Conciliación Automática"
    },
    {
      "type": "BUTTONS",
      "buttons": [
        {
          "type": "URL",
          "text": "Ver Comprobante",
          "url": "https://mercenario.cl/tienda/orden-confirmada"
        }
      ]
    }
  ]
}
```

---

## 4. `recordatorio_cita_24h` (Anti No-Show / 24 Horas Antes)

- **Nombre en Meta:** `recordatorio_cita_24h`
- **Categoría:** `UTILITY`
- **Idioma:** `es`
- **Variables:** `{{1}}` (Nombre), `{{2}}` (Hora), `{{3}}` (Especialista/Ubicación), `{{4}}` (Indicaciones)

```json
{
  "name": "recordatorio_cita_24h",
  "category": "UTILITY",
  "language": "es",
  "components": [
    {
      "type": "HEADER",
      "format": "TEXT",
      "text": "Recordatorio de Cita Programada"
    },
    {
      "type": "BODY",
      "text": "Hola {{1}}, te recordamos tu cita programada para mañana a las {{2}} con el especialista {{3}}.\n\nIndicaciones importantes: {{4}}.\n\nPor favor confirma tu asistencia tocando uno de los botones inferiores.",
      "example": {
        "body_text": [
          ["Andrea González", "11:30 hrs", "Dra. Silva (Box 3)", "Recuerde asistir en ayunas de 8 horas"]
        ]
      }
    },
    {
      "type": "FOOTER",
      "text": "Clínica & Salud • Agenda Sincronizada"
    },
    {
      "type": "BUTTONS",
      "buttons": [
        {
          "type": "QUICK_REPLY",
          "text": "Confirmar Asistencia"
        },
        {
          "type": "QUICK_REPLY",
          "text": "Reagendar Cita"
        }
      ]
    }
  ]
}
```

---

## 5. `alerta_nueva_venta_admin` (Alerta al WhatsApp Privado del Dueño)

- **Nombre en Meta:** `alerta_nueva_venta_admin`
- **Categoría:** `UTILITY`
- **Idioma:** `es`
- **Variables:** `{{1}}` (Cliente), `{{2}}` (Teléfono), `{{3}}` (Ítem), `{{4}}` (Monto)

```json
{
  "name": "alerta_nueva_venta_admin",
  "category": "UTILITY",
  "language": "es",
  "components": [
    {
      "type": "HEADER",
      "format": "TEXT",
      "text": "💰 NUEVA VENTA CONFIRMADA"
    },
    {
      "type": "BODY",
      "text": "Atención: Se acaba de procesar un nuevo cobro en la plataforma.\n\n• Cliente: {{1}}\n• Teléfono: {{2}}\n• Ítem/Servicio: {{3}}\n• Monto Recaudado: {{4}}\n• Pasarela: Webpay Plus Transbank\n\nEl stock ha sido descontado automáticamente del ERP.",
      "example": {
        "body_text": [
          ["Juan Pérez", "+56 9 1234 5678", "Chaqueta Alpina Pro Talla L", "$89.900 CLP"]
        ]
      }
    },
    {
      "type": "FOOTER",
      "text": "Mercenario IOS • Notificación Interna"
    },
    {
      "type": "BUTTONS",
      "buttons": [
        {
          "type": "URL",
          "text": "Abrir Panel ERP",
          "url": "https://mercenario.cl/admin/ecommerce/pedidos"
        }
      ]
    }
  ]
}
```

---

## 6. `alerta_lead_caliente_admin` (Alerta al Equipo Comercial)

- **Nombre en Meta:** `alerta_lead_caliente_admin`
- **Categoría:** `UTILITY`
- **Idioma:** `es`
- **Variables:** `{{1}}` (Prospecto), `{{2}}` (Teléfono), `{{3}}` (Presupuesto/Plan), `{{4}}` (Requerimiento)

```json
{
  "name": "alerta_lead_caliente_admin",
  "category": "UTILITY",
  "language": "es",
  "components": [
    {
      "type": "HEADER",
      "format": "TEXT",
      "text": "🔥 NUEVO LEAD CALIFICADO"
    },
    {
      "type": "BODY",
      "text": "Equipo Comercial: Un prospecto de alto valor acaba de solicitar cotización.\n\n• Prospecto: {{1}}\n• Teléfono: {{2}}\n• Presupuesto/Servicio: {{3}}\n• Requerimiento: {{4}}\n\nPor favor tomar el chat desde la consola LiveChat.",
      "example": {
        "body_text": [
          ["Constructora Andes", "+56 9 8765 4321", "Ecosistema Completo ($2.2M)", "Implementación llave en mano para 3 sucursales"]
        ]
      }
    },
    {
      "type": "FOOTER",
      "text": "Mercenario B2B • Scoring Automático"
    },
    {
      "type": "BUTTONS",
      "buttons": [
        {
          "type": "URL",
          "text": "Tomar Chat en LiveChat",
          "url": "https://mercenario.cl/admin/asistente"
        }
      ]
    }
  ]
}
```

---

## 7. `encuesta_satisfaccion_nps` (Feedback y Reseñas Google 5★ / 48h)

- **Nombre en Meta:** `encuesta_satisfaccion_nps`
- **Categoría:** `UTILITY`
- **Idioma:** `es`
- **Variables:** `{{1}}` (Nombre), `{{2}}` (Servicio/Producto recibido)

```json
{
  "name": "encuesta_satisfaccion_nps",
  "category": "UTILITY",
  "language": "es",
  "components": [
    {
      "type": "HEADER",
      "format": "TEXT",
      "text": "¿Cómo fue tu experiencia?"
    },
    {
      "type": "BODY",
      "text": "¡Hola {{1}}! Esperamos que hayas disfrutado tu experiencia con {{2}}.\n\nTu opinión es fundamental para nosotros. ¿Podrías regalarnos 30 segundos para evaluar nuestro servicio y dejarnos una reseña en Google?",
      "example": {
        "body_text": [
          ["Matías Silva", "la atención médica de ayer"]
        ]
      }
    },
    {
      "type": "FOOTER",
      "text": "Mercenario • Fidelización Continua"
    },
    {
      "type": "BUTTONS",
      "buttons": [
        {
          "type": "URL",
          "text": "Calificar en Google Maps",
          "url": "https://g.page/r/mercenario/review"
        },
        {
          "type": "QUICK_REPLY",
          "text": "Dejar Comentario Interno"
        }
      ]
    }
  ]
}
```

---

## 8. `alerta_operador_humano` (Notificación Interna de Silencio IA)

- **Nombre en Meta:** `alerta_operador_humano`
- **Categoría:** `UTILITY`
- **Idioma:** `es`
- **Variables:** `{{1}}` (Cliente), `{{2}}` (Teléfono), `{{3}}` (Motivo)

```json
{
  "name": "alerta_operador_humano",
  "category": "UTILITY",
  "language": "es",
  "components": [
    {
      "type": "HEADER",
      "format": "TEXT",
      "text": "⚠️ Solicitud de Asistencia Humana"
    },
    {
      "type": "BODY",
      "text": "Atención equipo: El cliente {{1}} (teléfono: {{2}}) ha solicitado atención humana con respecto a: {{3}}.\n\nPor favor ingresar al panel administrativo para tomar el control de la conversación.",
      "example": {
        "body_text": [
          ["Camila Sepúlveda", "+56 9 8402 1940", "consulta sobre reparación de cierre en chaqueta"]
        ]
      }
    },
    {
      "type": "FOOTER",
      "text": "Mercenario OS • LiveChat Unificado"
    },
    {
      "type": "BUTTONS",
      "buttons": [
        {
          "type": "URL",
          "text": "Abrir Chat en Admin",
          "url": "https://mercenario.cl/admin/asistente"
        }
      ]
    }
  ]
}
```

---

## 🚀 Cómo Homologar las Plantillas en Meta

1. Entra a [Meta WhatsApp Manager](https://business.facebook.com/wa/manage/message-templates/).
2. Haz clic en **Crear Plantilla** (Create Template).
3. Selecciona la Categoría correspondiente (`Utilidad` o `Marketing`).
4. Ingresa el nombre técnico exacto (ej: `recuperacion_carrito_abandonado`).
5. Copia y pega el texto de encabezado, cuerpo con variables `{{1}}` y botones según el JSON anterior.
6. En la sección de ejemplos, ingresa los valores de muestra listados en este documento.
7. Haz clic en **Enviar a Revisión**. Meta aprueba automáticamente las plantillas de utilidad en menos de 5 a 15 minutos.

### 🛡️ Modo Respaldo Transparente (Fallback)
El backend de Mercenario (`src/lib/whatsapp/meta-templates.ts`) detecta si la plantilla aún no ha sido aprobada por Meta o si falta algún token en el entorno: en ese caso, **reemplaza automáticamente las variables y envía el mensaje como texto estructurado**, garantizando que el cliente jamás quede sin respuesta.
