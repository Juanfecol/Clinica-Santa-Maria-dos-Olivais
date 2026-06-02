
import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

const Campaigns: React.FC = () => {
  const { content } = useContent();
  const { t } = useLanguage();
  const campaigns = content.campaigns || [];
  const global = content.global || {};

  React.useEffect(() => {
    if ((window as any).trackMeta) {
      (window as any).trackMeta('ViewContent', {
        content_name: 'Campanhas e Promoções',
        content_category: 'Campaigns'
      }, true);
    }
  }, []);

  return (
    <div className="animate-fade-in-up max-w-[1400px] mx-auto px-4 py-12 flex flex-col items-center">
      
      <div className="text-center mb-16 flex flex-col items-center">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-clinic-blue mb-8 flex flex-wrap justify-center items-center gap-4">
          <span>{t("Transforme o seu")}</span>
          <div className="w-[80px] h-[50px] md:w-[120px] md:h-[80px] rounded-xl overflow-hidden border-4 border-white shadow-xl bg-white/10 flex items-center justify-center">
              <img src="https://clinica-santa-maria-dos-olivais.b-cdn.net/Icono-Nocturno.png" className="w-[80%] h-[80%] object-contain animate-float" />
          </div>
          <span className="font-serif italic text-clinic-purple">{t("sorriso")}</span>
          <span>{t("hoje!")}</span>
        </h2>
        
        <a 
          href={global.socials?.whatsapp || "#"}
          target="_blank" rel="noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-[#c2a9eb] text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg hover:bg-clinic-blue hover:-translate-y-1 transition-all transform text-center w-full max-w-[300px] sm:w-auto sm:max-w-none sm:px-10 sm:py-4 sm:text-xl active:scale-95"
        >
          {t("Mais informações aqui")} <span className="animate-pulse ml-1 inline-block">♥</span>
        </a>
      </div>

      <div className="bg-white/40 p-6 sm:p-10 rounded-3xl border border-white/50 text-center max-w-2xl mb-16">
        <h3 className="text-xl sm:text-2xl font-bold text-clinic-blue mb-4">{t("Fique atento!")}</h3>
        <p className="text-base sm:text-lg text-gray-700">{t("Novas campanhas e promoções especiais serão anunciadas aqui.")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
        {campaigns.map((camp: any, index: number) => (
           <Link 
            key={index} 
            to="/marcacoes" 
            state={{ service: camp.targetService }}
            className="group overflow-hidden rounded-[2rem] shadow-2xl border border-white/50 bg-white aspect-[4/5] relative block"
           >
            <img 
              src={camp.src} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt={t(camp.title)} 
              loading="lazy"
            />
            {/* Overlay sutil al hacer hover */}
            <div className="absolute inset-0 bg-clinic-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
               <span className="bg-white text-clinic-blue font-bold px-6 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                 {t("Agendar consulta")}
               </span>
            </div>
            {/* Gradiente inferior permanente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
