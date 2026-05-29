
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useGoogleAds } from '../hooks/useGoogleAds';
import { services } from '../constants/servicesData';
import { Search, X } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { motion, AnimatePresence } from 'framer-motion';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
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

  // Basic search logic
  const filteredServices = services.filter(s => 
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
        
        <div className="flex items-center gap-4 md:gap-8 z-[110]">
          {/* Search Bar */}
          <div className={`relative flex items-center transition-all duration-500 ${isSearchOpen ? 'w-[180px] sm:w-[250px] md:w-[350px]' : 'w-[40px]'}`}>
            <form onSubmit={handleSearchSubmit} className="w-full relative flex items-center">
              <input
                type="text"
                placeholder="Procurar tratamentos..."
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
                Serviços <i className={`fas fa-chevron-down text-sm transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}></i>
              </button>
              <div className={`grid grid-cols-2 gap-x-4 gap-y-1 text-sm md:text-base overflow-hidden transition-all duration-300 ${isServicesOpen ? 'max-h-[600px] py-2' : 'max-h-0'}`}>
                {services.map((service) => (
                  <Link 
                    key={service.slug} 
                    to={`/servicos/${service.slug}`} 
                    className="text-clinic-blue hover:text-clinic-purple py-1 px-1 font-medium" 
                    onClick={() => { setIsMenuOpen(false); setIsServicesOpen(false); }}
                  >
                    {service.title}
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
                Casos Clínicos
              </Link>
            </li>
            <li style={{ transitionDelay: `${(navigation.length + 2) * 50}ms` }} className={`transform transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <Link 
                to="/blog" 
                className="font-sans text-lg sm:text-2xl md:text-3xl font-bold text-clinic-blue hover:text-clinic-purple transition-all inline-block py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li style={{ transitionDelay: `${(navigation.length + 3) * 50}ms` }} className={`transform transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <Link 
                to="/faq" 
                className="font-sans text-lg sm:text-2xl md:text-3xl font-bold text-clinic-blue hover:text-clinic-purple transition-all inline-block py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
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
             <h2 className="text-xl sm:text-2xl md:text-5xl font-semibold leading-tight px-4">Criamos <span className="text-clinic-purple font-serif italic">sorrisos</span> perfeitos,<br className="hidden md:block" /> combinando excelência médica<br className="hidden md:block" /> com <span className="text-clinic-purple font-serif italic">conforto</span> absoluto.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 mb-16 text-center md:text-left">
            <div className="flex flex-col gap-8 items-center md:items-start">
              <div>
                <h4 className="text-lg md:text-xl font-medium text-clinic-purple mb-4 uppercase tracking-wider">Redes sociais</h4>
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
                <h4 className="text-lg md:text-xl font-medium text-clinic-purple mb-4 uppercase tracking-wider">Localização</h4>
                <a href={global.mapsLink || "#"} target="_blank" rel="noreferrer" onClick={trackLocationClick} className="text-base md:text-lg text-white font-light hover:text-clinic-lime transition-colors block leading-relaxed">{global.address}</a>
              </div>
            </div>

            <div className="flex flex-col gap-6 items-center md:items-end md:text-right">
              <div>
                <h4 className="text-lg md:text-xl font-medium text-clinic-purple mb-2 uppercase tracking-wider">Contactos</h4>
                <div className="space-y-3">
                  <a href={`mailto:${contactEmail}`} onClick={() => trackEmailClick(contactEmail)} className="text-base md:text-lg text-white hover:text-clinic-lime transition-colors block font-bold break-normal hyphens-none">{contactEmail}</a>
                  <div className="text-white">
                    <p className="text-xs text-clinic-purple uppercase font-bold tracking-widest mb-1">Apoio ao Cliente 24h</p>
                    <a href={`tel:${cleanCustomerService}`} onClick={() => trackPhoneClick(customerService)} className="text-base md:text-lg hover:text-clinic-lime transition-colors block font-bold whitespace-nowrap">{customerService} <span className="text-[10px] font-light block opacity-70">(marcação de consultas - urgências e dúvidas)</span></a>
                  </div>
                  <div className="text-white">
                    <p className="text-xs text-clinic-purple uppercase font-bold tracking-widest mb-1">Receção</p>
                    <a href={`tel:${cleanPhone}`} onClick={() => trackPhoneClick(contactPhone)} className="text-base md:text-lg hover:text-clinic-lime transition-colors block font-bold whitespace-nowrap">{contactPhone}</a>
                  </div>
                  <a href={global.socials?.whatsapp || "#"} onClick={trackWhatsAppClick} target="_blank" rel="noreferrer" className="text-base md:text-lg text-white hover:text-clinic-lime transition-colors block font-bold whitespace-nowrap">WhatsApp: {global.mobile}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-clinic-lime/30 pt-10 flex flex-wrap justify-center gap-6 md:gap-12 text-center text-xs md:text-sm font-medium tracking-wide">
            <Link to="/termos" className="hover:text-clinic-purple transition-colors uppercase">Termos e Condições</Link>
            <Link to="/cookies" className="hover:text-clinic-purple transition-colors uppercase">Política de Cookies</Link>
            <Link to="/privacidade" className="hover:text-clinic-purple transition-colors uppercase">Política de Privacidade</Link>
            <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noreferrer" className="hover:text-clinic-purple transition-colors uppercase">Livro de Reclamações</a>
          </div>
          <div className="mt-8 text-center text-[10px] text-white/40 uppercase tracking-[0.2em]">
            Sisos & Sorrisos Lda | Estrada de Moscavide n 32 c, 1800-279 Lisboa | © {new Date().getFullYear()} Clínica Santa Maria dos Olivais
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
                <span className="text-[9px] font-black tracking-wider uppercase text-clinic-blue/80 block">Atendimento Rápido</span>
                <span className="text-[11px] font-extrabold text-clinic-purple tracking-tight">Fale Connosco 🦷</span>
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
                    <span className="text-xs font-black text-clinic-blue">WhatsApp</span>
                    <span className="text-[9px] text-clinic-blue/60 font-bold uppercase tracking-wide">Resposta célere</span>
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
                    <span className="text-xs font-black text-clinic-blue">Agendar Consulta</span>
                    <span className="text-[9px] text-clinic-blue/60 font-bold uppercase tracking-wide">Reserva imediata</span>
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
                    <span className="text-xs font-black text-clinic-blue">Chamada Direta</span>
                    <span className="text-[9px] text-clinic-blue/60 font-bold uppercase tracking-wide">Linha Grátis 24h</span>
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
                    <span className="text-xs font-black text-clinic-blue">Contactem-me</span>
                    <span className="text-[9px] text-clinic-blue/60 font-bold uppercase tracking-wide">Ligamos de volta</span>
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                  <h3 className="text-2xl font-bold text-clinic-blue">Contactem-me</h3>
                  <p className="text-sm text-gray-500">Deixe os seus dados e entraremos em contacto brevemente.</p>
                </div>
                <button 
                  onClick={() => setIsContactModalOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-clinic-purple hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              <ContactForm submitButtonText="Contactem-me" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
