
import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGoogleAds } from '../hooks/useGoogleAds';
import { services } from '../constants/servicesData';

const Appointments: React.FC = () => {
  const { content } = useContent();
  const { trackForm } = useGoogleAds();
  const appointmentsData = content.appointments || { heroImage: "" };
  
  const location = useLocation();
  const navigate = useNavigate();
  const incomingService = location.state?.service;
  const initialService = incomingService || "";

  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // Initialize Calendly inline widget
    const initCalendly = () => {
      if ((window as any).Calendly) {
        (window as any).Calendly.initInlineWidget({
          url: 'https://calendly.com/clinicasmod/30min?primary_color=d4e157&text_color=2d3277&hide_landing_page_details=1&hide_gdpr_banner=1',
          parentElement: document.getElementById('calendly-inline-container'),
          prefill: {},
          utm: {}
        });
      } else {
        setTimeout(initCalendly, 500);
      }
    };
    initCalendly();
  }, []);

  return (
    <div className="animate-fade-in-up max-w-[1300px] mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className="hidden lg:block sticky top-[130px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
           <img className="w-full h-auto min-h-[600px] object-cover transition-transform duration-1000 group-hover:scale-110" src={appointmentsData.heroImage || "https://clinica-santa-maria-dos-olivais.b-cdn.net/Carrusel%201-06%20(1).png"} alt="Agendamento" />
           <div className="absolute inset-0 bg-gradient-to-t from-clinic-blue/60 to-transparent"></div>
           <div className="absolute bottom-12 left-10 text-white max-w-sm"><h3 className="text-3xl font-serif italic leading-tight">Cuidamos de si com a proximidade de quem está ao seu lado.</h3></div>
        </div>

        <div className="bg-white/80 backdrop-blur-2xl p-6 sm:p-10 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 relative overflow-hidden min-h-[750px] ring-1 ring-black/5">
          <div className="mb-10 text-center lg:text-left px-4">
            <div className="inline-block px-4 py-1 bg-clinic-purple/10 text-clinic-purple rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">Marcações Online</div>
            <h1 className="text-4xl md:text-5xl font-bold text-clinic-blue mb-4 leading-tight">Agende a sua <span className="text-clinic-purple italic font-serif">Consulta</span></h1>
            <p className="text-base sm:text-lg text-gray-600 font-light max-w-md">Escolha o melhor horário para si diretamente no nosso calendário oficial de forma simples e rápida.</p>
          </div>

          <div 
            id="calendly-inline-container" 
            className="calendly-inline-widget rounded-[2rem] overflow-hidden" 
            style={{ minWidth: '320px', height: '650px' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
