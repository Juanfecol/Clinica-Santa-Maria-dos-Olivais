import React, { useEffect } from 'react';
import { EvaluationInfo } from '../src/components/EvaluationInfo';
import { useLanguage } from '../context/LanguageContext';
import { useGoogleAds } from '../hooks/useGoogleAds';
import { openLeadConnectorChat } from '../src/utils/chatWidget';
import { MessageSquare, Calendar, Phone, Sparkles, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

const Appointments: React.FC = () => {
  const { t } = useLanguage();
  const { trackForm } = useGoogleAds();

  // Try to gently pop open the LeadConnector chat widget shortly after the user lands on the appointment page
  useEffect(() => {
    const timer = setTimeout(() => {
      openLeadConnectorChat();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleStartBooking = () => {
    trackForm();
    if ((window as any).trackMeta) {
      (window as any).trackMeta('Schedule', {
        content_name: 'LeadConnector AI Chat Booking',
        content_category: 'Booking'
      }, true);
    }
    openLeadConnectorChat();
  };

  return (
    <div className="animate-fade-in-up max-w-[1300px] mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Left Side: Medical Trust Banner with Dra. Ana Mata */}
        <div className="hidden lg:block sticky top-[130px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
          <img 
            className="w-full h-auto min-h-[600px] object-cover transition-transform duration-1000 group-hover:scale-110" 
            src="https://clinica-santa-maria-dos-olivais.b-cdn.net/doctora_ana_mata_agendamiento_online.jpg" 
            alt="Dra. Ana Mata - Marcações Online" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-clinic-blue/90 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
            <span className="text-clinic-lime font-bold text-xs uppercase tracking-widest mb-1">{t("Direção Clínica")}</span>
            <h3 className="text-2xl font-serif font-bold">Dra. Ana Mata</h3>
            <p className="text-sm text-white/80 mt-1">{t("Mais de 10 anos de excelência em Implantologia e Reabilitação Oral.")}</p>
          </div>
        </div>

        {/* Right Side: Interactive AI Booking Interface */}
        <div className="bg-white/85 backdrop-blur-2xl p-6 sm:p-10 rounded-[2rem] sm:rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white/60 relative overflow-hidden min-h-[680px] ring-1 ring-black/5 flex flex-col justify-between">
          <div>
            <div className="mb-8 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-tr from-clinic-lime/40 to-clinic-purple/40 rounded-full blur-xs opacity-75"></div>
                  <img 
                    src="https://clinica-santa-maria-dos-olivais.b-cdn.net/Icono-Nocturno.png" 
                    alt="SMO Logo" 
                    className="relative w-8 h-8 object-contain drop-shadow" 
                  />
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-clinic-purple/10 text-clinic-purple rounded-full text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-clinic-purple" />
                  {t("Marcações Online em Tempo Real")}
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-clinic-blue mb-3 leading-tight">
                {t("Agende a sua")} <span className="text-clinic-purple italic font-serif">{t("Consulta")}</span>
              </h1>
              <p className="text-base text-gray-600 font-light max-w-md">
                {t("Converse diretamente com o nosso assistente no chat para tirar dúvidas sobre valores e escolher o melhor dia e horário para si.")}
              </p>
            </div>

            {/* Official 20€ Evaluation Info Box */}
            <EvaluationInfo />

            {/* AI Booking Feature Highlights */}
            <div className="my-8 bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200/60 shadow-sm space-y-3.5">
              <div className="flex items-center gap-3 text-sm text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-clinic-lime shrink-0" />
                <span><strong>{t("Avaliação Clínica por 20€")}</strong>: {t("inclui diagnóstico inicial e plano com a Dra. Ana Mata.")}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-800">
                <Clock className="w-5 h-5 text-clinic-blue shrink-0" />
                <span><strong>{t("Horários Atualizados")}</strong>: {t("o assistente verifica em tempo real os dias disponíveis na clínica.")}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-800">
                <ShieldCheck className="w-5 h-5 text-clinic-purple shrink-0" />
                <span><strong>{t("Registo Imediato")}</strong>: {t("confirmação da sua vaga registada diretamente no sistema médico da clínica.")}</span>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-center">
            <button
              id="btn-open-booking-chat"
              onClick={handleStartBooking}
              className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-clinic-blue to-clinic-purple hover:from-clinic-blue/95 hover:to-clinic-purple/95 text-white font-bold text-base shadow-lg shadow-clinic-purple/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 text-clinic-lime" />
              <span>{t("Abrir Chat de Agendamento")}</span>
            </button>

            <a
              href="tel:300601645"
              className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-white hover:bg-slate-50 text-clinic-blue font-bold text-sm border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-clinic-purple" />
              <span>300 601 645</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
