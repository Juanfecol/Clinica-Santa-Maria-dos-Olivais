
import React, { useEffect, useState } from 'react';

const IntroOverlay: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Keep the logo visible for 2.5 seconds, then start exit animation
    const timer1 = setTimeout(() => {
      setExiting(true);
    }, 2500);

    // Allow time for the slide animation (2.0s) to finish before unmounting
    const timer2 = setTimeout(() => {
      onComplete();
    }, 4600); // 2500ms + 2100ms buffer

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-transform duration-[2000ms] ease-in-out ${exiting ? 'translate-x-[110%]' : 'translate-x-0'}`}
    >
      {/* Liquid Glass Background */}
      <div className="absolute inset-0 bg-white/45 backdrop-blur-[30px] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border-l-2 border-white/60"></div>

      {/* Airplane - Positioned on the LEFT edge. When the container moves Right, the plane moves across the screen. */}
      <div className="absolute left-0 top-1/2 transform -translate-x-[60%] -translate-y-1/2 z-50">
         <div className="relative">
           {/* Engine Trail Effect */}
           <div className="absolute top-1/2 right-[80%] h-2 w-48 md:w-96 bg-gradient-to-r from-transparent via-clinic-lime to-white opacity-80 blur-md rounded-full transform -translate-y-1/2"></div>
           
           {/* Plane Icon */}
           <i className="fas fa-plane text-clinic-blue text-7xl md:text-9xl drop-shadow-2xl transform rotate-45 filter contrast-125"></i>
         </div>
      </div>

      {/* Content Container */}
      <div className={`relative z-10 text-center px-4 flex flex-col items-center transition-all duration-700 ${exiting ? 'opacity-100 scale-100' : 'animate-fade-in-up'}`}>
        <img 
            src="https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/05/Capture-removebg-preview.png" 
            alt="Logo Clínica Santa Maria dos Olivais" 
            className="w-32 h-32 md:w-48 md:h-48 object-contain mb-8 drop-shadow-lg"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-clinic-blue mb-6 font-serif leading-tight drop-shadow-md">
          Clínica Santa Maria <br className="md:hidden" />dos Olivais
        </h1>
        
        {/* Decorative Line */}
        <div className="h-2 w-32 bg-gradient-to-r from-clinic-lime to-clinic-blue rounded-full my-6 shadow-md"></div>
        
        {/* Updated Title and Approved Descriptive Text */}
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-6xl font-extrabold font-serif italic tracking-wide py-2 px-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-clinic-blue via-[#8A2BE2] to-[#FF1493] drop-shadow-sm filter">
            Sorriso Sem Escalas
          </h2>
          <div className="text-lg md:text-2xl font-medium text-clinic-blue font-serif italic leading-relaxed px-6 space-y-3">
            <p>Não arrisque a sua saúde em viagens longas. Oferecemos preços justos com a garantia da medicina portuguesa.</p>
            <p>A grande vantagem? Se precisar de nós no dia seguinte, estamos à distância de um telefonema, não de um voo. Sem barreiras de língua e com a segurança de um acompanhamento contínuo em Lisboa.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroOverlay;
