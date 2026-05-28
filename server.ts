import express from "express";
import path from "path";
import { Resend } from 'resend';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const resend = new Resend(process.env.RESEND_API_KEY);

  // API route for Resend
  app.post("/api/send", async (req, res) => {
    try {
      const { name, email, message, phone, photo } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields: name, email, or message' });
      }

      let htmlBody = `<h3>Nova mensagem do website (Simulador/Contacto):</h3>
               <p><strong>Nome:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Telemóvel/WhatsApp:</strong> ${phone || 'Não fornecido'}</p>
               <p><strong>Mensagem/Tratamentos:</strong> ${message}</p>`;

      if (photo) {
        htmlBody += `
               <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #57009C; background-color: #fcf8ff; border-radius: 0 12px 12px 0;">
                 <h4 style="color: #57009C; margin: 0 0 10px 0; font-family: sans-serif;">Foto de Diagnóstico do Sorriso:</h4>
                 <img src="${photo}" alt="Foto do Sorriso" style="max-width: 100%; max-height: 450px; border-radius: 16px; border: 3px solid #57009C; display: block; box-shadow: 0 4px 10px rgba(0,0,0,0.15);" />
               </div>`;
      }

      const { data, error } = await resend.emails.send({
        from: 'Clinica Santa Maria <onboarding@resend.dev>',
        to: ['clinicasmod@gmail.com'],
        subject: `Novo contacto de: ${name}`,
        html: htmlBody
      });

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
