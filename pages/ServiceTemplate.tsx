import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { serviceDetails } from '../constants/servicesData';
import { useLanguage } from '../context/LanguageContext';

export const ServiceTemplate: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, translateObject } = useLanguage();
  const [isMuted, setIsMuted] = useState(true);
  const [isAllOpen, setIsAllOpen] = useState(false); // Default closed
  const [openGroups, setOpenGroups] = useState<Record<number, boolean>>({});
  const [selectedItemSlug, setSelectedItemSlug] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleAll = () => {
    setIsAllOpen(prev => !prev);
  };

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD') // Normaliza acentos como á -> a, ç -> c
      .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos
      .replace(/[^\w\s-]/g, '') // Filtra caracteres no alfanuméricos (\w incluye letras, números y guión bajo)
      .trim()
      .replace(/\s+/g, '-') // Reemplaza espacios por guiones
      .replace(/-+/g, '-') // Evita guiones consecutivos
      .replace(/^-+|-+$/g, ''); // Remueve guiones al inicio o al final para URLs impecables
  };

  const getCleanValueStr = (val: string) => {
    return val.replace(/[^0-9]/g, '');
  };

  const isGroupOpen = (idx: number) => {
    if (openGroups[idx] !== undefined) {
      return openGroups[idx];
    }
    return isAllOpen;
  };

  const toggleGroup = (idx: number) => {
    setOpenGroups(prev => ({
      ...prev,
      [idx]: !isGroupOpen(idx)
    }));
  };

  const handleItemClick = (itemName: string, itemValue: string, groupIdx?: number) => {
    const itemSlug = slugify(itemName);
    setSelectedItemSlug(itemSlug);

    // Update the URL query parameter cleanly
    const newUrl = `${window.location.pathname}?item=${itemSlug}`;
    window.history.replaceState(null, '', newUrl);

    // Copy the link to clipboard automatically to let them easily grab campaign links!
    const fullUrl = `${window.location.origin}${newUrl}`;
    navigator.clipboard.writeText(fullUrl).catch(() => {});

    // Hook tracking if available
    if ((window as any).trackEvent) {
      (window as any).trackEvent('select_treatment_item_campaign', {
        service: slug,
        item: itemName,
        value: itemValue,
        slug: itemSlug
      });
    }
  };

  const service = slug ? translateObject(serviceDetails[slug]) : null;

  useEffect(() => {
    if (!service) return;

    // Read query params
    const queryParams = new URLSearchParams(window.location.search);
    const itemQuery = queryParams.get('item') || queryParams.get('p') || queryParams.get('preco');

    if (itemQuery) {
      const targetQuery = itemQuery.toLowerCase();
      let foundGroupIdx: number | null = null;
      let foundItemSlug: string | null = null;

      if (service.priceGroups && service.priceGroups.length > 0) {
        service.priceGroups.forEach((group: any, groupIdx: number) => {
          group.items.forEach((item: any) => {
            const itemSlug = slugify(item.name);
            const valNum = getCleanValueStr(item.value);
            if (itemSlug === targetQuery || valNum === targetQuery) {
              foundGroupIdx = groupIdx;
              foundItemSlug = itemSlug;
            }
          });
        });
      }

      if (service.prices && service.prices.length > 0) {
        service.prices.forEach((item: any) => {
          const itemSlug = slugify(item.name);
          const valNum = getCleanValueStr(item.value);
          if (itemSlug === targetQuery || valNum === targetQuery) {
            foundItemSlug = itemSlug;
          }
        });
      }

      if (foundItemSlug) {
        setSelectedItemSlug(foundItemSlug);
        if (foundGroupIdx !== null) {
          setOpenGroups(prev => ({ ...prev, [foundGroupIdx!]: true }));
        }

        // Scroll to the element
        setTimeout(() => {
          const element = document.getElementById(`price-item-${foundItemSlug}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 850);
      }
    }
  }, [slug, service]);
  
  useEffect(() => {
    if ((window as any).trackEvent) {
      (window as any).trackEvent('view_service', {
        service: slug
      });
    }
    // Meta Pixel Tracking
    if ((window as any).trackMeta) {
      (window as any).trackMeta('ViewContent', {
        content_name: service?.title || slug,
        content_category: 'Serviço Odontológico'
      }, true);
    }
    // Google Tag Manager Data Layer
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'view_service_page',
        service_category: slug
      });
    }
  }, [slug]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  if (!service) return <div className="p-20 text-center text-red-600 font-bold text-2xl">Serviço não encontrado: {slug}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-clinic-blue mb-10 leading-tight">{service.title}</h1>
      
      {service.note && (
        <div className="bg-clinic-purple text-white p-8 rounded-2xl mb-16 shadow-lg text-center font-bold text-xl md:text-2xl leading-relaxed">
          {service.note}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
        <div className="space-y-12">
          <div className="flex flex-col xl:flex-row gap-8 items-start">
            {service.videoSrc && (
              <div className="w-full xl:w-[45%] flex justify-center">
                <div className="relative w-full max-w-[280px] aspect-[9/16] rounded-[2.5rem] border-[4px] border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden bg-black">
                  <video
                    ref={videoRef}
                    src={service.videoSrc}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    poster={`${service.videoSrc}#t=0.1`}
                    onClick={() => {
                      if ((window as any).trackEvent) {
                        (window as any).trackEvent('click_service_video', { service: slug });
                      }
                    }}
                  />
                  <button 
                    onClick={toggleMute}
                    aria-label={isMuted ? "Ativar som" : "Desativar som"}
                    className="absolute bottom-4 right-4 z-40 w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-clinic-blue transition-all"
                  >
                    <i className={`fas ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'} text-sm`}></i>
                  </button>
                </div>
              </div>
            )}
            <div className="flex-1">
              <p className="text-xl text-gray-700 mb-8 leading-relaxed font-light">{service.description}</p>
              
              {service.doctor && (
                <div className="bg-clinic-bg p-6 rounded-2xl border border-clinic-lime/30">
                  <p className="font-bold text-clinic-blue">{t("Especialista:")} {service.doctor}</p>
                  <p className="text-gray-600">{t("Horário:")} {service.schedule}</p>
                </div>
              )}
            </div>
          </div>

        </div>
        
        <div className="lg:sticky lg:top-[120px]">
          <ContactForm especialidadeInicial={service.title} />
        </div>
      </div>

      {/* Grouped Prices (Elite Bento Layout) */}
      {service.priceGroups && service.priceGroups.length > 0 && (
        <div className="space-y-12 mt-16">
          <div className="flex items-end justify-between border-b-2 border-clinic-purple/10 pb-6">
            <div>
              <h2 className="text-3xl font-bold text-clinic-blue">{t("Tabela de Preços")}</h2>
              <p className="text-sm text-gray-400 mt-2 font-medium font-sans">{t("Soluções de Reabilitação Oral de Alta Precisão (Clique num item para copiar o link da campanha 🔗)")}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.priceGroups.map((group: any, idx: number) => (
              <div key={idx} className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden group/card transition-all hover:border-clinic-purple/20 h-full">
                <button 
                  onClick={() => toggleGroup(idx)}
                  className="w-full flex items-center justify-between p-8 text-left bg-gradient-to-r from-white to-gray-50/50 hover:to-gray-100 transition-all border-b border-gray-50"
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-clinic-purple uppercase tracking-[0.2em] mb-1.5">{group.category}</span>
                    <span className="text-2xl font-bold text-clinic-blue group-hover/card:text-clinic-purple transition-colors">{group.title}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isGroupOpen(idx) ? 180 : 0 }}
                    className="w-14 h-14 rounded-full bg-clinic-bg flex items-center justify-center text-clinic-purple shadow-sm border border-white"
                  >
                    <ChevronDown className="w-6 h-6" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isGroupOpen(idx) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className="p-8">
                         <div className="flex flex-col gap-3">
                           {group.items.map((p: any, i: number) => {
                             const itemSlug = slugify(p.name);
                             const isSelected = selectedItemSlug === itemSlug;
                             return (
                               <motion.div 
                                 initial={{ y: 20, opacity: 0 }}
                                 animate={{ y: 0, opacity: 1 }}
                                 transition={{ delay: i * 0.1 }}
                                 key={i} 
                                 id={`price-item-${itemSlug}`}
                                 onClick={() => handleItemClick(p.name, p.value, idx)}
                                 className={`p-4 rounded-2xl border transition-all flex justify-between items-center group/item cursor-pointer hover:shadow-lg ${
                                   isSelected 
                                     ? 'bg-clinic-bg border-clinic-purple ring-2 ring-clinic-purple/40 scale-[1.01] shadow-md' 
                                     : 'bg-clinic-bg/40 border-white hover:border-clinic-lime hover:bg-white'
                                 }`}
                               >
                                 <div className="flex flex-col">
                                   <span className="text-sm font-bold text-clinic-blue leading-tight group-hover/item:text-clinic-purple transition-colors">{p.name}</span>
                                   {p.description && (
                                     <span className="text-[9px] text-gray-400 uppercase font-black tracking-widest">{p.description}</span>
                                   )}
                                 </div>
                                 <div className="ml-4 flex items-center gap-3">
                                   <span className="text-lg font-black text-clinic-purple">{p.value}</span>
                                 </div>
                               </motion.div>
                             );
                           })}
                         </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Standard Simple Price List */}
      {service.prices && service.prices.length > 0 && !service.priceGroups && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden mt-16">
          <h2 className="text-2xl font-bold text-clinic-blue mb-2">{t("Tabela de Preços")}</h2>
          <p className="text-sm text-gray-400 mb-6 font-medium font-sans">{t("Clique num tratamento para copiar o link da campanha 🔗")}</p>
          <div className="space-y-1">
            {service.prices.map((p: any, i: number) => {
              const itemSlug = slugify(p.name);
              const isSelected = selectedItemSlug === itemSlug;
              return (
                <div 
                  key={i} 
                  id={`price-item-${itemSlug}`}
                  onClick={() => handleItemClick(p.name, p.value)}
                  className={`flex justify-between items-center border-b border-gray-100 py-5 last:border-0 w-full group cursor-pointer transition-all px-4 rounded-xl ${
                    isSelected 
                      ? 'bg-clinic-bg border-l-4 border-l-clinic-purple shadow-sm' 
                      : 'hover:bg-clinic-bg/40'
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-base md:text-lg font-semibold text-gray-700 leading-tight break-normal hyphens-none group-hover:text-clinic-purple transition-colors">
                      {p.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl md:text-2xl font-bold text-clinic-purple break-normal hyphens-none">
                      {p.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
