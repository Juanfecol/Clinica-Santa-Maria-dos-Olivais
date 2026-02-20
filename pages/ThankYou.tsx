import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

// CONTROL POINT: LEAD SUBMISSION AND THANK YOU PAGE
const ThankYou: React.FC = () => {
  const { state } = useLocation();
  const { content } = useContent();
  const global = content.global || {};
  
  // FIX: Datos de respaldo por si se accede directamente (para evitar pantalla en blanco)
  const displayData = state || {
    nome: "Estimado Paciente",
    email: "contacto@exemplo.com",
    telemovel: "---",
    servico: "Consulta Geral"
  };

  // Construct WhatsApp Message Dynamically from Content Context
  const rawPhone = global.mobile ? global.mobile.replace(/\D/g, '') : "351919861310";
  
  const waMessage = `Olá, o meu nome é ${displayData.nome}. Acabei de preencher o formulário no site sobre ${displayData.servico || 'uma consulta'} e gostaria de ser contactado.`;
  const finalWaLink = `https://wa.me/${rawPhone}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 animate-fade-in-up">
      <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[40px] shadow-2xl border border-white max-w-2xl w-full text-center relative overflow-hidden">
        
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-clinic-lime to-clinic-blue"></div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-clinic-lime/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-clinic-blue/10 rounded-full blur-3xl"></div>

        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner animate-pulse-slow">
          <i className="fas fa-check text-green-500 text-5xl"></i>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-clinic-blue mb-4">Obrigado pelo seu contacto!</h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Agradecemos a sua mensagem. A nossa equipa entrará em contacto consigo brevemente para esclarecer todas as suas dúvidas e agendar a sua consulta.
        </p>

        {/* Data Summary Card */}
        <div className="bg-white/60 rounded-2xl p-6 mb-8 text-left border border-gray-100 shadow-sm mx-auto max-w-md">
          <h3 className="text-sm uppercase tracking-wide text-gray-400 font-bold mb-4 border-b pb-2">Resumo do Pedido</h3>
          <div className="space-y-3">
             <div className="flex justify-between">
               <span className="text-gray-500">Nome:</span>
               <span className="font-medium text-clinic-blue truncate ml-4">{displayData.nome}</span>
             </div>
             <div className="flex justify-between">
               <span className="text-gray-500">Email:</span>
               <span className="font-medium text-clinic-blue truncate ml-4">{displayData.email}</span>
             </div>
             <div className="flex justify-between">
               <span className="text-gray-500">Telemóvel:</span>
               <span className="font-medium text-clinic-blue">{displayData.telemovel}</span>
             </div>
             {displayData.servico && (
               <div className="flex justify-between">
                 <span className="text-gray-500">Interesse:</span>
                 <span className="font-medium text-clinic-purple">{displayData.servico}</span>
               </div>
             )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <a 
            href={finalWaLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#20bd5a] hover:-translate-y-1 transition-all transform"
          >
            <i className="fab fa-whatsapp text-2xl"></i>
            Falar Agora no WhatsApp
          </a>
          
          <div className="pt-4 border-t border-gray-100 mt-2">
             <p className="text-gray-600 mb-4 font-medium italic">"Aproveite para conhecer todos os nossos serviços"</p>
             <Link 
              to="/" 
              className="inline-block px-8 py-3 rounded-full bg-clinic-blue text-white hover:bg-clinic-lime hover:text-clinic-blue transition-all font-semibold shadow-md"
            >
              Voltar à Página Inicial
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ThankYou;