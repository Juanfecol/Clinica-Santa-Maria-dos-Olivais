
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
          url: 'https://calendly.com/clinicasmod/30min?primary_color=d4e157',
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

        <div className="bg-white/70 backdrop-blur-2xl p-4 sm:p-6 rounded-[3rem] shadow-2xl border border-white relative overflow-hidden min-h-[750px]">
          <div className="mb-6 text-center lg:text-left px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-clinic-blue mb-4 leading-tight">Agende a sua <span className="text-clinic-purple italic font-serif">Consulta</span></h1>
            <p className="text-base sm:text-lg text-gray-600 font-light">Escolha o mejor horário para si diretamente no nosso calendário oficial.</p>
          </div>

          <div 
            id="calendly-inline-container" 
            className="calendly-inline-widget" 
            style={{ minWidth: '320px', height: '700px' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
