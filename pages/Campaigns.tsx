
import React from 'react';
import { useContent } from '../context/ContentContext';

const Campaigns: React.FC = () => {
  const { content } = useContent();
  const campaigns = content.campaigns || [];
  const global = content.global || {};

  return (
    <div className="animate-fade-in-up max-w-[1400px] mx-auto px-4 py-12 flex flex-col items-center">
      
      <div className="text-center mb-16 flex flex-col items-center">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-clinic-blue mb-8 flex flex-wrap justify-center items-center gap-4">
          <span>Transforme o seu</span>
          <div className="w-[80px] h-[50px] md:w-[120px] md:h-[80px] rounded-xl overflow-hidden border-4 border-white shadow-xl bg-white/10 flex items-center justify-center">
              <img src="https://clinica-santa-maria-dos-olivais.b-cdn.net/Capture-removebg-preview.png" className="w-[80%] h-[80%] object-contain animate-float" />
          </div>
          <span className="font-serif italic text-clinic-purple">sorriso</span>
          <span>hoje!</span>
        </h2>
        
        <a 
          href={global.socials?.whatsapp || "#"}
          target="_blank" rel="noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-[#c2a9eb] text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg hover:bg-clinic-blue hover:-translate-y-1 transition-all transform text-center w-full max-w-[300px] sm:w-auto sm:max-w-none sm:px-10 sm:py-4 sm:text-xl active:scale-95"
        >
          Mais informações aqui <span className="animate-pulse ml-1 inline-block">♥</span>
        </a>
      </div>

      <div className="bg-white/40 p-6 sm:p-10 rounded-3xl border border-white/50 text-center max-w-2xl mb-16">
        <h3 className="text-xl sm:text-2xl font-bold text-clinic-blue mb-4">Fique atento!</h3>
        <p className="text-base sm:text-lg text-gray-700">Novas campanhas e promoções especiales serão anunciadas aqui.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {campaigns.map((camp: any, index: number) => (
           <div key={index} className="group overflow-hidden rounded-xl shadow-lg border border-white/30 bg-white">
            <img src={camp.src} className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105" alt={camp.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
