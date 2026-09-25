import express from "express";
import path from "path";
import { Resend } from 'resend';
import crypto from 'crypto';
import { GoogleGenAI } from "@google/genai";

// Hash helper for GDPR compliance: SHA-256 formatting as per Meta Conversions API requirements
function sha256(text: string): string | null {
  if (!text) return null;
  return crypto.createHash('sha256').update(text.trim().toLowerCase()).digest('hex');
}

const DEFAULT_SYSTEM_INSTRUCTION = `És o Assistente Virtual Inteligente da Clínica Dentária Santa Maria dos Olivais, em Lisboa (Olivais).
A clínica tem mais de 10 anos de excelência médica e avaliação 4.4 estrelas no Google com 141 avaliações de pacientes verificados.

O teu papel:
- Esclarecer dúvidas sobre saúde oral, tratamentos dentários, cuidados pós-operatórios e marcações de forma clara, empática, acolhedora e profissional.
- Especialidades principais da clínica:
  1. Implantologia e Reabilitação Oral (implantes unitários, pontes sobre implantes, próteses fixas tipo All-on-4 / protocolo de carga imediata).
  2. Ortodontia e Alinhadores Invisíveis (Invisalign Platinum Elite e aparelhos ortodônticos convencionais).
  3. Estética Dentária & Reabilitação do Sorriso (facetas dentárias de cerâmica, lentes de contacto dental, branqueamento médico em consultório e ambulatório).
  4. Odontopediatria (acompanhamento infantil carinhoso com a Dra. Orizanda).
  5. Higiene Oral, Destartarização e Prevenção.
  6. Endodontia (desvitalização com microscópio clínico), Cirurgia e Periodontologia.
- Informações práticas:
  - Telefone da clínica: 211 350 066
  - WhatsApp oficial: 919861310 (link direto: https://wa.me/351919861310)
  - Horário: Segunda a Sexta das 09h00 às 19h30, Sábado das 09h00 às 13h00.
  - A primeira consulta de avaliação inclui diagnóstico e plano de tratamento personalizado.
- Instruções de conduta:
  - Responde com gentileza na mesma língua em que o paciente escrever (Português por defeito, Espanhol ou Inglês se falar nessa língua).
  - Mantém as explicações simples e fáceis de compreender por leigos, sem jargão médico excessivo.
  - Lembra que uma consulta presencial de avaliação é essencial para diagnósticos definitivos.
  - Sempre que oportuno, encoraja o paciente a marcar a sua consulta ou falar diretamente com a equipa pelo WhatsApp 919861310.`;

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

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Multi-turn Gemini AI Chat API
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, systemInstruction, model } = req.body;

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "Missing or invalid 'messages' array" });
      }

      // Format messages into Gemini contents array
      const contents = messages.map((m: any) => ({
        role: (m.role === 'assistant' || m.role === 'model' || m.sender === 'bot') ? 'model' : 'user',
        parts: [{ text: String(m.text || m.content || '') }]
      }));

      // Model selection according to prompt & guidelines:
      // gemini-3.5-flash for general tasks, gemini-3.1-flash-lite for fast tasks, gemini-3.1-pro-preview for complex tasks
      const selectedModel = model === 'gemini-3.1-flash-lite' 
        ? 'gemini-3.1-flash-lite' 
        : model === 'gemini-3.1-pro-preview' 
        ? 'gemini-3.1-pro-preview' 
        : 'gemini-3.5-flash';

      try {
        const response = await ai.models.generateContent({
          model: selectedModel,
          contents,
          config: {
            systemInstruction: systemInstruction || DEFAULT_SYSTEM_INSTRUCTION,
          },
        });

        const reply = response.text || '';
        return res.status(200).json({ reply, model: selectedModel });
      } catch (geminiError: any) {
        console.warn("[Gemini API Fallback triggered]:", geminiError.message);
        
        // Find last user message for intelligent contextual fallback
        const lastUserMsg = [...messages].reverse().find((m: any) => m.role === 'user' || m.sender === 'user')?.text || '';
        const lower = String(lastUserMsg).toLowerCase();
        
        let fallbackReply = "Obrigado pela sua pergunta! Na Clínica Dentária Santa Maria dos Olivais estamos sempre disponíveis para cuidar do seu sorriso. Pode agendar uma avaliação inicial com a nossa equipa médica através do nosso WhatsApp oficial (919861310) ou telefone (211 350 066).";

        if (lower.includes('invisalign') || lower.includes('aparelho') || lower.includes('ortodont') || lower.includes('alinhador')) {
          fallbackReply = "O tratamento com Invisalign na Clínica Santa Maria dos Olivais é planeado digitalmente em 3D e dura em média entre 6 e 18 meses, dependendo da complexidade do caso. Os alinhadores são quase invisíveis, confortáveis e removíveis para as refeições. Recomendamos marcar uma consulta de diagnóstico com scan 3D para simular o resultado final do seu sorriso. Pode agendar no WhatsApp (919861310)!";
        } else if (lower.includes('implante') || lower.includes('dói') || lower.includes('dor') || lower.includes('anestesia')) {
          fallbackReply = "A colocação de implantes dentários na nossa clínica é realizada com anestesia local potente e técnicas minimamente invasivas, sendo um procedimento indolor. No pós-operatório fornecemos analgesia e protocolo anti-inflamatório específico para uma recuperação rápida. Temos packs de implantes unitários com coroa cerâmica e reabilitações completas All-on-4. Ficamos à sua espera para uma avaliação!";
        } else if (lower.includes('preço') || lower.includes('valor') || lower.includes('custo') || lower.includes('pagamento') || lower.includes('seguro') || lower.includes('acordo')) {
          fallbackReply = "Na Clínica Santa Maria dos Olivais trabalhamos em regime privado com emissão de fatura detalhada com todos os atos médicos para reembolso junto de seguradoras (ADSE, Médis, Multicare, AdvanceCare por Regime Livre). Além disso, disponibilizamos facilidades de pagamento faseado à medida que os procedimentos são efetuados. Agende uma consulta para obter o seu plano e orçamento personalizado.";
        } else if (lower.includes('faceta') || lower.includes('estética') || lower.includes('branqueamento') || lower.includes('lente')) {
          fallbackReply = "As facetas de cerâmica e o branqueamento dentário médico são as nossas soluções de eleição para transformar o sorriso com naturalidade e brilho. As facetas permitem corrigir a tonalidade, pequenas fraturas, espaçamentos (diastemas) e imperfeições estéticas com máxima durabilidade. Fale connosco pelo WhatsApp (919861310) para marcar uma consulta estética.";
        } else if (lower.includes('marca') || lower.includes('agendar') || lower.includes('horário') || lower.includes('contacto') || lower.includes('onde')) {
          fallbackReply = "Estamos localizados na Rua Cidade de Bissau, Olivais, Lisboa. O nosso horário é de Segunda a Sexta das 09h00 às 19h30 e Sábados das 09h00 às 13h00. Pode marcar a sua consulta ligando para 211 350 066 ou enviando mensagem para o nosso WhatsApp oficial 919861310!";
        }

        return res.status(200).json({ reply: fallbackReply, model: `${selectedModel} (fallback)` });
      }
    } catch (err: any) {
      console.error("[Chat API Fatal Error]:", err);
      return res.status(500).json({ error: err.message || "Failed to process chat" });
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
