
import React from 'react';
import { useContent } from '../context/ContentContext';

const TermsAndConditions: React.FC = () => {
  const { content } = useContent();
  const email = content.global?.email || "clinicasmod@gmail.com";

  return (
    <div className="animate-fade-in-up max-w-[1000px] mx-auto px-6 py-12 text-clinic-blue">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif italic border-2 border-clinic-lime inline-block px-8 py-3 rounded-full mb-6">Termos e Condições</h1>
        <p className="text-gray-600 font-medium">Condições de utilização e transparência legal.</p>
      </div>

      <div className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-[40px] shadow-xl border border-white space-y-8 leading-relaxed text-justify">
        
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-clinic-lime flex items-center justify-center text-sm font-bold">01</span>
            Aviso de Responsabilidade Médica
          </h2>
          <p className="bg-clinic-purple/10 p-5 rounded-xl border-l-4 border-clinic-purple font-medium italic">
            O conteúdo deste website é meramente informativo. Nenhuma informação aqui presente substitui o aconselhamento, diagnóstico ou plano de tratamento realizado presencialmente por um médico dentista qualificado.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-clinic-lime flex items-center justify-center text-sm font-bold">02</span>
            Propriedade Intelectual
          </h2>
          <p>
            Todos os conteúdos, imagens e vídeos da campanha "Sorriso Sem Escalas" são propriedade intelectual da Clínica Santa Maria dos Olivais. É proibida a sua cópia ou utilização sem consentimento prévio e por escrito.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-clinic-lime flex items-center justify-center text-sm font-bold">03</span>
            Resolução Alternativa de Litígios (RAL)
          </h2>
          <p>
            Em cumprimento da Lei n.º 144/2015, informamos que em caso de litígio, o consumidor poderá recorrer ao:
            <br /><br />
            <strong>Centro de Arbitragem de Conflitos de Consumo de Lisboa (CACCL)</strong>
            <br />Rua dos Douradores, nº 116 - 2º, 1100 - 207 Lisboa
            <br /><a href="http://www.centroarbitragemlisboa.pt" target="_blank" rel="noreferrer" className="text-clinic-purple hover:underline">www.centroarbitragemlisboa.pt</a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-clinic-lime flex items-center justify-center text-sm font-bold">04</span>
            Livro de Reclamações Eletrónico
          </h2>
          <p>
            Poderá aceder ao Livro de Reclamações Eletrónico para apresentar a sua reclamação através da plataforma oficial em: <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noreferrer" className="text-clinic-purple font-bold">www.livroreclamacoes.pt</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-clinic-lime flex items-center justify-center text-sm font-bold">05</span>
            Lei e Foro Aplicáveis
          </h2>
          <p>
            Os presentes termos regem-se pela Lei Portuguesa. Para qualquer litígio emergente, as partes elegem o <strong>Tribunal da Comarca de Lisboa</strong> como foro exclusivo.
          </p>
        </section>

        <div className="mt-8 pt-8 border-t border-clinic-blue/20 text-center">
           <p className="text-sm text-gray-400">Data da última revisão: Junho 2024</p>
        </div>

      </div>
    </div>
  );
};

export default TermsAndConditions;
