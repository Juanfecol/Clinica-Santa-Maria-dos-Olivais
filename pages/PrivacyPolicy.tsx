
import React from 'react';
import { useContent } from '../context/ContentContext';

const PrivacyPolicy: React.FC = () => {
  const { content } = useContent();
  const email = content.global?.email || "clinicasmod@gmail.com";
  const address = content.global?.address || "Estrada de Moscavide N 32C, 1800-279, Lisboa";

  return (
    <div className="animate-fade-in-up max-w-[1000px] mx-auto px-6 py-12 text-clinic-blue">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif italic border-2 border-clinic-lime inline-block px-8 py-3 rounded-full mb-6">Política de Privacidade</h1>
        <p className="text-gray-600 font-medium italic">Proteção de dados em conformidade com o RGPD (UE 2016/679) e Lei n.º 58/2019.</p>
      </div>

      <div className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-[40px] shadow-xl border border-white space-y-8 leading-relaxed text-justify">
        
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-clinic-lime flex items-center justify-center text-sm font-bold">01</span>
            Entidade Responsável
          </h2>
          <p>
            A <strong>Clínica Santa Maria dos Olivais</strong>, com sede em <strong>{address}</strong>, é a responsável pelo tratamento dos seus dados pessoais. Assumimos o compromisso ético e legal de proteger a sua privacidade e os seus dados de saúde.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-clinic-lime flex items-center justify-center text-sm font-bold">02</span>
            Dados de Categoria Especial (Saúde)
          </h2>
          <p>
            Ao abrigo do <strong>Artigo 9.º, n.º 2, alínea h) do RGPD</strong>, a Clínica trata dados relativos à saúde para fins de diagnóstico médico e prestação de cuidados de saúde. Estes dados são tratados exclusivamente por profissionais sujeitos a segredo profissional.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-clinic-lime flex items-center justify-center text-sm font-bold">03</span>
            Finalidades do Tratamento
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Gestão Clínica:</strong> Agendamento, diagnóstico e histórico clínico.</li>
            <li><strong>Comunicações:</strong> Contacto para confirmação de consultas e informações administrativas.</li>
            <li><strong>Obrigações Legais:</strong> Faturação e reporte a autoridades de saúde (ERS e outras).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-clinic-lime flex items-center justify-center text-sm font-bold">04</span>
            Direitos dos Titulares
          </h2>
          <p>Como utilizador e paciente, possui os direitos de:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
             <div className="p-4 bg-white/40 rounded-xl border border-clinic-blue/10">
                <h3 className="font-bold">Acesso e Retificação</h3>
                <p className="text-sm">Pode solicitar os dados que temos sobre si e corrigir qualquer inexatidão.</p>
             </div>
             <div className="p-4 bg-white/40 rounded-xl border border-clinic-blue/10">
                <h3 className="font-bold">Esquecimento</h3>
                <p className="text-sm">Solicitar a eliminação dos dados (exceto os que somos legalmente obrigados a manter em arquivo clínico).</p>
             </div>
             <div className="p-4 bg-white/40 rounded-xl border border-clinic-blue/10">
                <h3 className="font-bold">Portabilidade</h3>
                <p className="text-sm">Receber os seus dados em formato estruturado para transmissão a outro médico.</p>
             </div>
             <div className="p-4 bg-white/40 rounded-xl border border-clinic-blue/10">
                <h3 className="font-bold">Reclamação</h3>
                <p className="text-sm">Direito de contactar a <strong>CNPD (Comissão Nacional de Proteção de Dados)</strong>.</p>
             </div>
          </div>
        </section>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
           <p className="text-sm">Para exercer os seus direitos, contacte-nos: <a href={`mailto:${email}`} className="text-clinic-purple font-bold hover:underline">{email}</a>.</p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
