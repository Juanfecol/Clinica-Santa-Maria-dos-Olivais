import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ContactFormProps {
  especialidadeInicial?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ especialidadeInicial = '' }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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
        setStatus('success');
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
            <option value="Implantologia">Implantologia</option>
            <option value="Ortodontia">Ortodontia</option>
            <option value="Periodontologia">Periodontologia</option>
          </select>
        </div>
        <button 
          disabled={status === 'submitting'}
          className="w-full bg-clinic-blue text-white py-4 rounded-lg font-bold hover:bg-clinic-purple transition-all flex items-center justify-center gap-2"
        >
          {status === 'submitting' ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Agendar Avaliação</>}
        </button>
      </div>
      {status === 'success' && <p className="mt-4 text-green-600 font-bold text-center">Mensagem enviada com sucesso!</p>}
      {status === 'error' && <p className="mt-4 text-red-600 font-bold text-center">Erro ao enviar. Tente novamente.</p>}
    </form>
  );
};
