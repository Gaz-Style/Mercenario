import React from 'react';
import { Metadata } from 'next';
import ComunidadClient from './ComunidadClient';

export const metadata: Metadata = {
  title: 'Comunidad & Boletín de Novedades | WEKE Ropa Técnica Sustentable',
  description:
    'Únete a la comunidad de montañistas WEKE en Chile. Suscríbete a nuestra Bitácora Andina para recibir novedades, convocatorias de trekking inclusivo, talleres de compostura en Las Condes y un 10% de descuento.',
};

export default function ComunidadPage() {
  return <ComunidadClient />;
}
