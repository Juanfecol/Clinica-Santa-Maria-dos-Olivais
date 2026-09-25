import React, { useState, useEffect } from 'react';
import { faq } from '../constants/servicesData';
import { useLanguage } from '../context/LanguageContext';
import { Bot, Sparkles, MessageSquare, Send, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [testQuestion, setTestQuestion] = useState('');

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

  const handleLaunchChat = (prompt?: string) => {
    window.dispatchEvent(new CustomEvent('open-gemini-chat', { detail: { prompt } }));
  };

  const samplePrompts = [
    {
      pt: "Quanto tempo dura o tratamento de Invisalign?",
      es: "¿Cuánto tiempo dura el tratamiento con Invisalign?",
      en: "How long does Invisalign treatment take?"
    },
    {
      pt: "O procedimento de implante dentário dói?",
      es: "¿El procedimiento de implante dental duele?",
      en: "Does getting a dental implant hurt?"
    },
    {
      pt: "Quais as opções de pagamento e acordos?",
      es: "¿Cuáles son las opciones de pago y financiación?",
      en: "What payment and insurance options do you accept?"
    },
    {
      pt: "Como funciona a primeira consulta de avaliação?",
      es: "¿Cómo funciona la primera consulta de valoración?",
      en: "What happens during the initial assessment?"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-clinic-blue mb-4">
          {t("Perguntas Frequentes")}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          {language === 'es'
            ? 'Encuentre respuestas a las dudas más comunes sobre nuestros tratamientos, o pruebe nuestro nuevo asistente con inteligencia artificial.'
            : language === 'en'
            ? 'Find answers to the most common questions about our dental treatments, or test our new AI assistant below.'
            : 'Encontre respostas para as dúvidas mais comuns sobre os nossos tratamentos, ou teste o nosso novo assistente com inteligência artificial.'}
        </p>
      </div>

      {/* Gemini AI Chatbot Testing Hero Banner */}
      <section 
        aria-label="Gemini AI Chatbot Test Panel"
        className="mb-14 bg-gradient-to-br from-clinic-blue via-blue-900 to-clinic-purple rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden border border-white/10"
      >
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-clinic-purple/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-clinic-lime/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-clinic-lime text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {language === 'es' 
                ? '🧪 Módulo de Teste Activo en FAQ • Gemini 3.5'
                : language === 'en'
                ? '🧪 Test Module Active in FAQ • Gemini 3.5'
                : '🧪 Módulo de Teste Ativo no FAQ • Gemini 3.5'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
            {language === 'es'
              ? '¿Tiene dudas no resueltas? Pruebe el Asistente Gemini AI'
              : language === 'en'
              ? 'Have specific questions? Test our Gemini AI Assistant'
              : 'Tem dúvidas específicas? Teste o Assistente Gemini AI'}
          </h2>

          <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed mb-6 font-light">
            {language === 'es'
              ? 'Disponible exclusivamente en esta página de FAQ para pruebas. Puede formular cualquier consulta sobre tratamientos, recuperación, precios aproximados o citas, manteniendo una conversación interactiva con contexto clínico.'
              : language === 'en'
              ? 'Available exclusively on this FAQ page for testing. You can ask any question about dental treatments, recovery, pricing, or bookings with multi-turn conversational context.'
              : 'Disponível exclusivamente nesta página de FAQ para testes. Pode colocar qualquer questão sobre tratamentos, recuperação, opções de pagamento ou marcações com conversação interativa e contexto clínico em tempo real.'}
          </p>

          {/* Quick interactive test input */}
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 flex flex-col sm:flex-row gap-2 mb-5">
            <input
              type="text"
              value={testQuestion}
              onChange={(e) => setTestQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && testQuestion.trim()) {
                  handleLaunchChat(testQuestion);
                  setTestQuestion('');
                }
              }}
              placeholder={
                language === 'es'
                  ? 'Escriba una pregunta clínica para testear...'
                  : language === 'en'
                  ? 'Type a clinical question to test...'
                  : 'Escreva uma pergunta clínica para testar...'
              }
              className="flex-1 bg-white/95 text-slate-800 placeholder-slate-400 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-clinic-lime font-medium"
            />
            <button
              onClick={() => {
                if (testQuestion.trim()) {
                  handleLaunchChat(testQuestion);
                  setTestQuestion('');
                } else {
                  handleLaunchChat();
                }
              }}
              className="bg-clinic-lime hover:bg-[#c4dd68] text-clinic-blue font-bold px-5 py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md cursor-pointer whitespace-nowrap"
            >
              <Bot className="w-4 h-4" />
              <span>
                {language === 'es' ? 'Testear con Gemini' : language === 'en' ? 'Test with Gemini' : 'Testar com Gemini'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Sample quick questions */}
          <div>
            <span className="text-xs text-blue-200 block mb-2 font-medium">
              {language === 'es' ? 'O pulse una pregunta de ejemplo:' : language === 'en' ? 'Or click a sample question:' : 'Ou clique numa pergunta de exemplo:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((p, idx) => {
                const questionText = language === 'es' ? p.es : language === 'en' ? p.en : p.pt;
                return (
                  <button
                    key={idx}
                    onClick={() => handleLaunchChat(questionText)}
                    className="text-xs bg-white/10 hover:bg-white/20 text-white border border-white/15 px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 hover:scale-102 active:scale-95 text-left"
                  >
                    <MessageSquare className="w-3 h-3 text-clinic-lime shrink-0" />
                    <span>{questionText}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      
      {/* Traditional FAQ & Video Grid */}
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
              <h2 className="text-2xl font-bold text-clinic-blue mb-4">{t(category.category)}</h2>
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
                        {t(item.question)}
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <div className={`px-6 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[300px] pb-6' : 'max-h-0'}`}>
                        <p className="text-gray-700 leading-relaxed">{t(item.answer)}</p>
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
