export interface SitemapPageContent {
    title: string;
    category: string;
    problem: string;
    context: string;
    operation: string;
    connections: string;
    impact: string;
}

export const sitemapData: Record<string, SitemapPageContent> = {
    // 1. SOLUCIONES
    "health": {
        title: "Health IOS",
        category: "Configuración de Industria",
        problem: "La administración clínica pierde pacientes cuando la reserva, la facturación, el historial médico y el cobro ocurren en cuatro softwares desconectados.",
        context: "Para clínicas y centros médicos de alto flujo, la desconexión operativa genera duplicidad de citas y horas de conciliación manual al final del mes.",
        operation: "El paciente agenda ➔ el sistema sincroniza con IMED y Fonasa ➔ valida previsión ➔ genera ficha digital unificada ➔ procesa el cobro al instante.",
        connections: "Conexión directa con pasarelas de pago, bases de datos de previsión de salud, sistemas de agenda en tiempo real y facturación SII.",
        impact: "Cero fricción en el ingreso del paciente y eliminación del 100% de las citas duplicadas o no conciliadas."
    },
    "commerce": {
        title: "Commerce IOS",
        category: "Configuración de Industria",
        problem: "Las tiendas y e-commerce sufren pérdidas de ventas cuando el stock físico no coincide con el canal online, provocando quiebres de inventario.",
        context: "Vender en múltiples canales exige un cerebro central que actualice las existencias en tiempo real tras cada compra física o digital.",
        operation: "El inventario se debita en milisegundos tras una venta física en POS o digital en web ➔ genera boleta electrónica ➔ actualiza el libro contable.",
        connections: "Sincronía total entre sistemas POS, plataformas e-commerce, pasarelas bancarias y facturación del SII.",
        impact: "Control absoluto de existencias y reportes automáticos de márgenes y rotación de productos."
    },
    "field": {
        title: "Field IOS",
        category: "Configuración de Industria",
        problem: "La falta de visibilidad en rutas de entrega y visitas técnicas genera retrasos en clientes y cobros pendientes no registrados.",
        context: "Las operaciones en terreno requieren una conexión instantánea entre la ruta del despachador y el sistema central de administración.",
        operation: "Se traza la ruta técnica ➔ el operario confirma la entrega con firma digital en terreno ➔ el cobro se procesa in-situ y se emite boleta.",
        connections: "Aplicación móvil de terreno, geolocalización, pasarela de pago móvil y facturación automática en terreno.",
        impact: "Cobro inmediato al momento de la entrega y digitalización completa del servicio técnico."
    },
    "gastro": {
        title: "Gastro IOS",
        category: "Configuración de Industria",
        problem: "Las demoras de comunicación entre salón, cocina y caja merman la experiencia del comensal y provocan pérdidas financieras por mermas.",
        context: "La velocidad de operación y el control de insumos definen la rentabilidad de un restaurante de alto rendimiento.",
        operation: "El mesero toma la comanda digital ➔ la cocina la recibe al instante ➔ la caja procesa el cobro coordinando propina y boleta en segundos.",
        connections: "Comanderos móviles, monitor de cocina, caja POS y control centralizado de inventario de recetas.",
        impact: "Aceleración del servicio en sala y control de stock crítico por plato vendido."
    },
    "pet": {
        title: "Pet IOS",
        category: "Configuración de Industria",
        problem: "Las veterinarias pierden historial médico crítico y citas de control de vacunas cuando manejan agendas en papel y fichas físicas.",
        context: "La lealtad en servicios de mascotas depende del seguimiento riguroso del historial clínico y el recordatorio oportuno de controles.",
        operation: "Se agenda cita preventiva ➔ se actualiza la ficha del paciente veterinario ➔ el cobro de insumos emite boleta y agenda el próximo control.",
        connections: "Ficha médica veterinaria, calendario de citas recurrentes, inventario de medicamentos y boletas del SII.",
        impact: "Retención automática de pacientes e historial clínico centralizado accesible en segundos."
    },
    "fit": {
        title: "Fit IOS",
        category: "Configuración de Industria",
        problem: "Los gimnasios y centros deportivos sufren fugas de ingresos por membresías vencidas y falta de control de accesos automáticos.",
        context: "Mantener una alta retención y un aforo controlado requiere verificar la validez del plan de cada cliente antes de cruzar la puerta.",
        operation: "El cliente paga su membresía recurrente ➔ se valida su código de acceso ➔ el torniquete o lector autoriza el paso actualizando aforo.",
        connections: "Pasarelas de cobro recurrente, lectores de accesos físicos, base de datos de socios y control de asistencia.",
        impact: "Eliminación del acceso no autorizado y automatización completa de renovaciones mensuales."
    },
    "tech": {
        title: "Tech IOS",
        category: "Configuración de Industria",
        problem: "Las empresas de servicios de tecnología pierden rentabilidad al no computar de forma precisa las horas de soporte asignadas a cada ticket.",
        context: "La facturación justa de servicios profesionales requiere sincronizar el trabajo técnico con los acuerdos de nivel de servicio (SLA).",
        operation: "Ingresa el ticket ➔ se asigna al especialista según disponibilidad ➔ se registra tiempo operativo ➔ se consolida y factura a fin de mes.",
        connections: "Mesa de ayuda digital, calendarización de técnicos, reportes de horas de trabajo y facturación automatizada.",
        impact: "Visibilidad total del rendimiento del equipo y facturación transparente basada en métricas."
    },
    "custom": {
        title: "Custom IOS",
        category: "Configuración de Industria",
        problem: "Las corporaciones con flujos operativos únicos no encuentran solución en softwares genéricos (SaaS) que los fuerzan a alterar su negocio.",
        context: "Las ventajas competitivas de una gran organización suelen radicar en sus procesos internos particulares.",
        operation: "Analizamos el flujo de la corporación ➔ esculpimos la infraestructura a la medida ➔ unificamos todas las áreas sin parches.",
        connections: "Integración nativa con sistemas heredados de la empresa, APIs corporativas y bases de datos a gran escala.",
        impact: "Eficiencia y control absoluto adaptado con precisión milimétrica a las necesidades de la organización."
    },

    // 2. OPERACIÓN
    "marketing": {
        title: "Capacidad: Marketing",
        category: "Capacidad Operativa",
        problem: "La inversión publicitaria se desperdicia si no hay un sistema que trace la efectividad de cada anuncio hasta la venta final.",
        context: "El crecimiento comercial predecible se basa en la sincronía de campañas digitales con el flujo de leads de la empresa.",
        operation: "Se activa campaña Meta/Google ➔ el lead ingresa al sistema nervioso ➔ se mide costo de adquisición y retorno de inversión al instante.",
        connections: "Facebook Graph API, Google Ads API, embudos de captación y analítica financiera.",
        impact: "Control exacto de qué anuncios generan rentabilidad y cuáles deben apagarse."
    },
    "crm": {
        title: "Capacidad: CRM",
        category: "Capacidad Operativa",
        problem: "Los vendedores pierden negocios por falta de seguimiento o por no tener el historial del cliente en una sola pantalla.",
        context: "La relación comercial debe ser un flujo continuo, no una serie de interacciones sueltas.",
        operation: "Llega prospecto ➔ se crea ficha única con grabaciones e historial ➔ se coordinan etapas de venta de forma visual.",
        connections: "Ficha digital, central de mensajería, bases de datos de clientes e historial financiero.",
        impact: "Incremento en la tasa de cierre comercial y orden absoluto en el equipo de ventas."
    },
    "agenda": {
        title: "Capacidad: Agenda",
        category: "Capacidad Operativa",
        problem: "Citas duplicadas y pérdidas de tiempo cuando los calendarios de los profesionales no se coordinan en tiempo real.",
        context: "La disponibilidad de tu equipo debe ser una única fuente de verdad abierta al cliente sin fricciones.",
        operation: "El cliente visualiza cupos libres reales ➔ reserva ➔ se bloquea el espacio en el calendario del profesional asignado.",
        connections: "Google Calendar API, Outlook Calendar, pasarela de pago y notificaciones automáticas.",
        impact: "Cero sobrecupos y optimización máxima del tiempo de los profesionales."
    },
    "pagos": {
        title: "Capacidad: Pagos",
        category: "Capacidad Operativa",
        problem: "La fricción al cobrar (enviar datos de transferencia manualmente) ahuyenta al cliente y genera errores de validación.",
        context: "El flujo de caja mejora drásticamente cuando pagar a la empresa toma solo dos clicks desde cualquier dispositivo.",
        operation: "El sistema genera link de cobro personalizado ➔ el cliente paga con débito/crédito ➔ el pago se valida y procesa al instante.",
        connections: "Transbank Webpay, Mercado Pago, Stripe y conciliación bancaria contable.",
        impact: "Recaudación inmediata y eliminación de la validación manual de depósitos."
    },
    "facturacion": {
        title: "Capacidad: Facturación",
        category: "Capacidad Operativa",
        problem: "Tener que entrar al portal del SII para emitir manualmente cada boleta consume horas de trabajo propensas a errores.",
        context: "Cada transacción completada en el sistema debe emitir la documentación legal de forma automática.",
        operation: "Venta autorizada en IOS ➔ comunicación segura con el portal de facturación ➔ boleta o factura emitida y enviada al cliente.",
        connections: "SII (Servicio de Impuestos Internos), pasarelas de pago y base de datos de transacciones.",
        impact: "Emisión invisible del 100% de los documentos legales sin intervención humana."
    },
    "erp": {
        title: "Capacidad: ERP",
        category: "Capacidad Operativa",
        problem: "Administrar compras, gastos, contabilidad y nóminas en planillas Excel fragmentadas oscurece la salud financiera.",
        context: "El control contable y de tesorería debe alimentarse directamente del día a día de las operaciones.",
        operation: "El sistema registra ventas y egresos ➔ clasifica cuentas de gastos ➔ calcula IVA provisional e informes de flujo contable.",
        connections: " SII, cuentas bancarias conciliadas, libro de compras y ventas.",
        impact: "Contabilidad ordenada en tiempo real y preparación automatizada de impuestos."
    },
    "reportes": {
        title: "Capacidad: Reportes",
        category: "Capacidad Operativa",
        problem: "Los directores toman decisiones a ciegas porque los números de la empresa se consolidan solo una vez al mes.",
        context: "Dirigir con éxito exige visibilidad de las métricas vitales hoy, no el mes pasado.",
        operation: "IOS extrae datos de ventas, costos y márgenes ➔ los compila en tableros tipográficos de alta legibilidad en tiempo real.",
        connections: "Bases de datos operativas y financieras consolidadas.",
        impact: "Visibilidad absoluta y toma de decisiones corporativas basadas en datos reales."
    },
    "caja": {
        title: "Capacidad: Caja",
        category: "Capacidad Operativa",
        problem: "Diferencias inexplicables en el arqueo diario de caja debido a ventas en efectivo o transferencias mal registradas.",
        context: "El control diario de caja debe cruzarse digitalmente con las ventas POS y los cobros electrónicos.",
        operation: "Apertura de caja ➔ registro automático de cada flujo transaccional ➔ cierre y cuadratura cruzada con transacciones bancarias.",
        connections: "Terminales POS, software de caja y pasarelas de pago.",
        impact: "Cuadraturas perfectas en segundos y disminución drástica de pérdidas hormiga."
    },
    "inventario": {
        title: "Capacidad: Inventario",
        category: "Capacidad Operativa",
        problem: "Quiebres de stock o sobre-stock de insumos que inmovilizan capital por falta de control automatizado.",
        context: "El stock de bodega debe reaccionar de forma automática al consumo de servicios y a las ventas comerciales.",
        operation: "Se vende producto o se realiza procedimiento médico ➔ se debita el insumo correspondiente ➔ alerta de reabastecimiento.",
        connections: "Bodegas digitales, control de mermas e historial de compras.",
        impact: "Capital de trabajo optimizado y existencias siempre actualizadas."
    },
    "ia": {
        title: "Capacidad: Inteligencia",
        category: "Capacidad Operativa",
        problem: "Responder tarde a un prospecto en WhatsApp hace que compre a la competencia. Los humanos no pueden operar 24/7.",
        context: "La pre-calificación y atención deben ocurrir en segundos, sin importar la hora o el día.",
        operation: "Entra mensaje en WhatsApp ➔ el trabajador digital procesa la consulta con contexto de la empresa ➔ ofrece hora y agenda.",
        connections: "WhatsApp Business API, modelos de lenguaje natural y base de datos operativa.",
        impact: "Respuesta en milisegundos y captación autónoma de leads calificados las 24 horas."
    },
    "multiagentes": {
        title: "Capacidad: Multiagentes",
        category: "Capacidad Operativa",
        problem: "Flujos de trabajo complejos que requieren la coordinación de diferentes expertos se congelan por cuellos de botella.",
        context: "Diferentes agentes inteligentes especializados deben colaborar compartiendo contexto para resolver tareas complejas.",
        operation: "El agente comercial califica el lead ➔ pasa el contexto al agente operativo ➔ el agente financiero valida las condiciones.",
        connections: "Orquestador de agentes autónomos, base de datos distribuida y canales de comunicación interna.",
        impact: "Ejecución de procesos sofisticados de manera 100% autónoma y coordinada."
    },
    "automatizaciones": {
        title: "Capacidad: Coordinación",
        category: "Capacidad Operativa",
        problem: "El equipo humano malgasta el 40% de su jornada copiando datos entre sistemas, enviando recordatorios y alertando cobros.",
        context: "Los humanos deben enfocarse en el valor, mientras las reglas lógicas operan el sistema de fondo.",
        operation: "Un evento ocurre en el sistema (ej. pago exitoso) ➔ desencadena instantáneamente flujos de notificación y actualización.",
        connections: "Motor lógico de flujos, Webhooks y APIs del sistema.",
        impact: "Eliminación de la fatiga operativa y de las fallas humanas en procesos repetitivos."
    },

    // 3. CENTRO DE CONOCIMIENTO
    "que-es-un-erp": {
        title: "¿Qué es un ERP?",
        category: "Centro de Conocimiento",
        problem: "Muchos asocian ERP a sistemas corporativos complejos e inaccesibles, cuando en realidad es el corazón administrativo de un negocio.",
        context: "Un Enterprise Resource Planning coordina finanzas, inventarios y compras para dar orden de caja.",
        operation: "El ERP registra las compras y ventas ➔ las cruza con las conciliaciones bancarias ➔ ofrece reportes contables e impuestos.",
        connections: "SII, cuentas bancarias corporativas, compras y ventas operativas.",
        impact: "Entendimiento claro de cómo centralizar la tesorería de tu empresa para evitar fugas."
    },
    "que-es-un-crm": {
        title: "¿Qué es un CRM?",
        category: "Centro de Conocimiento",
        problem: "Tratar de vender usando notas mentales, WhatsApps individuales y cuadernos provoca la pérdida del 30% de las ventas.",
        context: "El Customer Relationship Management es la bitácora comercial de la empresa para coordinar al equipo.",
        operation: "El CRM registra cada interacción con el prospecto ➔ recuerda tareas pendientes ➔ muestra el pipeline de ventas.",
        connections: "WhatsApp, Meta Ads, correos electrónicos y sistemas de cobro.",
        impact: "Saber exactamente en qué estado está cada oportunidad de venta para cerrar con certeza."
    },
    "que-es-una-api": {
        title: "¿Qué es una API?",
        category: "Centro de Conocimiento",
        problem: "Las empresas se quedan estancadas al no poder comunicar sistemas heredados con nuevas herramientas modernas.",
        context: "Las Application Programming Interfaces son los puentes lógicos de comunicación entre plataformas.",
        operation: "Un sistema solicita un dato ➔ la API lo valida ➔ entrega el dato de forma segura en milisegundos.",
        connections: "Integraciones de todo tipo de software.",
        impact: "Comprender la importancia de conectar herramientas para eliminar el tipeo manual de datos."
    },
    "que-es-imed": {
        title: "¿Qué es IMED?",
        category: "Centro de Conocimiento",
        problem: "Las clínicas estéticas y médicas pierden ventas de bonos de salud al forzar al paciente a reembolsar manualmente.",
        context: "IMED es el operador chileno que permite comprar y validar bonos de Isapres y Fonasa en tiempo real.",
        operation: "La recepcionista ingresa el rut del paciente ➔ IMED consulta el plan de salud ➔ calcula el copago al instante.",
        connections: "Fonasa, Isapres, sistemas POS de clínicas.",
        impact: "Validación y venta inmediata de bonos de salud para mejorar el flujo de caja."
    },
    "que-es-fonasa": {
        title: "¿Qué es Fonasa?",
        category: "Centro de Conocimiento",
        problem: "La complejidad administrativa de validar tramos de Fonasa de forma manual ralentiza la recepción de pacientes.",
        context: "Fonasa es el Fondo Nacional de Salud de Chile, que cubre a gran parte de la población.",
        operation: "El sistema consulta directamente el tramo del afiliado (A, B, C, D) ➔ calcula la cobertura de forma transparente.",
        connections: "Bases de datos de Fonasa, software clínico.",
        impact: "Atención ágil de pacientes públicos asegurando el cobro correcto según tramo contable."
    },
    "que-es-un-webhook": {
        title: "¿Qué es un Webhook?",
        category: "Centro de Conocimiento",
        problem: "Las integraciones tradicionales exigen consultar la base de datos cada 5 minutos (polling), gastando recursos inútilmente.",
        context: "Un Webhook es una notificación en tiempo real que una plataforma envía a otra cuando ocurre un evento.",
        operation: "Ocurre un pago ➔ la pasarela envía el evento de forma instantánea ➔ el sistema receptor actualiza la orden de inmediato.",
        connections: "Pasarelas de pago, bases de datos, flujos lógicos.",
        impact: "Sincronización instantánea de eventos sin retraso ni consumo excesivo de servidor."
    },
    "que-es-conciliacion-bancaria": {
        title: "¿Qué es la Conciliación Bancaria?",
        category: "Centro de Conocimiento",
        problem: "Los administradores pasan semanas enteras cruzando depósitos de la cuenta corriente con las facturas emitidas.",
        context: "La conciliación es el proceso de verificar que cada peso cobrado coincida con la documentación contable y legal.",
        operation: "IOS lee los movimientos de la cuenta corriente ➔ los empareja automáticamente con las boletas y facturas del SII.",
        connections: "Cuentas corrientes bancarias, SII, pasarelas de pago.",
        impact: "Cuadratura contable perfecta automática, liberando horas de personal administrativo."
    },
    "que-es-seo": {
        title: "¿Qué es el SEO?",
        category: "Centro de Conocimiento",
        problem: "Pagar publicidad en Meta de forma permanente se vuelve insostenible a largo plazo para adquirir clientes.",
        context: "Search Engine Optimization es el posicionamiento orgánico en Google para atraer visitas sin pagar por click.",
        operation: "Optimizamos la velocidad de la web ➔ estructuramos contenido de alto valor ➔ Google nos posiciona en la cima.",
        connections: "Motores de búsqueda, arquitectura web, indexación.",
        impact: "Demanda comercial constante, predecible y de costo cero a mediano plazo."
    },
    "que-es-experiencia-de-cliente": {
        title: "¿Qué es la Experiencia de Cliente?",
        category: "Centro de Conocimiento",
        problem: "Las marcas creen que dar una buena experiencia es solo 'tratar bien', cuando en realidad es no hacerles perder tiempo.",
        context: "La experiencia de cliente (CX) mide la fricción total en el viaje de compra de un usuario.",
        operation: "Eliminamos llamadas innecesarias, automatizamos agendas, emitimos boletas digitales y respondemos al segundo.",
        connections: "Toda la infraestructura operativa conectada al usuario final.",
        impact: "Clientes fieles que recomiendan la empresa debido a una experiencia sin fricciones."
    },
    "que-es-una-operacion-fragmentada": {
        title: "¿Qué es una Operación Fragmentada?",
        category: "Centro de Conocimiento",
        problem: "La causa invisible de que las empresas mueran al intentar escalar sus ventas.",
        context: "Una operación fragmentada ocurre cuando los departamentos usan herramientas que no hablan entre sí.",
        operation: "Ventas usa una app ➔ operaciones usa planillas ➔ finanzas usa papel ➔ el caos bloquea la rentabilidad.",
        connections: "El problema del ecosistema tradicional desconectado.",
        impact: "Entender el diagnóstico crítico de tu negocio para dar el paso hacia una infraestructura unificada."
    }
};
