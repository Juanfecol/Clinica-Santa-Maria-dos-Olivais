
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { useGoogleAds } from '../hooks/useGoogleAds';
import { services } from '../constants/servicesData';
import { Search, X, Camera, Smile, Check, Upload, ChevronRight } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { motion, AnimatePresence } from 'framer-motion';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, setLanguage, t, translateObject } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isCameraInfoModalOpen, setIsCameraInfoModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFabHubOpen, setIsFabHubOpen] = useState(false);
  const [cycleIndex, setCycleIndex] = useState(0);

  useEffect(() => {
    if (isFabHubOpen) return;
    const interval = setInterval(() => {
      setCycleIndex(prev => (prev + 1) % 5);
    }, 2800); // changes every 2.8 seconds
    return () => clearInterval(interval);
  }, [isFabHubOpen]);
  const location = useLocation();
  const navigate = useNavigate();
  const { trackWhatsApp, trackPhone } = useGoogleAds();

  // Synchronize state with "diagnostico=foto" query parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('diagnostico') === 'foto') {
      setIsCameraInfoModalOpen(true);
    }
  }, [location.search]);

  const trackedModalOpen = useRef(false);

  // Track Meta Pixel events for the Foto-Diagnosis Campaign complying with GDPR/Meta guidelines
  useEffect(() => {
    if (isCameraInfoModalOpen) {
      if (!trackedModalOpen.current) {
        trackedModalOpen.current = true;
        const searchParams = new URLSearchParams(location.search);
        
        if ((window as any).trackMeta) {
          // Standard Meta Pixel Event for general algorithm matching
          (window as any).trackMeta('ViewContent', {
            content_name: 'Modal Diagnóstico Clínico por Foto',
            content_category: 'Campanha de Marketing Diagnóstico',
            utm_source: searchParams.get('utm_source') || 'organic',
            utm_medium: searchParams.get('utm_medium') || 'none',
            utm_campaign: searchParams.get('utm_campaign') || 'diagnostico_foto'
          }, true);
          
          // Custom Meta Pixel Event for laser-focused ad optimization & custom conversions
          (window as any).trackMeta('IniciouDiagnosticoFoto', {
            tipo_entrada: searchParams.get('diagnostico') === 'foto' ? 'url_campanha' : 'clique_manual',
            utm_source: searchParams.get('utm_source') || 'organic',
            utm_medium: searchParams.get('utm_medium') || 'none',
            utm_campaign: searchParams.get('utm_campaign') || 'diagnostico_foto'
          }, false);
        }
      }
    } else {
      trackedModalOpen.current = false;
    }
  }, [isCameraInfoModalOpen, location.search]);

  const openCameraModal = () => {
    setIsCameraInfoModalOpen(true);
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('diagnostico') !== 'foto') {
      searchParams.set('diagnostico', 'foto');
      navigate({ search: searchParams.toString() }, { replace: true });
    }
  };

  const closeCameraModal = () => {
    setIsCameraInfoModalOpen(false);
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('diagnostico')) {
      searchParams.delete('diagnostico');
      const newSearch = searchParams.toString();
      navigate({ search: newSearch ? `?${newSearch}` : '' }, { replace: true });
    }
  };

  const translatedServices = React.useMemo(() => {
    return translateObject(services);
  }, [translateObject, language]);

  // Basic search logic
  const filteredServices = translatedServices.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredServices.length > 0) {
      if ((window as any).trackMeta) {
        (window as any).trackMeta('Search', { 
          search_string: searchQuery,
          content_category: 'Services'
        }, true);
      }
      navigate(`/servicos/${filteredServices[0].slug}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };
  
  const { content } = useContent();
  const navigation = content.navigation || [];
  const global = content.global || {};

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const contactEmail = global.email || "clinicasmod@gmail.com";
  const contactPhone = global.phone || "211 350 066";
  const customerService = global.customerService || "300 601 645";
  const cleanPhone = contactPhone.replace(/\s+/g, '');
  const cleanCustomerService = customerService.replace(/\s+/g, '');

  const trackGtagEvent = (name: string, params: any) => {
    if ((window as any).trackEvent) {
      (window as any).trackEvent(name, params);
    }
  };

  const trackWhatsAppClick = () => {
    trackWhatsApp(); // Google Ads Conversion
    if ((window as any).trackMeta) {
      // Evento estándar 'Contact' para clics en WhatsApp
      (window as any).trackMeta('Contact', { 
        content_name: 'WhatsApp',
        content_category: 'Messenger'
      }, true);
    }
    trackGtagEvent('whatsapp_click', {
      'event_category': 'contact',
      'event_label': 'WhatsApp'
    });
  };

  const trackPhoneClick = (number: string) => {
    trackPhone(); // Google Ads Conversion
    if ((window as any).trackMeta) {
      (window as any).trackMeta('Contact', { content_name: 'Phone Call' }, true);
    }
    trackGtagEvent('phone_click', { 'event_category': 'contact', 'event_label': 'Phone', 'number': number });
  };

  const trackEmailClick = (email: string) => {
    if ((window as any).trackMeta) {
      (window as any).trackMeta('Contact', { content_name: 'Email' }, true);
    }
    trackGtagEvent('email_click', { 'event_category': 'contact', 'event_label': 'Email', 'email': email });
  };

  const trackLocationClick = () => {
    if ((window as any).trackMeta) {
      (window as any).trackMeta('FindLocation', { content_name: 'Clinic Address' }, true);
    }
    trackGtagEvent('location_click', { 'event_category': 'contact', 'event_label': 'Maps' });
  };


  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    setBgLoaded(true);
  }, []);

  const openCalendly = (e: React.MouseEvent) => {
    e.preventDefault();
    if ((window as any).Calendly) {
      (window as any).Calendly.showPopupWidget('https://calendly.com/clinicasmod/30min');
      
      if ((window as any).trackMeta) {
        (window as any).trackMeta('Schedule', {
          content_name: 'Calendly Appointment',
          content_category: 'Booking'
        }, true);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-clinic-blue bg-clinic-bg overflow-x-hidden">
      <header className="fixed top-2 md:top-5 left-0 right-0 mx-auto w-[92%] md:w-[90%] max-w-[1400px] h-[65px] md:h-[90px] bg-white/20 backdrop-blur-md border border-white/30 rounded-[20px] md:rounded-[30px] flex justify-between items-center px-4 md:px-[40px] z-[100] shadow-lg transition-all hover:bg-white/30">
        <Link 
          to="/" 
          className="z-[110] flex-shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img 
            src="https://clinica-santa-maria-dos-olivais.b-cdn.net/Icono-Nocturno.png" 
            alt="Clínica Santa Maria dos Olivais" 
            className="h-[40px] sm:h-[48px] md:h-[68px] w-auto object-contain transition-transform hover:scale-105" 
            fetchPriority="high"
          />
        </Link>
        
        <div className="flex items-center gap-2 md:gap-4 z-[110]">
          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-white/45 backdrop-blur-md rounded-full p-1 border border-white/50 shadow-sm">
            <button
              type="button"
              onClick={() => setLanguage('pt')}
              title="Português"
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold font-mono transition-all hover:scale-105 active:scale-95 ${language === 'pt' ? 'bg-clinic-purple text-white shadow-md' : 'text-clinic-blue/60 hover:text-clinic-blue'}`}
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLanguage('es')}
              title="Español"
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold font-mono transition-all hover:scale-105 active:scale-95 ${language === 'es' ? 'bg-clinic-purple text-white shadow-md' : 'text-clinic-blue/60 hover:text-clinic-blue'}`}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              title="English"
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold font-mono transition-all hover:scale-105 active:scale-95 ${language === 'en' ? 'bg-clinic-purple text-white shadow-md' : 'text-clinic-blue/60 hover:text-clinic-blue'}`}
            >
              US
            </button>
          </div>

          {/* Search Bar */}
          <div className={`relative flex items-center transition-all duration-500 ${isSearchOpen ? 'w-[150px] sm:w-[220px] md:w-[320px]' : 'w-[40px]'}`}>
            <form onSubmit={handleSearchSubmit} className="w-full relative flex items-center">
              <input
                type="text"
                placeholder={t("Pesquisar especialidade...")}
                className={`w-full bg-white/40 border border-white/50 backdrop-blur-md rounded-full py-2 pl-10 pr-4 text-clinic-blue placeholder:text-clinic-blue/50 focus:outline-none focus:ring-2 focus:ring-clinic-purple/30 transition-all duration-500 ${isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  if (isSearchOpen && searchQuery) {
                    setSearchQuery('');
                  } else {
                    setIsSearchOpen(!isSearchOpen);
                  }
                }}
                className={`absolute left-0 w-10 h-10 flex items-center justify-center rounded-full text-clinic-blue hover:text-clinic-purple transition-colors`}
                aria-label="Search"
              >
                {isSearchOpen && searchQuery ? <X size={18} /> : <Search size={22} />}
              </button>
            </form>

            {/* Simple Search Results Dropdown */}
            {isSearchOpen && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl overflow-hidden max-h-[300px] overflow-y-auto">
                {filteredServices.length > 0 ? (
                  <ul className="py-2">
                    {filteredServices.map((service) => (
                      <li key={service.slug}>
                        <Link
                          to={`/servicos/${service.slug}`}
                          className="block px-6 py-3 text-clinic-blue hover:bg-clinic-purple hover:text-white transition-colors text-sm font-medium"
                          onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-6 text-center text-clinic-blue/50 text-sm italic">
                    Sem resultados para "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          <button 
            id="btn-menu-toggle"
            className="flex flex-col justify-between w-[24px] h-[16px] md:w-[30px] md:h-[22px] cursor-pointer z-[110] flex-shrink-0 transition-all" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`w-full h-[2px] md:h-[3px] bg-clinic-blue rounded-full transition-all duration-300 ${isMenuOpen ? 'translate-y-[7px] md:translate-y-[9px] rotate-45' : ''}`}></span>
            <span className={`w-full h-[2px] md:h-[3px] bg-clinic-blue rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-[2px] md:h-[3px] bg-clinic-blue rounded-full transition-all duration-300 ${isMenuOpen ? '-translate-y-[7px] md:-translate-y-[9px] -rotate-45' : ''}`}></span>
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 bg-white/70 backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)] z-[90] flex flex-col items-center overflow-y-auto pt-[100px] pb-[50px] transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <nav className="w-full h-full flex flex-col justify-center">
          <ul className="text-center space-y-4 md:space-y-6 px-6 mt-12">
            {navigation.map((item: any, index: number) => (
              <li key={index} style={{ transitionDelay: `${index * 50}ms` }} className={`transform transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <Link 
                  to={item.path} 
                  className="font-sans text-lg sm:text-2xl md:text-3xl font-bold text-clinic-blue hover:text-clinic-purple transition-all inline-block py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li style={{ transitionDelay: `${navigation.length * 50}ms` }} className={`transform transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <button 
                className="font-sans text-lg sm:text-2xl md:text-3xl font-bold text-clinic-blue hover:text-clinic-purple transition-all inline-block py-1 flex items-center justify-center gap-2 w-full"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                {t("Serviços")} <i className={`fas fa-chevron-down text-sm transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}></i>
              </button>
              <div className={`grid grid-cols-2 gap-x-4 gap-y-1 text-sm md:text-base overflow-hidden transition-all duration-300 ${isServicesOpen ? 'max-h-[600px] py-2' : 'max-h-0'}`}>
                {translatedServices.map((service) => (
                  <Link 
                    key={service.slug} 
                    to={`/servicos/${service.slug}`} 
                    className="text-clinic-blue hover:text-clinic-purple py-1 px-1 font-medium" 
                    onClick={() => { setIsMenuOpen(false); setIsServicesOpen(false); }}
                  >
                    {t(service.title)}
                  </Link>
                ))}
              </div>
            </li>
            <li style={{ transitionDelay: `${(navigation.length + 1) * 50}ms` }} className={`transform transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <Link 
                to="/casos-clinicos" 
                className="font-sans text-lg sm:text-2xl md:text-3xl font-bold text-clinic-blue hover:text-clinic-purple transition-all inline-block py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("Casos Clínicos")}
              </Link>
            </li>
            <li style={{ transitionDelay: `${(navigation.length + 2) * 50}ms` }} className={`transform transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <Link 
                to="/blog" 
                className="font-sans text-lg sm:text-2xl md:text-3xl font-bold text-clinic-blue hover:text-clinic-purple transition-all inline-block py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("Blog")}
              </Link>
            </li>
            <li style={{ transitionDelay: `${(navigation.length + 3) * 50}ms` }} className={`transform transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <Link 
                to="/faq" 
                className="font-sans text-lg sm:text-2xl md:text-3xl font-bold text-clinic-blue hover:text-clinic-purple transition-all inline-block py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("FAQ")}
              </Link>
            </li>
            <li style={{ transitionDelay: `${(navigation.length + 4) * 50}ms` }} className={`transform transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-30' : 'translate-y-4 opacity-0'}`}>
              <Link 
                to="/cotizador" 
                className="font-sans text-xs uppercase tracking-widest text-clinic-blue hover:text-clinic-purple transition-all inline-block py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                [ Test: Cotizador ]
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <main className="flex-grow pt-[90px] md:pt-[130px] relative">
        {bgLoaded && (
          <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-[-1]" style={{ backgroundImage: `url('https://clinicadentariasantamariadosolivais.pt/wp-content/uploads/2025/05/Sem-titulo-7.png')`, backgroundSize: '250px', backgroundRepeat: 'repeat' }}></div>
        )}
        {children}
      </main>

      <footer className="bg-clinic-blue text-[#f2f2f2] pt-[60px] pb-[40px] px-[20px] md:px-[60px]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 md:mb-20">
             <div className="inline-block mb-8"><img src="https://clinica-santa-maria-dos-olivais.b-cdn.net/Icono-Nocturno.png" alt="Logo Footer" className="max-w-[100px] md:max-w-[180px] mx-auto transition-transform hover:scale-110" loading="lazy" decoding="async" /></div>
             <h2 className="text-xl sm:text-2xl md:text-5xl font-semibold leading-tight px-4 font-sans">
               {language === 'pt' ? (
                 <>Criamos <span className="text-clinic-purple font-serif italic">sorrisos</span> perfeitos,<br className="hidden md:block" /> combinando excelência médica<br className="hidden md:block" /> com <span className="text-clinic-purple font-serif italic">conforto</span> absoluto.</>
               ) : language === 'es' ? (
                 <>Creamos <span className="text-clinic-purple font-serif italic">sonrisas</span> perfectas,<br className="hidden md:block" /> combinando la excelencia médica<br className="hidden md:block" /> con <span className="text-clinic-purple font-serif italic">absoluto</span> confort.</>
               ) : (
                 <>We create perfect <span className="text-clinic-purple font-serif italic">smiles</span>,<br className="hidden md:block" /> combining medical excellence<br className="hidden md:block" /> with <span className="text-clinic-purple font-serif italic">absolute</span> comfort.</>
               )}
             </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 mb-16 text-center md:text-left">
            <div className="flex flex-col gap-8 items-center md:items-start">
              <div>
                <h4 className="text-lg md:text-xl font-medium text-clinic-purple mb-4 uppercase tracking-wider">{t("Redes sociais")}</h4>
                <div className="flex gap-4">
                  {global.socials?.instagram && (
                    <a id="btn-social-instagram" href={global.socials.instagram} target="_blank" rel="noreferrer" onClick={() => trackGtagEvent('social_media_click', { 'event_category': 'engagement', 'event_label': 'Instagram' })} className="w-12 h-12 rounded-full bg-clinic-lime flex items-center justify-center text-clinic-blue hover:bg-clinic-purple hover:text-white transition-all transform hover:-translate-y-1 shadow-md"><i className="fab fa-instagram text-xl"></i></a>
                  )}
                  {global.socials?.facebook && (
                    <a id="btn-social-facebook" href={global.socials.facebook} target="_blank" rel="noreferrer" onClick={() => trackGtagEvent('social_media_click', { 'event_category': 'engagement', 'event_label': 'Facebook' })} className="w-12 h-12 rounded-full bg-clinic-lime flex items-center justify-center text-clinic-blue hover:bg-clinic-purple hover:text-white transition-all transform hover:-translate-y-1 shadow-md"><i className="fab fa-facebook-f text-xl"></i></a>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 items-center md:items-start">
               <div>
                <h4 className="text-lg md:text-xl font-medium text-clinic-purple mb-4 uppercase tracking-wider">{t("Localização")}</h4>
                <a href={global.mapsLink || "#"} target="_blank" rel="noreferrer" onClick={trackLocationClick} className="text-base md:text-lg text-white font-light hover:text-clinic-lime transition-colors block leading-relaxed">{t(global.address)}</a>
              </div>
            </div>

            <div className="flex flex-col gap-6 items-center md:items-end md:text-right">
              <div>
                <h4 className="text-lg md:text-xl font-medium text-clinic-purple mb-2 uppercase tracking-wider">{t("Contactos")}</h4>
                <div className="space-y-3">
                  <a href={`mailto:${contactEmail}`} onClick={() => trackEmailClick(contactEmail)} className="text-base md:text-lg text-white hover:text-clinic-lime transition-colors block font-bold break-normal hyphens-none">{contactEmail}</a>
                  <div className="text-white">
                    <p className="text-xs text-clinic-purple uppercase font-bold tracking-widest mb-1">{t("Apoio ao Cliente")}</p>
                    <a href={`tel:${cleanCustomerService}`} onClick={() => trackPhoneClick(customerService)} className="text-base md:text-lg hover:text-clinic-lime transition-colors block font-bold whitespace-nowrap">{customerService} <span className="text-[10px] font-light block opacity-70">({t("marcação de consultas - urgências e dúvidas")})</span></a>
                  </div>
                  <div className="text-white">
                    <p className="text-xs text-clinic-purple uppercase font-bold tracking-widest mb-1">{t("Receção")}</p>
                    <a href={`tel:${cleanPhone}`} onClick={() => trackPhoneClick(contactPhone)} className="text-base md:text-lg hover:text-clinic-lime transition-colors block font-bold whitespace-nowrap">{contactPhone}</a>
                  </div>
                  <a href={global.socials?.whatsapp || "#"} onClick={trackWhatsAppClick} target="_blank" rel="noreferrer" className="text-base md:text-lg text-white hover:text-clinic-lime transition-colors block font-bold whitespace-nowrap">{t("WhatsApp")}: {global.mobile}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-clinic-lime/30 pt-10 flex flex-wrap justify-center gap-6 md:gap-12 text-center text-xs md:text-sm font-medium tracking-wide">
            <Link to="/termos" className="hover:text-clinic-purple transition-colors uppercase">{t("Termos e Condições")}</Link>
            <Link to="/cookies" className="hover:text-clinic-purple transition-colors uppercase">{t("Política de Cookies")}</Link>
            <Link to="/privacidade" className="hover:text-clinic-purple transition-colors uppercase">{t("Política de Privacidade")}</Link>
            <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noreferrer" className="hover:text-clinic-purple transition-colors uppercase">{t("Livro de Reclamações")}</a>
          </div>
          <div className="mt-8 text-center text-[10px] text-white/40 uppercase tracking-[0.2em]">
            {t("Sisos & Sorrisos Lda")} | {t("Estrada de Moscavide n 32 c, 1800-279 Lisboa")} | © {new Date().getFullYear()} {t("Clínica Santa Maria dos Olivais")}
          </div>
        </div>
      </footer>
      
      {/* Backdrop for the FAB Hub */}
      {isFabHubOpen && (
        <div 
          className="fixed inset-0 z-[95] bg-black/5 backdrop-blur-[2px] transition-all duration-300"
          onClick={() => setIsFabHubOpen(false)}
        />
      )}

      {/* Unified Multi-Action Floating Button Hub */}
      <div className={`fixed bottom-4 md:bottom-6 right-4 md:right-6 z-[100] ${isMenuOpen ? 'hidden' : ''} flex flex-col items-end`}>
        <AnimatePresence>
          {isFabHubOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="mb-4 p-4 md:p-5 rounded-[2.2rem] bg-white/20 backdrop-blur-md border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-[265px] sm:w-[290px] flex flex-col gap-3 origin-bottom-right"
            >
              {/* Header */}
              <div className="text-center pb-2.5 border-b border-white/20">
                <span className="text-[9px] font-black tracking-wider uppercase text-clinic-blue/80 block">{t("Atendimento Rápido")}</span>
                <span className="text-[11px] font-extrabold text-clinic-purple tracking-tight">{t("Fale Connosco 🦷")}</span>
              </div>

              {/* Action List */}
              <div className="flex flex-col gap-2">
                {/* WhatsApp */}
                <a
                  id="btn-whatsapp-main"
                  href={global.socials?.whatsapp || "#"}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    trackWhatsAppClick();
                    setIsFabHubOpen(false);
                  }}
                  className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-white/30 border border-transparent hover:border-white/30 transition-all group/action"
                >
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg group-hover/action:scale-105 transition-transform shrink-0">
                    <i className="fab fa-whatsapp text-xl text-white"></i>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-black text-clinic-blue">{t("WhatsApp")}</span>
                    <span className="text-[9px] text-clinic-blue/60 font-bold uppercase tracking-wide">{t("Resposta célere")}</span>
                  </div>
                </a>

                {/* Calendly */}
                <button
                  id="btn-calendly-main"
                  onClick={(e) => {
                    openCalendly(e);
                    setIsFabHubOpen(false);
                  }}
                  className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-white/30 border border-transparent hover:border-white/30 transition-all text-left w-full group/action cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-[#2d3277] flex items-center justify-center shadow-lg group-hover/action:scale-105 transition-transform shrink-0">
                    <i className="fas fa-calendar-check text-base text-[#d4e157]"></i>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-clinic-blue">{t("Agendar Consulta")}</span>
                    <span className="text-[9px] text-clinic-blue/60 font-bold uppercase tracking-wide">{t("Reserva imediata")}</span>
                  </div>
                </button>

                {/* Direct Call */}
                <a
                  id="btn-call-direct"
                  href={`tel:${cleanCustomerService}`}
                  onClick={() => {
                    trackPhoneClick(customerService);
                    setIsFabHubOpen(false);
                  }}
                  className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-white/30 border border-transparent hover:border-white/30 transition-all group/action"
                >
                  <div className="w-10 h-10 rounded-full bg-clinic-purple flex items-center justify-center shadow-lg group-hover/action:scale-105 transition-transform shrink-0">
                    <i className="fas fa-phone-alt text-base text-white"></i>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-black text-clinic-blue">{t("Chamada Direta")}</span>
                    <span className="text-[9px] text-clinic-blue/60 font-bold uppercase tracking-wide">{t("Linha Grátis 24h")}</span>
                  </div>
                </a>

                {/* Contact Form Inquiry */}
                <button
                  id="btn-contact-form-trigger"
                  onClick={() => {
                    setIsContactModalOpen(true);
                    setIsFabHubOpen(false);
                  }}
                  className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-white/30 border border-transparent hover:border-white/30 transition-all text-left w-full group/action cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-clinic-blue flex items-center justify-center shadow-lg group-hover/action:scale-105 transition-transform shrink-0">
                    <i className="fas fa-comment-dots text-base text-clinic-lime"></i>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-clinic-blue">{t("Contactem-me")}</span>
                    <span className="text-[9px] text-clinic-blue/60 font-bold uppercase tracking-wide">{t("Ligamos de volta")}</span>
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Always Sticky Premium Camera Floating Button */}
        <div className="relative mb-3.5 group">
          {/* Brand-Colored Pulsing Glow backdrop */}
          <div className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-clinic-purple to-[#2d3277] opacity-60 blur-sm animate-pulse z-0" />
          <div className="absolute inset-[-6px] rounded-full bg-clinic-purple opacity-25 animate-ping z-0" />
          
          <button
            id="btn-sticky-camera"
            onClick={openCameraModal}
            className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full shadow-[0_10px_35px_rgba(107,70,193,0.55)] hover:shadow-[0_15px_40px_rgba(107,70,193,0.7)] transition-all duration-300 hover:scale-110 active:scale-95 border border-white/50 bg-gradient-to-tr from-clinic-purple via-violet-600 to-clinic-blue text-white cursor-pointer z-10"
            aria-label={t("Diagnóstico por Foto 📸")}
            title={t("Diagnóstico Gratuito por Foto 🦷")}
          >
            <Camera className="w-5 h-5 md:w-6 md:h-6 text-white" />
            
            {/* Soft pulsing notification bubble/badge */}
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clinic-lime opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-clinic-lime text-[10px] font-black justify-center items-center text-clinic-blue select-none shadow">✓</span>
            </span>
          </button>

          {/* Hover tooltip */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-clinic-blue/95 backdrop-blur-sm text-white font-black text-[9px] md:text-[10px] px-3.5 py-2 rounded-full uppercase tracking-widest shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/10 shrink-0">
            {t("Diagnóstico por Foto 🦷")}
          </div>
        </div>

        {/* The Trigger Button - Cycles through when closed, morphs to X when open */}
        <div className="relative">
          {/* Brand-Colored Pulsing Glow/Aura backdrop */}
          {!isFabHubOpen && (
            <>
              {/* Soft continuous glowing blur */}
              <div className={`absolute inset-[-3px] rounded-full blur-md opacity-60 animate-pulse transition-colors duration-1000 z-0 ${
                cycleIndex === 0 ? 'bg-clinic-purple/40 shadow-[0_0_20px_rgba(107,70,193,0.6)]' :
                cycleIndex === 1 ? 'bg-[#25D366]/40 shadow-[0_0_20px_rgba(37,211,102,0.6)]' :
                cycleIndex === 2 ? 'bg-[#2d3277]/40 shadow-[0_0_20px_rgba(45,50,119,0.6)]' :
                cycleIndex === 3 ? 'bg-clinic-purple/40 shadow-[0_0_20px_rgba(107,70,193,0.6)]' :
                'bg-clinic-blue/40 shadow-[0_0_20px_rgba(45,50,119,0.6)]'
              }`} />
              {/* Expanding ping ripple */}
              <div className={`absolute inset-[-6px] rounded-full opacity-35 animate-ping transition-colors duration-1000 z-0 ${
                cycleIndex === 0 ? 'bg-clinic-purple' :
                cycleIndex === 1 ? 'bg-[#25D366]' :
                cycleIndex === 2 ? 'bg-[#2d3277]' :
                cycleIndex === 3 ? 'bg-clinic-purple' :
                'bg-clinic-blue'
              }`} />
            </>
          )}

          <button
            onClick={() => setIsFabHubOpen(!isFabHubOpen)}
            className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full shadow-[0_10px_30px_rgba(45,50,119,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 group overflow-hidden border border-white/40 bg-white/20 backdrop-blur-md cursor-pointer z-10"
            aria-label={isFabHubOpen ? "Fechar contactos" : "Ver contactos rápidos"}
          >
            <AnimatePresence mode="wait">
              {isFabHubOpen ? (
                <motion.div
                  key="close-icon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full flex items-center justify-center bg-clinic-blue text-white"
                >
                  <X className="w-6 h-6 md:w-8 md:h-8" />
                </motion.div>
              ) : (
                <div className="w-full h-full">
                  {cycleIndex === 0 && (
                    <motion.div
                      key="cycle-logo"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-full h-full flex items-center justify-center p-3 bg-white"
                    >
                      <img 
                        src="https://clinica-santa-maria-dos-olivais.b-cdn.net/Icono-Nocturno.png" 
                        alt="Logo" 
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  )}
                  {cycleIndex === 1 && (
                    <motion.div
                      key="cycle-whatsapp"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-full h-full flex items-center justify-center bg-[#25D366]"
                    >
                      <i className="fab fa-whatsapp text-2xl md:text-3xl text-white"></i>
                    </motion.div>
                  )}
                  {cycleIndex === 2 && (
                    <motion.div
                      key="cycle-calendly"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-full h-full flex items-center justify-center bg-[#2d3277]"
                    >
                      <i className="fas fa-calendar-check text-xl md:text-2xl text-[#d4e157]"></i>
                    </motion.div>
                  )}
                  {cycleIndex === 3 && (
                    <motion.div
                      key="cycle-phone"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-full h-full flex items-center justify-center bg-clinic-purple"
                    >
                      <i className="fas fa-phone-alt text-xl md:text-2xl text-white"></i>
                    </motion.div>
                  )}
                  {cycleIndex === 4 && (
                    <motion.div
                      key="cycle-form"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-full h-full flex items-center justify-center bg-clinic-blue"
                    >
                      <i className="fas fa-comment-dots text-xl md:text-2xl text-clinic-lime"></i>
                    </motion.div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-clinic-blue/60 backdrop-blur-sm" onClick={() => setIsContactModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-clinic-blue">{t("Contactem-me")}</h3>
                  <p className="text-sm text-gray-500">{t("Deixe os seus dados e entraremos em contacto brevemente.")}</p>
                </div>
                <button 
                  onClick={() => setIsContactModalOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-clinic-purple hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              <ContactForm submitButtonText={t("Contactem-me")} />
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Camera Info Modal */}
      {isCameraInfoModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-clinic-blue/60 backdrop-blur-sm transition-opacity duration-300" 
            onClick={closeCameraModal}
          />
          <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 animate-fade-in-up md:p-1.5 z-10">
            <div className="p-6 md:p-8">
              
              {/* Header with Icon and Close Button */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-clinic-purple/10 flex items-center justify-center text-clinic-purple shrink-0">
                    <Camera className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-clinic-blue tracking-tight leading-tight">
                      {t("Diagnóstico Clínico")} <span className="text-clinic-purple italic font-serif block">{t("por Foto 📸")}</span>
                    </h3>
                  </div>
                </div>
                <button 
                  onClick={closeCameraModal}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-clinic-purple hover:text-white text-gray-500 transition-all cursor-pointer shadow-sm shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Informative Text Block */}
              <div className="space-y-4 mb-8 text-left">
                <p className="text-sm text-gray-600 font-light leading-relaxed">
                  {t("Tire uma fotografia em tempo real ou envie uma imagem simples do seu sorriso. Os nossos médicos dentistas em Lisboa analisarão a anatomia do seu caso para lhe apresentar um orçamento real personalizado e 100% preciso, de forma totalmente gratuita e confidencial.")}
                </p>

                {/* Key Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {[
                    t('Avaliação gratuita de anatomia'),
                    t('Orçamento com 100% precisão clínica'),
                    t('Dados 100% seguros (RGPD)'),
                    t('Resposta rápida em 24h úteis')
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-gray-700 font-medium bg-gray-50/70 p-2.5 rounded-xl border border-gray-150">
                      <span className="w-4.5 h-4.5 rounded-full bg-clinic-purple/10 flex items-center justify-center text-clinic-purple shrink-0">
                        <Check size={10} className="stroke-[3]" />
                      </span>
                      <span className="text-2xs sm:text-xs text-slate-700 leading-tight">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions & Paths Integration */}
              <div className="space-y-3.5">
                {/* Path 1: Direct Real-Time Camera Access */}
                <button
                  onClick={() => {
                    closeCameraModal();
                    navigate('/cotizador?mode=photo&autostart=true');
                  }}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-clinic-purple via-purple-600 to-clinic-blue hover:from-clinic-blue hover:to-clinic-blue text-white rounded-2xl transition-all cursor-pointer shadow-md shadow-clinic-purple/15 hover:shadow-clinic-blue/15 hover:scale-[1.01] active:scale-95 group border-0 text-left"
                >
                  <div className="flex items-center gap-3.5 text-left">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                      <Camera size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-black tracking-tight block text-white">{t("Ativar Câmara Integrada")}</span>
                      <span className="text-[10px] text-white/70 font-semibold block uppercase tracking-wider">{t("Tirar foto em tempo real")}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-white/60 group-hover:text-white transition-colors shrink-0" />
                </button>

                {/* Path 2: Upload File From Device Gallery */}
                <button
                  onClick={() => {
                    closeCameraModal();
                    navigate('/cotizador?mode=photo');
                  }}
                  className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 hover:border-clinic-blue/50 hover:bg-gray-50 text-clinic-blue rounded-2xl transition-all cursor-pointer shadow-sm hover:scale-[1.01] active:scale-95 group text-left"
                >
                  <div className="flex items-center gap-3.5 text-left">
                    <div className="w-10 h-10 rounded-xl bg-clinic-purple/10 flex items-center justify-center text-clinic-purple shrink-0">
                      <Upload size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-black tracking-tight block text-clinic-blue">{t("Carregar da Galeria / Rolo")}</span>
                      <span className="text-[10px] text-gray-400 font-semibold block uppercase tracking-wider">{t("Carregar ficheiro ou imagem existente")}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-400 group-hover:text-clinic-blue transition-colors shrink-0" />
                </button>

                {/* Path 3: WhatsApp Inquiry */}
                <a
                  href={global.socials?.whatsapp || "#"}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    trackWhatsAppClick();
                    closeCameraModal();
                  }}
                  className="w-full flex items-center justify-between p-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 hover:border-emerald-200 text-emerald-800 rounded-2xl transition-all cursor-pointer group text-left"
                >
                  <div className="flex items-center gap-3.5 text-left">
                    <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center text-white shrink-0">
                      <i className="fab fa-whatsapp text-lg"></i>
                    </div>
                    <div>
                      <span className="text-xs font-black tracking-tight block text-emerald-950">{t("Esclarecer Dúvidas via WhatsApp")}</span>
                      <span className="text-[10px] text-emerald-600 font-bold block uppercase tracking-wider">{t("Resposta imediata por mensagem")}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-emerald-500 group-hover:text-emerald-700 transition-colors shrink-0" />
                </a>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
