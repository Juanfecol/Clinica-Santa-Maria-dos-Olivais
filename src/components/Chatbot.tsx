import React, { useState, useEffect, useRef } from 'react';
import { arvoreDecisao } from '../knowledgeBase'; 
import { Bot } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './Chatbot.css'; 

const CLINIC_LOGO = "https://clinica-santa-maria-dos-olivais.b-cdn.net/Icono-Nocturno.png";

const translations: any = {
  pt: {
    welcome: 'Olá! Bem-vindo(a) à Clínica Santa Maria dos Olivais. Sou o assistente virtual. Para começarmos o seu atendimento, qual é o seu primeiro e último nome? \n\n(Ao continuar, aceita a nossa política de privacidade.)',
    namePrompt: (name: string) => `Prazer em conhecer, ${name}! Qual é o seu número de telemóvel para podermos contactar de forma rápida?`,
    waConfirmation: 'Excelente! Os seus dados estão guardados. Carregue no botão abaixo para enviar o pedido de agendamento diretamente para a nossa equipa no WhatsApp.',
    launcher: 'Fale Connosco',
    headerTitle: 'Assistente Virtual',
    headerSubtitle: 'Clínica Sta. Maria dos Olivais',
    waButton: 'Confirmar no WhatsApp',
    send: 'Enviar',
    inputPlaceholderName: 'O seu nome...',
    inputPlaceholderPhone: 'O seu telemóvel...'
  },
  es: {
    welcome: '¡Hola! Bienvenido(a) a la Clínica Santa Maria dos Olivais. Soy el asistente virtual. Para comenzar la atención, ¿cuál es su nombre y apellido?',
    namePrompt: (name: string) => `¡Un placer conocerlo(a), ${name}! ¿Cuál es su número de teléfono para que podamos contactarlo rápidamente?`,
    waConfirmation: '¡Excelente! Sus datos han sido guardados. Haga clic en el botón a continuación para enviar su solicitud de cita directamente a nuestro equipo por WhatsApp.',
    launcher: 'Contáctenos',
    headerTitle: 'Asistente Virtual',
    headerSubtitle: 'Clínica Sta. Maria dos Olivais',
    waButton: 'Confirmar por WhatsApp',
    send: 'Enviar',
    inputPlaceholderName: 'Su nombre...',
    inputPlaceholderPhone: 'Su teléfono...'
  },
  en: {
    welcome: 'Hello! Welcome to Clínica Santa Maria dos Olivais. I am your virtual assistant. To get started, what is your first and last name?',
    namePrompt: (name: string) => `It's a pleasure to meet you, ${name}! What is your phone number so we can contact you quickly?`,
    waConfirmation: 'Excellent! Your data has been saved. Click the button below to send your appointment request directly to our team via WhatsApp.',
    launcher: 'Contact us',
    headerTitle: 'Virtual Assistant',
    headerSubtitle: 'Clínica Sta. Maria dos Olivais',
    waButton: 'Confirm on WhatsApp',
    send: 'Send',
    inputPlaceholderName: 'Your name...',
    inputPlaceholderPhone: 'Your phone number...'
  }
};

export function ChatbotLauncher({ onClick }: { onClick: () => void }) {
  return (
    <button className="chatbot-launcher-custom" onClick={onClick}>
      <img src={CLINIC_LOGO} alt="Logo" className="w-full h-full object-contain" />
    </button>
  );
}

export default function Chatbot({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) {
  const { language } = useLanguage();
  const t = translations[language] || translations['pt'];

  const [messages, setMessages] = useState<any[]>([
    { 
      sender: 'bot', 
      text: t.welcome
    }
  ]);
  
  const [formStage, setFormStage] = useState('NOME'); 
  const [leadData, setLeadData] = useState({ nome: '', telefone: '', treatment: '' });
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [viewportStyle, setViewportStyle] = useState<React.CSSProperties>({});

  const handleInputFocus = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  // Dynamic visual viewport calculations to achieve BlackBerry split-screen layout
  useEffect(() => {
    const updateViewport = () => {
      if (window.visualViewport && window.innerWidth <= 640) {
        const height = window.visualViewport.height;
        const top = window.visualViewport.offsetTop;
        const left = window.visualViewport.offsetLeft;
        const width = window.visualViewport.width;
        
        const isForm = formStage === 'NOME' || formStage === 'TELEFONE';
        const containerHeight = isForm ? height : height * 0.9;
        
        setViewportStyle({
          position: 'fixed',
          top: `${top}px`,
          left: `${left}px`,
          height: `${containerHeight}px`,
          maxHeight: `${containerHeight}px`,
          width: `${width}px`,
          bottom: 'auto',
          borderRadius: '0px',
          transform: 'none',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column'
        });
        
        // Ensure newest messages scroll beautifully into view inside the remaining upper space
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        setViewportStyle({});
      }
    };

    if (isOpen) {
      updateViewport();
      
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', updateViewport);
        window.visualViewport.addEventListener('scroll', updateViewport);
      }
      window.addEventListener('resize', updateViewport);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateViewport);
        window.visualViewport.removeEventListener('scroll', updateViewport);
      }
      window.removeEventListener('resize', updateViewport);
    };
  }, [isOpen, messages, formStage]);

  // Focus only once when the chatbot is opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // When language changes, update the initial message (if still at start)
  useEffect(() => {
    if (formStage === 'NOME' && messages.length === 1) {
      setMessages([{ sender: 'bot', text: t.welcome }]);
    }
  }, [language]);

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendText = () => {
    if (input.trim().length > 0) {
      const userMsg = input;
      setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
      setInput('');

      // Auto-refocus keyboard synchronously after sending
      inputRef.current?.focus();

      if (formStage === 'NOME') {
        setLeadData(prev => ({ ...prev, nome: userMsg }));
        setFormStage('TELEFONE');
        setTimeout(() => setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: t.namePrompt(userMsg)
        }]), 600);
        return;
      }

      if (formStage === 'TELEFONE') {
        setLeadData(prev => ({ ...prev, telefone: userMsg }));
        inputRef.current?.blur();
        setFormStage('MENU');
        
        setTimeout(() => {
          const firstNode = arvoreDecisao['MENU_PRINCIPAL'];
          setMessages(prev => [...prev, { 
            sender: 'bot', 
            text: firstNode.text, 
            options: firstNode.options 
          }]);
        }, 600);
        return;
      }

      // If user typing custom message during menu stages
      const currentPhone = leadData.telefone || '';
      const currentNome = leadData.nome || 'Cliente';
      const waMessage = `Olá! Quero tirar uma dúvida.%0A%0A*Nome:* ${currentNome}%0A*Telemóvel:* ${currentPhone}%0A*Mensagem:* ${userMsg}`;
      const waLink = `https://wa.me/351919861310?text=${waMessage}`;

      setTimeout(() => {
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: language === 'pt' 
            ? 'Prefere falar diretamente com um assistente? Toque no botão abaixo para nos enviar a sua mensagem por WhatsApp:' 
            : language === 'es' 
            ? '¿Prefiere hablar directamente con un asistente? Toque el botón de abajo para enviarnos su mensaje por WhatsApp:' 
            : 'Would you prefer to speak directly with an assistant? Tap the button below to send your message via WhatsApp:',
          isLink: true,
          linkUrl: waLink
        }]);
      }, 600);
    }
  };

  const handleOptionClick = (option: any) => {
    setMessages(prev => [...prev, { sender: 'user', text: option.label }]);

    // Auto-refocus keyboard synchronously when option is clicked
    inputRef.current?.focus();

    // Persist treatment if present in the option
    if (option.treatment) {
      setLeadData(prev => ({ ...prev, treatment: option.treatment }));
    }

    if (option.next === 'FINALIZAR_AGENDAMENTO') {
      const treatmentName = option.treatment || leadData.treatment || option.label;
      
      const waMessage = `Olá equipa! Quero agendar uma consulta.%0A%0A*Nome:* ${leadData.nome}%0A*Telemóvel:* ${leadData.telefone}%0A*Tratamento:* ${treatmentName}`;
      // Usando el WhatsApp oficial de la clínica
      const waLink = `https://wa.me/351919861310?text=${waMessage}`; 

      setTimeout(() => setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: t.waConfirmation,
        isLink: true,
        linkUrl: waLink
      }]), 600);
      return;
    }

    const nextNode = arvoreDecisao[option.next];
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: nextNode.text, 
        options: nextNode.options 
      }]);
    }, 600);
  };

  const isFormActive = true; // Always active to allow BlackBerry style typing at any point

  return (
    <>
      {/* Ventana principal del chatbot */}
      {isOpen && (
        <div className="chatbot-container" style={viewportStyle}>
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-header-logo">
                <img src={CLINIC_LOGO} alt="Logo" className="w-[80%] h-[80%] object-contain" />
              </div>
              <div className="chatbot-header-text">
                <strong>{t.headerTitle}</strong>
                <p>{t.headerSubtitle}</p>
              </div>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chat-window">
            {messages.map((msg: any, idx: number) => (
              <div key={idx} className={`message-wrapper ${msg.sender}`}>
                <div className={`message ${msg.sender}`}>
                  {msg.sender === 'bot' && (
                    <div className="bot-avatar-container">
                      <img src={CLINIC_LOGO} alt="Logo" className="w-[80%] h-[80%] object-contain" />
                    </div>
                  )}
                  <div className="message-content">
                    <p style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
                    
                    {msg.isLink && (
                      <a href={msg.linkUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                        {t.waButton}
                      </a>
                    )}
                  </div>
                </div>

                {msg.options && (
                  <div className="options-container">
                    {msg.options.map((opt: any, i: number) => (
                      <button key={i} className="btn-option" onClick={() => handleOptionClick(opt)}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {isFormActive && (
            <div className="chat-input-area">
              <input 
                ref={inputRef}
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
                onFocus={handleInputFocus}
                placeholder={
                  formStage === 'NOME' 
                    ? t.inputPlaceholderName 
                    : formStage === 'TELEFONE' 
                      ? t.inputPlaceholderPhone 
                      : (language === 'pt' ? 'Escreva uma mensagem ou dúvida...' : language === 'es' ? 'Escriba un mensaje o consulta...' : 'Type your message or question...')
                } 
                autoFocus
              />
              <button onClick={handleSendText}>{t.send}</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
