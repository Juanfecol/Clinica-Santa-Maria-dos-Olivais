import React, { useState } from 'react';
import { useGoogleAds } from '../../hooks/useGoogleAds';

export const CallMeForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', treatment: 'implante-unitario' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const { trackForm } = useGoogleAds();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    trackForm();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', phone: '', treatment: 'implante-unitario' });
    }, 1000);
  };

  if (status === 'success') {
    return (
      <div className="bg-green-500/10 backdrop-blur-md border border-green-500/20 p-6 rounded-2xl text-green-200 text-center font-semibold shadow-inner">
        <span className="block text-2xl mb-2">🎉</span>
        <p className="text-sm">Pedido recebido com sucesso! Um especialista ligará para si muito brevemente.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 text-gray-800 space-y-4">
      <div className="text-center md:text-left border-b border-gray-100 pb-3 mb-2">
        <h3 className="text-md font-bold text-gray-900 uppercase tracking-wide">Ligamos-lhe Grátis</h3>
        <p className="text-xs text-gray-500 mt-1">Preencha os dados abaixo e entramos em contacto.</p>
      </div>
      
      {/* Name Input */}
      <div className="space-y-1">
        <label htmlFor="form-name" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
          Nome Completo
        </label>
        <input
          id="form-name"
          type="text"
          placeholder="Ex: Maria Silva"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-clinic-blue focus:ring-2 focus:ring-clinic-blue/15 outline-none transition-all duration-200"
        />
      </div>

      {/* Phone Input */}
      <div className="space-y-1">
        <label htmlFor="form-phone" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
          Telemóvel / Telefone
        </label>
        <input
          id="form-phone"
          type="tel"
          placeholder="Ex: 912 345 678"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-clinic-blue focus:ring-2 focus:ring-clinic-blue/15 outline-none transition-all duration-200"
        />
      </div>

      {/* Treatment Dropdown selection */}
      <div className="space-y-1">
        <label htmlFor="form-treatment" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
          Tratamento de Interesse
        </label>
        <select
          id="form-treatment"
          value={formData.treatment}
          onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
          className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-clinic-blue focus:ring-2 focus:ring-clinic-blue/15 outline-none transition-all duration-200 appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23374151' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            backgroundSize: '16px'
          }}
        >
          <option value="implante-unitario">Implantes Dentários (Unitários ou Vários)</option>
          <option value="protocolo-arcada">Protocolo Superior (Arcada Completa)</option>
          <option value="facetas">Facetas Dentárias (Lentes de Contacto)</option>
          <option value="outro-caso">Outro Tratamento / Dúvida Geral</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-clinic-blue hover:bg-blue-900 text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md shadow-blue-950/10 hover:shadow-lg transition-all duration-200 disabled:opacity-50 transform hover:-translate-y-0.5"
      >
        {status === 'submitting' ? 'A processar...' : 'Pedir Contacto Gratuito'}
      </button>
    </form>
  );
};
