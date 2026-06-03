import express from "express";
import path from "path";
import { Resend } from 'resend';
import crypto from 'crypto';

// Hash helper for GDPR compliance: SHA-256 formatting as per Meta Conversions API requirements
function sha256(text: string): string | null {
  if (!text) return null;
  return crypto.createHash('sha256').update(text.trim().toLowerCase()).digest('hex');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  const resend = new Resend(process.env.RESEND_API_KEY);

  // API route for Resend
  app.post("/api/send", async (req, res) => {
    try {
      const { name, email, message, phone, photo } = req.body;
      
      console.log('Received photo in request:', photo ? `${photo.substring(0, 50)}...` : 'No photo');
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields: name, email, or message' });
      }

      let htmlBody = `<h3>Nova mensagem do website (Simulador/Contacto):</h3>
               <p><strong>Nome:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Telemóvel/WhatsApp:</strong> ${phone || 'Não fornecido'}</p>
               <p><strong>Mensagem/Tratamentos:</strong> ${message}</p>`;

      let attachments: any[] = [];

      if (photo && typeof photo === 'string' && photo.startsWith('data:')) {
        const match = photo.match(/^data:([^;]+);base64,(.+)$/);
        if (match) {
          const contentType = match[1]; // e.g., 'image/jpeg'
          const base64Data = match[2];
          const extension = contentType.split('/')[1] || 'jpg';
          const filename = `sorriso_${Date.now()}.${extension}`;

          // Resend SDK only supports 'filename' and 'content' (Buffer or string)
          attachments.push({
            filename: filename,
            content: Buffer.from(base64Data, 'base64')
          });

          htmlBody += `
               <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #57009C; background-color: #fcf8ff; border-radius: 12px;">
                 <h4 style="color: #57009C; margin: 0 0 10px 0; font-family: sans-serif;">Foto de Diagnóstico do Sorriso:</h4>
                 <p style="color: #666; font-size: 13px; margin: 0 0 12px 0; font-family: sans-serif;">
                   Esta foto foi anexada e pode ser visualizada abaixo:
                 </p>
                 <img src="${photo}" alt="Foto do Sorriso" style="max-width: 100%; max-height: 500px; border-radius: 16px; border: 3px solid #57009C; display: block; box-shadow: 0 4px 10px rgba(0,0,0,0.15);" />
               </div>`;
        } else {
          // Fallback if formatting doesn't match standard data uri
          htmlBody += `
               <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #57009C; background-color: #fcf8ff; border-radius: 12px;">
                 <h4 style="color: #57009C; margin: 0 0 10px 0; font-family: sans-serif;">Foto de Diagnóstico do Sorriso:</h4>
                 <img src="${photo}" alt="Foto do Sorriso" style="max-width: 100%; max-height: 500px; border-radius: 16px; border: 3px solid #57009C; display: block; box-shadow: 0 4px 10px rgba(0,0,0,0.15);" />
               </div>`;
        }
      } else if (photo) {
        // Fallback or external link
        htmlBody += `
               <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #57009C; background-color: #fcf8ff; border-radius: 12px;">
                 <h4 style="color: #57009C; margin: 0 0 10px 0; font-family: sans-serif;">Foto de Diagnóstico do Sorriso:</h4>
                 <img src="${photo}" alt="Foto do Sorriso" style="max-width: 100%; max-height: 500px; border-radius: 16px; border: 3px solid #57009C; display: block; box-shadow: 0 4px 10px rgba(0,0,0,0.15);" />
               </div>`;
      }

      const emailPayload: any = {
        from: 'Clinica Santa Maria <onboarding@resend.dev>',
        to: ['clinicasmod@gmail.com'],
        subject: `Novo contacto de: ${name}`,
        html: htmlBody
      };

      if (attachments.length > 0) {
        emailPayload.attachments = attachments;
      }

      const { data, error } = await resend.emails.send(emailPayload);

      if (error) {
        console.error('Resend API Error:', error);
        return res.status(400).json({ error });
      }

      return res.status(200).json({ success: true, id: data?.id });
    } catch (error: any) {
      console.error('Server Error:', error);
      return res.status(500).json({ error: error.message });
    }
  });

  // Meta Conversions API (CAPI) Server-Side Tracking Proxy (GDPR/RGPD compliant & deduplication ready)
  app.post("/api/meta-capi", async (req, res) => {
    try {
      const { eventName, eventId, isStandard, eventSourceUrl, fbp, fbc, customData } = req.body;

      if (!eventName) {
        return res.status(400).json({ error: 'Missing eventName parameter' });
      }

      // 1. Resolve client network info securely for attribution matching
      let clientIp = (req.headers['x-forwarded-for'] as string || '')
        .split(',')[0]
        .trim() || req.socket.remoteAddress || '';
      if (clientIp.startsWith('::ffff:')) {
        clientIp = clientIp.substring(7);
      }
      const clientUserAgent = req.headers['user-agent'] || '';

      // 2. Prepare user matched traits using SHA-256 standard encryption for full RGPD compliance
      const resolvedUserData: any = {
        client_ip_address: clientIp,
        client_user_agent: clientUserAgent
      };

      if (fbp) resolvedUserData.fbp = fbp;
      if (fbc) resolvedUserData.fbc = fbc;

      if (req.body.userData) {
        const { em, ph, fn, ln } = req.body.userData;
        if (em) {
          const hashed = sha256(em);
          if (hashed) resolvedUserData.em = [hashed];
        }
        if (ph) {
          let sanitizedPhone = String(ph).replace(/\D/g, '');
          if (sanitizedPhone.length === 9 && (sanitizedPhone.startsWith('9') || sanitizedPhone.startsWith('2'))) {
            sanitizedPhone = '351' + sanitizedPhone;
          }
          const hashed = sha256(sanitizedPhone);
          if (hashed) resolvedUserData.ph = [hashed];
        }
        if (fn) {
          const hashed = sha256(fn);
          if (hashed) resolvedUserData.fn = [hashed];
        }
        if (ln) {
          const hashed = sha256(ln);
          if (hashed) resolvedUserData.ln = [hashed];
        }
      }

      // 3. Assemble Meta CAPI Standard format payload
      const unixTimestamp = Math.floor(Date.now() / 1000);
      const metaPayload = {
        data: [
          {
            event_name: eventName,
            event_time: unixTimestamp,
            event_id: eventId,
            event_source_url: eventSourceUrl || '',
            action_source: "website",
            user_data: resolvedUserData,
            custom_data: customData || {}
          }
        ]
      };

      const pixelId = process.env.META_PIXEL_ID || '1754959305395666';
      const accessToken = process.env.META_ACCESS_TOKEN;

      if (!accessToken) {
        console.log(`[Meta CAPI Simulator] Event '${eventName}' (ID: ${eventId}) prepared successfully. No META_ACCESS_TOKEN defined. Data:`, JSON.stringify(resolvedUserData));
        return res.status(200).json({
          success: true,
          simulated: true,
          message: 'Server-side tracking processed in simulation mode. Define META_ACCESS_TOKEN for live delivery.'
        });
      }

      const url = `https://graph.facebook.com/v17.0/${pixelId}/events?access_token=${accessToken}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metaPayload)
      });

      const result = await response.json() as any;

      if (!response.ok) {
        console.error('[Meta CAPI Outbound Error]', result);
        return res.status(response.status).json({ success: false, error: result });
      }

      console.log(`[Meta CAPI Live Success] Forwarded event '${eventName}' with ID '${eventId}' to Meta Servers.`);
      return res.status(200).json({ success: true, result });
    } catch (err: any) {
      console.error('[Meta CAPI Catch Error]', err);
      return res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    const distPath = path.resolve("dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
