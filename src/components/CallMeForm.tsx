import React, { useState } from 'react';
import { useGoogleAds } from '../../hooks/useGoogleAds';

export const CallMeForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', reason: '' });
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
        setFormData({ name: '', phone: '', reason: '' });
    }, 1000);
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 p-4 rounded-xl text-green-800 text-center font-medium">
        Obrigado! Entraremos em contacto brevemente.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 mt-6">
      <h3 className="text-lg font-bold text-gray-900">Quer que lhe liguemos?</h3>
      <input
        type="text"
        placeholder="Nome"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-3 rounded-lg border border-gray-200"
      />
      <input
        type="tel"
        placeholder="Número de Telefone"
        required
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full p-3 rounded-lg border border-gray-200"
      />
      <textarea
        placeholder="Motivo (opcional)"
        value={formData.reason}
        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
        className="w-full p-3 rounded-lg border border-gray-200"
        rows={2}
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition disabled:opacity-50"
      >
        {status === 'submitting' ? 'A enviar...' : 'Pedir Chamada'}
      </button>
    </form>
  );
};
