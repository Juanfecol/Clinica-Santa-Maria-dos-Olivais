
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const { content } = useContent();
  const navigation = content.navigation || [];
  const global = content.global || {};

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const contactEmail = "clinicasmod@gmail.com";
  const contactPhone = "211 350 066";
  const cleanPhone = contactPhone.replace(/\s+/g, '');

  const trackGtagEvent = (name: string, params: any) => {
    if ((window as any).trackEvent) {
      (window as any).trackEvent(name, params);
    }
  };

  const trackWhatsAppClick = () => {
    if ((window as any).trackMeta) {
      (window as any).trackMeta('Contact', { content_name: 'WhatsApp' }, true);
      (window as any).trackMeta('WhatsApp_Lead_Click');
    }
    trackGtagEvent('whatsapp_click', {
      'event_category': 'contact',
      'event_label': 'WhatsApp'
    });
  };

  const trackPhoneClick = (number: string) => {
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

  return (
    <div className="flex flex-col min-h-screen font-sans text-clinic-blue bg-clinic-bg overflow-x-hidden">
      <header className="fixed top-2 md:top-5 left-0 right-0 mx-auto w-[92%] md:w-[90%] max-w-[1400px] h-[65px] md:h-[90px] bg-white/20 backdrop-blur-md border border-white/30 rounded-[20px] md:rounded-[30px] flex justify-between items-center px-4 md:px-[40px] z-[100] shadow-lg transition-all hover:bg-white/30">
        <Link to="/" className="z-[110] flex-shrink-0">
          <img src="https://clinica-santa-maria-dos-olivais.b-cdn.net/Capture-removebg-preview.png" alt="Clínica Santa Maria dos Olivais" className="h-[40px] sm:h-[48px] md:h-[68px] w-auto object-contain transition-transform hover:scale-105" />
        </Link>
        <button 
          className="flex flex-col justify-between w-[24px] h-[16px] md:w-[30px] md:h-[22px] cursor-pointer z-[110] flex-shrink-0 transition-all" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className={`w-full h-[2px] md:h-[3px] bg-clinic-blue rounded-full transition-all duration-300 ${isMenuOpen ? 'translate-y-[7px] md:translate-y-[9px] rotate-45' : ''}`}></span>
          <span className={`w-full h-[2px] md:h-[3px] bg-clinic-blue rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-full h-[2px] md:h-[3px] bg-clinic-blue rounded-full transition-all duration-300 ${isMenuOpen ? '-translate-y-[7px] md:-translate-y-[9px] -rotate-45' : ''}`}></span>
        </button>
      </header>

      <div className={`fixed inset-0 bg-white/95 backdrop-blur-2xl z-[90] flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <nav className="w-full">
          <ul className="text-center space-y-5 md:space-y-8 px-6">
            {navigation.map((item: any, index: number) => (
              <li key={index} style={{ transitionDelay: `${index * 75}ms` }} className={`transform transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <Link 
                  to={item.path} 
                  className="font-sans text-base sm:text-xl md:text-2xl font-bold text-clinic-blue hover:text-clinic-purple transition-all inline-block py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <main className="flex-grow pt-[90px] md:pt-[130px] relative">
        <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-[-1]" style={{ backgroundImage: `url('https://clinicadentariasantamariadosolivais.pt/wp-content/uploads/2025/05/Sem-titulo-7.png')`, backgroundSize: '250px', backgroundRepeat: 'repeat' }}></div>
        {children}
      </main>

      <footer className="bg-clinic-blue text-[#f2f2f2] pt-[60px] pb-[40px] px-[20px] md:px-[60px]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 md:mb-20">
             <div className="inline-block mb-8"><img src="https://clinica-santa-maria-dos-olivais.b-cdn.net/Capture-removebg-preview.png" alt="Logo Footer" className="max-w-[100px] md:max-w-[180px] mx-auto transition-transform hover:scale-110" loading="lazy" /></div>
             <h2 className="text-xl sm:text-2xl md:text-5xl font-semibold leading-tight px-4">Criamos <span className="text-clinic-purple font-serif italic">sorrisos</span> perfeitos,<br className="hidden md:block" /> combinando excelência médica<br className="hidden md:block" /> com <span className="text-clinic-purple font-serif italic">conforto</span> absoluto.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 mb-16 text-center md:text-left">
            <div className="flex flex-col gap-8 items-center md:items-start">
              <div>
                <h4 className="text-lg md:text-xl font-medium text-clinic-purple mb-4 uppercase tracking-wider">Redes sociais</h4>
                <div className="flex gap-4">
                  {global.socials?.instagram && (
                    <a href={global.socials.instagram} target="_blank" rel="noreferrer" onClick={() => trackGtagEvent('social_media_click', { 'event_category': 'engagement', 'event_label': 'Instagram' })} className="w-12 h-12 rounded-full bg-clinic-lime flex items-center justify-center text-clinic-blue hover:bg-clinic-purple hover:text-white transition-all transform hover:-translate-y-1 shadow-md"><i className="fab fa-instagram text-xl"></i></a>
                  )}
                  {global.socials?.facebook && (
                    <a href={global.socials.facebook} target="_blank" rel="noreferrer" onClick={() => trackGtagEvent('social_media_click', { 'event_category': 'engagement', 'event_label': 'Facebook' })} className="w-12 h-12 rounded-full bg-clinic-lime flex items-center justify-center text-clinic-blue hover:bg-clinic-purple hover:text-white transition-all transform hover:-translate-y-1 shadow-md"><i className="fab fa-facebook-f text-xl"></i></a>
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
                  <a href={`mailto:${contactEmail}`} onClick={() => trackEmailClick(contactEmail)} className="text-base md:text-lg text-white hover:text-clinic-lime transition-colors block font-bold">{contactEmail}</a>
                  <a href={`tel:${cleanPhone}`} onClick={() => trackPhoneClick(contactPhone)} className="text-base md:text-lg text-white hover:text-clinic-lime transition-colors block font-bold">{contactPhone}</a>
                  <a href={global.socials?.whatsapp || "#"} onClick={trackWhatsAppClick} target="_blank" rel="noreferrer" className="text-base md:text-lg text-white hover:text-clinic-lime transition-colors block font-bold">WhatsApp: {global.mobile}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-clinic-lime/30 pt-10 flex flex-wrap justify-center gap-6 md:gap-12 text-center text-xs md:text-sm font-medium tracking-wide">
            <Link to="/termos" className="hover:text-clinic-purple transition-colors uppercase">Termos e Condições</Link>
            <Link to="/cookies" className="hover:text-clinic-purple transition-colors uppercase">Política de Cookies</Link>
            <Link to="/privacidade" className="hover:text-clinic-purple transition-colors uppercase">Política de Privacidade</Link>
          </div>
          <div className="mt-8 text-center text-[10px] text-white/40 uppercase tracking-[0.2em]">© {new Date().getFullYear()} Clínica Santa Maria dos Olivais</div>
        </div>
      </footer>
      
      <a href={global.socials?.whatsapp || "#"} onClick={trackWhatsAppClick} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-[100] w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full shadow-2xl transition-all hover:scale-110 active:scale-90" aria-label="Contact us on WhatsApp">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 animate-ping"></span>
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] shadow-[0_10px_30px_rgba(37,211,102,0.4)]"></span>
        <i className="fab fa-whatsapp text-3xl md:text-4xl text-white relative z-10"></i>
      </a>
    </div>
  );
};

export default Layout;
