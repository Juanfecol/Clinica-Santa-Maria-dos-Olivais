import React, { useEffect } from 'react';
import { EvaluationInfo } from '../src/components/EvaluationInfo';
import { CallMeForm } from '../src/components/CallMeForm';
import { Check, Phone } from 'lucide-react';

const Landing: React.FC = () => {
  useEffect(() => {
    document.title = "Implantes Dentários em Lisboa | Protocolo Fixo 4.800€ | Clínica Santa Maria dos Olivais";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Implantes dentários em Lisboa com a Clínica Santa Maria dos Olivais. Protocolo Fixo (Toda a arcada) por 4.800€. Soluções fixas, seguras e duradouras. Agende a sua consulta hoje!');
    }

    // Initialize Calendly inline widget
    const initCalendly = () => {
      if ((window as any).Calendly) {
        (window as any).Calendly.initInlineWidget({
          url: 'https://calendly.com/clinicasmod/30min?primary_color=d4e157&text_color=2d3277&hide_landing_page_details=1&hide_gdpr_banner=1',
          parentElement: document.getElementById('calendly-landing-container'),
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-clinic-blue text-white py-3 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="text-center sm:text-left">
            <span className="block text-xs uppercase tracking-widest text-clinic-lime">Clínica Dentária</span>
            <span className="font-bold text-lg font-serif">Santa Maria dos Olivais</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="tel:211350066" className="flex items-center gap-2 hover:text-clinic-lime transition">
              <Phone size={16} /> 211 350 066
            </a>
            <a href="https://wa.me/351919861310" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-clinic-lime transition">
              <Phone size={16} /> WhatsApp: +351 919 861 310
            </a>
          </div>
        </div>
      </div>
      <section className="bg-white py-12 md:py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="md:w-2/3 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Recupere o seu Sorriso com Implantes Dentários em Lisboa
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Soluções fixas, seguras e duradouras. A Clínica Santa Maria dos Olivais oferece tecnologia de ponta para devolver a sua qualidade de vida.
            </p>
            <a href="#agendamento" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/30">
              Agendar Consulta de Implantes
            </a>
            <CallMeForm />
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <video
              src="https://clinica-santa-maria-dos-olivais.b-cdn.net/implantes_smo_video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full max-w-[280px] md:max-w-xs rounded-2xl shadow-xl border border-gray-100"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12 text-center">Preços e Soluções</h2>
          
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-2 text-center md:text-left">Implantes Dentários</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Implante Unitário", price: "745€" },
                { name: "2 Implantes", price: "1.400€" },
                { name: "3 Implantes", price: "1.800€" },
                { name: "4 Implantes", price: "2.300€" },
              ].map((item) => (
                <div key={item.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition hover:shadow-xl hover:border-blue-300 transform hover:-translate-y-1">
                  <p className="font-semibold text-gray-600 text-sm">{item.name}</p>
                  <p className="text-3xl font-extrabold text-blue-600 mt-2">{item.price}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Protocolo Superior (Arcada Completa)</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <p className="text-gray-700 text-sm mb-1">Protocolo Superior</p>
                  <p className="text-2xl font-extrabold text-blue-700">4.800€</p>
                  <p className="text-gray-500 text-xs mt-2">4 a 6 implantes + prótese fixa</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <p className="text-gray-700 text-sm mb-1">Provisória Removível</p>
                  <p className="text-2xl font-extrabold text-gray-900">+350€</p>
                  <p className="text-gray-500 text-xs mt-2">Opcional</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <p className="text-gray-700 text-sm mb-1">Provisória Fixa</p>
                  <p className="text-2xl font-extrabold text-gray-900">+1.200€</p>
                  <p className="text-gray-500 text-xs mt-2">Opcional</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-2 text-center md:text-left">Facetas Dentárias</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Facetas – 1 Arcada (10 dentes)", price: "4.550€" },
                { name: "Facetas – 2 Arcadas (20 dentes)", price: "6.500€" },
                { name: "Facetas – 4 Dentes Anteriores", price: "1.800€" },
              ].map((item) => (
                <div key={item.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition hover:shadow-xl hover:border-blue-300 transform hover:-translate-y-1">
                  <p className="font-semibold text-gray-600 text-sm">{item.name}</p>
                  <p className="text-3xl font-extrabold text-blue-600 mt-2">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-12 text-center bg-white p-4 rounded-lg inline-block w-full border border-gray-100">
            <strong>Nota:</strong> No caso de implantes, o pagamento é efetuado integralmente no dia da cirurgia.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Porquê escolher os nossos implantes?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Tecnologia de Titânio de alta qualidade",
              "Procedimento rápido e seguro",
              "Equipa especializada em reabilitação",
              "Recuperação funcional e estética total",
              "Soluções avançadas: unitários ou arcada completa",
              "Acompanhamento personalizado pós-cirúrgico"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm">
                <Check className="text-green-500" />
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="agendamento" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">Agende a sua Consulta</h2>
          <EvaluationInfo />
          <div 
            id="calendly-landing-container" 
            className="calendly-inline-widget rounded-[2rem] overflow-hidden w-full shadow-lg border border-gray-100" 
            style={{ width: '100%', minWidth: '100%', height: '650px' }}
          ></div>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Pronto para transformar o seu sorriso?</h2>
              <p className="text-lg text-gray-600 mb-8">Entre em contacto connosco e tire todas as suas dúvidas sobre o tratamento com implantes.</p>
              <a href="/contactos" className="border-2 border-clinic-blue text-clinic-blue px-8 py-4 rounded-full text-lg font-bold hover:bg-clinic-blue hover:text-white transition">
                  Contactar Clínica
              </a>
          </div>
      </section>
    </div>
  );
};

export default Landing;
