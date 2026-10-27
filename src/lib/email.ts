import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const DEFAULT_FROM = process.env.EMAIL_FROM || 'Mercenario OS <contacto@mercenario.cl>';
export const DEFAULT_REPLY_TO = process.env.EMAIL_REPLY_TO || 'contacto@mercenario.cl';

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  text?: string;
}

/**
 * Servicio centralizado de envío de correos transaccionales oficiales para Mercenario.
 * Utiliza Resend con firma DKIM/SPF del dominio @mercenario.cl
 */
export async function sendEmail({ to, subject, html, from, replyTo, text }: SendEmailOptions) {
  if (!resend) {
    console.warn('[Email] RESEND_API_KEY no configurada. Omitiendo envío.');
    return { success: false, error: 'RESEND_API_KEY no configurada' };
  }

  try {
    const data = await resend.emails.send({
      from: from || DEFAULT_FROM,
      to: Array.isArray(to) ? to : [to],
      replyTo: replyTo || DEFAULT_REPLY_TO,
      subject,
      html,
      text,
    });

    return { success: true, data };
  } catch (error: any) {
    console.error('[Email] Error enviando correo vía Resend:', error);
    return { success: false, error: error?.message || 'Error desconocido' };
  }
}
