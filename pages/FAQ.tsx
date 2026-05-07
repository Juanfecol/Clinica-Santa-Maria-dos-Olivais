import React, { useState, useEffect } from 'react';
import { faq } from '../constants/servicesData';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  useEffect(() => {
    if ((window as any).trackEvent) {
      (window as any).trackEvent('view_faq', {
        event_category: 'engagement'
      });
    }
  }, []);

  const toggleItem = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-clinic-blue mb-12 text-center">Perguntas Frequentes</h1>
      
      <div className="grid md:grid-cols-12 gap-12 items-start">
        {/* Video Slot */}
        <div className="md:col-span-4 flex justify-center sticky top-24">
          <div className="relative w-full max-w-[300px] aspect-[9/16] rounded-[2.5rem] border-[4px] border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden bg-black">
            <video
              src="https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_CONSULTA.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_CONSULTA.mp4#t=0.1"
            />
          </div>
        </div>

        {/* Accordion */}
        <div className="md:col-span-8 space-y-8">
          {faq.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-2xl font-bold text-clinic-blue mb-4">{category.category}</h2>
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => {
                  const id = `${catIndex}-${itemIndex}`;
                  const isOpen = openIndex === id;
                  return (
                    <div key={id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                      <button 
                        onClick={() => toggleItem(id)}
                        className="w-full text-left p-6 flex justify-between items-center font-bold text-clinic-purple hover:bg-gray-50 transition-colors"
                      >
                        {item.question}
                        <i className={`fas fa-chevron-down transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
                      </button>
                      <div className={`px-6 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[200px] pb-6' : 'max-h-0'}`}>
                        <p className="text-gray-700">{item.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
