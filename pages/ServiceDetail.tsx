import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ContactForm } from '../components/ContactForm';

const servicesData: Record<string, any> = {
  'implantologia': {
    title: 'Implantologia',
    doctor: 'Dra. Ana Mata (Diretora Clínica)',
    schedule: 'Seg e Sex (14h-18h30), Ter e Qui (11h-16h)',
    description: 'Recupere o seu sorriso fixo com implantes de titânio de alta qualidade.',
    prices: [
      { name: 'Implante Unitário + Coroa Metalo-cerâmica', value: '745€' },
      { name: 'Protocolo Superior (4 a 6 implantes + prótese fixa final)', value: '4.800€' },
      { name: 'Enxerto Ósseo', value: 'A partir de 200€ (ou 500€ conforme complexidade)' }
    ]
  },
  'facetas': {
    title: 'Estética e Facetas',
    doctor: 'R.O.',
    schedule: 'Sob consulta',
    description: 'Melhoria da estética e harmonia do sorriso através da dentisteria avançada.',
    prices: [
      { name: 'Facetas 4 Dentes Anteriores (Zona Estética)', value: '1.800€' },
      { name: 'Facetas 1 Arcada (10 dentes)', value: '4.550€' },
      { name: 'Facetas 2 Arcadas (20 dentes)', value: '6.500€' },
      { name: 'Branqueamento em Consultório', value: '200€' }
    ]
  },
  'ortodontia': {
    title: 'Ortodontia',
    doctor: 'Dra. Mariana Aberto',
    schedule: 'Quarta-feira',
    description: 'Alinhamento dentário moderno com aparelhos fixos ou alinhadores invisíveis.',
    prices: [
      { name: 'Aparelho Ortodôntico Fixo', value: '450€ por arcada' },
      { name: 'Consulta de Manutenção', value: '65€' },
      { name: 'Invisalign', value: 'Preço sob consulta' },
      { name: 'Manutenção Invisalign', value: '75€' },
      { name: 'Aparelhos de Contenção (Fixo/Removível)', value: '150€ a 180€' }
    ]
  },
  'medicina-dentaria': {
    title: 'Medicina Dentária e Desvitalização',
    doctor: 'Dra. Orizanda Claret (Terça), Dr. Francisco (Quinta), Tomás Machado (Segunda)',
    schedule: 'Vários dias',
    description: 'Cuidados dentários gerais e tratamentos de desvitalização.',
    prices: [
      { name: 'Desvitalização Molar', value: '240€' },
      { name: 'Desvitalização Incisivo/Canino', value: '180€' },
      { name: 'Extração de Siso (Erupcionado/Incluso)', value: '75€ a 200€' }
    ]
  }
};

export const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const service = slug ? servicesData[slug] : null;
  
  useEffect(() => {
    if ((window as any).trackEvent) {
      (window as any).trackEvent('view_service', {
        service: slug
      });
    }
    if ((window as any).trackMeta) {
      (window as any).trackMeta('ViewContent', {
        content_name: service?.title || slug,
        content_category: 'Service Detail',
        currency: 'EUR'
      }, true);
    }
  }, [slug, service]);

  if (!service) return <div className="p-20 text-center text-red-600 font-bold text-2xl">{t("Serviço não encontrado:")} {slug}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-clinic-blue mb-10 leading-tight">{t(service.title)}</h1>
      
      <div className="bg-clinic-purple text-white p-8 rounded-2xl mb-16 shadow-lg text-center font-bold text-xl md:text-2xl leading-relaxed">
        {t("Pagamento faseado sem juros diretamente com a clínica. Pague durante o tratamento e finalize no dia da cirurgia.")}
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-xl text-gray-700 mb-6">{t(service.description)}</p>
          <div className="bg-clinic-bg p-6 rounded-xl border border-clinic-lime mb-8">
            <p className="font-bold text-clinic-blue">{t("Especialista:")} {t(service.doctor)}</p>
            <p className="text-gray-600">{t("Horário:")} {t(service.schedule)}</p>
          </div>
          
          {service.prices.length > 0 && (
            <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
              <h2 className="text-2xl font-bold text-clinic-blue mb-6">{t("Tabela de Preços")}</h2>
              <div className="space-y-1">
                {service.prices.map((p: any, i: number) => (
                  <div key={i} className="flex flex-col gap-1 border-b border-gray-100 py-5 last:border-0 w-full group">
                    <span className="text-base md:text-lg font-semibold text-gray-700 leading-tight break-normal hyphens-none group-hover:text-clinic-purple transition-colors">{t(p.name)}</span>
                    <span className="text-xl md:text-2xl font-bold text-clinic-purple break-normal hyphens-none">{t(p.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <ContactForm especialidadeInicial={service.title} />
      </div>
    </div>
  );
};
