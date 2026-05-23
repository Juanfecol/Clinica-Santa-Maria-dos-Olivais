
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const Home: React.FC = () => {
  const { content } = useContent();
  const heroTitle = content?.home?.heroTitle || "Clínica Santa Maria dos Olivais";
  const heroSubtitle = content?.home?.heroSubtitle || "";
  const stories = content?.stories || [];

  const getFallbackThumbnail = (title: string, originalThumbnail: string) => {
    const key = title.trim().toLowerCase();
    
    // Clean, high-quality maps strictly utilizing photos of doctors or the physical clinic interior/lobby (no machinery/drones)
    const fallbacks: Record<string, string> = {
      'alinhadores': 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-132.jpeg', // Dra. Mariana Aberto (Ortodontia)
      'aparelho': 'https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_5640.JPG', // Clinic Lobby area
      'consulta': 'https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_5650.JPG', // Fully-focused Clinical Room/Cabinet
      'dia anterior': 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-51.jpeg', // Dra. Orizanda Claret
      'dr julio': 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-227.jpeg', // Dr. Tomás Machado
      'endodontia': 'https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_5650.JPG', // Clean Treatment Cabinet
      'fratura': 'https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_5640.JPG', // Reception sofa / Waiting lounge area
      'gengiva': 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-67.jpeg', // Dra. Alexandra Lucas (Periodontologia)
      'implantes': 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-51.jpeg', // Dra. Orizanda Claret
      'limpeza': 'https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_5650.JPG', // Elegant Clinic Treatment Cabinet
      'mexem': 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-94.jpeg', // Reception Front Desk Carla Claro
      'mitos': 'https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_5640.JPG', // Beautiful main lobby reception desk perspective
      'perda dentária': 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-132.jpeg', // Dra. Mariana Aberto
      'periodontite': 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-67.jpeg', // Dra. Alexandra Lucas
      'reabilitação': 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-227.jpeg', // Dr. Tomás Machado
      'sorriso sem escalas': 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-94.jpeg', // Front Desk Carla Claro
      'sorriso': 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-51.jpeg', // Dra. Orizanda Claret
      'dr tomas': 'https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-227.jpeg' // Dr. Tomás Machado
    };

    if (fallbacks[key]) {
      return fallbacks[key];
    }

    // Default to the main elegant clinic lobby area photo if not matched or old domain
    if (!originalThumbnail || originalThumbnail.includes('clinicasantamariadosolivais.pt')) {
      return 'https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_5640.JPG';
    }

    return originalThumbnail;
  };

  const [centerIndex, setCenterIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Deep linking and share URL states
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [highlightedPrice, setHighlightedPrice] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Helper to slugify accent characters so URLs look clean and modern
  const slugify = useCallback((text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }, []);

  // Update query parameter dynamically in the top URL bar without triggering reload
  const updateURL = useCallback((key: string, value: string | null) => {
    try {
      const url = new URL(window.location.href);
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
      window.history.replaceState(null, '', url.toString());
    } catch (e) {
      console.error("Could not update URL parameter:", e);
    }
  }, []);

  // Copy share button command
  const copyShareLink = useCallback((type: 'story' | 'service' | 'price', value: string) => {
    try {
      const url = new URL(window.location.origin + window.location.pathname);
      url.searchParams.set(type, value);
      navigator.clipboard.writeText(url.toString()).then(() => {
        let label = '';
        if (type === 'story') label = `vídeo "${value.replace(/-/g, ' ')}"`;
        else if (type === 'service') label = `serviço de "${value.replace(/-/g, ' ')}"`;
        else if (type === 'price') label = `preço de "${value.replace(/-/g, ' ')}"`;

        setCopiedText(`Link direto para ${label} copiado!`);
        setTimeout(() => setCopiedText(null), 3000);
      }).catch(() => {
        // Fallback or permission block
      });
    } catch (err) {
      console.error("Error copy share link: ", err);
    }
  }, []);
  
  const [isStoriesVisible, setIsStoriesVisible] = useState(true); // Default to true as it is the hero section
  const storiesSectionRef = useRef<HTMLElement>(null);
  const expVideoRef = useRef<HTMLVideoElement>(null);
  const campVideoRef = useRef<HTMLVideoElement>(null);
  const [isExpMuted, setIsExpMuted] = useState(true); 
  const [isCampMuted, setIsCampMuted] = useState(true);

  const servicesList = [
    {
      id: "01",
      slug: "implantologia",
      category: "IMPLANTOLOGIA",
      title: "Reabilitação Oral e Implantes",
      description: "Recupere o seu sorriso fixo. Implantes de titânio e coroas de cerâmica com a Dra. Ana Mata. Solução completa em Lisboa, sem necessidade de viagens de risco.",
      highlight: "A nossa diferença: Tratamento realizado em Portugal, com acompanhamento permanente presencial.",
      transparency: [
        "Implante Unitário + Coroa: desde 745€",
        "Protocolo Superior (Arcada Completa): 4.800€"
      ],
      buttonText: "Agendar Avaliação Implantologia"
    },
    {
      id: "02",
      slug: "ortodontia",
      category: "ORTODONTIA, ALINHADORES INVISÍVEIS",
      title: "Ortodontia e Alinhamento Dentário",
      description: "Alinhamento dentário para crianças e adultos. Aparelhos fixos convencionais e as soluções mais modernas de alinhadores invisíveis com a Dra. Mariana Aberto.",
      highlight: "Especialista em Alinhadores Spark e Ortodontia Clínica.",
      transparency: [
        "Estudo Ortodôntico Completo: 60€",
        "Aparelho Fixo Convencional: desde 450€ (por arcada)",
        "Alinhadores Invisíveis: Sob consulta médica."
      ],
      buttonText: "Marcar Estudo Ortodôntico"
    },
    {
      id: "03",
      slug: "facetas",
      category: "ESTÉTICA E FACETAS",
      title: "Estética e Facetas",
      description: "Melhoria da estética e harmonia do sorriso através da dentisteria avançada.",
      highlight: "Transforme o seu sorriso com facetas estéticas de alta qualidade.",
      transparency: [
        "Facetas 4 Dentes: 1.800€",
        "Facetas 1 Arcada: 4.550€",
        "Branqueamento: 200€"
      ],
      buttonText: "Agendar Avaliação Estética"
    },
    {
      id: "04",
      slug: "medicina-dentaria",
      category: "MEDICINA DENTÁRIA E DESVITALIZAÇÃO",
      title: "Medicina Dentária e Desvitalização",
      description: "Cuidados dentários gerais e tratamentos de desvitalização.",
      highlight: "Diagnóstico médico rigoroso com tecnologia digital.",
      transparency: [
        "Desvitalização Molar: 240€",
        "Desvitalização Incisivo/Canino: 180€",
        "Extração de Siso: 75€ a 200€"
      ],
      buttonText: "Marcar Consulta"
    }
  ];

  const trackGtagEvent = (name: string, params: any) => {
    if ((window as any).trackEvent) {
      (window as any).trackEvent(name, params);
    }
  };

  const [activeVideoProgress, setActiveVideoProgress] = useState(0);

  useEffect(() => {
    const activeVideo = videoRefs.current[centerIndex];
    if (!activeVideo) {
      setActiveVideoProgress(0);
      return;
    }

    const handleTimeUpdate = () => {
      if (activeVideo.duration) {
        const progress = (activeVideo.currentTime / activeVideo.duration) * 100;
        setActiveVideoProgress(progress);
      }
    };

    activeVideo.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      activeVideo.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [centerIndex, isStoriesVisible]);

  const handleNextStory = useCallback(() => {
    if (stories.length === 0) return;
    setCenterIndex((prev) => (prev + 1) % stories.length);
  }, [stories.length]);

  useEffect(() => {
    const enableAudio = () => {
      setHasInteracted(true);
      window.removeEventListener('click', enableAudio);
      window.removeEventListener('touchstart', enableAudio);
    };
    window.addEventListener('click', enableAudio);
    window.addEventListener('touchstart', enableAudio);
    return () => {
      window.removeEventListener('click', enableAudio);
      window.removeEventListener('touchstart', enableAudio);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === storiesSectionRef.current) {
            setIsStoriesVisible(entry.isIntersecting);
          }
          
          if (entry.target === expVideoRef.current) {
            if (entry.isIntersecting) {
              expVideoRef.current?.play().catch(() => {});
            } else {
              expVideoRef.current?.pause();
              setIsExpMuted(true);
              if (expVideoRef.current) expVideoRef.current.muted = true;
            }
          }

          if (entry.target === campVideoRef.current) {
            if (entry.isIntersecting) {
              campVideoRef.current?.play().catch(() => {});
            } else {
              campVideoRef.current?.pause();
              setIsCampMuted(true);
              if (campVideoRef.current) campVideoRef.current.muted = true;
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    if (storiesSectionRef.current) observer.observe(storiesSectionRef.current);
    if (expVideoRef.current) observer.observe(expVideoRef.current);
    if (campVideoRef.current) observer.observe(campVideoRef.current);
    return () => observer.disconnect();
  }, []);

  // Robust play function
  const safePlay = async (video: HTMLVideoElement, shouldBeMuted: boolean) => {
    try {
      video.muted = shouldBeMuted;
      if (video.paused) {
        await video.play();
      }
    } catch (err: any) {
      if (err.name === 'NotAllowedError') {
        video.muted = true;
        try {
          await video.play();
        } catch (retryErr) {
          // Silent fail
        }
      }
    }
  };

  useEffect(() => {
    const syncPlayback = async () => {
      if (!isStoriesVisible) {
        videoRefs.current.forEach(v => { 
          if (v && !v.paused) v.pause(); 
        });
        return;
      }

      videoRefs.current.forEach((v, i) => {
        if (!v) return;

        if (i === centerIndex) {
          // Center video: ensure attributes and play
          v.preload = "auto";
          safePlay(v, !hasInteracted);
        } else {
          // Other videos: pause and reduce resource usage
          if (!v.paused) v.pause();
          v.muted = true;
          v.preload = "metadata";
        }
      });
    };

    syncPlayback();
    
    // Watchdog for stalls
    const stallTimeout = setTimeout(() => {
      const activeVideo = videoRefs.current[centerIndex];
      if (activeVideo && isStoriesVisible && activeVideo.readyState < 2) {
        console.warn(`Video ${centerIndex} stalled, skipping...`);
        handleNextStory();
      }
    }, 10000);

    return () => clearTimeout(stallTimeout);
  }, [centerIndex, isStoriesVisible, hasInteracted, handleNextStory]);

  // Separate effect for autoplay retry
  useEffect(() => {
    if (!isStoriesVisible) return;

    const interval = setInterval(() => {
      const activeVideo = videoRefs.current[centerIndex];
      if (activeVideo && activeVideo.paused && isStoriesVisible) {
        activeVideo.play().catch(() => {});
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [centerIndex, isStoriesVisible]);

  // Read URL parameters on initial component mount to deep link to specific video story, service, or pricing card
  useEffect(() => {
    if (stories.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const storyParam = params.get('story');
    const serviceParam = params.get('service');
    const priceParam = params.get('price');

    if (storyParam) {
      const matchIndex = stories.findIndex((s: any) => slugify(s.title) === storyParam);
      if (matchIndex !== -1) {
        setCenterIndex(matchIndex);
      }
    }

    if (serviceParam) {
      const serviceSlug = serviceParam.toLowerCase().trim();
      const matchService = servicesList.find(s => s.slug === serviceSlug);
      if (matchService) {
        setExpandedService(matchService.slug);
        setTimeout(() => {
          const el = document.getElementById(`service-details-${matchService.slug}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 800);
      }
    }

    if (priceParam) {
      const priceVal = priceParam.toLowerCase().trim();
      setHighlightedPrice(priceVal);
      setTimeout(() => {
        const el = document.getElementById(`price-${priceVal}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 800);
    }
  }, [stories, slugify]);

  // Update dynamic URL parameter 'story' whenever center-focused story changes
  useEffect(() => {
    if (stories.length > 0 && stories[centerIndex]) {
      const storyTitle = stories[centerIndex].title;
      if (storyTitle) {
        updateURL('story', slugify(storyTitle));
      }
    }
  }, [centerIndex, stories, slugify, updateURL]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || stories.length === 0) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 30) {
      if (diff > 0) handleNextStory();
      else setCenterIndex((prev) => (prev - 1 + stories.length) % stories.length);
    }
    touchStartX.current = null;
  };

  const getStoryStyle = (index: number) => {
    if (stories.length === 0) return {};
    let diff = index - centerIndex;
    if (diff > stories.length / 2) diff -= stories.length;
    if (diff < -stories.length / 2) diff += stories.length;
    const absDiff = Math.abs(diff);
    const opacity = absDiff === 0 ? 1 : Math.max(0.25, 0.50 - (absDiff * 0.15));
    const scale = absDiff === 0 ? 1 : Math.max(0.65, 0.85 - (absDiff * 0.15));
    const translateZ = absDiff === 0 ? 150 : -200;
    const zIndex = 100 - Math.floor(absDiff * 20);
    const translateX = diff * 70; // Espaçamento mais dinâmico

    return {
      transform: `translate3d(${translateX}%, 0, ${translateZ}px) scale(${scale})`,
      opacity: opacity,
      zIndex: zIndex,
      transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
      willChange: 'transform, opacity',
      filter: absDiff === 0 ? 'none' : 'blur(1px)'
    };
  };

  const toggleExpMute = () => {
    if (!expVideoRef.current) return;
    const newMuted = !isExpMuted;
    expVideoRef.current.muted = newMuted;
    setIsExpMuted(newMuted);
    if (!newMuted) {
        setHasInteracted(true);
        if (campVideoRef.current) { campVideoRef.current.muted = true; setIsCampMuted(true); }
        videoRefs.current.forEach(v => { if (v) v.muted = true; });
    }
  };

  const toggleCampMute = () => {
    if (!campVideoRef.current) return;
    const newMuted = !isCampMuted;
    campVideoRef.current.muted = newMuted;
    setIsCampMuted(newMuted);
    if (!newMuted) {
        setHasInteracted(true);
        if (expVideoRef.current) { expVideoRef.current.muted = true; setIsExpMuted(true); }
        videoRefs.current.forEach(v => { if (v) v.muted = true; });
    }
  };

  return (
    <div className="relative animate-fade-in-up overflow-x-hidden bg-clinic-bg">
      
      {/* Hero Section */}
      <section className="relative z-30 text-center px-4 sm:px-6 lg:px-8 mb-4 md:mb-12" aria-labelledby="main-heading">
        <h1 id="main-heading" className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold text-clinic-blue mb-8 leading-tight break-normal hyphens-none">
          <span className="font-body text-clinic-purple text-lg md:text-3xl lg:text-4xl font-medium mr-2 block sm:inline">Clínica Dentária</span>
          {heroTitle.replace('Clínica', '')}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 max-w-4xl mx-auto font-light px-4 leading-relaxed">{heroSubtitle}</p>
      </section>

      {/* Stories Section */}
      <section ref={storiesSectionRef} className="relative h-[400px] md:h-[600px] xl:h-[700px] max-w-7xl mx-auto overflow-visible mb-16 flex justify-center items-center" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} aria-label="Histórias de Sucesso">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
           <div className="absolute inset-[5%] rounded-full blur-[90px] md:blur-[250px] animate-glow-cycle opacity-[0.48]" style={{ background: 'radial-gradient(circle, currentColor 0%, currentColor 12%, #f2f2f2 35%)', willChange: 'filter' }}></div>
        </div>

        <div className="relative z-20 w-full h-full flex justify-center items-center perspective-[2000px]">
          {stories.map((story: any, index: number) => {
            const isCenter = centerIndex === index;
            return (
              <div 
                key={story.id} 
                className={`absolute w-[140px] aspect-[9/16] sm:w-[180px] md:w-[240px] xl:w-[280px] rounded-[2.5rem] md:rounded-[4rem] border-[4px] border-white overflow-hidden cursor-pointer transition-all duration-500 isolate ${isCenter ? 'ring-4 ring-clinic-lime/70 shadow-[0_45px_100px_-10px_rgba(0,0,0,0.75)] scale-110' : 'shadow-xl'}`}
                style={{
                  ...getStoryStyle(index),
                  WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                }} 
                onClick={() => setCenterIndex(index)} 
              >
                <div className="absolute inset-0 bg-black">
                  {story.type === 'video' && (() => {
                    const diff = index - centerIndex;
                    let normalizedDiff = diff;
                    if (normalizedDiff > stories.length / 2) normalizedDiff -= stories.length;
                    if (normalizedDiff < -stories.length / 2) normalizedDiff += stories.length;
                    const absDiff = Math.abs(normalizedDiff);
                    const isNear = absDiff <= 1;

                    return (
                      <video 
                        key={story.src} 
                        ref={(el) => (videoRefs.current[index] = el)} 
                        src={`${story.src}#t=0.1`}
                        className={`absolute inset-0 w-full h-full object-cover scale-[1.05] transition-all duration-500 bg-black/40 ${isCenter ? 'opacity-100 pointer-events-auto' : 'opacity-80 pointer-events-none'}`}
                        style={{ transform: 'translateZ(0)', minWidth: '100%', minHeight: '100%' }}
                        playsInline 
                        muted={true}
                        autoPlay={isCenter}
                        preload="auto"
                        onCanPlay={(e) => {
                          if (isCenter && isStoriesVisible) {
                            e.currentTarget.play().catch(() => {});
                          }
                        }}
                        onEnded={(e) => {
                          e.currentTarget.load();
                          if (isCenter) handleNextStory();
                        }}
                        crossOrigin="anonymous"
                      />
                    );
                  })()}
                  
                  {isCenter && (
                    <>
                      {/* Progress Bar at the bottom */}
                      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/20 z-20">
                        <div 
                          className="h-full bg-gradient-to-r from-clinic-blue via-clinic-lime to-clinic-purple transition-all duration-150 ease-linear"
                          style={{ width: `${activeVideoProgress}%` }}
                        />
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 bg-gradient-to-t from-black/95 to-transparent z-10 flex flex-col items-center justify-center gap-1.5">
                        <p className="text-white text-[9px] md:text-xs font-bold uppercase tracking-widest text-center drop-shadow-md">
                          {story.title}
                        </p>
                        <button
                          title="Partilhar este vídeo"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyShareLink('story', slugify(story.title));
                          }}
                          className="bg-white/20 hover:bg-clinic-lime hover:text-clinic-blue text-white px-3 py-1 rounded-full text-[9px] font-bold transition-all uppercase tracking-wide flex items-center justify-center gap-1.5 backdrop-blur-md border border-white/10 active:scale-95 pointer-events-auto"
                        >
                          <i className="fas fa-link text-[8px]" />
                          <span>Partilhar</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Campanha Sorriso Sem Escalas - Versão Compacta */}
      <section className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 mb-12 bg-white/40 backdrop-blur-md rounded-[40px] md:rounded-[60px] border border-white shadow-2xl overflow-hidden" aria-labelledby="campaign-heading">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 lg:pl-8">
            <span className="inline-block bg-clinic-purple text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">Campanha Exclusiva</span>
            <h2 id="campaign-heading" className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-clinic-blue mb-8 leading-tight">Clínica Santa Maria dos Olivais:<br /><span className="text-clinic-purple font-serif italic">Excelência e Proximidade</span></h2>
            
            <div className="text-lg text-gray-700 mb-10 leading-relaxed space-y-8 font-light">
              <div>
                <h3 className="text-2xl font-bold text-clinic-blue mb-3">Uma Década a Criar Sorrisos em Lisboa</h3>
                <p>Com 10 anos de experiência, a nossa clínica em Olivais é referência em Implantologia e Estética Dentária. Aliamos o rigor técnico à inovação para oferecer tratamentos personalizados, desde Facetas Estéticas a reabilitações complexas, focando sempre na sua saúde e harmonia facial.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              <Link 
                to="/marcacoes" 
                state={{ service: "Implantologia" }} 
                id="price-implante-745"
                onClick={() => {
                  updateURL('price', 'implante-745');
                  setHighlightedPrice('implante-745');
                }}
                className={`bg-white p-6 sm:p-8 rounded-2xl shadow-md border-l-8 border-clinic-lime transition-all duration-300 hover:scale-[1.02] hover:shadow-lg block group overflow-hidden relative ${highlightedPrice === 'implante-745' ? 'ring-4 ring-clinic-lime scale-[1.02] shadow-xl' : ''}`}
              >
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest group-hover:text-clinic-lime transition-colors leading-tight break-normal hyphens-none">Implante Unitário + Coroa</p>
                    <p className="text-2xl md:text-3xl font-bold text-clinic-blue leading-none">Desde 745 €*</p>
                  </div>
                  <button
                    title="Partilhar este preço"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      updateURL('price', 'implante-745');
                      setHighlightedPrice('implante-745');
                      copyShareLink('price', 'implante-745');
                    }}
                    className="p-1.5 px-2.5 rounded-lg bg-clinic-bg hover:bg-clinic-lime hover:text-clinic-blue text-clinic-purple transition-all text-xs flex items-center gap-1 z-20 border border-clinic-blue/5 shadow-sm"
                  >
                    <i className="fas fa-link text-[9px]" />
                    <span className="text-[9px] font-bold uppercase">Partilhar Preço</span>
                  </button>
                </div>
                <p className="text-[11px] text-clinic-purple font-medium italic leading-tight mt-1">(Inclui fase cirúrgica e coroa metalo-cerâmica)</p>
                {highlightedPrice === 'implante-745' && (
                  <span className="absolute top-0 right-0 bg-clinic-lime text-clinic-blue text-[9px] font-bold px-3 py-1 rounded-bl-xl tracking-wider uppercase shadow-md">Preço Partilhado</span>
                )}
              </Link>

              <Link 
                to="/marcacoes" 
                state={{ service: "Implantologia" }} 
                id="price-protocolo-4800"
                onClick={() => {
                  updateURL('price', 'protocolo-4800');
                  setHighlightedPrice('protocolo-4800');
                }}
                className={`bg-white p-6 sm:p-8 rounded-2xl shadow-md border-l-8 border-clinic-purple transition-all duration-300 hover:scale-[1.02] hover:shadow-lg block group overflow-hidden relative ${highlightedPrice === 'protocolo-4800' ? 'ring-4 ring-clinic-purple scale-[1.02] shadow-xl' : ''}`}
              >
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest group-hover:text-clinic-purple transition-colors leading-tight break-normal hyphens-none">Protocolo Superior (Dentes Fixos)</p>
                    <p className="text-2xl md:text-3xl font-bold text-clinic-blue leading-none">Desde 4.800 €*</p>
                  </div>
                  <button
                    title="Partilhar este preço"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      updateURL('price', 'protocolo-4800');
                      setHighlightedPrice('protocolo-4800');
                      copyShareLink('price', 'protocolo-4800');
                    }}
                    className="p-1.5 px-2.5 rounded-lg bg-clinic-bg hover:bg-clinic-purple hover:text-white text-clinic-purple transition-all text-xs flex items-center gap-1 z-20 border border-clinic-blue/5 shadow-sm"
                  >
                    <i className="fas fa-link text-[9px]" />
                    <span className="text-[9px] font-bold uppercase">Partilhar Preço</span>
                  </button>
                </div>
                <p className="text-[11px] text-clinic-purple font-medium italic leading-tight mt-1">(Reabilitação total de arcada)</p>
                {highlightedPrice === 'protocolo-4800' && (
                  <span className="absolute top-0 right-0 bg-clinic-purple text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl tracking-wider uppercase shadow-md">Preço Partilhado</span>
                )}
              </Link>

              <Link 
                to="/marcacoes" 
                state={{ service: "Estética Dentária" }} 
                id="price-facetas-1800"
                onClick={() => {
                  updateURL('price', 'facetas-1800');
                  setHighlightedPrice('price-facetas-1800');
                }}
                className={`bg-white p-6 sm:p-8 rounded-2xl shadow-md border-l-8 border-clinic-blue transition-all duration-300 hover:scale-[1.02] hover:shadow-lg block group overflow-hidden relative ${highlightedPrice === 'facetas-1800' ? 'ring-4 ring-clinic-blue scale-[1.02] shadow-xl' : ''}`}
              >
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest group-hover:text-clinic-blue transition-colors leading-tight break-normal hyphens-none">Facetas Estéticas (Pack 4 dentes)</p>
                    <p className="text-2xl md:text-3xl font-bold text-clinic-blue leading-none">Desde 1.800 €*</p>
                  </div>
                  <button
                    title="Partilhar este preço"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      updateURL('price', 'facetas-1800');
                      setHighlightedPrice('facetas-1800');
                      copyShareLink('price', 'facetas-1800');
                    }}
                    className="p-1.5 px-2.5 rounded-lg bg-clinic-bg hover:bg-clinic-blue hover:text-white text-clinic-purple transition-all text-xs flex items-center gap-1 z-20 border border-clinic-blue/5 shadow-sm"
                  >
                    <i className="fas fa-link text-[9px]" />
                    <span className="text-[9px] font-bold uppercase">Partilhar Preço</span>
                  </button>
                </div>
                <p className="text-[11px] text-clinic-purple font-medium italic leading-tight mt-1">(Zona estética frontal)</p>
                {highlightedPrice === 'facetas-1800' && (
                  <span className="absolute top-0 right-0 bg-clinic-blue text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl tracking-wider uppercase shadow-md">Preço Partilhado</span>
                )}
              </Link>
            </div>
            
            <p className="text-[10px] text-gray-400 mb-4 italic leading-tight">
              *Nota Legal: Valores de referência para casos standard, sujeitos a avaliação médica presencial. Não inclui enxertos ósseos se necessários.
            </p>
          </div>
          
          <div className="order-1 lg:order-2 flex flex-col justify-center items-center gap-8">
            <div className="relative w-full max-w-[240px] md:max-w-[320px] aspect-[9/16] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_35px_70px_-15px_rgba(0,0,0,0.6)] border-[4px] border-white bg-black">
              <video 
                ref={campVideoRef}
                src="https://clinica-santa-maria-dos-olivais.b-cdn.net/0309.mp4" 
                loop 
                muted 
                playsInline 
                preload="metadata"
                poster="https://clinica-santa-maria-dos-olivais.b-cdn.net/0309.mp4#t=0.1"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-[1.05]"
                aria-label="Vídeo informativo sobre cuidados dentários em Portugal"
              />
              <button 
                onClick={toggleCampMute}
                aria-label={isCampMuted ? "Ativar som do vídeo" : "Desativar som do vídeo"}
                className="absolute bottom-4 right-4 z-40 w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-clinic-blue transition-all"
              >
                <i className={`fas ${isCampMuted ? 'fa-volume-xmark' : 'fa-volume-high'} text-sm`}></i>
              </button>
            </div>
            <Link to="/marcacoes" onClick={() => trackGtagEvent('click_agendar_consulta', { 'event_category': 'engagement' })} className="inline-block bg-clinic-blue text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-clinic-purple transition-all transform hover:scale-105 text-center">Marque a Sua Consulta</Link>
          </div>
        </div>
      </section>

      {/* Seção 10 Anos de Experiência */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative overflow-visible border-t border-clinic-lime/10" aria-labelledby="experience-heading">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-20">
          <div className="flex flex-col items-center lg:items-end order-2 lg:order-1 gap-10">
             <div className="relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px] aspect-[9/16] rounded-[2.8rem] md:rounded-[4.5rem] flex items-center justify-center overflow-visible">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] rounded-full blur-[90px] md:blur-[250px] animate-glow-cycle opacity-[0.48] -z-10" style={{ background: 'radial-gradient(circle, currentColor 0%, currentColor 12%, #f2f2f2 38%)' }}></div>
                <div className="relative z-20 w-full h-full rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border-[4px] border-white shadow-[0_35px_70px_-15px_rgba(0,0,0,0.6)] bg-black">
                  <video 
                    ref={expVideoRef} 
                    src="https://clinica-santa-maria-dos-olivais.b-cdn.net/clinicadentaria-santamariadosolivais.mp4" 
                    loop 
                    muted 
                    playsInline 
                    preload="metadata" 
                    poster="https://clinica-santa-maria-dos-olivais.b-cdn.net/clinicadentaria-santamariadosolivais.mp4#t=0.1"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover scale-[1.05]" 
                  />
                  <button 
                    onClick={toggleExpMute} 
                    aria-label={isExpMuted ? "Ativar som do vídeo institucional" : "Desativar som do vídeo institucional"}
                    className="absolute bottom-6 right-6 z-40 w-12 h-12 bg-white/25 backdrop-blur-lg rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-clinic-blue transition-all"
                  >
                    <i className={`fas ${isExpMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`}></i>
                  </button>
                </div>
             </div>
             <Link to="/campanhas" className="bg-clinic-purple text-white px-8 py-3 rounded-full text-lg font-bold shadow-xl hover:bg-clinic-blue transition-all transform hover:scale-105">Ver Mais <i className="fas fa-arrow-right ml-2 text-sm"></i></Link>
          </div>
          <div className="relative z-30 text-center lg:text-left order-1 lg:order-2">
            <h2 id="experience-heading" className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-clinic-blue leading-[1.1]"><div className="flex flex-wrap justify-center lg:justify-start items-center gap-2"><span>Com</span><span className="font-serif italic text-clinic-lime text-4xl md:text-6xl lg:text-[10rem]">10</span><span>anos de</span></div><div className="font-serif italic text-clinic-purple">Experiência</div></h2>
            <div className="mt-8 md:mt-12 space-y-4"><p className="text-xl sm:text-2xl md:text-4xl font-bold text-clinic-blue tracking-tight">Implantes | Estética Dentária | Ortodontia</p><p className="text-lg sm:text-xl md:text-2xl font-serif italic text-clinic-purple">Tratamentos personalizados para toda a família👇</p></div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32" aria-labelledby="services-heading">
        <div className="text-center mb-20">
          <h2 id="services-heading" className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic border-b-8 border-clinic-lime inline-block pb-4 leading-tight">Nossos Serviços Dentários</h2>
        </div>
        <div className="grid gap-8">
          {servicesList.map((service, index) => (
            <details 
              key={index} 
              id={`service-details-${service.slug}`}
              open={expandedService === service.slug}
              className="group bg-white rounded-3xl border border-clinic-blue/5 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.20)] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.40)] open:border-clinic-lime animate-fade-in-up"
            >
              <summary 
                className="flex justify-between items-center cursor-pointer p-6 md:p-8 list-none select-none"
                onClick={(e) => {
                  e.preventDefault(); // Control state manually to support dynamic URL parameters & deep links smoothly
                  const newExpanded = expandedService === service.slug ? null : service.slug;
                  setExpandedService(newExpanded);
                  updateURL('service', newExpanded);
                  if (newExpanded) {
                    trackGtagEvent('view_service_detail', { 'event_category': 'engagement', 'event_label': service.category });
                  }
                }}
              >
                <div className="flex items-center gap-6">
                  <span className="text-3xl md:text-5xl font-serif italic text-clinic-lime/20 font-bold group-open:text-clinic-lime" aria-hidden="true">{service.id}</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] md:text-xs font-bold text-clinic-purple tracking-widest uppercase mb-1">{service.category}</span>
                    <h3 className="text-base sm:text-lg md:text-3xl font-semibold text-clinic-blue group-open:text-clinic-purple transition-colors uppercase leading-tight flex items-center gap-2.5 flex-wrap">
                      <span>{service.title}</span>
                      <button
                        title="Partilhar este serviço"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          updateURL('service', service.slug);
                          setExpandedService(service.slug);
                          copyShareLink('service', service.slug);
                        }}
                        className="p-1 px-2.5 text-[9px] rounded-lg bg-clinic-bg hover:bg-clinic-purple hover:text-white text-clinic-purple/70 transition-all font-sans font-bold uppercase tracking-wide flex items-center gap-1 border border-clinic-blue/5 shadow-sm"
                      >
                        <i className="fas fa-link text-[8px]" />
                        <span>Partilhar</span>
                      </button>
                    </h3>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-clinic-bg flex items-center justify-center text-clinic-blue transition-all group-open:rotate-180 group-open:bg-clinic-blue group-open:text-white"><i className="fas fa-chevron-down"></i></div>
              </summary>
              <div className="px-8 pb-10 pt-2 md:px-16">
                <div className="max-w-3xl space-y-6">
                  <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                    {service.description}
                  </p>
                  
                  <div className="p-5 bg-clinic-bg rounded-2xl border-l-4 border-clinic-lime">
                    <p className="font-bold text-clinic-blue mb-4 italic">{service.highlight}</p>
                    <div className="space-y-3">
                       <p className="text-xs font-bold uppercase tracking-wider text-clinic-purple mb-2">Transparência:</p>
                        {service.transparency.map((line: string, idx: number) => {
                          const colonIndex = line.lastIndexOf(':');
                          if (colonIndex !== -1 && !line.startsWith('-')) {
                            const name = line.substring(0, colonIndex).trim();
                            const value = line.substring(colonIndex + 1).trim();
                            return (
                              <div key={idx} className="flex flex-col gap-1 border-b border-clinic-blue/5 py-4 last:border-0 w-full group">
                                <span className="text-base md:text-lg font-semibold text-clinic-blue leading-snug break-normal hyphens-none group-hover:text-clinic-purple transition-colors">{name}</span>
                                <span className="text-lg md:text-xl font-bold text-clinic-purple break-normal hyphens-none">{value}</span>
                              </div>
                            );
                          }
                          return (
                            <p key={idx} className={`text-sm md:text-base font-semibold text-clinic-blue py-1.5 ${line.startsWith('-') ? 'ml-4 font-normal text-gray-700 italic border-l-2 border-clinic-lime/20 pl-4 my-2' : ''}`}>
                              {line}
                            </p>
                          );
                        })}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <Link to={`/servicos/${service.slug}`} className="inline-block bg-clinic-purple text-white font-black px-10 py-4 rounded-full shadow-lg hover:bg-clinic-blue transition-all uppercase text-sm md:text-base transform hover:scale-105 active:scale-95">
                      Ver Detalhes
                    </Link>
                    <Link to="/marcacoes" state={{ service: service.category }} onClick={() => trackGtagEvent('click_service_cta', { 'event_category': 'engagement', 'event_label': service.buttonText })} className="inline-block bg-clinic-lime text-clinic-blue font-black px-10 py-4 rounded-full shadow-lg hover:bg-clinic-blue hover:text-white transition-all uppercase text-sm md:text-base transform hover:scale-105 active:scale-95">
                      {service.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Seção Seguros e Reembolsos */}
      <section className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-t border-clinic-lime/20" aria-labelledby="insurance-heading">
        <div className="text-center mb-16">
          <h2 id="insurance-heading" className="text-3xl sm:text-5xl md:text-6xl font-bold text-clinic-blue mb-6 leading-tight">Aceitamos o seu Seguro em <br /><span className="text-clinic-purple italic font-serif">Regime de Reembolso</span></h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Na Clínica Santa Maria dos Olivais, escolhe o seu médico pela qualidade, não pela lista da seguradora. Atendimento premium e personalizado.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
          <div className="bg-white p-8 rounded-[30px] shadow-xl border-t-4 border-clinic-lime flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-clinic-bg rounded-full flex items-center justify-center text-clinic-blue mb-6 text-2xl"><i className="fas fa-stethoscope"></i></div>
            <h3 className="text-xl font-bold text-clinic-blue mb-4">1. Tratamento</h3>
            <p className="text-gray-600 text-sm">Realiza o tratamento com os nossos especialistas com total liberdade de escolha clínica.</p>
          </div>
          <div className="bg-white p-8 rounded-[30px] shadow-xl border-t-4 border-clinic-lime flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-clinic-bg rounded-full flex items-center justify-center text-clinic-blue mb-6 text-2xl"><i className="fas fa-file-invoice-dollar"></i></div>
            <h3 className="text-xl font-bold text-clinic-blue mb-4">2. Faturação</h3>
            <p className="text-gray-600 text-sm">Efetuamos a fatura detalhada com todos os códigos OMD exigidos pelas seguradoras como a ADSE, Médis, Allianz ou Multicare.</p>
          </div>
          <div className="bg-white p-8 rounded-[30px] shadow-xl border-t-4 border-clinic-lime flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-clinic-bg rounded-full flex items-center justify-center text-clinic-blue mb-6 text-2xl"><i className="fas fa-mobile-alt"></i></div>
            <h3 className="text-xl font-bold text-clinic-blue mb-4">3. Reembolso</h3>
            <p className="text-gray-600 text-sm">O reembolso é processado pela sua seguradora de acordo com as condições específicas da sua apólice e prazos determinados pela mesma.</p>
          </div>
        </div>

        <div className="bg-clinic-blue text-white p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-2xl font-bold mb-4">Nota importante sobre pagamentos</h4>
              <p className="text-white/80 leading-relaxed italic">
                Não realizamos financiamento bancário direto. O pagamento é feito no ato, garantindo-lhe o melhor preço final sem juros e transparência total sobre o valor investido na sua saúde.
              </p>
            </div>
            <div className="flex flex-wrap gap-8 items-center justify-center md:justify-end md:border-l-2 border-white/20 md:pl-8">
               <span className="text-3xl font-black tracking-tighter" style={{ color: '#005CA9' }}>ADSE</span>
               <span className="text-2xl font-bold tracking-tight" style={{ color: '#003781' }}>Allianz</span>
               <span className="text-2xl font-semibold italic text-clinic-purple">Médis</span>
               <span className="text-2xl font-bold tracking-widest text-clinic-lime">MULTICARE</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-30 py-16 md:py-24 text-center">
        <div className="max-w-[1100px] mx-auto px-4 flex flex-col items-center">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-clinic-blue mb-12 flex flex-wrap justify-center items-center gap-4"><span>Transforme o seu</span><div className="w-[80px] h-[55px] md:w-[150px] md:h-[100px] rounded-2xl overflow-hidden border-4 border-white shadow-xl flex items-center justify-center bg-white/10"><img src="https://clinica-santa-maria-dos-olivais.b-cdn.net/Icono-Nocturno.png" className="w-[85%] h-[85%] object-contain animate-float" alt="Smile Logo" loading="lazy" decoding="async" /></div><span className="font-serif italic text-clinic-purple">sorriso</span><span>hoje!</span></h2>
          <Link to="/marcacoes" className="inline-block bg-clinic-blue text-white px-6 py-4 rounded-full text-base font-bold shadow-2xl hover:bg-clinic-purple transition-all transform hover:-translate-y-2 text-center w-full max-w-[320px] sm:w-auto sm:px-12 sm:py-5 sm:text-xl active:scale-95">Agende Sua Consulta <span className="animate-pulse ml-2 inline-block">♥</span></Link>
        </div>
      </section>

      {/* Floating Dynamic Link Copy Toast Notifier */}
      {copiedText && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-clinic-blue text-white border-2 border-clinic-lime/60 px-6 py-3.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] font-bold tracking-wide flex items-center gap-3 animate-fade-in text-center text-sm md:text-base">
          <i className="fas fa-circle-check text-clinic-lime animate-pulse text-base sm:text-lg"></i>
          <span>{copiedText}</span>
        </div>
      )}
    </div>
  );
};

export default Home;
