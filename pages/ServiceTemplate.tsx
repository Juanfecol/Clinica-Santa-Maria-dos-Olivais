import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ContactForm } from '../components/ContactForm';
import { serviceDetails } from '../constants/servicesData';

export const ServiceTemplate: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if ((window as any).trackEvent) {
      (window as any).trackEvent('view_service', {
        service: slug
      });
    }
    // Meta Pixel Tracking
    if ((window as any).trackMeta) {
      (window as any).trackMeta('ViewContent', {
        content_name: service?.title || slug,
        content_category: 'Serviço Odontológico'
      }, true);
    }
    // Google Tag Manager Data Layer
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'view_service_page',
        service_category: slug
      });
    }
  }, [slug]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const service = slug ? serviceDetails[slug] : null;

  if (!service) return <div className="p-20 text-center text-red-600 font-bold text-2xl">Serviço não encontrado: {slug}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-clinic-blue mb-10 leading-tight">{service.title}</h1>
      
      {service.note && (
        <div className="bg-clinic-purple text-white p-8 rounded-2xl mb-16 shadow-lg text-center font-bold text-xl md:text-2xl leading-relaxed">
          {service.note}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          {service.videoSrc && (
            <div className="w-full xl:w-[55%] flex justify-center">
              <div className="relative w-full max-w-[280px] aspect-[9/16] rounded-[2.5rem] border-[4px] border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  src={service.videoSrc}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onClick={() => {
                    if ((window as any).trackEvent) {
                      (window as any).trackEvent('click_service_video', { service: slug });
                    }
                  }}
                />
                <button 
                  onClick={toggleMute}
                  aria-label={isMuted ? "Ativar som" : "Desativar som"}
                  className="absolute bottom-4 right-4 z-40 w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-clinic-blue transition-all"
                >
                  <i className={`fas ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'} text-sm`}></i>
                </button>
              </div>
            </div>
          )}
          <div className="w-full xl:w-[45%]">
            <p className="text-xl text-gray-700 mb-6">{service.description}</p>
            {service.doctor && (
              <div className="bg-clinic-bg p-6 rounded-xl border border-clinic-lime mb-8">
                <p className="font-bold text-clinic-blue">Especialista: {service.doctor}</p>
                <p className="text-gray-600">Horário: {service.schedule}</p>
              </div>
            )}
            
            {service.prices && service.prices.length > 0 && (
              <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                <h2 className="text-2xl font-bold text-clinic-blue mb-6">Tabela de Preços</h2>
                <div className="space-y-1">
                  {service.prices.map((p: any, i: number) => (
                    <div key={i} className="flex flex-col gap-1 border-b border-gray-100 py-5 last:border-0 w-full group">
                      <span className="text-base md:text-lg font-semibold text-gray-700 leading-tight break-normal hyphens-none group-hover:text-clinic-purple transition-colors">{p.name}</span>
                      <span className="text-xl md:text-2xl font-bold text-clinic-purple break-normal hyphens-none">{p.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <ContactForm especialidadeInicial={service.title} />
      </div>
    </div>
  );
};
