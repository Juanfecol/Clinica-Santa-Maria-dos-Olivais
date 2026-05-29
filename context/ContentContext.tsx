
import React, { createContext, useContext, useState, useEffect } from 'react';

// --- INITIAL DEFAULT DATA ---
const defaultData = {
  global: {
    email: "clinicasmod@gmail.com",
    phone: "211 350 066",
    customerService: "300 601 645",
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
    heroSubtitle: "Especialistas em Implantologia, Ortodontia (Invisalign) e Estética Dentária em Olivais, Lisboa. 10 anos de excelência médica.",
  },
  stories: [
    { id: 1, type: 'video', title: 'Alinhadores', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_ALINHADORES.mp4', thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-D089534F-903E-476C-BB13-26CAB404F1F3.jpeg' },
    { id: 2, type: 'video', title: 'Aparelho', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_APARALHO.mp4', thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-100-scaled.jpg' },
    { id: 3, type: 'video', title: 'Consulta', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_CONSULTA.mp4', thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg' },
    { id: 4, type: 'video', title: 'Dia Anterior', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_DIAANTERIOR.mp4', thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg' },
    { id: 6, type: 'video', title: 'Dr Julio', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_DRJULIO.mp4', thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg' },
    { id: 7, type: 'video', title: 'Endodontia', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_EDODONTIA.mp4', thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-48-scaled.jpg' },
    { id: 8, type: 'video', title: 'Fratura', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_FRATURA.mp4', thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/05/20250528_1530_Sorriso-Perfeito_remix_01jwbmq8mnfev9my4ye2ek9xx0.png' },
    { id: 9, type: 'video', title: 'Gengiva', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_GENGIVA.mp4', thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-EAA32118-B8DB-4848-ABC0-210B0ACBFDC2.jpeg' },
    { id: 10, type: 'video', title: 'Implantes', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_IMPLANTES.mp4', thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-BA8B4A41-1D6A-44A9-AD46-A79BBAE94C63.jpeg' },
    { id: 11, type: 'video', title: 'Limpeza', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_LIMPEZA.mp4', thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-D089534F-903E-476C-BB13-26CAB404F1F3.jpeg' },
    { id: 12, type: 'video', title: 'Mexem', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_MEXEM.mp4', thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-100-scaled.jpg' },
    { id: 13, type: 'video', title: 'Mitos', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_MITOS.mp4', thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg' },
    { id: 14, type: 'video', title: 'Perda Dentária', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_PERDADENTARIA.mp4', thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg' },
    { id: 15, type: 'video', title: 'Periodontite', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_PERIODONTITE.mp4', thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/05/20250528_1530_Sorriso-Perfeito_remix_01jwbmq8mnfev9my4ye2ek9xx0.png' },
    { id: 16, type: 'video', title: 'Reabilitação', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_REABILITAC%CC%A7A%CC%83O.mp4', thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/393562f5162f9e7b1dda9718a868fcd1.jpg' },
    { id: 17, type: 'video', title: 'Sorriso Sem Escalas', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_SEMESCALAS.mp4', thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/07/Clinica-Santa-Maria-Olivais-48-scaled.jpg' },
    { id: 18, type: 'video', title: 'Sorriso', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_SORRISO.mp4', thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/05/20250528_1530_Sorriso-Perfeito_remix_01jwbmq8mnfev9my4ye2ek9xx0.png' },
    { id: 19, type: 'video', title: 'Dr Tomas', src: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_TOMAS.mp4', thumbnail: 'https://clinicasantamariadosolivais.pt/wp-content/uploads/2025/06/original-EAA32118-B8DB-4848-ABC0-210B0ACBFDC2.jpeg' }
  ],
  team: {
    medical: [
      {
        name: "Dra. Ana Mata",
        title: "Direção Clínica e Implantologia",
        img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/dra_ana_mata.png",
        bio: "Diretora Clínica e especialista em reabilitação oral avançada com implantes.",
        imgPosition: "object-top"
      },
      {
        name: "Dra. Mariana Aberto",
        title: "Ortodontia",
        img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-132.jpeg",
        bio: "Especialista em Ortodontia Clínica e Alinhadores Invisíveis.",
        imgPosition: "object-top"
      },
      {
        name: "Dra. Alexandra Lucas",
        title: "Periodontologia",
        img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-67.jpeg",
        bio: "Especialista em saúde gengival e tecidos de suporte dentário.",
        imgPosition: "object-top"
      },
      {
        name: "Dra. Orizanda Claret",
        title: "Odontopediatria",
        img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-51.jpeg",
        bio: "Especialista no atendimento e saúde oral dos más pequenos.",
        imgPosition: "object-top"
      },
      {
        name: "Dr. Tomás Machado",
        title: "Dentisteria e Endodontia",
        img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-227.jpeg",
        bio: "Focado na preservação dentária e tratamentos de canal.",
        imgPosition: "object-top"
      }
    ],
    assistants: [
      {
        name: "Inês Gama",
        title: "Assistente de Medicina Dentária",
        img: "",
        bio: "Apoio clínico especializado em todas as áreas da medicina dentária."
      }
    ],
    reception: [
      {
        name: "Carla Claro",
        title: "Receção e Apoio ao Cliente",
        img: "https://clinica-santa-maria-dos-olivais.b-cdn.net/Clinica%20Santa%20Maria%20Olivais-94.jpeg",
        bio: "Responsável pelo acolhimento e gestão personalizada del percurso de cada paciente.",
        imgPosition: "object-top"
      }
    ]
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
    { src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/kids%20clinica%20dentaria%20santa%20maria%20dos%20olivais%20.jpg", title: "Campanha 1", targetService: "Odontopediatria" },
    { src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_6570.jpg", title: "Campanha 2", targetService: "Implantologia" },
    { src: "https://clinica-santa-maria-dos-olivais.b-cdn.net/IMG_6567%202.jpg", title: "Campanha 3", targetService: "Facetas" }
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
      "Estética Dentária",
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
      const saved = localStorage.getItem('site_content_v7');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed;
      }
    } catch (e) {
      console.error("Content load failed", e);
    }
    return defaultData;
  });

  const updateContent = (newContent: any) => {
    setContent(newContent);
    localStorage.setItem('site_content_v7', JSON.stringify(newContent));
  };

  const resetContent = () => {
    setContent(defaultData);
    localStorage.setItem('site_content_v7', JSON.stringify(defaultData));
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
