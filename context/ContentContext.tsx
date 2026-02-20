
import React, { createContext, useContext, useState, useEffect } from 'react';

// --- INITIAL DEFAULT DATA ---
const defaultData = {
  global: {
    email: "clinicasmod@gmail.com",
    phone: "211 350 066",
    mobile: "+351 919 861 310",
    address: "Estrada de Moscavide N 32C, 1800-279, Lisboa",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Estrada+de+Moscavide+N+32C,+1800-279,+Lisboa",
    socials: {
      instagram: "https://www.instagram.com/clinicasantamariaolivais/",
      facebook: "https://www.facebook.com/clinicasmod/",
      whatsapp: "https://wa.me/351919861310"
    }
  },
  navigation: [
    { label: "Início", path: "/" },
    { label: "Equipa", path: "/equipa" },
    { label: "Clínica", path: "/clinica" },
    { label: "Contactos", path: "/contactos" },
    { label: "Marcações", path: "/marcacoes" },
    { label: "Campanhas", path: "/campanhas" }
  ],
  home: {
    heroTitle: "Clínica Santa Maria dos Olivais",
    heroSubtitle: "Não tratamos apenas dentes — cultivamos confiança, autoestima e bem-estar. Oferecemos conforto e a liberdade de sorrir sem reservas. Porque cada sorriso conta uma história — e a sua merece ser contada com brilho.",
  },
  stories: [
    {
      id: 1,
      type: 'video',
      title: 'Generalista',
      src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/GENERALISTA.mp4',
      thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-D089534F-903E-476C-BB13-26CAB404F1F3.jpeg'
    },
    {
      id: 12,
      type: 'video',
      title: 'Implante Dentário',
      src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/IMPLANTE.mp4',
      thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-100-scaled.jpg'
    },
    {
      id: 11,
      type: 'video',
      title: 'Mais Perto',
      src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/GUION%2005%20-%20MAIS%20PERTO.mp4',
      thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg'
    },
    {
      id: 13,
      type: 'video',
      title: 'Limpeza GBT',
      src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/LIMPEZA%20GBT.mp4',
      thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg'
    },
    {
      id: 9,
      type: 'video',
      title: 'Qualidade',
      src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/WhatsApp-Video-2025-09-18-at-15.06.59.mp4',
      thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg'
    },
    {
      id: 14,
      type: 'video',
      title: 'Facetas Premium',
      src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/FACETAS.mp4',
      thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/05/20250528_1530_Sorriso-Perfeito_remix_01jwbmq8mnfev9my4ye2ek9xx0.png'
    },
    {
      id: 10,
      type: 'video',
      title: 'A Clínica',
      src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/SANTAMARIAListo.mp4',
      thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg'
    },
    {
      id: 15,
      type: 'video',
      title: 'Odontopediatria',
      src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/CRIANCAS.mp4',
      thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-48-scaled.jpg'
    },
    {
      id: 2,
      type: 'video',
      title: 'Sorrisos',
      src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/SORRISO.mp4',
      thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/05/20250528_1530_Sorriso-Perfeito_remix_01jwbmq8mnfev9my4ye2ek9xx0.png'
    },
    {
      id: 16,
      type: 'video',
      title: 'Prevenção Ativa',
      src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/PREVENCAO.mp4',
      thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-EAA32118-B8DB-4848-ABC0-210B0ACBFDC2.jpeg'
    },
    {
      id: 6,
      type: 'video',
      title: 'Avaliação',
      src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/DJI_20250902154919_0145_D.MP4',
      thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-BA8B4A41-1D6A-44A9-AD46-A79BBAE94C63.jpeg'
    }
  ],
  team: {
    medical: [
      {
        name: "Dra. Ana Mata",
        title: "Direção Clínica e Implantologia",
        img: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-100-scaled.jpg",
        bio: "Diretora Clínica e especialista em reabilitação oral avançada com implantes."
      },
      {
        name: "Dra. Mariana Aberto",
        title: "Ortodontia",
        img: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-136-scaled.jpg",
        bio: "Especialista em Ortodontia Clínica e Alinhadores Invisíveis."
      },
      {
        name: "Dra. Alexandra Lucas",
        title: "Periodontologia",
        img: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-882A385B-218D-47B8-AA16-EB091B83A480.jpeg",
        bio: "Especialista em saúde gengival e tecidos de suporte dentário.",
        imgPosition: "object-[75%_25%]"
      },
      {
        name: "Dra. Orizanda Claret",
        title: "Odontopediatria",
        img: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-48-scaled.jpg",
        bio: "Especialista no atendimento e saúde oral dos mais pequenos."
      },
      {
        name: "Dr. Tomás Machado",
        title: "Dentisteria e Endodontia",
        img: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-7A390FD7-42CA-4F33-A5B7-800ABBBCDF8B.jpeg",
        bio: "Focado na preservação dentária e tratamentos de canal."
      }
    ],
    assistants: [
      {
        name: "Inês Gama",
        title: "Assistente de Medicina Dentária",
        img: "https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-126-scaled.jpg",
        bio: "Apoio clínico especializado em todas as áreas da medicina dentária."
      }
    ],
    reception: []
  },
  clinic: {
    gallery: [
      "https://clinica-santa-maria-dos-olivais.b-cdn.net/DJI_20250819154440_0104_D.JPG",
      "https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_5640.JPG",
      "https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_5650.JPG",
      "https://clinica-santa-maria-dos-olivais.b-cdn.net/DJI_20250819154505_0105_D.JPG",
      "https://clinica-santa-maria-dos-olivais.b-cdn.net/carrusel%203-02.jpg",
      "https://clinica-santa-maria-dos-olivais.b-cdn.net/DJI_20250819155107_0110_D.JPG"
    ]
  },
  campaigns: [
    { src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/kids%20clinica%20dentaria%20santa%20maria%20dos%20olivais%20.jpg", title: "Campanha 1" },
    { src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/POST-01.jpg", title: "Campanha 2" },
    { src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/POST-06.jpg", title: "Campanha 3" }
  ],
  appointments: {
    heroImage: "https://clinica-santa-maria-dos-olivais.b-cdn.net/Carrusel%201-06%20(1).png",
    services: [
      "Implantologia",
      "Ortodontia, Alinhadores Invisíveis",
      "Limpeza e Destartarização",
      "Consulta de Rotina",
      "Odontopediatria",
      "Branqueamento",
      "Urgências",
      "Avaliação",
      "Outros"
    ]
  }
};

const ContentContext = createContext<any>(null);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('site_content_v3');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Content load failed", e);
    }
    return defaultData;
  });

  const updateContent = (newContent: any) => {
    setContent(newContent);
    localStorage.setItem('site_content_v3', JSON.stringify(newContent));
  };

  const resetContent = () => {
    setContent(defaultData);
    localStorage.setItem('site_content_v3', JSON.stringify(defaultData));
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
