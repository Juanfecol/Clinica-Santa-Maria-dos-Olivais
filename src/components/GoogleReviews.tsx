import React, { useState } from 'react';
import { Star, ExternalLink, MessageSquarePlus, CheckCircle2, ThumbsUp, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface ReviewItem {
  id: string;
  author: string;
  initials: string;
  avatarColor: string;
  rating: number;
  date: string;
  category: 'all' | 'implants' | 'ortho' | 'aesthetic' | 'general';
  categoryLabel: string;
  text: string;
  likes?: number;
  treatmentDetail?: string;
}

const REVIEWS_DATA: ReviewItem[] = [
  {
    id: '1',
    author: 'Rui Manuel Martins',
    initials: 'RM',
    avatarColor: 'bg-emerald-600',
    rating: 5,
    date: 'Há 2 semanas',
    category: 'implants',
    categoryLabel: 'Implantes Dentários',
    treatmentDetail: 'Implante Unitário + Coroa Cerâmica',
    likes: 4,
    text: 'Coloquei implantes com a Dra. Ana Mata e toda a equipa foi excecional do início ao fim. Sem qualquer dor durante o procedimento e uma recuperação muito tranquila. Explicação transparente de cada fase. Recomendo vivamente a clínica!'
  },
  {
    id: '2',
    author: 'Sofia Ferreira',
    initials: 'SF',
    avatarColor: 'bg-indigo-600',
    rating: 5,
    date: 'Há 3 semanas',
    category: 'ortho',
    categoryLabel: 'Ortodontia & Invisalign',
    treatmentDetail: 'Alinhadores Invisíveis',
    likes: 6,
    text: 'Fiz o meu tratamento de ortodontia com alinhadores com a Dra. Mariana Aberto. O resultado do sorriso ficou muito além das minhas expectativas! Consultório super moderno, tecnologia de ponta e equipa extremamente atenciosa.'
  },
  {
    id: '3',
    author: 'Carlos Alberto Silva',
    initials: 'CS',
    avatarColor: 'bg-blue-600',
    rating: 5,
    date: 'Há 1 mês',
    category: 'general',
    categoryLabel: 'Atendimento & Simpatia',
    treatmentDetail: 'Consulta Geral e Higiene Oral',
    likes: 3,
    text: 'Excelente clínica nos Olivais. Desde a receção com a D. Carla Claro até ao atendimento clínico do Dr. Tomás e da Dra. Alexandra, sentimos uma segurança e simpatia raras. Preços claros e sem surpresas.'
  },
  {
    id: '4',
    author: 'Mariana Santos',
    initials: 'MS',
    avatarColor: 'bg-rose-600',
    rating: 5,
    date: 'Há 1 mês',
    category: 'aesthetic',
    categoryLabel: 'Estética & Facetas',
    treatmentDetail: 'Facetas Dentárias e Branqueamento',
    likes: 5,
    text: 'Fiz facetas e branqueamento e o meu sorriso ficou perfeito e muito natural! Tinha muito receio de ficar artificial, mas a Dra. Ana Mata teve um cuidado milimétrico com a estética facial. Muito grata pelo trabalho.'
  },
  {
    id: '5',
    author: 'Pedro Gonçalves',
    initials: 'PG',
    avatarColor: 'bg-amber-600',
    rating: 5,
    date: 'Há 2 meses',
    category: 'general',
    categoryLabel: 'Odontopediatria & Família',
    treatmentDetail: 'Consulta de Odontopediatria',
    likes: 2,
    text: 'Levei o meu filho para a consulta com a Dra. Orizanda. A paciência, carinho e técnica para lidar com crianças são fantásticas. Ele já não tem medo de ir ao dentista. Toda a família passou a tratar-se aqui.'
  },
  {
    id: '6',
    author: 'Helena Ramos',
    initials: 'HR',
    avatarColor: 'bg-purple-600',
    rating: 5,
    date: 'Há 2 meses',
    category: 'implants',
    categoryLabel: 'Reabilitação Total',
    treatmentDetail: 'Protocolo Fixo Superior',
    likes: 7,
    text: 'Fiz a reabilitação de arcada completa com a equipa. Voltei a sorrir com confiança e a mastigar sem qualquer problema. Agradeço a toda a equipa pela dedicação, acompanhamento pós-operatório e humanismo.'
  }
];

interface GoogleReviewsProps {
  className?: string;
  compact?: boolean;
}

export const GoogleReviews: React.FC<GoogleReviewsProps> = ({ className = '', compact = false }) => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'implants' | 'ortho' | 'aesthetic' | 'general'>('all');
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

  // Direct Google Maps Search / Review links for Clinica Santa Maria dos Olivais
  const googleReviewsUrl = "https://www.google.com/maps/search/?api=1&query=Clinica+Santa+Maria+dos+Olivais+Lisboa";
  const googleWriteReviewUrl = "https://www.google.com/maps/search/?api=1&query=Clinica+Santa+Maria+dos+Olivais+Estrada+de+Moscavide+32C+Lisboa";

  const categories = [
    { key: 'all', label: t('Todas as Avaliações') },
    { key: 'implants', label: t('Implantes Dentários') },
    { key: 'ortho', label: t('Ortodontia & Invisalign') },
    { key: 'aesthetic', label: t('Estética & Facetas') },
    { key: 'general', label: t('Atendimento & Família') }
  ] as const;

  const filteredReviews = activeFilter === 'all' 
    ? REVIEWS_DATA 
    : REVIEWS_DATA.filter(r => r.category === activeFilter);

  const toggleExpand = (id: string) => {
    setExpandedReviews(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className={`relative w-full ${className}`} aria-labelledby="google-reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header / Score summary banner */}
        <div className="bg-gradient-to-br from-white via-white to-slate-50 border border-clinic-blue/10 rounded-[32px] md:rounded-[40px] p-6 sm:p-8 md:p-10 shadow-xl shadow-clinic-blue/5 mb-10 overflow-hidden relative">
          
          {/* Subtle background Google G aesthetic watermark */}
          <div className="absolute -right-8 -bottom-10 opacity-5 pointer-events-none select-none text-[220px] font-black text-clinic-blue leading-none">
            G
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            
            {/* Left: Brand + Title */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-gray-200 shadow-sm mb-4">
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

              <h2 id="google-reviews-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-clinic-blue tracking-tight leading-tight">
                {t("O que dizem os nossos pacientes")}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-xl">
                {t("Transparência, dedicação e excelência médica comprovada por quem nos confia a saúde do seu sorriso diariamente.")}
              </p>
            </div>

            {/* Right: Score card & Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/90 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-md">
              
              <div className="flex items-center gap-4 text-center sm:text-left pr-0 sm:pr-4 sm:border-r border-gray-200">
                <div className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                  4.4
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                      <div key={starIndex} className="relative">
                        <Star size={18} className="text-gray-300" />
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

              {/* Direct Link Action Buttons */}
              <div className="flex flex-col gap-2.5 w-full sm:w-auto">
                <a
                  href={googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-clinic-blue text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full hover:bg-clinic-purple transition-all duration-200 shadow-sm hover:shadow-md group whitespace-nowrap"
                  title="Abrir avaliações no Google Maps"
                >
                  <span>{t("Ver no Google Maps")}</span>
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={googleWriteReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-2xs whitespace-nowrap"
                  title="Escrever uma avaliação no Google"
                >
                  <MessageSquarePlus size={14} className="text-clinic-purple" />
                  <span>{t("Deixar Avaliação")}</span>
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Category Filters */}
        {!compact && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeFilter === cat.key
                    ? 'bg-clinic-blue text-white shadow-md shadow-clinic-blue/20 scale-[1.02]'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => {
            const isExpanded = !!expandedReviews[review.id];
            const isLong = review.text.length > 150;
            const displayText = isLong && !isExpanded 
              ? `${review.text.slice(0, 145)}...` 
              : review.text;

            return (
              <div 
                key={review.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header: Author avatar + Google Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-full ${review.avatarColor} text-white flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0`}>
                        {review.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                            {review.author}
                          </h3>
                          <CheckCircle2 size={15} className="text-blue-500 flex-shrink-0" title="Paciente Verificado no Google" />
                        </div>
                        <p className="text-[11px] text-gray-500 font-medium">
                          {t("Paciente verificado")} • {review.date}
                        </p>
                      </div>
                    </div>

                    {/* Google G mini-badge */}
                    <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-2xs">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                    </div>
                  </div>

                  {/* Stars Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Treatment Tag if available */}
                  {review.treatmentDetail && (
                    <div className="inline-block bg-clinic-bg/80 text-clinic-blue font-semibold text-[11px] px-2.5 py-1 rounded-md mb-3 border border-clinic-blue/10">
                      {t(review.treatmentDetail)}
                    </div>
                  )}

                  {/* Review Text */}
                  <p className="text-gray-700 text-sm leading-relaxed font-normal">
                    "{t(displayText)}"
                  </p>
                  
                  {isLong && (
                    <button 
                      onClick={() => toggleExpand(review.id)}
                      className="text-xs font-bold text-clinic-blue hover:text-clinic-purple mt-1.5 focus:outline-hidden cursor-pointer"
                    >
                      {isExpanded ? t("Mostrar menos") : t("Ler mais")}
                    </button>
                  )}
                </div>

                {/* Card Footer: Helpful counter & verified on Google */}
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1.5 text-gray-500 font-medium">
                    <ThumbsUp size={12} className="text-gray-400" />
                    {review.likes} {t("pessoas acharam útil")}
                  </span>
                  <a
                    href={googleReviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-clinic-blue hover:text-clinic-purple font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Google</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA & Trust banner */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-clinic-blue hover:text-clinic-purple font-bold px-8 py-3.5 rounded-full border-2 border-clinic-blue/20 hover:border-clinic-blue/50 shadow-md hover:shadow-lg transition-all duration-300 text-sm md:text-base group"
          >
            <span>{t("Ver todas as 141 avaliações no Google")}</span>
            <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-clinic-purple" />
          </a>

          <a
            href={googleWriteReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-clinic-lime text-clinic-blue font-bold px-8 py-3.5 rounded-full hover:bg-clinic-blue hover:text-white shadow-md hover:shadow-lg transition-all duration-300 text-sm md:text-base group"
          >
            <Star size={16} className="fill-current" />
            <span>{t("Avaliar a Clínica no Google")}</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default GoogleReviews;
