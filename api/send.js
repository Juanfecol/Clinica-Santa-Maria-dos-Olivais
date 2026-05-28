import { Resend } from 'resend';

// Clave configurada a través de variables de entorno para mayor seguridad
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
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

    let attachments = [];

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
             <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #57009C; background-color: #fcf8ff; border-radius: 12px; font-family: sans-serif;">
               <h4 style="color: #57009C; margin: 0 0 10px 0;">Foto de Diagnóstico do Sorriso:</h4>
               <p style="color: #666; font-size: 13px; margin: 0 0 12px 0;">
                 Esta foto foi anexada ao email e pode ser visualizada abaixo:
               </p>
               <img src="${photo}" alt="Foto do Sorriso" style="max-width: 100%; max-height: 500px; border-radius: 16px; border: 3px solid #57009C; display: block; box-shadow: 0 4px 10px rgba(0,0,0,0.15);" />
             </div>`;
      } else {
        htmlBody += `
             <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #57009C; background-color: #fcf8ff; border-radius: 12px; font-family: sans-serif;">
               <h4 style="color: #57009C; margin: 0 0 10px 0;">Foto de Diagnóstico do Sorriso:</h4>
               <img src="${photo}" alt="Foto do Sorriso" style="max-width: 100%; max-height: 500px; border-radius: 16px; border: 3px solid #57009C; display: block; box-shadow: 0 4px 10px rgba(0,0,0,0.15);" />
             </div>`;
      }
    } else if (photo) {
      htmlBody += `
           <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #57009C; background-color: #fcf8ff; border-radius: 12px; font-family: sans-serif;">
             <h4 style="color: #57009C; margin: 0 0 10px 0;">Foto de Diagnóstico do Sorriso:</h4>
             <img src="${photo}" alt="Foto do Sorriso" style="max-width: 100%; max-height: 500px; border-radius: 16px; border: 3px solid #57009C; display: block; box-shadow: 0 4px 10px rgba(0,0,0,0.15);" />
           </div>`;
    }

    const emailPayload = {
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
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
