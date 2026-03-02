import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from 'resend';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const resend = new Resend(process.env.RESEND_API_KEY);

  // API route for Resend
  app.post("/api/send", async (req, res) => {
    try {
      const { name, email, message, phone } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields: name, email, or message' });
      }

      const { data, error } = await resend.emails.send({
        from: 'Clinica Santa Maria <onboarding@resend.dev>',
        to: ['clinicasmod@gmail.com'],
        subject: `Novo contacto de: ${name}`,
        html: `<h3>Nova mensagem do website:</h3>
               <p><strong>Nome:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Telemóvel:</strong> ${phone || 'Não fornecido'}</p>
               <p><strong>Mensagem:</strong> ${message}</p>`
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
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
