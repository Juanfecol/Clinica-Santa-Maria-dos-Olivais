import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  'clinica-geral': {
    title: 'Clínica Geral e Desvitalização',
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
  
  useEffect(() => {
    if ((window as any).trackEvent) {
      (window as any).trackEvent('view_service', {
        service: slug
      });
    }
  }, [slug]);

  const service = slug ? servicesData[slug] : null;

  if (!service) return <div className="p-20 text-center text-red-600 font-bold text-2xl">Serviço não encontrado: {slug}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-clinic-blue mb-8">{service.title}</h1>
      
      <div className="bg-clinic-purple text-white p-6 rounded-xl mb-12 shadow-lg text-center font-bold text-lg">
        Pagamento faseado sem juros diretamente com a clínica. Pague durante o tratamento e finalize no dia da cirurgia.
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-xl text-gray-700 mb-6">{service.description}</p>
          <div className="bg-clinic-bg p-6 rounded-xl border border-clinic-lime mb-8">
            <p className="font-bold text-clinic-blue">Especialista: {service.doctor}</p>
            <p className="text-gray-600">Horário: {service.schedule}</p>
          </div>
          
          {service.prices.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
              <h2 className="text-2xl font-bold text-clinic-blue mb-4">Tabela de Preços</h2>
              {service.prices.map((p: any, i: number) => (
                <div key={i} className="flex justify-between py-2 border-b border-gray-100">
                  <span>{p.name}</span>
                  <span className="font-bold text-clinic-purple">{p.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <ContactForm especialidadeInicial={service.title} />
      </div>
    </div>
  );
};
