import express from "express";
import path from "path";
import { Resend } from 'resend';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  const resend = new Resend(process.env.RESEND_API_KEY);

  // API route for Resend
  app.post("/api/send", async (req, res) => {
    try {
      const { name, email, message, phone, photo, photos } = req.body;
      
      console.log('Received photo in request:', photo ? `${photo.substring(0, 50)}...` : 'No photo');
      if (photos && Array.isArray(photos)) {
        console.log(`Received ${photos.length} photos in request`);
      }
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields: name, email, or message' });
      }

      let htmlBody = `<h3>Nova mensagem do website (Simulador/Contacto):</h3>
               <p><strong>Nome:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Telemóvel/WhatsApp:</strong> ${phone || 'Não fornecido'}</p>
               <p><strong>Mensagem/Tratamentos:</strong> ${message}</p>`;

      let attachments: any[] = [];

      // Process main photo
      if (photo && typeof photo === 'string' && photo.startsWith('data:')) {
        const match = photo.match(/^data:([^;]+);base64,(.+)$/);
        if (match) {
          const contentType = match[1]; // e.g., 'image/jpeg'
          const base64Data = match[2];
          const extension = contentType.split('/')[1] || 'jpg';
          const filename = `sorriso_principal_${Date.now()}.${extension}`;

          attachments.push({
            filename: filename,
            content: Buffer.from(base64Data, 'base64')
          });

          htmlBody += `
               <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #57009C; background-color: #fcf8ff; border-radius: 12px;">
                 <h4 style="color: #57009C; margin: 0 0 10px 0; font-family: sans-serif;">Foto de Diagnóstico Principal:</h4>
                 <img src="${photo}" alt="Foto Principal" style="max-width: 100%; max-height: 400px; border-radius: 16px; border: 3px solid #57009C; display: block; box-shadow: 0 4px 10px rgba(0,0,0,0.15);" />
               </div>`;
        } else {
          // Fallback
          htmlBody += `
               <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #57009C; background-color: #fcf8ff; border-radius: 12px;">
                 <h4 style="color: #57009C; margin: 0 0 10px 0; font-family: sans-serif;">Foto de Diagnóstico Principal:</h4>
                 <img src="${photo}" alt="Foto" style="max-width: 100%; max-height: 400px; border-radius: 16px; border: 3px solid #57009C; display: block;" />
               </div>`;
        }
      }

      // Process multiple photos if present
      if (photos && Array.isArray(photos) && photos.length > 0) {
        htmlBody += `
             <div style="margin-top: 25px; border-top: 2px dashed #eee; padding-top: 15px;">
               <h3 style="color: #2D3277; font-family: sans-serif; margin-bottom: 15px;">Perspetivas e Ângulos de Diagnóstico (Smile Design):</h3>
               <div style="display: flex; flex-direction: column; gap: 20px;">`;

        photos.forEach((pObj: any, index: number) => {
          const { label, dataUrl } = pObj;
          if (dataUrl && typeof dataUrl === 'string' && dataUrl.startsWith('data:')) {
            const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
            if (match) {
              const contentType = match[1];
              const base64Data = match[2];
              const extension = contentType.split('/')[1] || 'jpg';
              const safeLabel = (label || `foto_${index + 1}`).toLowerCase().replace(/[^a-z0-9]/g, '_');
              const filename = `${safeLabel}_${Date.now()}.${extension}`;

              attachments.push({
                filename: filename,
                content: Buffer.from(base64Data, 'base64')
              });

              htmlBody += `
                <div style="padding: 15px; border-left: 4px solid #6B46C1; background-color: #f9f7fc; border-radius: 12px; margin-bottom: 15px;">
                  <h4 style="color: #6B46C1; margin: 0 0 8px 0; font-family: sans-serif; font-size: 16px; font-weight: bold;">${label || `Foto ${index + 1}`}:</h4>
                  <img src="${dataUrl}" alt="${label || `Foto ${index + 1}`}" style="max-width: 100%; max-height: 400px; border-radius: 16px; border: 2px solid #6b46c1; display: block; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
                </div>`;
            }
          }
        });

        htmlBody += `</div></div>`;
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
