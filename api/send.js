import { Resend } from 'resend';

// Clave configurada directamente para funcionamiento inmediato
const resend = new Resend('re_K4soxQjj_NqnjBWg1a7dsWG1yfeSN3Sr9');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
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
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
