/**
 * Configuración Centralizada de WhatsApp para Mercenario & WEKE Studio
 * 
 * - BOT_PHONE: Número del Asistente Virtual IA conectado a Meta Cloud API (+56 9 5795 8467)
 * - ADMIN_PHONE: Número personal del administrador / dueño para derivaciones humanas (+56 9 8402 1940)
 */

export const WHATSAPP_CONFIG = {
  // Número oficial del Asistente Virtual (Meta Cloud WhatsApp API)
  botPhone: '56957958467',
  botPhoneFormatted: '+56 9 5795 8467',
  
  // Número del administrador para alertas de asistencia humana (Mario Cruz)
  adminPhone: '56984021940',
  adminPhoneFormatted: '+56 9 8402 1940',

  // Generador de enlace directo al Asistente Virtual
  getBotUrl: (message?: string) => {
    const defaultMsg = 'Hola, quisiera comunicarme con el Asistente Virtual de WEKE Studio.';
    const text = encodeURIComponent(message || defaultMsg);
    return `https://wa.me/56957958467?text=${text}`;
  },

  // Generador de enlace de diagnóstico para Mercenario
  getMercenarioBotUrl: (message?: string) => {
    const defaultMsg = 'Hola, quisiera consultar sobre un sistema operativo llave en mano para mi empresa.';
    const text = encodeURIComponent(message || defaultMsg);
    return `https://wa.me/56957958467?text=${text}`;
  }
};
