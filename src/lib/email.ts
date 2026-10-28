import nodemailer from 'nodemailer';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const DEFAULT_FROM = process.env.EMAIL_FROM || 'Mercenario OS <contacto@mercenario.cl>';
export const DEFAULT_REPLY_TO = process.env.EMAIL_REPLY_TO || 'contacto@mercenario.cl';

const smtpUser = process.env.SMTP_USER || process.env.GMAIL_SMTP_USER;
const smtpPassword = process.env.SMTP_PASSWORD || process.env.GMAIL_SMTP_APP_PASSWORD;

// Transporter Google Workspace / Gmail SMTP (mismo mecanismo de entrega directa que Elena La Costurera)
const transporter = smtpUser && smtpPassword ? nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: smtpUser,
    pass: smtpPassword,
  },
}) : null;

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  text?: string;
}

/**
 * Servicio centralizado de envío de correos de Mercenario OS.
 * Prioriza Google Workspace SMTP para asegurar entrega directa en la bandeja Principal de Gmail.
 * Si no está disponible, utiliza Resend como fallback.
 */
export async function sendEmail({ to, subject, html, from, replyTo, text }: SendEmailOptions) {
  const recipients = Array.isArray(to) ? to.join(', ') : to;
  const fromHeader = from || DEFAULT_FROM;
  const replyToHeader = replyTo || DEFAULT_REPLY_TO;

  // 1. Prioridad: Despacho por Google Workspace SMTP (evita la pestaña Promociones)
  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: fromHeader,
        to: recipients,
        replyTo: replyToHeader,
        subject,
        text,
        html,
      });
      return { success: true, data: info, provider: 'smtp' };
    } catch (smtpError) {
      console.warn('[Email] Error enviando vía Google SMTP, intentando Resend:', smtpError);
    }
  }

  // 2. Fallback: Resend API
  if (resend) {
    try {
      const data = await resend.emails.send({
        from: fromHeader,
        to: Array.isArray(to) ? to : [to],
        replyTo: replyToHeader,
        subject,
        html,
        text,
      });
      return { success: true, data, provider: 'resend' };
    } catch (error: any) {
      console.error('[Email] Error enviando correo vía Resend:', error);
      return { success: false, error: error?.message || 'Error desconocido' };
    }
  }

  console.warn('[Email] No hay proveedores de correo configurados (SMTP ni Resend).');
  return { success: false, error: 'Sin proveedores de correo configurados' };
}
