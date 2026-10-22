import React from 'react';
import AsistenteClient from './AsistenteClient';
import { getWhatsAppChatsAction } from './actions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Asistente Virtual & LiveChat | WEKE Studio Admin',
  description: 'Control de WhatsApp Omnicanal con IA 24/7 y handoff humano.',
};

export default async function AsistenteAdminPage() {
  try {
    const chats = await getWhatsAppChatsAction();
    const safeChats = JSON.parse(JSON.stringify(chats || []));
    return <AsistenteClient initialChats={safeChats} />;
  } catch (error) {
    console.error('Error cargando chats en AsistenteAdminPage:', error);
    return <AsistenteClient initialChats={[]} />;
  }
}
