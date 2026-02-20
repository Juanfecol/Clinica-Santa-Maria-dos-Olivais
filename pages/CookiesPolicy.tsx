
import React from 'react';
import { useContent } from '../context/ContentContext';

const CookiesPolicy: React.FC = () => {
  const { content } = useContent();
  const email = content.global?.email || "clinicasmod@gmail.com";

  return (
    <div className="animate-fade-in-up max-w-[1000px] mx-auto px-6 py-12 text-clinic-blue">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif italic border-2 border-clinic-lime inline-block px-8 py-3 rounded-full mb-6">Política de Cookies</h1>
        <p className="text-gray-600 font-medium italic">Informação em conformidade com a Lei n.º 41/2004 e o RGPD.</p>
      </div>

      <div className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-[40px] shadow-xl border border-white space-y-8 leading-relaxed text-justify">
        
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-clinic-lime flex items-center justify-center text-sm font-bold">01</span>
            O que são Cookies?
          </h2>
          <p>
            Os cookies são pequenos ficheiros de texto que o nosso servidor envia para o seu navegador (browser) durante a sua visita. Estes ficheiros permitem-nos reconhecer o utilizador em visitas futuras, personalizar a sua experiência e garantir a segurança técnica do website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-clinic-lime flex items-center justify-center text-sm font-bold">02</span>
            Categorias de Cookies Utilizadas
          </h2>
          <div className="grid gap-4 mt-4">
            <div className="p-5 bg-white/40 rounded-2xl border border-clinic-blue/5">
              <h3 className="font-bold text-clinic-blue mb-1">Cookies de Sessão e Técnicos</h3>
              <p className="text-sm">Essenciais para o carregamento correto do site e navegação segura. Não recolhem dados pessoais para fins de marketing.</p>
            </div>
            <div className="p-5 bg-white/40 rounded-2xl border border-clinic-blue/5">
              <h3 className="font-bold text-clinic-blue mb-1">Cookies de Desempenho (Analytics)</h3>
              <p className="text-sm">Recolhem informação estatística anónima sobre como os utilizadores navegam, permitindo-nos melhorar a velocidade e conteúdos do site.</p>
            </div>
            <div className="p-5 bg-white/40 rounded-2xl border border-clinic-blue/5">
              <h3 className="font-bold text-clinic-blue mb-1">Cookies de Publicidade e Redes Sociais</h3>
              <p className="text-sm">Ferramentas de parceiros tecnológicos que ajudam a medir a eficácia de anúncios e a apresentar propostas relevantes nas redes sociais, de acordo com os interesses demonstrados.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-clinic-lime flex items-center justify-center text-sm font-bold">03</span>
            Controlo e Gestão de Cookies
          </h2>
          <p>
            O utilizador pode, a qualquer momento, bloquear ou eliminar cookies através das configurações de privacidade do seu navegador. Alertamos que a desativação de certos cookies poderá impossibilitar a utilização de algumas funcionalidades interativas do nosso website.
          </p>
        </section>

        <section className="pt-6 border-t border-gray-100">
           <p className="text-sm text-gray-500">
             Para esclarecimentos adicionais sobre a nossa gestão de dados, contacte o nosso encarregado de proteção de dados através de: <a href={`mailto:${email}`} className="text-clinic-blue font-bold hover:underline">{email}</a>.
           </p>
        </section>

      </div>
    </div>
  );
};

export default CookiesPolicy;
