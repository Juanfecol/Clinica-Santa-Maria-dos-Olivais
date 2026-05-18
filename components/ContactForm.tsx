import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { services } from '../constants/servicesData';

interface ContactFormProps {
  especialidadeInicial?: string;
  submitButtonText?: string;
  successMessage?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ 
  especialidadeInicial = '',
  submitButtonText = 'Agendar Avaliação',
  successMessage = 'Mensagem enviada com sucesso!'
}) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/send', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.nome,
          email: 'contacto@clinica.pt', // Placeholder
          phone: data.telefone,
          message: `Especialidade: ${data.especialidade}`
        })
      });

      if (response.ok) {
        // Rastreamento de Conversão
        if ((window as any).trackEvent) {
          (window as any).trackEvent('generate_lead', {
            event_category: 'conversion',
            especialidade: data.especialidade
          });
        }
        // Meta Pixel Conversion
        if ((window as any).trackMeta) {
          (window as any).trackMeta('Lead', {
            content_name: data.especialidade || 'Contacto Geral',
            content_category: 'Formulário Rodapé / Laterial',
            value: 5.0,
            currency: 'EUR'
          });
        }
        // Google Ads Conversion Tracking
        if ((window as any).gtag) {
          (window as any).gtag('event', 'conversion', { 'send_to': 'AW-434250599/form_submit' });
        }
        setStatus('success');
        navigate('/obrigado', { state: { nome: data.nome, servico: data.especialidade } });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-clinic-blue/10">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-clinic-blue mb-1">Nome</label>
          <input name="nome" required className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-clinic-lime outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-clinic-blue mb-1">Telefone</label>
          <input name="telefone" type="tel" required className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-clinic-lime outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-clinic-blue mb-1">Especialidade</label>
          <select name="especialidade" defaultValue={especialidadeInicial} className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-clinic-lime outline-none">
            {services.map((service) => (
              <option key={service.slug} value={service.title}>{service.title}</option>
            ))}
          </select>
        </div>
        <button 
          id="btn-form-submit"
          disabled={status === 'submitting'}
          className="w-full bg-clinic-blue text-white py-4 rounded-lg font-bold hover:bg-clinic-purple transition-all flex items-center justify-center gap-2"
        >
          {status === 'submitting' ? <Loader2 className="animate-spin" /> : <><Send size={18} /> {submitButtonText}</>}
        </button>
      </div>
      {status === 'success' && <p className="mt-4 text-green-600 font-bold text-center">{successMessage}</p>}
      {status === 'error' && <p className="mt-4 text-red-600 font-bold text-center">Erro ao enviar. Tente novamente.</p>}
    </form>
  );
};
