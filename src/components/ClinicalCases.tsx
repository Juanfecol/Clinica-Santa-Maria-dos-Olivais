import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const clinicalCases = [
  {
    title: "Reabilitação Oral",
    videoUrl: "https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_santa_maria_1.mp4",
    tag: "Implantes"
  },
  {
    title: "Caso Clínico SMO",
    videoUrl: "https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_santa_maria_2.mp4",
    tag: "Estética"
  },
  {
    title: "Sorriso Renovado",
    videoUrl: "https://clinica-santa-maria-dos-olivais.b-cdn.net/clinica_santa_maria_3.mp4",
    tag: "Dentes Fixos"
  },
  {
    title: "Depoimento Real V1",
    videoUrl: "https://clinica-santa-maria-dos-olivais.b-cdn.net/V1.mp4",
    tag: "Paciente"
  },
  {
    title: "Depoimento Real V2",
    videoUrl: "https://clinica-santa-maria-dos-olivais.b-cdn.net/V2.mp4",
    tag: "Paciente"
  },
  {
    title: "Depoimento Real V4",
    videoUrl: "https://clinica-santa-maria-dos-olivais.b-cdn.net/V4.mp4",
    tag: "Paciente"
  }
];

export const ClinicalCases: React.FC = () => {
  const [mutedStates, setMutedStates] = useState<boolean[]>(Array(clinicalCases.length).fill(true));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const toggleMute = (index: number) => {
    setMutedStates(prev => {
      const next = [...prev];
      next[index] = !next[index];
      if (videoRefs.current[index]) {
        videoRefs.current[index]!.muted = next[index];
      }
      return next;
    });
  };

  return (
    <section className="py-16 px-4 bg-gray-50 border-t border-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-clinic-blue font-bold bg-blue-50 px-3 py-1 rounded-full">Casos Reais</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">Casos Clínicos e Testemunhos</h2>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto text-sm md:text-base">
            Resultados verídicos e depoimentos em formato de histórias dos nossos próprios pacientes.
          </p>
        </div>

        {/* Stories Horizontal Tray */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {clinicalCases.map((c, i) => (
            <div 
              key={i} 
              className="snap-center shrink-0 w-[180px] md:w-[230px] aspect-[9/16] rounded-[2rem] md:rounded-[2.5rem] border-[4px] border-white shadow-lg overflow-hidden bg-black relative group transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <video
                ref={el => (videoRefs.current[i] = el)}
                src={`${c.videoUrl}#t=0.1`}
                autoPlay
                muted={mutedStates[i]}
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
              
              {/* Tag Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10">
                  {c.tag}
                </span>
              </div>

              {/* Sound Toggle Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute(i);
                }}
                className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md p-1.5 rounded-full text-white border border-white/10 hover:bg-black/80 transition-colors"
                aria-label={mutedStates[i] ? "Ativar som" : "Desativar som"}
              >
                {mutedStates[i] ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-12 text-center">
                <p className="font-bold text-white text-xs md:text-sm drop-shadow-md">{c.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 text-xs text-gray-400 flex items-center justify-center gap-2">
          <span>← Deslize para ver mais casos reais →</span>
        </div>
      </div>
    </section>
  );
};

