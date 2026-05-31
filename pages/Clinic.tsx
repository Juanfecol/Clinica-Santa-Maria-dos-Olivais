
import React from 'react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

const getSrcSet = (src: string) => {
  if (!src) return undefined;
  if (!src.includes('b-cdn.net') && !src.startsWith('http')) return undefined;
  const separator = src.includes('?') ? '&' : '?';
  const widths = [320, 640, 960, 1200, 1600];
  return widths.map(w => `${src}${separator}width=${w} ${w}w`).join(', ');
};

const Clinic: React.FC = () => {
  const { content } = useContent();
  const { t } = useLanguage();
  const gallery = content.clinic?.gallery || [];

  return (
    <div className="animate-fade-in-up">
      {/* Intro */}
      <section className="text-center px-4 py-12 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-clinic-blue border-2 border-clinic-lime inline-block px-8 py-3 rounded-full mb-8">{t("Sobre a Nossa Clínica")}</h1>
        <p className="text-lg text-gray-700 leading-relaxed font-medium">
          {t("A Clínica Santa Maria dos Olivais é um espaço dedicado à excelência em cuidados dentários, onde a saúde e a estética do seu sorriso são a nossa prioridade. Equipada com tecnologia de ponta e um ambiente acolhedor, a nossa clínica oferece uma ampla gama de tratamentos, desde medicina dentária geral até procedimentos de reabilitação especializados.")}
        </p>
      </section>

      {/* Gallery */}
      <section className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((src: string, index: number) => (
            <div key={index} className="h-64 rounded-xl overflow-hidden shadow-lg border border-white/20 hover:-translate-y-2 transition-transform duration-300">
              <img 
                src={src} 
                srcSet={getSrcSet(src)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={`${t("Caso clínico real")} ${index + 1}`} 
                className="w-full h-full object-cover" 
                loading="lazy" 
                decoding="async" 
              />
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-[1400px] mx-auto px-4 py-20 flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-serif italic text-clinic-blue border-2 border-clinic-lime inline-block px-6 py-2 rounded-full mb-6">{t("Os Nossos Valores e Compromisso")}</h2>
          <p className="text-gray-700 mb-8 font-medium">
            {t("Na Clínica Santa Maria dos Olivais, acreditamos que a saúde oral é essencial para o bem-estar geral. O nosso compromisso é oferecer tratamentos de elevada qualidade num ambiente acolhedor, seguro e altamente profissional.")}
          </p>
          <div className="grid gap-6">
            <div className="bg-white/40 p-6 rounded-xl border border-white/50 shadow-sm">
              <h3 className="text-xl font-bold text-clinic-blue mb-2">{t("Excelência Clínica")}</h3>
              <p className="text-gray-800 font-medium">{t("Utilizamos tecnologia de vanguarda e técnicas avançadas de medicina dentária para garantir resultados de excelência e duradouros.")}</p>
            </div>
            <div className="bg-white/40 p-6 rounded-xl border border-white/50 shadow-sm">
              <h3 className="text-xl font-bold text-clinic-blue mb-2">{t("Cuidado Personalizado")}</h3>
              <p className="text-gray-800 font-medium">{t("Cada sorrisos e cada paciente são únicos, pelo que os nossos planos de tratamento são totalmente personalizados à sua medida.")}</p>
            </div>
            <div className="bg-white/40 p-6 rounded-xl border border-white/50 shadow-sm">
              <h3 className="text-xl font-bold text-clinic-blue mb-2">{t("Conforto e Confiança")}</h3>
              <p className="text-gray-800 font-medium">{t("Criamos uma atmosfera tranquila e humanizada para proporcionar uma experiência de consulta serena e sem qualquer receio.")}</p>
            </div>
          </div>
        </div>
        <div className="flex-1">
           <img 
             src="https://clinica-santa-maria-dos-olivais.b-cdn.net/Slide%201.jpg" 
             srcSet={getSrcSet("https://clinica-santa-maria-dos-olivais.b-cdn.net/Slide%201.jpg")}
             sizes="(max-width: 768px) 100vw, 50vw"
             alt={t("Compromisso e Valores da Clínica Santa Maria dos Olivais")} 
             className="rounded-[2.5rem] shadow-2xl w-full h-full min-h-[500px] object-cover object-center border-4 border-white transition-all duration-700 hover:scale-[1.01]" 
             loading="lazy"
             decoding="async"
           />
        </div>
      </section>
    </div>
  );
};

export default Clinic;
