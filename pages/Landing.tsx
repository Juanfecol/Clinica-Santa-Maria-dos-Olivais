import React, { useEffect } from 'react';
import { EvaluationInfo } from '../src/components/EvaluationInfo';
import { CallMeForm } from '../src/components/CallMeForm';
import { ClinicalCases } from '../src/components/ClinicalCases';
import { Check, Phone, ShieldCheck, Award, Sparkles, MessageCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 antialiased">
      {/* High-Trust Top Header */}
      <div className="bg-clinic-blue text-white py-3 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-3">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm">
            <a href="tel:211350066" className="flex items-center gap-2 hover:text-clinic-lime transition duration-200 font-medium">
              <Phone size={14} className="text-clinic-lime" /> 211 350 066
            </a>
            <a href="https://wa.me/351919861310" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-clinic-lime transition duration-200 font-bold bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
              <MessageCircle size={14} className="text-green-400 fill-green-400" /> WhatsApp: +351 919 861 310
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section - The Catch (First Fold) */}
      <section className="bg-white py-12 md:py-20 px-4 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="md:w-3/5 text-center md:text-left">
            {/* Live Indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-green-50 text-green-800 rounded-full text-xs font-semibold mb-6 border border-green-100 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              Vagas de Avaliação Disponíveis Esta Semana
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight font-serif tracking-tight">
              Recupere o seu Sorriso com <span className="text-clinic-blue">Implantes Dentários</span> de Alta Durabilidade em Lisboa
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 mb-8 max-w-xl">
              Soluções fixas, seguras e personalizadas. Devolva a estética e a função mastigatória ao seu sorriso com tecnologia de ponta na Clínica Santa Maria dos Olivais.
            </p>

            {/* Direct High-Contrast Action Block */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-6">
              <a 
                href="#agendamento" 
                className="w-full sm:w-auto text-center bg-clinic-blue text-white px-8 py-4 rounded-full text-md font-bold hover:bg-blue-900 transition duration-300 shadow-lg shadow-blue-950/10 transform hover:-translate-y-0.5"
              >
                Agendar Avaliação Online
              </a>
              <a 
                href="https://wa.me/351919861310" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto text-center flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full text-md font-bold hover:bg-green-600 transition duration-300 shadow-lg shadow-green-500/10 transform hover:-translate-y-0.5"
              >
                <MessageCircle size={18} className="fill-white" /> Falar via WhatsApp
              </a>
            </div>

            {/* Micro Trust badges */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1">⭐ 4.9/5 estrelas no Google</span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1">🔒 Tratamentos Seguros de Alta Durabilidade</span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1">📍 Lisboa - Olivais</span>
            </div>
          </div>

          <div className="w-full md:w-2/5 flex flex-col items-center justify-center">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-clinic-lime to-clinic-blue rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <video
                src="https://clinica-santa-maria-dos-olivais.b-cdn.net/implantes_smo_video.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="relative w-full max-w-[200px] md:max-w-[240px] rounded-[2rem] shadow-xl border-4 border-white bg-black aspect-[9/16] object-cover"
              />
            </div>
            <p className="text-xs text-gray-400 mt-3 italic font-medium">Veja o nosso espaço e tecnologia no vídeo acima ☝️</p>
          </div>
        </div>
      </section>

      {/* Social Proof First: Real Patients Stories / Videos */}
      <ClinicalCases />

      {/* Core Value Proposition & Benefits */}
      <section className="py-16 px-4 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-clinic-blue font-bold bg-blue-50 px-3 py-1 rounded-full">Diferenciais</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-3">Porquê escolher os nossos implantes?</h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">Garantimos a máxima segurança e durabilidade no seu tratamento.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 text-clinic-blue rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Reabilitação Oral Avançada</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Recupere o seu sorriso fixo e a função mastigatória através de implantes unitários ou de protocolos completos de forma totalmente personalizada.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-lime-100 text-clinic-blue rounded-xl flex items-center justify-center mb-4">
                <Award size={24} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Direção de Referência</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tratamentos realizados sob a direção clínica da Dra. Ana Mata, aliando mais de uma década de experiência, rigor técnico e inovação.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center mb-4">
                <Sparkles size={24} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Acompanhamento Presencial</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                A nossa diferença: todo o seu tratamento é realizado em Portugal, com acompanhamento permanente presencial, sem necessidade de viagens de risco.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions & Transparent Pricing */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-clinic-blue font-bold bg-blue-50 px-3 py-1 rounded-full">Tabela de Valores</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">Preços e Soluções Transparentes</h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">Sem letras miúdas. Valores de referência claros para planear o seu sorriso.</p>
          </div>
          
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-clinic-blue pl-3 text-left">Implantes Dentários</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Implante Unitário", price: "745€", detail: "Componentes e cirurgia incluídos" },
                { name: "Reabilitação 2 Implantes", price: "1.400€", detail: "Ideal para pontes parciais" },
                { name: "Reabilitação 3 Implantes", price: "1.800€", detail: "Alta estabilidade mecânica" },
                { name: "Reabilitação 4 Implantes", price: "2.300€", detail: "Suporte seguro multiponto" },
              ].map((item) => (
                <div key={item.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-150/80 transition-all hover:shadow-md transform hover:-translate-y-0.5">
                  <p className="font-semibold text-gray-700 text-sm">{item.name}</p>
                  <p className="text-3xl font-extrabold text-clinic-blue mt-2">{item.price}</p>
                  <p className="text-xs text-gray-400 mt-2">{item.detail}</p>
                </div>
              ))}
            </div>
            
            {/* Highlighted Full Arch Protocol */}
            <div className="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-150 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-clinic-lime text-clinic-blue font-bold text-[10px] uppercase tracking-wider px-4 py-1 rounded-bl-xl">
                Mais Solicitado
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-6">Protocolo Superior (Arcada Completa com Dentes Fixos)</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100/80">
                  <p className="text-gray-700 text-xs font-semibold uppercase tracking-wider mb-1 text-clinic-blue">Tratamento Base</p>
                  <p className="text-2xl font-extrabold text-clinic-blue">4.800€</p>
                  <p className="text-gray-500 text-xs mt-2">Inclui 4 a 6 implantes + prótese fixa definitiva</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Prótese Provisória Removível</p>
                  <p className="text-2xl font-extrabold text-gray-900">+350€</p>
                  <p className="text-gray-500 text-xs mt-2">Opcional para uso durante a cicatrização</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Prótese Provisória Fixa</p>
                  <p className="text-2xl font-extrabold text-gray-900">+1.200€</p>
                  <p className="text-gray-500 text-xs mt-2">Opcional, fixa imediata no dia da cirurgia</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-clinic-blue pl-3 text-left">Facetas Dentárias</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Facetas – 1 Arcada (10 dentes)", price: "4.550€", detail: "Transformação estética total de uma arcada" },
                { name: "Facetas – 2 Arcadas (20 dentes)", price: "6.500€", detail: "Renovação completa superior e inferior" },
                { name: "Facetas – 4 Dentes Anteriores", price: "1.800€", detail: "Correção estética do setor frontal" },
              ].map((item) => (
                <div key={item.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-150/80 transition-all hover:shadow-md transform hover:-translate-y-0.5">
                  <p className="font-semibold text-gray-700 text-sm">{item.name}</p>
                  <p className="text-3xl font-extrabold text-clinic-blue mt-2">{item.price}</p>
                  <p className="text-xs text-gray-400 mt-2">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-500 text-center md:text-left leading-relaxed">
              <strong>Nota Clínica:</strong> No caso de implantes, o pagamento é efetuado integralmente no dia da cirurgia. Oferecemos opções e facilidades para o ajudar a planear.
            </span>
          </div>
        </div>
      </section>

      {/* Call Me Form (Hesitation Capture Section) */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-clinic-blue to-blue-950 text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-clinic-lime rounded-full blur-3xl opacity-10"></div>
            <div className="relative z-10 grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3 text-center md:text-left">
                <span className="text-clinic-lime font-bold text-xs uppercase tracking-widest block mb-2">Esclareça as suas Dúvidas</span>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight font-serif">Ainda com dúvidas sobre o tratamento?</h3>
                <p className="text-blue-100 text-sm mt-3 leading-relaxed">
                  Deixe-nos o seu contacto telefónico. Um dos nossos especialistas de apoio ligará para si gratuitamente para esclarecer prazos, facilidades e passos sem qualquer compromisso.
                </p>
              </div>
              <div className="md:col-span-2">
                <CallMeForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Conversion Stage: Interactive Booking */}
      <section id="agendamento" className="py-16 px-4 bg-gray-50 scroll-mt-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-clinic-blue font-bold bg-blue-50 px-3 py-1 rounded-full">Marcação Rápida</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">Agende a sua Consulta</h2>
            <p className="text-gray-500 mt-2 text-sm max-w-lg mx-auto">
              Escolha abaixo a data e hora perfeitas para si de forma imediata ou use o botão de WhatsApp se preferir falar connosco.
            </p>
          </div>

          <EvaluationInfo />

          <div className="bg-white p-2 rounded-[2.2rem] shadow-lg border border-gray-150 overflow-hidden mb-8">
            <div 
              id="calendly-landing-container" 
              className="calendly-inline-widget w-full rounded-[2rem] overflow-hidden" 
              style={{ width: '100%', minWidth: '100%', height: '620px' }}
            ></div>
          </div>

          {/* Strong Secondary Conversion Button for Mobile / WhatsApp preferers */}
          <div className="text-center bg-green-50 rounded-2xl p-6 border border-green-100 max-w-2xl mx-auto">
            <p className="text-sm text-green-800 font-semibold mb-3">Prefere marcar diretamente no chat?</p>
            <a 
              href="https://wa.me/351919861310" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3.5 px-8 rounded-full hover:bg-green-600 transition duration-200 shadow-md shadow-green-500/15 text-sm"
            >
              <MessageCircle size={18} className="fill-white" /> Marcar via WhatsApp em 1 minuto
            </a>
            <p className="text-[11px] text-gray-400 mt-2">Resposta imediata durante o horário comercial.</p>
          </div>
        </div>
      </section>
      
      {/* Footer / FAQ and Last Call */}
      <section className="py-16 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Pronto para transformar o seu sorriso?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto text-sm md:text-base">
            O primeiro passo para a sua saúde e qualidade de vida começa hoje. Visite a nossa clínica ou contacte-nos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/contactos" 
              className="w-full sm:w-auto inline-block border-2 border-clinic-blue text-clinic-blue hover:bg-clinic-blue hover:text-white px-8 py-3.5 rounded-full font-bold transition duration-200 text-sm"
            >
              Contactar Clínica (Direção e Telefones)
            </a>
            <a 
              href="#agendamento" 
              className="w-full sm:w-auto inline-block bg-clinic-blue text-white hover:bg-blue-950 px-8 py-3.5 rounded-full font-bold transition duration-200 text-sm"
            >
              Ir para o Calendário
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
