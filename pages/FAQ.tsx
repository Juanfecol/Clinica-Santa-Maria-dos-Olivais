import React, { useEffect } from 'react';
import { faq } from '../constants/servicesData';

export const FAQ: React.FC = () => {
  useEffect(() => {
    if ((window as any).trackEvent) {
      (window as any).trackEvent('view_faq', {
        event_category: 'engagement'
      });
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-clinic-blue mb-12 text-center">Perguntas Frequentes</h1>
      <div className="space-y-8">
        {faq.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-clinic-purple mb-2">{item.question}</h2>
            <p className="text-gray-700">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
