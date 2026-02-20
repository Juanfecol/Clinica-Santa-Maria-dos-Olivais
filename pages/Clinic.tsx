
import React from 'react';
import { useContent } from '../context/ContentContext';

const Clinic: React.FC = () => {
  const { content } = useContent();
  const gallery = content.clinic?.gallery || [];

  return (
    <div className="animate-fade-in-up">
      {/* Intro */}
      <section className="text-center px-4 py-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif italic text-clinic-blue border-2 border-clinic-lime inline-block px-8 py-3 rounded-full mb-8">Sobre a Nossa Clínica</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          A Clínica Santa Maria dos Olivais é um space dedicado à excelência em cuidados dentários, onde a saúde e a estética do seu sorriso são a nossa prioridade. Equipada com tecnologia de ponta e um ambiente acolhedor, a nossa clínica oferece uma ampla gama de tratamentos, desde odontologia geral até procedimentos especializados.
        </p>
      </section>

      {/* Gallery */}
      <section className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((src: string, index: number) => (
            <div key={index} className="h-64 rounded-xl overflow-hidden shadow-lg border border-white/20 hover:-translate-y-2 transition-transform duration-300">
              <img src={src} alt={`Clinic Interior ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-[1400px] mx-auto px-4 py-20 flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <h2 className="text-3xl font-serif italic text-clinic-blue border-2 border-clinic-lime inline-block px-6 py-2 rounded-full mb-6">Nossos Valores e Compromisso</h2>
          <p className="text-gray-700 mb-8">
            Na Clínica Santa Maria dos Olivais, acreditamos que a saúde oral é essencial para o bem-estar geral. Nosso compromisso é oferecer tratamentos de alta qualidade em um ambiente acolhedor e profissional.
          </p>
          <div className="grid gap-6">
            <div className="bg-white/40 p-6 rounded-xl border border-white/50 shadow-sm">
              <h3 className="text-xl font-bold text-clinic-blue mb-2">Excelência</h3>
              <p className="text-gray-800">Utilizamos tecnologia de ponta e técnicas avançadas para garantir resultados superiores.</p>
            </div>
            <div className="bg-white/40 p-6 rounded-xl border border-white/50 shadow-sm">
              <h3 className="text-xl font-bold text-clinic-blue mb-2">Cuidado Personalizado</h3>
              <p className="text-gray-800">Cada paciente é único, e nossos planos de tratamento são adaptados às necessidades individuais.</p>
            </div>
            <div className="bg-white/40 p-6 rounded-xl border border-white/50 shadow-sm">
              <h3 className="text-xl font-bold text-clinic-blue mb-2">Conforto</h3>
              <p className="text-gray-800">Criamos um ambiente acolhedor e tranquilo para que sua experiência seja a mais agradável possível.</p>
            </div>
          </div>
        </div>
        <div className="flex-1">
           <img 
             src="https://clinica-santa-maria-dos-olivais.b-cdn.net/Slide%201.jpg" 
             alt="Compromisso e Valores Clínica Santa Maria dos Olivais" 
             className="rounded-[2.5rem] shadow-2xl w-full h-full min-h-[500px] object-cover object-center border-4 border-white transition-all duration-700 hover:scale-[1.01]" 
           />
        </div>
      </section>
    </div>
  );
};

export default Clinic;
