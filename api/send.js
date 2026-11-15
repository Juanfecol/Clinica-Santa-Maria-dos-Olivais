import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const GHL_INBOUND_WEBHOOK_URL =
  process.env.GHL_INBOUND_WEBHOOK_URL ||
  'https://services.leadconnectorhq.com/hooks/gfTxFynWnzP12lVZbIc4/webhook-trigger/wZSoTBwyHdb9bq49l6EJ';

function normalizePtPhone(rawPhone) {
  if (!rawPhone) return '';
  const trimmed = String(rawPhone).trim();
  if (trimmed.startsWith('+')) {
    return '+' + trimmed.replace(/\D/g, '');
  }
  const digits = trimmed.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('00')) return '+' + digits.slice(2);
  if (digits.length === 9 && /^[239]/.test(digits)) return `+351${digits}`;
  if (digits.startsWith('351') && digits.length === 12) return `+${digits}`;
  return `+${digits}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const {
      name,
      email,
      message,
      phone,
      photo,
      tratamento,
      preferencia_contacto,
      preferencia_pagamento,
      gclid,
      wbraid,
      gbraid,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      landing_page,
      source,
    } = req.body || {};

    const cleanName = String(name || '').trim();
    const rawEmail = String(email || '').trim();
    // Never allow placeholder fallback emails to merge distinct contacts in GHL
    const cleanEmail = /^contacto@(clinica\.pt|exemplo\.com)$/i.test(rawEmail)
      ? ''
      : rawEmail;
    const cleanPhone = normalizePtPhone(phone);
    const cleanMessage = String(message || tratamento || 'Pedido de contacto via Website').trim();

    if (!cleanName || (!cleanPhone && !cleanEmail)) {
      return res.status(400).json({ error: 'Missing required fields: name and phone or email' });
    }

    const nameParts = cleanName.split(/\s+/);
    const firstName = nameParts[0] || cleanName;
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    // 1. Build GHL Master Omnichannel Inbound Webhook Payload
    const ghlPayload = {
      name: cleanName,
      first_name: firstName,
      last_name: lastName,
      phone: cleanPhone,
      email: cleanEmail,
      tratamento: String(tratamento || '').trim(),
      preferencia_contacto: String(preferencia_contacto || 'WhatsApp / Telemóvel').trim(),
      preferencia_pagamento: String(preferencia_pagamento || '').trim(),
      message: cleanMessage,
      has_photo: Boolean(photo),
      gclid: String(gclid || '').trim(),
      wbraid: String(wbraid || '').trim(),
      gbraid: String(gbraid || '').trim(),
      utm_source: String(utm_source || '').trim(),
      utm_medium: String(utm_medium || '').trim(),
      utm_campaign: String(utm_campaign || '').trim(),
      utm_term: String(utm_term || '').trim(),
      landing_page: String(landing_page || '').trim(),
      source: String(source || 'Website Oficial SMO').trim(),
      submitted_at: new Date().toISOString(),
    };

    const ghlPromise = fetch(GHL_INBOUND_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ghlPayload),
    });

    // 2. Build Resend Email Backup to clinicasmod@gmail.com (especially important when photo is attached)
    let htmlBody = `<h3>Novo pedido recebido no Website Oficial (Clínica Santa Maria dos Olivais):</h3>
      <p><strong>Nome:</strong> ${cleanName}</p>
      <p><strong>Telemóvel / WhatsApp:</strong> ${cleanPhone || 'Não fornecido'}</p>
      <p><strong>Email:</strong> ${cleanEmail || 'Não preenchido'}</p>
      <p><strong>Tratamento de Interesse:</strong> ${ghlPayload.tratamento || 'Ver mensagem abaixo'}</p>
      <p><strong>Preferência de Contacto:</strong> ${ghlPayload.preferencia_contacto}</p>
      <p><strong>Mensagem / Detalhes:</strong> ${cleanMessage}</p>
      ${ghlPayload.gclid ? `<p style="font-size:12px;color:#64748b;"><strong>Google Ads GCLID:</strong> ${ghlPayload.gclid} | Campanha: ${ghlPayload.utm_campaign || '-'}</p>` : ''}`;

    const attachments = [];
    if (photo && typeof photo === 'string' && photo.startsWith('data:')) {
      const match = photo.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        const contentType = match[1];
        const base64Data = match[2];
        const extension = contentType.split('/')[1] || 'jpg';
        const filename = `sorriso_${Date.now()}.${extension}`;
        attachments.push({
          filename,
          content: Buffer.from(base64Data, 'base64'),
        });
      }
      htmlBody += `
        <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #57009C; background-color: #fcf8ff; border-radius: 12px; font-family: sans-serif;">
          <h4 style="color: #57009C; margin: 0 0 10px 0;">Foto de Pré-Triagem do Sorriso:</h4>
          <img src="${photo}" alt="Foto do Sorriso" style="max-width: 100%; max-height: 500px; border-radius: 16px; border: 3px solid #57009C; display: block;" />
        </div>`;
    }

    const emailPayload = {
      from: 'Clínica Santa Maria dos Olivais <onboarding@resend.dev>',
      to: ['clinicasmod@gmail.com'],
      subject: `[SMO - WEB] Novo contacto: ${cleanName} (${cleanPhone || cleanEmail})`,
      html: htmlBody,
    };
    if (cleanEmail) {
      emailPayload.reply_to = cleanEmail;
    }
    if (attachments.length > 0) {
      emailPayload.attachments = attachments;
    }

    const resendPromise = resend ? resend.emails.send(emailPayload) : Promise.resolve({ data: null, error: null });

    const [ghlSettled, resendSettled] = await Promise.allSettled([ghlPromise, resendPromise]);

    const ghlOk = ghlSettled.status === 'fulfilled' && ghlSettled.value.ok;
    const resendOk =
      resendSettled.status === 'fulfilled' && !resendSettled.value?.error;

    if (!ghlOk && !resendOk) {
      return res.status(502).json({ error: 'Failed to deliver lead to GHL and email backup' });
    }

    return res.status(200).json({
      success: true,
      ghlDelivered: ghlOk,
      emailDelivered: resendOk,
    });
  } catch (error) {
    console.error('Server Error in /api/send:', error);
    return res.status(500).json({ error: error.message });
  }
}
