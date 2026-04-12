import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ContactForm } from '../components/ContactForm';
import { serviceDetails } from '../constants/servicesData';

export const ServiceTemplate: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  useEffect(() => {
    if ((window as any).trackEvent) {
      (window as any).trackEvent('view_service', {
        service: slug
      });
    }
    // Google Tag Manager Data Layer
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'view_service_page',
        service_category: slug
      });
    }
  }, [slug]);

  const service = slug ? serviceDetails[slug] : null;

  if (!service) return <div className="p-20 text-center text-red-600 font-bold text-2xl">Serviço não encontrado: {slug}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-clinic-blue mb-8">{service.title}</h1>
      
      {service.note && (
        <div className="bg-clinic-purple text-white p-6 rounded-xl mb-12 shadow-lg text-center font-bold text-lg">
          {service.note}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {service.videoSrc && (
            <div className="w-full md:w-[60%] flex justify-center">
              <div className="relative w-full max-w-[300px] aspect-[9/16] rounded-[2.5rem] border-[4px] border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden bg-black">
                <video
                  src={service.videoSrc}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onClick={() => {
                    if ((window as any).trackEvent) {
                      (window as any).trackEvent('click_service_video', { service: slug });
                    }
                  }}
                />
              </div>
            </div>
          )}
          <div className="w-full md:w-[40%]">
            <p className="text-xl text-gray-700 mb-6">{service.description}</p>
            {service.doctor && (
              <div className="bg-clinic-bg p-6 rounded-xl border border-clinic-lime mb-8">
                <p className="font-bold text-clinic-blue">Especialista: {service.doctor}</p>
                <p className="text-gray-600">Horário: {service.schedule}</p>
              </div>
            )}
            
            {service.prices && service.prices.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
                <h2 className="text-2xl font-bold text-clinic-blue mb-4">Tabela de Preços</h2>
                {service.prices.map((p: any, i: number) => (
                  <div key={i} className="flex justify-between py-2 border-b border-gray-100">
                    <span>{p.name}</span>
                    <span className="font-bold text-clinic-purple">{p.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <ContactForm especialidadeInicial={service.title} />
      </div>
    </div>
  );
};
