import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const videoTestimonials = [
  "https://clinica-santa-maria-dos-olivais.b-cdn.net/V1.mp4",
  "https://clinica-santa-maria-dos-olivais.b-cdn.net/V2.mp4",
  "https://clinica-santa-maria-dos-olivais.b-cdn.net/V3.MOV",
  "https://clinica-santa-maria-dos-olivais.b-cdn.net/V4.mp4",
  "https://clinica-santa-maria-dos-olivais.b-cdn.net/V5.mp4",
  "https://clinica-santa-maria-dos-olivais.b-cdn.net/V6.mp4",
  "https://clinica-santa-maria-dos-olivais.b-cdn.net/V7.mp4",
  "https://clinica-santa-maria-dos-olivais.b-cdn.net/V8.mp4",
  "https://clinica-santa-maria-dos-olivais.b-cdn.net/V9.mp4",
  "https://clinica-santa-maria-dos-olivais.b-cdn.net/V10.mp4",
  "https://clinica-santa-maria-dos-olivais.b-cdn.net/V11.mp4",
  "https://clinica-santa-maria-dos-olivais.b-cdn.net/V12.mp4"
];

const transformationGallery = [
  { src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/P1.jpg" },
  { src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/P2.jpg" },
  { src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/P3.jpg" },
  { src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/P4.jpg" },
  { src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/P5.jpg" },
  { src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/P6.jpg" },
  { src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/P7.jpg" },
  { src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/P8.jpg" },
  { src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/P9.jpg" }
];

const CaseStudies: React.FC = () => {
  const [centerIndex, setCenterIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const centerIndexRef = useRef(centerIndex);
  useEffect(() => { centerIndexRef.current = centerIndex; }, [centerIndex]);

  const safePlay = async (video: HTMLVideoElement) => {
    try {
      // Small delay to let React's state settle
      await new Promise(resolve => setTimeout(resolve, 0));
      if (video.paused) {
        await video.play();
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error("Playback failed:", error);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            if (videoRefs.current.indexOf(video) === centerIndexRef.current) {
              safePlay(video);
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === centerIndex) {
          safePlay(video);
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [centerIndex]);

  const getStoryStyle = (index: number) => {
    const offset = (index - centerIndex + videoTestimonials.length) % videoTestimonials.length;
    let position = offset > videoTestimonials.length / 2 ? offset - videoTestimonials.length : offset;
    
    return {
      zIndex: 10 - Math.abs(position),
      // Reduced displacement (100% -> 60%) to bring items closer
      // Increased scaling (0.2 -> 0.1) so neighbors are larger
      transform: `translateX(${position * 60}%) scale(${1 - Math.abs(position) * 0.1})`,
      // Reduced opacity drop (0.3 -> 0.15) for better visibility
      opacity: 1 - Math.abs(position) * 0.15,
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 bg-clinic-bg overflow-hidden">
      <h1 className="text-5xl font-bold text-clinic-blue text-center mb-20">Casos Clínicos</h1>
      
      {/* Stories-style Carousel */}
      <section className="h-[500px] md:h-[600px] mb-24 relative flex justify-center items-center">
        <div className="relative w-full h-full perspective-[1500px]">
          {videoTestimonials.map((src, index) => (
            <div 
              key={index} 
              className="absolute w-[180px] md:w-[250px] aspect-[9/16] rounded-[2.5rem] border-[4px] border-white shadow-2xl overflow-hidden cursor-pointer transition-all duration-500"
              style={getStoryStyle(index)}
              onClick={() => setCenterIndex(index)}
            >
              <video 
                ref={(el) => (videoRefs.current[index] = el)}
                src={src}
                className="w-full h-full object-cover bg-black"
                muted={index === centerIndex ? isMuted : true}
                playsInline
                onEnded={() => {
                    if (isMuted) {
                        setCenterIndex((prev) => (prev + 1) % videoTestimonials.length);
                    }
                }}
              />
              {index === centerIndex && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  className="absolute top-4 right-4 z-20 bg-black/50 p-2 rounded-full text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Before/After Gallery */}
      <section>
        <h2 className="text-3xl font-bold text-clinic-blue mb-10 text-center">Transformações Reais</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
           {transformationGallery.map((item, i) => (
             <motion.div 
               key={i}
               className="relative h-96 group cursor-pointer overflow-hidden rounded-3xl border-4 border-white shadow-xl"
               whileHover={{ scale: 1.02 }}
             >
               <img src={item.src} className="w-full h-full object-cover group-hover:brightness-100 brightness-50 transition-all duration-500" />
             </motion.div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;

