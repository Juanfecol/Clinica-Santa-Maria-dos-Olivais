import React from 'react';
import { Star, ExternalLink, MessageSquarePlus, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface GoogleReviewsProps {
  className?: string;
}

export const GoogleReviews: React.FC<GoogleReviewsProps> = ({ className = '' }) => {
  const { t } = useLanguage();

  // Direct Google Maps links for Clinica Santa Maria dos Olivais
  const googleReviewsUrl = "https://www.google.com/maps/search/?api=1&query=Clinica+Santa+Maria+dos+Olivais+Lisboa";
  const googleWriteReviewUrl = "https://www.google.com/maps/search/?api=1&query=Clinica+Santa+Maria+dos+Olivais+Estrada+de+Moscavide+32C+Lisboa";

  return (
    <section className={`relative w-full ${className}`} aria-labelledby="google-reviews-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Google Review Widget Card */}
        <div className="bg-gradient-to-br from-white via-white to-slate-50 border border-clinic-blue/15 rounded-[28px] md:rounded-[36px] p-6 sm:p-8 md:p-10 shadow-xl shadow-clinic-blue/5 overflow-hidden relative">
          
          {/* Background Google G watermark */}
          <div className="absolute -right-6 -bottom-10 opacity-5 pointer-events-none select-none text-[200px] font-black text-clinic-blue leading-none">
            G
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            
            {/* Left side: Brand, Badge and Call to rate */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-gray-200 shadow-xs mb-3">
                {/* Official Google SVG Icon */}
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="text-xs sm:text-sm font-bold text-gray-800 tracking-wide uppercase">
                  {t("Avaliações no Google")}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <ShieldCheck size={12} /> {t("100% Verificado")}
                </span>
              </div>

              <h2 id="google-reviews-heading" className="text-2xl sm:text-3xl font-bold text-clinic-blue tracking-tight leading-tight">
                {t("Avalie a sua experiência no Google")}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-xl">
                {t("A sua opinião é fundamental para continuarmos a evoluir. Partilhe a sua experiência e ajude novos pacientes a conhecerem a nossa clínica.")}
              </p>
            </div>

            {/* Right side: Rating summary & Direct Rating Button */}
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/95 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-md">
              
              {/* Score Display */}
              <div className="flex items-center gap-4 text-center sm:text-left pr-0 sm:pr-4 sm:border-r border-gray-200">
                <div className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                  4.4
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                      <div key={starIndex} className="relative">
                        <Star size={18} className="text-gray-200 fill-gray-200" />
                        <div 
                          className="absolute inset-0 overflow-hidden" 
                          style={{ width: starIndex <= 4 ? '100%' : '40%' }}
                        >
                          <Star size={18} className="fill-amber-400 text-amber-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-emerald-700 mt-1 uppercase tracking-wider">
                    {t("Classificação Muito Boa")}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {t("141 avaliações no Google")}
                  </span>
                </div>
              </div>

              {/* Direct Rating Actions */}
              <div className="flex flex-col gap-2.5 w-full sm:w-auto">
                <a
                  href={googleWriteReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-clinic-blue text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-clinic-purple transition-all duration-200 shadow-md hover:shadow-lg group whitespace-nowrap transform hover:-translate-y-0.5"
                  title="Avaliar no Google"
                >
                  <MessageSquarePlus size={16} className="text-clinic-lime group-hover:scale-110 transition-transform" />
                  <span>{t("Avaliar no Google")}</span>
                  <ExternalLink size={14} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href={googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gray-50 text-gray-700 hover:text-clinic-blue border border-gray-200 text-xs sm:text-sm font-medium px-5 py-2 rounded-full hover:bg-white hover:border-gray-300 transition-all duration-200 whitespace-nowrap"
                  title="Ver todas as 141 avaliações no Google"
                >
                  <span>{t("Ver todas as 141 avaliações")}</span>
                  <ExternalLink size={12} />
                </a>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GoogleReviews;
