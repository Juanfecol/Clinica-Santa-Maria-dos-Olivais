const GHL_STRIPE_WEBHOOK_URL =
  process.env.GHL_STRIPE_WEBHOOK_URL ||
  'https://services.leadconnectorhq.com/hooks/gfTxFynWnzP12lVZbIc4/webhook-trigger/MP9GxbcvaXO7YtsmSYoG';

function normalizePtPhone(rawPhone) {
  if (!rawPhone) return '';
  const trimmed = String(rawPhone).trim();
  if (trimmed.startsWith('+')) return '+' + trimmed.replace(/\D/g, '');
  const digits = trimmed.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length === 9 && /^[239]/.test(digits)) return `+351${digits}`;
  if (digits.startsWith('351') && digits.length === 12) return `+${digits}`;
  return `+${digits}`;
}

function extractFromRawEmailText(subject = '', body = '') {
  const full = `${subject}\n${body}`;
  // Verify it is a Stripe 20€ payment notification/receipt
  const isTwentyEur = /(?:20[,.]00\s*€|€\s*20[,.]00|20[,.]00\s*EUR|EUR\s*20[,.]00)/i.test(full);

  // Extract customer email (excluding clinicasmod@gmail.com and stripe.com)
  const allEmails = full.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  const customerEmail =
    allEmails.find((em) => {
      const low = em.toLowerCase();
      return (
        !low.includes('stripe.com') &&
        low !== 'clinicasmod@gmail.com' &&
        !low.endsWith('@mail.clinicadentariasantamariadosolivais.pt')
      );
    }) || '';

  // Extract phone if present in receipt / custom fields
  const phoneMatch =
    full.match(/(?:\+351\s?)?(?:9\d{2}[\s.-]?\d{3}[\s.-]?\d{3}|21\d[\s.-]?\d{3}[\s.-]?\d{3})/) ||
    full.match(/\+\d{10,15}/);
  const customerPhone = phoneMatch ? normalizePtPhone(phoneMatch[0]) : '';

  // Extract customer name if labeled
  const nameMatch =
    full.match(/(?:Customer|Cliente|Nome|Paid by|Pagamento de|De)\s*[:\-]\s*([^\n<(\r]{2,60})/i) ||
    subject.match(/(?:from|de)\s+([A-ZÀ-ÿ][a-zà-ÿ]+(?:\s+[A-ZÀ-ÿ][a-zà-ÿ]+)+)/);
  const customerName = nameMatch ? nameMatch[1].trim() : '';

  return { isTwentyEur, customerEmail, customerPhone, customerName };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = req.body || {};

    // Support both structured JSON (from Gmail Apps Script / Stripe Webhook) and raw Inbound Email forward
    let email = String(body.email || body.customer_email || body?.data?.object?.customer_details?.email || '').trim();
    let phone = normalizePtPhone(body.phone || body.customer_phone || body?.data?.object?.customer_details?.phone || '');
    let name = String(body.name || body.customer_name || body?.data?.object?.customer_details?.name || '').trim();
    const rawSubject = String(body.subject || '');
    const rawText = String(body.text || body.body || body.html || '');

    const parsed = extractFromRawEmailText(rawSubject, rawText);
    if (!email && parsed.customerEmail) email = parsed.customerEmail;
    if (!phone && parsed.customerPhone) phone = parsed.customerPhone;
    if (!name && parsed.customerName) name = parsed.customerName;

    const amountConfirmed =
      body.amount === 20 ||
      body.amount === 2000 ||
      body?.data?.object?.amount_total === 2000 ||
      parsed.isTwentyEur ||
      Boolean(body.force_confirm);

    if (!amountConfirmed) {
      return res.status(200).json({ skipped: true, reason: 'Not a 20.00 EUR Stripe confirmation' });
    }

    if (!email && !phone && !name) {
      return res.status(400).json({ error: 'Could not extract customer email, phone, or name from Stripe receipt' });
    }

    const ghlPayload = {
      email,
      phone,
      name,
      payment_status: 'PAGA ONLINE (20€ Stripe)',
      amount: '20,00 €',
      stripe_confirmed_at: new Date().toISOString(),
      subject: rawSubject || 'Pagamento Stripe 20,00 € Confirmado',
    };

    const ghlRes = await fetch(GHL_STRIPE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ghlPayload),
    });

    return res.status(200).json({
      success: ghlRes.ok,
      forwarded: ghlPayload,
    });
  } catch (err) {
    console.error('Error in /api/stripe-parser:', err);
    return res.status(500).json({ error: err.message });
  }
}
