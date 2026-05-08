// Meta Conversions API - Serverless Function para Vercel
// Envia eventos del servidor a Meta para mejorar el rendimiento de anuncios

export default async function handler(req, res) {
  // Solo permite metodo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const PIXEL_ID = process.env.META_PIXEL_ID;
  const ACCESS_TOKEN = process.env.META_CONVERSIONS_API_TOKEN;

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('Missing Meta Conversions API credentials');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const { eventName, eventData } = req.body;

    if (!eventName) {
      return res.status(400).json({ error: 'eventName is required' });
    }

    // Construir el payload del evento para la API de Meta
    const eventTime = Math.floor(Date.now() / 1000);

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: eventTime,
          action_source: 'website',
          event_source_url: eventData?.sourceUrl || 'https://clinicadentariasantamariadosolivais.pt',
          user_data: {
            client_ip_address: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '',
            client_user_agent: req.headers['user-agent'] || '',
            // Si el usuario proporciono email o telefono, se incluyen hasheados
            ...(eventData?.email && { em: await hashSHA256(eventData.email.toLowerCase().trim()) }),
            ...(eventData?.phone && { ph: await hashSHA256(eventData.phone.replace(/\D/g, '')) }),
            ...(eventData?.name && { fn: await hashSHA256(eventData.name.toLowerCase().trim()) }),
          },
          custom_data: {
            ...(eventData?.customData || {}),
          },
        },
      ],
    };

    // Enviar evento a la API de Conversiones de Meta
    const metaApiUrl = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

    const response = await fetch(metaApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Meta Conversions API error:', result);
      return res.status(400).json({ error: result });
    }

    return res.status(200).json({ success: true, eventsReceived: result.events_received });
  } catch (error) {
    console.error('Server error in meta-conversions:', error);
    return res.status(500).json({ error: error.message });
  }
}

// Funcion helper para hashear datos con SHA-256 (requerido por Meta)
async function hashSHA256(data) {
  if (!data) return undefined;
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
