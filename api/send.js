import { Resend } from 'resend';

// Clave configurada directamente para funcionamiento inmediato
const resend = new Resend('re_bWGjj427_KJcWrDUqhxAtWS5SCuBanq3U');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { name, email, message, phone } = req.body;
    const data = await resend.emails.send({
      from: 'Clinica Santa Maria <onboarding@resend.dev>',
      to: ['clinicasmod@gmail.com'],
      subject: `Novo contacto de: ${name}`,
      html: `<h3>Nova mensagem do website:</h3>
             <p><strong>Nome:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Telemóvel:</strong> ${phone || 'Não fornecido'}</p>
             <p><strong>Mensagem:</strong> ${message}</p>`
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
