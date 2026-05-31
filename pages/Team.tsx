
import React from 'react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

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
      {/* Photo with professional frame */}
      <div className="mb-6 relative">
        {member.img ? (
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-clinic-lime/30 shadow-lg group-hover:border-clinic-purple/50 transition-all duration-500">
            <img 
              src={member.img} 
              alt={member.name} 
              className={`w-full h-full object-cover ${member.imgPosition || 'object-center'}`}
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : (
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-50 border-4 border-clinic-lime/20 flex items-center justify-center shadow-inner group-hover:border-clinic-purple/30 transition-all duration-500">
            <div className="w-16 h-16 text-clinic-blue/20">
              <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>
        )}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-clinic-blue via-clinic-lime to-clinic-purple rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
      </div>
      
      <h3 className="text-2xl font-bold text-clinic-blue mb-1 group-hover:text-clinic-purple transition-colors">{member.name}</h3>
      <p className="text-clinic-purple font-medium mb-4 uppercase text-xs tracking-[0.2em]">{member.title}</p>
      
      <div className="w-full h-px bg-gray-100 mb-4"></div>
      
      <p className="text-sm text-gray-700 leading-relaxed italic">
        "{member.bio}"
      </p>
    </div>
  </div>
);

const Team: React.FC = () => {
  const { content } = useContent();
  const { t, translateObject } = useLanguage();
  const medicalTeam: Member[] = translateObject(content.team?.medical || []);
  const assistantTeam: Member[] = translateObject(content.team?.assistants || []);
  const receptionTeam: Member[] = translateObject(content.team?.reception || []);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12 animate-fade-in-up">
      <div className="text-center mb-16">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif italic text-clinic-blue border-2 border-clinic-lime inline-block px-8 py-3 rounded-full mb-6">{t("A Nossa Equipa Clínica")}</h1>
        <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto font-light">
          {t("Comprometidos com a excelência nos Olivais. Conheça os profissionais dedicados a cuidar do seu sorriso com as mais avançadas técnicas de medicina dentária.")}
        </p>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-serif italic text-center text-clinic-blue mb-12 border-b-2 border-clinic-lime inline-block pb-2 mx-auto block w-fit">{t("Corpo Clínico Especialista")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {medicalTeam.map((member, idx) => <MemberCard key={idx} member={member} />)}
        </div>
      </div>

      {(assistantTeam.length > 0 || receptionTeam.length > 0) && (
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-serif italic text-center text-clinic-blue mb-12 border-b-2 border-clinic-lime inline-block pb-2 mx-auto block w-fit">{t("Apoio e Atendimento")}</h2>
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
