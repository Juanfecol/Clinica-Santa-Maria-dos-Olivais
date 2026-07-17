import React from 'react';
import { Download, Phone, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PostOperativeCare: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in-up">
      <h1 className="text-4xl font-bold text-clinic-blue mb-8">{t("Cuidados Pós-Operatórios")}</h1>
      
      <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100">
        <p className="mb-6 text-gray-700">
          Para garantir uma recuperação rápida e segura, siga atentamente as recomendações abaixo.
        </p>

        <ul className="space-y-4 mb-8 text-gray-700 list-decimal pl-5">
          <li>Repouso durante as 24 a 48h após a cirurgia. Foi submetido a uma cirurgia, o corpo reage ao trauma. Promover o estilo de vida calmo e sem recrutamento de força corporal intensa e vigorosa.</li>
          <li>Evitar fumar durante o máximo de tempo possível após a cirurgia (24h a 48h idealmente como mínimo).</li>
          <li>Evitar cuspir ou bochechar. Manter a zona com material de compressão fornecido na cirurgia.</li>
          <li>Seguir o protocolo do receituário, tentando cumprir com as horas de toma. Em caso de esquecimento não duplicar a dose, mas fazer a toma da medicação logo que possível.</li>
          <li>Fazer gelo de contacto durante as 72h após a cirurgia com renovação constante. Esta é a medida mais importante para evitar edema (inchaço) e consequentemente dor.</li>
          <li>Evitar exercício físico durante 15 dias no mínimo, autorização de retoma da actividade normal dada pelo médico.</li>
          <li>Durante o dia da cirurgia ingerir preferencialmente alimentos frios, se foi submetido(a) a alguma extração dentária.</li>
          <li>Ao fim de 8 dias, são removidos os pontos em consulta de avaliação previamente marcada no dia da cirurgia.</li>
          <li>É comum no período pós operatório possam aparecer lesões aftosas (aftas).</li>
        </ul>

        <div className="bg-clinic-blue/5 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div className='flex items-center gap-3'>
                <Phone className='text-clinic-purple' size={24}/>
                <p className='font-bold text-clinic-blue'>Contactos: 919861310 | 211350066</p>
            </div>
            <div className='flex items-center gap-3'>
                <Clock className='text-clinic-purple' size={24}/>
                <p className='font-bold text-clinic-blue text-sm text-center'>Seg-Sex: 10h-19h | Sáb: 10h-13h<br/>Domingo: Encerrado</p>
            </div>
        </div>

        <a 
          href="https://clinica-santa-maria-dos-olivais.b-cdn.net/CUIDADOS%20POS%20OPERATORIOS.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-clinic-purple text-white px-8 py-4 rounded-full font-bold hover:bg-clinic-purple/90 transition shadow-lg"
        >
          <Download size={20} />
          {t("Descarregar PDF Completo")}
        </a>
      </div>
    </div>
  );
};

export default PostOperativeCare;
