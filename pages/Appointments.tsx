
import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Appointments: React.FC = () => {
  const { content } = useContent();
  const appointmentsData = content.appointments || { heroImage: "", services: [] };
  const services = appointmentsData.services || [];
  
  const location = useLocation();
  const navigate = useNavigate();
  const incomingService = location.state?.service;
  const initialService = incomingService 
    ? services.find((s: string) => s.toLowerCase() === incomingService.toLowerCase()) || "" 
    : "";

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (isSending) return;
    setIsSending(true);

    const formData = new FormData(form);
    const dataObj = Object.fromEntries(formData.entries());
    const payload = { ...dataObj, _subject: `Nova Marcação: ${dataObj.nome}`, _replyto: dataObj.email, destination_email_hint: "clinicasmod@gmail.com" };

    try {
      const response = await fetch(`https://formspree.io/f/xwvlagzr`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        // --- GOOGLE ADS CONVERSION ---
        if (typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'conversion', { 
            'send_to': 'AW-434250599', 
            'value': 25.0, 
            'currency': 'EUR'
          });
          
          (window as any).gtag('event', 'conversion', { 
            'send_to': 'AW-1135006626/form_submission', 
            'value': 10.0, 
            'currency': 'EUR' 
          });
        }
        
        // --- META PIXEL CONVERSION (Lead Event) ---
        if ((window as any).trackMeta) {
          (window as any).trackMeta('Lead', { 
            content_name: dataObj.servico || 'Consulta Clínica',
            value: 25.0,
            currency: 'EUR'
          }, true);
          
          (window as any).trackMeta('Envio_Formulario_Cita_Success');
        }

        if ((window as any).trackEvent) { 
          (window as any).trackEvent('form_submission_success', { 
            'event_category': 'conversion',
            'service': dataObj.servico || 'Geral'
          }); 
        }
        
        navigate('/obrigado', { state: dataObj });
      } else {
        alert("Ocorreu um erro ao enviar o formulário.");
      }
    } catch (error) {
      alert("Erro de ligação. Verifique a sua ligação.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="animate-fade-in-up max-w-[1300px] mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className="hidden lg:block sticky top-[130px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
           <img className="w-full h-auto min-h-[600px] object-cover transition-transform duration-1000 group-hover:scale-110" src={appointmentsData.heroImage || "https://clinica-santa-maria-dos-olivais.b-cdn.net/Carrusel%201-06%20(1).png"} alt="Agendamento" />
           <div className="absolute inset-0 bg-gradient-to-t from-clinic-blue/60 to-transparent"></div>
           <div className="absolute bottom-12 left-10 text-white max-w-sm"><h3 className="text-3xl font-serif italic leading-tight">Cuidamos de si com a proximidade de quem está ao seu lado.</h3></div>
        </div>

        <div className="bg-white/70 backdrop-blur-2xl p-6 sm:p-10 md:p-14 rounded-[3rem] shadow-2xl border border-white relative overflow-hidden">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-clinic-blue mb-4 leading-tight">Marque a sua <span className="text-clinic-purple italic font-serif">Consulta</span></h1>
            <p className="text-base sm:text-lg text-gray-600 font-light">Preencha os seus dados e a nossa equipa entrará em contacto para confirmar o seu horário.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-clinic-purple uppercase tracking-[0.2em] ml-2">Nome Completo</label>
              <input name="nome" type="text" placeholder="Ex: João Silva" className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:border-clinic-blue outline-none transition-all shadow-sm text-lg" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-clinic-purple uppercase tracking-[0.2em] ml-2">Email</label>
                <input name="email" type="email" placeholder="nome@exemplo.pt" className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:border-clinic-blue outline-none transition-all shadow-sm text-lg" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-clinic-purple uppercase tracking-[0.2em] ml-2">Telemóvel</label>
                <input name="telemovel" type="tel" placeholder="912 345 678" className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:border-clinic-blue outline-none transition-all shadow-sm text-lg" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-clinic-purple uppercase tracking-[0.2em] ml-2">Serviço de Interesse</label>
              <div className="relative">
                <select name="servico" defaultValue={initialService} className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:border-clinic-blue outline-none transition-all appearance-none cursor-pointer shadow-sm text-lg text-gray-700 bg-white">
                  <option value="" disabled>Escolha o tratamento...</option>
                  {services.map((s: string, i: number) => <option key={i} value={s}>{s}</option>)}
                </select>
                <i className="fas fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-clinic-purple pointer-events-none"></i>
              </div>
            </div>

            <button type="submit" disabled={isSending} className={`w-full bg-clinic-blue text-white font-bold text-xl py-5 rounded-2xl transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 ${isSending ? 'opacity-70' : 'hover:bg-clinic-purple'}`}>
              {isSending ? <><i className="fas fa-spinner animate-spin"></i> A Enviar...</> : <>Agendar Agora <i className="fas fa-arrow-right text-sm"></i></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
