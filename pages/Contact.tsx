import React from 'react';
import { useContent } from '../context/ContentContext';

const Contact: React.FC = () => {
  const { content } = useContent();
  const global = content.global || {};

  // Robust email and phone sanitization
  const contactEmail = (global.email && global.email.trim() !== "") ? global.email.trim() : "clinicasmod@gmail.com";
  const contactPhone = global.phone ? global.phone.replace(/\s+/g, '') : "";

  return (
    <div className="animate-fade-in-up max-w-[1400px] mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif italic text-clinic-blue border-2 border-clinic-lime inline-block px-8 py-3 rounded-full mb-8 shadow-sm bg-white/20">Contactos</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Contact Details */}
        <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white">
          <div className="space-y-8 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold text-clinic-blue mb-4">Email</h3>
              {/* Force clean mailto link with target _self to ensure app opens */}
              <a 
                href={`mailto:${contactEmail}`} 
                target="_self"
                className="text-xl text-gray-700 hover:text-clinic-blue transition-colors break-all"
              >
                {contactEmail}
              </a>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-clinic-blue mb-4">Telefone</h3>
              {/* Ensure tel link strips spaces for compatibility */}
              <a 
                href={`tel:${contactPhone}`} 
                target="_self"
                className="text-xl text-gray-700 font-medium hover:text-clinic-blue transition-colors"
              >
                {global.phone}
              </a>
              <div className="text-sm text-gray-500 mt-1">(Preço de uma chamada de Rede Nacional)</div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-clinic-blue mb-4">Telemóvel / WhatsApp</h3>
              {/* Links to WhatsApp as per design, opens in new tab/app */}
              <a href={global.socials?.whatsapp || "#"} target="_blank" rel="noreferrer" className="text-xl text-gray-700 font-medium hover:text-clinic-blue transition-colors">{global.mobile}</a>
              <div className="text-sm text-gray-500 mt-1">(Preço de uma chamada de Rede Móvel Nacional)</div>
            </div>
            
            <div className="pt-6 flex justify-center md:justify-start gap-4">
               {global.socials?.facebook && (
                 <a href={global.socials.facebook} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md">
                   <i className="fab fa-facebook-f text-xl"></i>
                 </a>
               )}
               {global.socials?.instagram && (
                 <a href={global.socials.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f09433] to-[#bc1888] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md">
                   <i className="fab fa-instagram text-xl"></i>
                 </a>
               )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl border-4 border-white relative group">
          <iframe 
            src="https://maps.google.com/maps?q=Clinica%20santa%20maria%20dos%20olivais&t=m&z=15&output=embed&iwloc=near" 
            title="Location Map"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy"
          ></iframe>
          <a 
            href={global.mapsLink || "#"}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-4 right-4 bg-white text-clinic-blue px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-sm"
          >
            Abrir no Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;