
import React from 'react';
import { useContent } from '../context/ContentContext';

interface Member {
  name: string;
  title: string;
  img: string;
  bio: string;
  imgPosition?: string;
}

const MemberCard: React.FC<{ member: Member }> = ({ member }) => (
  <div className="edge-glow-container p-[3px] rounded-3xl group h-full">
    {/* Infinite Glow Border Background */}
    <div className="edge-glow-border opacity-60 group-hover:opacity-100 group-hover:animation-duration-[4s] transition-all"></div>
    
    {/* Content Box */}
    <div className="relative bg-white rounded-[21px] p-8 flex flex-col items-center text-center shadow-inner h-full z-10">
      {/* Photo removed but layout remains centered and professional */}
      <div className="mb-4">
        <div className="w-16 h-1 bg-gradient-to-r from-clinic-blue via-clinic-lime to-clinic-purple rounded-full mx-auto opacity-40 group-hover:opacity-100 transition-opacity"></div>
      </div>
      
      <h3 className="text-2xl font-bold text-clinic-blue mb-1 group-hover:text-clinic-purple transition-colors">{member.name}</h3>
      <p className="text-clinic-purple font-medium mb-4 uppercase text-xs tracking-[0.2em]">{member.title}</p>
      
      <div className="w-full h-px bg-gray-100 mb-4"></div>
      
      <p className="text-sm text-gray-700 leading-relaxed italic">
        "{member.bio}"
      </p>
      
      {/* Ready for future image insertion if needed */}
    </div>
  </div>
);

const Team: React.FC = () => {
  const { content } = useContent();
  const medicalTeam: Member[] = content.team?.medical || [];
  const assistantTeam: Member[] = content.team?.assistants || [];
  const receptionTeam: Member[] = content.team?.reception || [];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12 animate-fade-in-up">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif italic text-clinic-blue border-2 border-clinic-lime inline-block px-8 py-3 rounded-full mb-6">A Nossa Equipa Clínica</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto font-light">
          Comprometidos com a excelência nos Olivais. Conheça os profissionais dedicados a cuidar do seu sorriso com as mais avançadas técnicas de medicina dentária.
        </p>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-serif italic text-center text-clinic-blue mb-12 border-b-2 border-clinic-lime inline-block pb-2 mx-auto block w-fit">Corpo Clínico Especialista</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {medicalTeam.map((member, idx) => <MemberCard key={idx} member={member} />)}
        </div>
      </div>

      {(assistantTeam.length > 0 || receptionTeam.length > 0) && (
        <div className="mb-20">
          <h2 className="text-3xl font-serif italic text-center text-clinic-blue mb-12 border-b-2 border-clinic-lime inline-block pb-2 mx-auto block w-fit">Apoio e Atendimento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {receptionTeam.map((member, idx) => <MemberCard key={`rec-${idx}`} member={member} />)}
            {assistantTeam.map((member, idx) => <MemberCard key={`ast-${idx}`} member={member} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
