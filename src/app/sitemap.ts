import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mercenario.io';
  
  const routes = [
    '',
    '/centro-de-conocimiento/que-es-conciliacion-bancaria',
    '/centro-de-conocimiento/que-es-experiencia-de-cliente',
    '/centro-de-conocimiento/que-es-fonasa',
    '/centro-de-conocimiento/que-es-imed',
    '/centro-de-conocimiento/que-es-seo',
    '/centro-de-conocimiento/que-es-un-crm',
    '/centro-de-conocimiento/que-es-un-erp',
    '/centro-de-conocimiento/que-es-un-webhook',
    '/centro-de-conocimiento/que-es-una-api',
    '/centro-de-conocimiento/que-es-una-operacion-fragmentada',
    '/empresa/filosofia',
    '/empresa/nosotros',
    '/experiencia/vive-la-experiencia',
    '/integraciones/no-necesitas-comenzar-de-cero',
    '/operacion/acto-medico',
    '/operacion/administracion',
    '/operacion/agenda',
    '/operacion/automatizaciones',
    '/operacion/caja',
    '/operacion/centro-de-operaciones',
    '/operacion/como-funciona-una-empresa',
    '/operacion/como-se-implementa',
    '/operacion/como-se-soluciona',
    '/operacion/comunicacion',
    '/operacion/crm',
    '/operacion/erp',
    '/operacion/facturacion',
    '/operacion/ia',
    '/operacion/informacion',
    '/operacion/inventario',
    '/operacion/marketing',
    '/operacion/multiagentes',
    '/operacion/operacion-conectada',
    '/operacion/pagos',
    '/operacion/por-que-existe',
    '/operacion/reportes',
    '/operacion/todas-empresas',
    '/soluciones/health',
    '/soluciones/comercio',
    '/soluciones/gastronomia',
    '/soluciones/veterinarias',
    '/soluciones/gimnasios',
    '/soluciones/servicios',
    '/soluciones/terreno',
    '/soluciones/tecnologia',
    '/soluciones/personalizadas'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
