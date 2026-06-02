
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Calculator, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Info, 
  Stethoscope, 
  Sparkles, 
  Smile, 
  Layers, 
  Activity,
  Scissors,
  Plus,
  ArrowRight,
  Camera,
  Upload,
  Trash2,
  Video,
  User,
  Phone,
  Mail,
  Loader2,
  CheckCircle,
  RefreshCw,
  X
} from 'lucide-react';

interface Procedure {
  id: string;
  name: string;
  priceMin: number;
  priceMax: number;
  description: string;
}

interface Specialty {
  id: string;
  name: string;
  icon: React.ReactNode;
  procedures: Procedure[];
}

const specialtiesData: Specialty[] = [
  {
    id: 'consultas_diagnostico',
    name: 'Consultas e Diagnóstico',
    icon: <Stethoscope className="w-6 h-6" />,
    procedures: [
      { id: 'c-1', name: 'Consulta de Avaliação', priceMin: 20, priceMax: 20, description: 'Avaliação inicial obrigatória (não reembolsável).' },
      { id: 'c-2', name: 'Consulta Medicada', priceMin: 20, priceMax: 20, description: 'Consulta para prescrição ou ajuste de medicação.' },
      { id: 'c-3', name: 'Consulta de Observação Pós-Tratamento', priceMin: 5, priceMax: 5, description: 'Acompanhamento após tratamento clínico.' },
      { id: 'c-4', name: 'Consulta de Estudo Ortodôntico', priceMin: 60, priceMax: 60, description: 'Planeamento completo para aparelho dentário.' },
      { id: 'c-5', name: 'Raio X Periapical', priceMin: 10, priceMax: 10, description: 'Radiografia localizada para diagnóstico interno.' }
    ]
  },
  {
    id: 'higiene_prevencao',
    name: 'Higiene e Prevenção',
    icon: <Activity className="w-6 h-6" />,
    procedures: [
      { id: 'hp-1', name: 'Destartarização + Polimento', priceMin: 40, priceMax: 40, description: 'Limpeza profissional profunda e polimento dental.' },
      { id: 'hp-2', name: 'Profilaxia', priceMin: 30, priceMax: 30, description: 'Prevenção básica e limpeza superficial.' },
      { id: 'hp-3', name: 'Selante por Arcada', priceMin: 40, priceMax: 40, description: 'Proteção preventiva contra cáries.' },
      { id: 'hp-4', name: 'Placa de Relaxamento / Bruxismo', priceMin: 180, priceMax: 180, description: 'Proteção contra o desgaste noturno (por arcada).' }
    ]
  },
  {
    id: 'dentisteria_estetica',
    name: 'Dentisteria e Estética',
    icon: <Sparkles className="w-6 h-6" />,
    procedures: [
      { id: 'de-1', name: 'Branqueamento em Consultório', priceMin: 200, priceMax: 200, description: 'Resultados imediatos em sessão clínica.' },
      { id: 'de-2', name: 'Branqueamento (Kit Casa)', priceMin: 150, priceMax: 150, description: 'Tratamento em casa com acompanhamento clínico.' },
      { id: 'de-3', name: 'Branqueamento (Seringa Adicional)', priceMin: 25, priceMax: 25, description: 'Recarga de gel para manutenção do branqueamento casa.' },
      { id: 'de-4', name: 'Restauração Simples', priceMin: 45, priceMax: 45, description: 'Tratamento de cárie em face única.' },
      { id: 'de-5', name: 'Restauração Complexa', priceMin: 65, priceMax: 65, description: 'Tratamento de cárie em faces múltiplas.' },
      { id: 'de-6', name: 'Restauração Estética', priceMin: 75, priceMax: 75, description: 'Reconstrução de dente focada na perfeição visual.' },
      { id: 'de-7', name: 'Restauração Dente Decíduo', priceMin: 45, priceMax: 45, description: 'Restauração em dentes de leite.' },
      { id: 'de-8', name: 'Restauração Provisória', priceMin: 25, priceMax: 25, description: 'Proteção temporária do dente.' }
    ]
  },
  {
    id: 'cirurgia_endodontia',
    name: 'Cirurgia e Endodontia',
    icon: <Scissors className="w-6 h-6" />,
    procedures: [
      { id: 'ce-1', name: 'Extração Dente Incisivo', priceMin: 30, priceMax: 30, description: 'Remoção de dente frontal.' },
      { id: 'ce-2', name: 'Extração Dente Canino / Pré-Molar', priceMin: 50, priceMax: 50, description: 'Remoção de dentes intermédios.' },
      { id: 'ce-3', name: 'Extração Dente Molar', priceMin: 50, priceMax: 50, description: 'Remoção de dentes posteriores.' },
      { id: 'ce-4', name: 'Extração Siso Erupcionado', priceMin: 75, priceMax: 200, description: 'Extração de dente do siso visível.' },
      { id: 'ce-5', name: 'Extração Siso Incluso', priceMin: 100, priceMax: 200, description: 'Extração cirúrgica de siso dentro do osso.' },
      { id: 'ce-6', name: 'Extração Dente Decíduo', priceMin: 35, priceMax: 35, description: 'Remoção de dente de leite.' },
      { id: 'ce-7', name: 'Desvitalização Incisivo / Pré-Molar', priceMin: 180, priceMax: 180, description: 'Tratamento de canal em dentes frontais/médios.' },
      { id: 'ce-8', name: 'Desvitalização Molar', priceMin: 240, priceMax: 240, description: 'Tratamento de canal em dentes posteriores.' },
      { id: 'ce-9', name: 'Pulpectomia / Pulpotomia', priceMin: 80, priceMax: 120, description: 'Tratamentos parciais ou totais da polpa.' },
      { id: 'ce-10', name: 'Curetagem (por quadrante)', priceMin: 70, priceMax: 70, description: 'Tratamento para limpeza profunda das gengivas.' },
      { id: 'ce-11', name: 'Cirurgia Remodelação Rebordo', priceMin: 60, priceMax: 60, description: 'Preparação do osso alveolar para prótese.' },
      { id: 'ce-12', name: 'Drenagem Abcesso', priceMin: 25, priceMax: 25, description: 'Alívio de infeção aguda.' }
    ]
  },
  {
    id: 'implantologia',
    name: 'Implantologia',
    icon: <Check className="w-6 h-6" />,
    procedures: [
      { id: 'imp-1', name: 'Implante Unitário (Apenas Cirurgia)', priceMin: 745, priceMax: 745, description: 'Colocação cirúrgica da raiz de titânio.' },
      { id: 'imp-2', name: 'Implante + Coroa Metalo-cerâmica', priceMin: 745, priceMax: 745, description: 'Substituição completa de um dente.' },
      { id: 'imp-3', name: 'Reabilitação 2 Implantes', priceMin: 1400, priceMax: 1400, description: 'Substituição múltipla de dentes.' },
      { id: 'imp-4', name: 'Reabilitação 3 Implantes', priceMin: 1800, priceMax: 1800, description: 'Substituição de múltiplos dentes.' },
      { id: 'imp-5', name: 'Reabilitação 4 Implantes', priceMin: 2300, priceMax: 2300, description: 'Base para ponte fixa extensa.' },
      { id: 'imp-6', name: 'Protocolo Superior (Arcada Completa)', priceMin: 4800, priceMax: 5000, description: 'Toda a arcada fixa sobre implantes.' },
      { id: 'imp-7', name: 'Coroa sobre Implante (Cerâmica/Zircónia)', priceMin: 650, priceMax: 650, description: 'Parte visível do dente sobre o implante (exceto cirurgia).' },
      { id: 'imp-8', name: 'Enxerto Ósseo', priceMin: 200, priceMax: 500, description: 'Recuperação de volume ósseo perdido.' },
      { id: 'imp-9', name: 'Limpeza Prótese Fixa Implante', priceMin: 100, priceMax: 100, description: 'Manutenção periódica de prótese fixa.' },
      { id: 'imp-10', name: 'Prótese Provisória (Removível / Fixa)', priceMin: 350, priceMax: 1200, description: 'Dentes temporários durante a cicatrização.' },
      { id: 'imp-11', name: 'Recolocação / Aperto Coroa', priceMin: 10, priceMax: 10, description: 'Pequenos ajustes em coroas sobre implantes.' }
    ]
  },
  {
    id: 'ortodontia',
    name: 'Ortodontia',
    icon: <Smile className="w-6 h-6" />,
    procedures: [
      { id: 'ort-1', name: 'Aparelho Ortodôntico Fixo', priceMin: 450, priceMax: 450, description: 'Sistema metálico tradicional (por arcada).' },
      { id: 'ort-2', name: 'Invisalign (Alinhadores)', priceMin: 3500, priceMax: 5000, description: 'Tratamento invisível removível. Sob consulta.' },
      { id: 'ort-3', name: 'Aparelho Disjuntor / Mantedor Espaço', priceMin: 130, priceMax: 480, description: 'Aparelhos especiais para expansão ou contenção.' },
      { id: 'ort-4', name: 'Aparelho Contenção (Fixo / Removível)', priceMin: 150, priceMax: 180, description: 'Manutenção do sorriso após tratamento.' },
      { id: 'ort-5', name: 'Consulta Manutenção (Normal / Invisalign)', priceMin: 65, priceMax: 75, description: 'Ajuste periódico obrigatório.' },
      { id: 'ort-6', name: 'Retirar Aparelho (Fora da Clínica)', priceMin: 100, priceMax: 100, description: 'Remoção e polimento final.' }
    ]
  },
  {
    id: 'proteses_reabilitacao',
    name: 'Próteses e Reabilitação',
    icon: <Layers className="w-6 h-6" />,
    procedures: [
      { id: 'pr-1', name: 'Prótese Acrílica (Até 14 dentes)', priceMin: 180, priceMax: 330, description: 'Solução removível tradicional.' },
      { id: 'pr-2', name: 'Prótese Esquelérica', priceMin: 260, priceMax: 400, description: 'Prótese metálica fina e resistente.' },
      { id: 'pr-3', name: 'Prótese Flexível', priceMin: 310, priceMax: 440, description: 'Prótese confortável sem ganchos visíveis.' },
      { id: 'pr-4', name: 'Coroa Metalo-cerâmica sobre Dente', priceMin: 550, priceMax: 550, description: 'Substituição definitiva de dente natural.' },
      { id: 'pr-5', name: 'Coroa Cerâmica / Zircónia / Porcelana', priceMin: 450, priceMax: 650, description: 'Estética superior em reabilitação oral.' },
      { id: 'pr-6', name: 'Coroa Provisória / Cimentação', priceMin: 30, priceMax: 70, description: 'Ajustes e soluções temporárias.' },
      { id: 'pr-7', name: 'Conserto / Rembase de Prótese', priceMin: 60, priceMax: 100, description: 'Reparação de fraturas ou reajuste de base.' },
      { id: 'pr-8', name: 'Acrescento de Dente (Acrílica / Flexível)', priceMin: 60, priceMax: 100, description: 'Adição de dente em prótese existente (+10€/dente).' },
      { id: 'pr-9', name: 'Ajuste Prótese', priceMin: 5, priceMax: 5, description: 'Pequenos ajustes de conforto.' }
    ]
  }
];

const QuoteCalculator: React.FC = () => {
  const { t, translateObject, language } = useLanguage();
  const location = useLocation();
  const [flowMode, setFlowMode] = useState<'selector' | 'manual' | 'photo_only'>('selector');
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);

  const translatedSpecialties = React.useMemo(() => {
    return translateObject(specialtiesData);
  }, [translateObject, language]);

  const activeSpecialty = selectedSpecialty
    ? (translatedSpecialties.find(spec => spec.id === selectedSpecialty.id) || selectedSpecialty)
    : null;

  // Camera & Image States
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [photoOptionConsent, setPhotoOptionConsent] = useState<'yes' | 'no' | 'idle'>('idle');
  const [cameraFacingMode, setCameraFacingMode] = useState<'user' | 'environment'>('user');
  const [mouthFocusActive, setMouthFocusActive] = useState(true);

  // Form Lead States
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadNotes, setLeadNotes] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isGlassPocketGuideOpen, setIsGlassPocketGuideOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');

  const TREATMENT_POCKET_GUIDES = [
    { label: 'Implantes Dentários 🦷', desc: 'Preenchimento e reabilitação de dentes em falta', text: 'Pretendo realizar uma avaliação clínica para colocação de implantes dentários por ausência dentária.' },
    { label: 'Arcada Completa 👄', desc: 'Reabilitação total fixa de uma ou ambas as arcadas sobre implantes', text: 'Pretendo obter informações e realizar estudo para uma reabilitação de arcada completa fixa sobre implantes.' },
    { label: 'Facetas Estéticas ✨', desc: 'Melhoria da cor, formato e harmonia do sorriso', text: 'Tenho interesse em realizar facetas estéticas para correção estética de cor, forma ou alinhamento dentário.' },
    { label: 'Alinhadores / Aparelho 🔍', desc: 'Correção ortodôntica do posicionamento dos dentes', text: 'Pretendo agendar consulta de ortodontia para colocação de alinhadores invisíveis ou aparelho dentário convencional.' },
    { label: 'Outros / Higiene Oral 🩹', desc: 'Destartarização, dores agudas ou consulta geral de diagnóstico', text: 'Desejo agendar uma consulta de medicina dentária geral para higiene oral, destartarização ou prevenção.' }
  ];

  const handleObjectiveSelect = (opt: { label: string; desc: string; text: string }) => {
    setSelectedInterests(prev => {
      const isSelected = prev.includes(opt.label);
      let updated: string[];
      if (isSelected) {
        updated = prev.filter(item => item !== opt.label);
        setLeadNotes(current => {
          let cleaned = current.replace(t(opt.text), '').replace(opt.text, '').trim();
          cleaned = cleaned.replace(/\s+/g, ' ');
          return cleaned;
        });
      } else {
        updated = [...prev, opt.label];
        setLeadNotes(current => {
          const suffix = t(opt.text);
          if (!current.trim()) return suffix;
          if (current.trim().endsWith('.') || current.trim().endsWith('!') || current.trim().endsWith('?')) {
            return `${current} ${suffix}`;
          }
          return `${current}. ${suffix}`;
        });
      }
      return updated;
    });
  };

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoStream) {
      if (videoRef.current.srcObject !== videoStream) {
          videoRef.current.srcObject = videoStream;
      }
    }
  }, [videoStream, isCameraModalOpen]); 

  // UX Improvement: Smoothly scroll to the main card when content options change or load
  useEffect(() => {
    const cardEl = document.getElementById('simulator-main-card');
    if (cardEl) {
      setTimeout(() => {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }, [flowMode]);


  const startCamera = async (facing?: 'user' | 'environment') => {
    try {
      setCameraError(null);
      
      // Check if mediaDevices API is available in the current browser/iframe environment
      if (!navigator?.mediaDevices?.getUserMedia) {
        setCameraError(t("De momento, a câmara não é suportada por este navegador ou ambiente (ex: ligação não descodificada ou restrições de iFrame seguro). Por favor, utilize um telemóvel ou carregue uma foto da sua galeria."));
        return;
      }

      // Stop any existing stream before restarting
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }

      const activeFacing = facing || cameraFacingMode;
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: activeFacing,
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
      } catch (firstErr) {
        console.warn("Camera constraint failed, trying fallback:", firstErr);
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: activeFacing }
          });
        } catch (secondErr) {
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              video: true
            });
          } catch (thirdErr) {
            throw thirdErr; // Bubble up to main catch to show error message
          }
        }
      }

      setVideoStream(stream);
      setIsCameraActive(true);
    } catch (err: any) {
      console.error("Camera error:", err);
      
      const errorName = err?.name || '';
      const errorMessage = err?.message || '';
      
      if (
        errorName === 'NotFoundError' || 
        errorName === 'DevicesNotFoundError' || 
        errorMessage.toLowerCase().includes('not found') || 
        errorMessage.toLowerCase().includes('device not found') || 
        errorMessage.toLowerCase().includes('requested device')
      ) {
        setCameraError(t("Câmara física não encontrada: Não foi detetada nenhuma câmara ou webcam ativa neste dispositivo. Pode selecionar facilmente uma imagem da galeria utilizando o botão 'Carregar Foto 📁'."));
      } else if (errorName === 'NotAllowedError' || errorName === 'PermissionDeniedError' || errorName === 'PermissionDismissedError') {
        setCameraError(t("Acesso à câmara recusado: Por favor ative as permissões de câmara no seu navegador ou carregue um ficheiro usando 'Procurar Foto'."));
      } else if (errorName === 'OverconstrainedError') {
        setCameraError(t("A sua câmara não suporta a resolução solicitada. Por favor, envie uma foto diretamente do seu rolo de câmara."));
      } else {
        setCameraError(t("Não foi possível iniciar a câmara") + ` (${errorName || errorMessage || t('Erro técnico')}). ` + t("Por favor, carregue uma foto utilizando o botão ao lado."));
      }
    }
  };

  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      const vw = video.videoWidth || 640;
      const vh = video.videoHeight || 480;

      if (mouthFocusActive) {
        // High quality close-up: Crop into the center 60% of the minor dimension
        const cropSize = Math.min(vw, vh) * 0.60;
        const cropX = (vw - cropSize) / 2;
        const cropY = (vh - cropSize) / 2;

        // Perfect high-resolution 1:1 aspect ratio square close-up of the smile
        canvas.width = 720;
        canvas.height = 720;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Horizontal mirroring only if we are using user/front camera
          if (cameraFacingMode === 'user') {
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
          }
          ctx.drawImage(
            video,
            cropX,
            cropY,
            cropSize,
            cropSize,
            0,
            0,
            canvas.width,
            canvas.height
          );
          const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
          setCapturedPhoto(dataUrl);
          stopCamera();
        }
      } else {
        // Standard view (not cropped to mouth)
        canvas.width = vw;
        canvas.height = vh;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          if (cameraFacingMode === 'user') {
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
          }
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
          setCapturedPhoto(dataUrl);
          stopCamera();
        }
      }
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, envie apenas ficheiros de imagem (JPG, PNG).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const img = new Image();
        img.onload = () => {
          // Resize image to maximum width/height of 1000px while maintaining aspect ratio
          const maxDim = 1000;
          let width = img.width;
          let height = img.height;
          
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
            setCapturedPhoto(dataUrl);
          } else {
            setCapturedPhoto(event.target.result as string);
          }
        };
        img.src = event.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get('mode') || (location.state as any)?.mode;
    if (mode === 'photo') {
      setFlowMode('photo_only');
      setPhotoOptionConsent('yes');
      if (searchParams.get('autostart') === 'true') {
        setIsCameraModalOpen(true);
        startCamera();
      }
    }
  }, [location.search]);

  const handleCampaignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError('');
    setNameError('');

    if (!leadName) {
      setNameError(t("Por favor, introduza o seu nome."));
      return;
    }
    if (!leadPhone) {
      setPhoneError(t("Por favor, introduza o seu número de telemóvel."));
      return;
    }

    const digits = leadPhone.replace(/\D/g, '');
    if (digits.length < 9) {
      setPhoneError(t("O número de telemóvel/WhatsApp deve conter pelo menos 9 dígitos."));
      return;
    }

    setSubmitStatus('submitting');

    // Compile selected treatments
    const treatmentsList: string[] = [];
    selectedProcedures.forEach(id => {
      specialtiesData.forEach(spec => {
        const proc = spec.procedures.find(p => p.id === id);
        if (proc) {
          treatmentsList.push(`${proc.name} (${proc.priceMin}€)`);
        }
      });
    });

    const msgText = `Simulador de Sorriso:
Especialidade: ${selectedSpecialty?.name || 'Não selecionada'}
Tratamentos Escolhidos: ${treatmentsList.join(', ')}
Interesses/Objetivos do paciente: ${selectedInterests.length > 0 ? selectedInterests.join(', ') : 'Não selecionado por botões rápidos'}
Valor Estimado: ${min}€ - ${max}€
Mensagem do Paciente: ${leadNotes || 'Sem observações.'}`;

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail || 'contacto@clinica.pt',
          phone: leadPhone,
          message: msgText,
          photo: capturedPhoto || undefined
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        if ((window as any).trackEvent) {
          (window as any).trackEvent('quote_submitted_with_photo', { min, max, has_photo: !!capturedPhoto });
        }
        if ((window as any).trackMeta) {
          (window as any).trackMeta('Lead', {
            content_name: 'Simulador Orçamento com Foto',
            content_category: 'Simulator',
            value: Number(min),
            currency: 'EUR'
          });
        }
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    }
  };

  const handleReset = () => {
    stopCamera();
    setCapturedPhoto(null);
    setCameraError(null);
    setPhotoOptionConsent('idle');
    setLeadName('');
    setLeadPhone('');
    setLeadEmail('');
    setLeadNotes('');
    setSubmitStatus('idle');
    setPhoneError('');
    setNameError('');
    reset();
  };

  const toggleProcedure = (id: string) => {
    setSelectedProcedures(prev => {
      const isAdding = !prev.includes(id);
      if (isAdding && (window as any).trackMeta) {
        // Find procedure for metadata
        let procName = "Aparelho/Tratamento";
        specialtiesData.forEach(spec => {
          const p = spec.procedures.find(proc => proc.id === id);
          if (p) procName = p.name;
        });
        
        (window as any).trackMeta('AddToCart', {
          content_name: procName,
          content_type: 'product',
          content_ids: [id],
          currency: 'EUR'
        }, true);
      }
      return isAdding ? [...prev, id] : prev.filter(p => p !== id);
    });
  };

  const calculateTotal = () => {
    let min = 0;
    let max = 0;
    
    selectedProcedures.forEach(id => {
      specialtiesData.forEach(spec => {
        const proc = spec.procedures.find(p => p.id === id);
        if (proc) {
          min += proc.priceMin;
          max += proc.priceMax;
        }
      });
    });
    
    return { min, max };
  };

  const goToResult = () => {
    const { min } = calculateTotal();
    if ((window as any).trackMeta) {
      (window as any).trackMeta('InitiateCheckout', {
        value: min,
        currency: 'EUR',
        content_name: 'Simulação de Orçamento',
        num_items: selectedProcedures.length
      }, true);
    }
    setStep(3);
  };

  const reset = () => {
    setStep(1);
    setSelectedSpecialty(null);
    setSelectedProcedures([]);
    setFlowMode('selector');
  };

  const { min, max } = calculateTotal();

  const getHeaderContent = () => {
    if (flowMode === 'photo_only') {
      return {
        title: <>{t("Diagnóstico Clínico")} <span className="text-clinic-purple italic font-serif">{t("por Foto")}</span></>,
        desc: t("Envie uma foto simples do seu sorriso. Os nossos médicos especialistas vão avaliar a anatomia do seu caso para lhe apresentar um orçamento real com 100% de precisão clínica."),
        icon: <Camera className="text-clinic-purple w-10 h-10" />
      };
    }
    return {
      title: <>{t("Simulador de")} <span className="text-clinic-purple italic font-serif">{t("Investimento")}</span></>,
      desc: t("Simule o seu orçamento oficial com transparência. Opte pelo diagnóstico clínico inovador orientado por foto ou pelo simulador manual passo a passo."),
      icon: <Calculator className="text-clinic-purple w-10 h-10" />
    };
  };

  const header = getHeaderContent();

  return (
    <div className="min-h-screen py-8 md:py-16 px-3 sm:px-4 md:px-6 max-w-6xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <motion.div 
          key={flowMode}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-clinic-purple/10 rounded-2xl md:rounded-3xl mb-4 md:mb-6"
        >
          {header.icon}
        </motion.div>
        <h1 className="text-3xl md:text-6xl font-bold text-clinic-blue mb-4 md:mb-6 tracking-tight px-1">
          {header.title}
        </h1>
        <p className="text-sm md:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed px-4">
          {header.desc}
        </p>
      </div>

      <div id="simulator-main-card" className="bg-white rounded-2xl sm:rounded-[2.5rem] md:rounded-[3rem] shadow-xl md:shadow-2xl overflow-hidden border border-gray-100 min-h-[500px] md:min-h-[600px] flex flex-col relative">
        {/* Progress Tracker */}
        {flowMode === 'manual' && (
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-50 flex">
             <motion.div 
               className="h-full bg-clinic-lime"
               initial={{ width: 0 }}
               animate={{ width: `${(step / 3) * 100}%` }}
               transition={{ duration: 0.8, ease: "circOut" }}
             />
          </div>
        )}

        <div className="p-4 sm:p-8 md:p-16 flex-grow animate-fade-in">
          <AnimatePresence mode="wait">
            {flowMode === 'selector' && (
              <motion.div
                key="mode_selector"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8 md:space-y-12 animate-fade-in"
              >
                <div className="text-center space-y-3 md:space-y-4 max-w-3xl mx-auto">
                  <span className="inline-block bg-clinic-purple/10 text-clinic-purple px-4 py-1.5 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-widest">
                    {t("🦷 Avaliação Digital de Sorriso")}
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-clinic-blue leading-tight px-2">
                    {t("Como prefere simular o seu investment?") || t("Como prefere simular o seu investimento?")}
                  </h2>
                  <p className="text-gray-500 font-light text-xs sm:text-sm md:text-base leading-relaxed px-4">
                    {t("Escolha a opção que melhor se ajusta às suas necessidades. O diagnóstico por foto é validado diretamente por médicos dentistas qualificados de forma 100% gratuita.")}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch pt-2">
                  {/* PATH 1: PHOTO DIAGNOSTIC (HERO CARD) */}
                  <div className="relative rounded-2xl sm:rounded-[2.5rem] border-[3px] border-clinic-purple bg-gradient-to-b from-clinic-purple/[0.04] to-white shadow-lg hover:shadow-xl transition-all duration-300 hover:border-clinic-purple group overflow-hidden flex flex-col justify-between p-6 sm:p-8 md:p-10">
                    {/* Glowing highlight effects */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-clinic-purple/10 opacity-30 blur-3xl rounded-full pointer-events-none"></div>

                    <div className="space-y-6 relative z-10">
                      <div className="flex justify-between items-start gap-3">
                        <div className="inline-flex items-center justify-center p-3.5 md:p-4 rounded-xl md:rounded-2xl bg-clinic-purple text-white shadow-md shadow-clinic-purple/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
                          <Camera className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        <div className="bg-clinic-blue text-white border border-clinic-purple/30 font-black text-[9px] md:text-xs px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm select-none">
                          {t("Recomendado")} <span className="animate-pulse">🚀</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-clinic-blue leading-tight">
                          {t("Diagnóstico por Imagem")}
                          <span className="text-clinic-purple italic font-serif block mt-1 text-sm sm:text-base md:text-lg">{t("100% Real & Gratuito")}</span>
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                          {t("Tire uma fotografia ao seu sorriso com o seu telemóvel ou computador. Os nossos médicos dentistas vão analisar a anatomia do seu sorriso e fornecer-lhe-ão gratuitamente uma estimativa precisa e personalizada.")}
                        </p>
                      </div>

                      <ul className="space-y-2.5 pt-1">
                        {[
                          t('Avaliação clínica real por Médicos Dentistas'),
                          t('Indicação exata de tratamentos recomendados'),
                          t('Privacidade total dos seus dados (RGPD)'),
                          t('Resposta célere em menos de 24 horas úteis')
                        ].map((bullet, idx) => (
                          <li key={idx} className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                            <span className="w-5 h-5 rounded-full bg-clinic-purple/10 flex items-center justify-center text-clinic-purple shrink-0">
                              <Check size={11} className="stroke-[3]" />
                            </span>
                            <span className="text-xs">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setFlowMode('photo_only');
                        setPhotoOptionConsent('yes');
                      }}
                      className="mt-6 md:mt-8 w-full bg-clinic-purple hover:bg-clinic-blue text-white font-black py-4 px-6 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2.5 shadow-md shadow-clinic-purple/15 hover:shadow-clinic-blue/15 transition-all text-xs sm:text-sm md:text-base cursor-pointer hover:scale-[1.01]"
                    >
                      <Camera className="w-4 h-4 md:w-5 md:h-5" /> {t("Iniciar Diagnóstico por Foto 🦷")}
                    </button>
                  </div>

                  {/* PATH 2: MANUAL ESTIMATION CARD */}
                  <div className="relative rounded-2xl sm:rounded-[2.5rem] border border-gray-200/60 bg-white shadow-sm hover:shadow-lg hover:border-clinic-blue/40 transition-all duration-300 flex flex-col justify-between p-6 sm:p-8 md:p-10 group">
                    <div className="space-y-6">
                      <div className="flex justify-between items-start gap-3">
                        <div className="inline-flex items-center justify-center p-3.5 md:p-4 rounded-xl md:rounded-2xl bg-gray-50 text-clinic-blue group-hover:bg-clinic-blue/10 group-hover:text-clinic-blue transition-colors duration-300 shrink-0">
                          <Calculator className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        <div className="bg-gray-100/80 text-gray-500 font-bold text-[9px] md:text-xs px-3 py-1.5 rounded-full uppercase tracking-wider select-none">
                          {t("Preços de Tabela 📋")}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-clinic-blue leading-tight">
                          {t("Simulador Manual de")}
                          <span className="text-gray-400 italic font-serif block mt-1 text-sm sm:text-base md:text-lg">{t("Tratamentos")}</span>
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                          {t("Selecione os tratamentos e especialidades que deseja (implantes, higiene, aparelhos, estética) para consultar os custos de referência aproximados com base na nossa tabela de preços oficial.")}
                        </p>
                      </div>

                      <ul className="space-y-2.5 pt-1">
                        {[
                          t('Consulte preços oficiais da tabela clínica'),
                          t('Simule múltiplas especialidades juntas'),
                          t('Sem necessidade de partilhar imagens'),
                          t('Cálculo e estimativa teórica instantânea')
                        ].map((bullet, idx) => (
                          <li key={idx} className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                            <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-clinic-blue shrink-0">
                              <Check size={11} className="stroke-[3]" />
                            </span>
                            <span className="text-xs">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setFlowMode('manual');
                        setStep(1);
                      }}
                      className="mt-6 md:mt-8 w-full bg-white border border-clinic-blue/20 text-clinic-blue hover:bg-clinic-blue/5 hover:border-clinic-blue font-extrabold py-4 px-6 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2.5 transition-all text-xs sm:text-sm md:text-base cursor-pointer hover:scale-[1.01]"
                    >
                      <Calculator className="w-4 h-4 md:w-5 md:h-5" /> {t("Simular Manualmente 📋")}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {flowMode === 'photo_only' && (
              <motion.div
                key="photo_only_flow"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8 animate-fade-in"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <button 
                    onClick={() => { stopCamera(); setCapturedPhoto(null); setCameraError(null); setFlowMode('selector'); }} 
                    className="flex items-center gap-2 text-clinic-purple font-bold text-xs uppercase hover:underline transition-all cursor-pointer"
                  >
                    <ChevronLeft size={16} /> Voltar aos métodos
                  </button>
                  <div className="flex items-center gap-2 text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1.5 rounded-full border border-emerald-100 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Diagnóstico Gratuito 100% Seguro
                  </div>
                </div>

                {submitStatus !== 'success' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Camera capture / Image Upload Area */}
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="block text-sm font-bold text-clinic-blue">Fotografia do seu Sorriso/Dentes *</label>
                        <p className="text-xs text-gray-500 font-light">É necessário carregar ou tirar uma foto para submeter esta consulta.</p>
                      </div>

                      {!capturedPhoto && !isCameraActive && (
                        <div 
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                          className={`border-2 border-dashed rounded-[2.5rem] p-10 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[300px] ${
                            dragActive 
                              ? 'border-clinic-purple bg-clinic-purple/[0.03]' 
                              : 'border-gray-200 bg-white hover:border-clinic-purple/50'
                          }`}
                        >
                          <Camera className="w-16 h-16 text-clinic-purple/20 mb-4 animate-pulse" />
                          <p className="font-bold text-clinic-blue text-sm mb-1">Tire uma fotografia ou arraste o ficheiro</p>
                          <p className="text-xs text-gray-400 font-light mb-6">Suporta formatos JPEG, PNG, WebP do telemóvel ou PC</p>
                          
                          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs cursor-pointer">
                            <button
                              type="button"
                              onClick={() => {
                                setIsCameraModalOpen(true);
                                startCamera();
                              }}
                              className="w-full bg-clinic-purple hover:bg-clinic-purple/95 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-md shadow-clinic-purple/15 text-center"
                            >
                              <Camera size={14} /> Ativar Câmara 📸
                            </button>
                            
                            <label className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-clinic-blue font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm text-center">
                              <Upload size={14} /> Carregar Foto 📁
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={handleFileChange} 
                              />
                            </label>
                          </div>

                          {cameraError && (
                            <p className="text-red-500 text-[11px] font-bold mt-4 max-w-xs leading-relaxed bg-red-50 p-2.5 rounded-lg border border-red-100">{cameraError}</p>
                          )}
                        </div>
                      )}

                      {isCameraModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
                          <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#121626] to-[#0a0c16] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col">
                            
                            {/* Modal Header */}
                            <div className="p-5 border-b border-white/5 flex items-center justify-between text-white">
                              <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-clinic-lime animate-pulse" />
                                <h3 className="font-bold text-sm md:text-base tracking-tight text-white/90">Diagnóstico de Sorriso - Câmara Ativa</h3>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  stopCamera();
                                  setIsCameraModalOpen(false);
                                }}
                                className="text-gray-400 hover:text-white transition-all p-2 hover:bg-white/5 rounded-full cursor-pointer"
                              >
                                <X size={18} />
                              </button>
                            </div>

                            {/* Camera Viewport with Active Controls */}
                            <div className="relative bg-[#050505] aspect-video flex items-center justify-center overflow-hidden">
                              <video
                                ref={videoRef}
                                className={`w-full h-full object-cover absolute top-0 left-0 transition-transform ${cameraFacingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                                autoPlay
                                playsInline
                                muted
                              />
                              
                              {/* Floating Controls Overlay */}
                              <div className="absolute top-4 inset-x-4 flex justify-between items-center z-20 pointer-events-none">
                                {/* Zoom Face / Mouth focus button */}
                                <button
                                  type="button"
                                  onClick={() => setMouthFocusActive(!mouthFocusActive)}
                                  className={`pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold text-[10px] md:text-[11px] uppercase tracking-wider backdrop-blur-md transition-all active:scale-95 shadow-md cursor-pointer ${
                                    mouthFocusActive 
                                      ? 'bg-clinic-lime border-clinic-lime text-clinic-blue shadow-clinic-lime/10' 
                                      : 'bg-black/60 border-white/10 text-white/80 hover:bg-black/75'
                                  }`}
                                >
                                  <Smile size={12} className={mouthFocusActive ? 'animate-bounce' : ''} />
                                  <span>{mouthFocusActive ? 'Foco Boca: Ativo ✨' : 'Foco Boca: Desativo 🔍'}</span>
                                </button>

                                {/* Flip/Rotate Camera button */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextFacing = cameraFacingMode === 'user' ? 'environment' : 'user';
                                    setCameraFacingMode(nextFacing);
                                    startCamera(nextFacing);
                                  }}
                                  className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-xl text-white font-bold text-[10px] md:text-[11px] uppercase tracking-wider shadow-md border border-white/10 active:scale-95 transition-all cursor-pointer"
                                >
                                  <RefreshCw size={12} />
                                  <span>{cameraFacingMode === 'user' ? 'Traseira 🔄' : 'Frontal 🔄'}</span>
                                </button>
                              </div>
                              
                              {/* Enhanced smart mouth guidelines for high quality dental scan focus */}
                              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10">
                                <div className={`w-[60%] sm:w-[50%] aspect-[1.3] max-w-[200px] border-4 border-dashed rounded-[45%] flex flex-col items-center justify-center bg-clinic-lime/[0.03] transition-all duration-300 ${mouthFocusActive ? 'border-clinic-lime animate-pulse' : 'border-white/30'}`}>
                                  <div className={`w-12 h-5 border-b-2 border-dashed rounded-b-full mt-2 ${mouthFocusActive ? 'border-clinic-lime/60' : 'border-white/20'}`}></div>
                                </div>
                                <span className="text-[9px] md:text-[10px] text-white bg-clinic-purple/95 px-3.5 py-1.5 rounded-full backdrop-blur-sm shadow-md border border-white/10 mt-4 font-extrabold uppercase tracking-wide select-none drop-shadow">
                                  {mouthFocusActive ? 'Alinhe a sua BOCA neste guia 👄' : 'Alinhe o seu rosto aqui 👁️'}
                                </span>
                              </div>

                              {/* Elegant bottom helper badge */}
                              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-[9px] font-bold text-white/70 bg-black/50 backdrop-blur-sm px-3.5 py-1 rounded-full pointer-events-none text-center select-none border border-white/5 uppercase tracking-wider">
                                {mouthFocusActive ? 'Modo Ultra-Foco Dental Ativo ✓' : 'Modo Panorâmico'}
                              </div>
                            </div>

                            {/* Modal Footer / Control Bar (OUTSIDE the video!) */}
                            <div className="p-6 bg-white/5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                              <button
                                type="button"
                                onClick={() => {
                                  stopCamera();
                                  setIsCameraModalOpen(false);
                                }}
                                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all border border-white/10 cursor-pointer"
                              >
                                Cancelar
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  capturePhoto();
                                  setIsCameraModalOpen(false);
                                }}
                                className="w-full sm:w-auto bg-clinic-lime hover:bg-clinic-lime/90 text-clinic-blue font-black px-8 py-3 rounded-xl text-xs flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-95 transition-all shadow-lg cursor-pointer duration-200"
                              >
                                <Camera size={14} /> Capturar Sorriso 📸
                              </button>
                            </div>

                          </div>
                        </div>
                      )}

                      {/* Captured/Uploaded photo preview */}
                      {capturedPhoto && (
                        <div className="relative rounded-[2.5rem] border-2 border-clinic-purple overflow-hidden max-w-sm mx-auto shadow-lg bg-white p-3">
                          <img 
                            src={capturedPhoto} 
                            alt="Foto Dental" 
                            className="w-full rounded-[2rem] aspect-square object-cover" 
                          />
                          <button
                            type="button"
                            onClick={() => setCapturedPhoto(null)}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 text-red-600 hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center shadow-md border border-gray-100 cursor-pointer"
                            title="Remover Foto"
                          >
                            <X size={16} />
                          </button>
                          <div className="text-center mt-3 pb-1">
                            <span className="text-[10px] text-clinic-purple font-black uppercase tracking-wider">Foto de Sorriso Pronta 🦷 ✓</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Contact details */}
                    <div className="space-y-4">
                      <div className="border-b border-gray-100 pb-2">
                        <span className="text-xs font-bold text-clinic-purple uppercase">{t("Dados para Receber o Diagnóstico")}</span>
                      </div>
                      <form onSubmit={handleCampaignSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-bold text-clinic-blue mb-1">{t("O seu Nome Completo *")}</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                              <User size={16} />
                            </span>
                            <input
                              type="text"
                              required
                              value={leadName}
                              onChange={(e) => {
                                setLeadName(e.target.value);
                                if (nameError) setNameError('');
                              }}
                              placeholder={t("ex: João Silva")}
                              className={`w-full pl-10 pr-4 py-3 bg-white rounded-xl border outline-none focus:ring-2 transition-all text-sm ${
                                nameError ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-clinic-purple/20 focus:border-clinic-purple'
                              }`}
                            />
                          </div>
                          {nameError && <p className="text-red-500 text-xs mt-1 font-bold">{nameError}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-clinic-blue mb-1">{t("Telemóvel / WhatsApp *")}</label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <Phone size={16} />
                              </span>
                              <input
                                type="tel"
                                required
                                value={leadPhone}
                                onChange={(e) => {
                                  setLeadPhone(e.target.value);
                                  if (phoneError) setPhoneError('');
                                }}
                                placeholder={t("ex: 912 345 678")}
                                className={`w-full pl-10 pr-4 py-3 bg-white rounded-xl border outline-none focus:ring-2 transition-all text-sm ${
                                  phoneError ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-clinic-purple/20 focus:border-clinic-purple'
                                }`}
                              />
                            </div>
                            {phoneError && <p className="text-red-500 text-xs mt-1 font-bold">{phoneError}</p>}
                          </div>

                          <div>
                            <label className="block text-sm font-bold text-clinic-blue mb-1">{t("Email (Opcional)")}</label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <Mail size={16} />
                              </span>
                              <input
                                type="email"
                                value={leadEmail}
                                onChange={(e) => setLeadEmail(e.target.value)}
                                placeholder={t("ex: joao@email.com")}
                                className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-clinic-purple/20 focus:border-clinic-purple text-clinic-blue font-medium placeholder-gray-400 transition-all text-sm"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-clinic-purple uppercase tracking-wider">
                            {t("Selecione o seu objetivo clínico (Opcional) 💡")}
                          </label>
                          <button
                            type="button"
                            onClick={() => setIsGlassPocketGuideOpen(true)}
                            className="w-full flex items-center justify-between p-3.5 bg-clinic-purple/[0.04] border border-clinic-purple/20 hover:border-clinic-purple/40 rounded-xl text-left transition-all active:scale-98 cursor-pointer group"
                          >
                            <div className="flex flex-wrap gap-1.5 items-center mr-2">
                              {selectedInterests.length === 0 ? (
                                <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                                  {t("👉 Clique aqui para selecionar os seus objetivos clínicos...")}
                                </span>
                              ) : (
                                selectedInterests.map(interest => (
                                  <span key={interest} className="inline-flex items-center gap-1 bg-clinic-purple text-white font-bold text-[10px] px-2.5 py-1 rounded-lg shadow-sm">
                                    {t(interest)}
                                  </span>
                                ))
                              )}
                            </div>
                            <span className="text-xs font-black text-clinic-purple group-hover:translate-x-0.5 transition-transform flex items-center gap-1 shrink-0">
                              {t("Selecionar ⚙️")}
                            </span>
                          </button>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-clinic-blue mb-1">{t("Diga-nos o que sente ou qual o seu objetivo:")}</label>
                          <textarea
                            value={leadNotes}
                            onChange={(e) => setLeadNotes(e.target.value)}
                            placeholder={t("ex: Gostava de preencher falta de dentes com implantes / corrigir alinhamento.")}
                            rows={3}
                            className="w-full p-4 bg-white rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-clinic-purple/20 focus:border-clinic-purple text-clinic-blue font-medium placeholder-gray-400 transition-all text-sm resize-none"
                          />
                        </div>

                        {submitStatus === 'error' && (
                          <p className="text-red-600 text-xs font-bold text-center">{t("Falta de conexão ou erro ao enviar dados. Por favor verifique as informações e o telemóvel.")}</p>
                        )}

                        {!capturedPhoto && (
                          <p className="text-amber-600 text-center font-bold text-xs bg-amber-50 rounded-xl p-3 border border-amber-100 flex items-center justify-center gap-2">
                            <Info size={14} /> {t("Nota: Carregue ou tire uma foto para poder submeter o diagnóstico.")}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={submitStatus === 'submitting' || !capturedPhoto}
                          className="w-full bg-clinic-purple hover:bg-clinic-blue disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-clinic-purple text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-all active:scale-95 shadow-xl shadow-clinic-purple/10 text-sm md:text-base"
                        >
                          {submitStatus === 'submitting' ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              {t("A Enviar Diagnóstico...")}
                            </>
                          ) : (
                            <>
                              {t("Enviar Foto Diagnóstico Segura 🚀")}
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center p-12 bg-white rounded-[2.5rem] border border-emerald-100 flex flex-col items-center justify-center text-center space-y-6 shadow-xl max-w-2xl mx-auto"
                    >
                      <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-2">
                        <CheckCircle size={44} />
                      </div>
                      <h4 className="text-3xl font-black text-clinic-blue">{t("Foto de Diagnóstico Recebida!")}</h4>
                      <div className="text-gray-600 font-light max-w-md leading-relaxed text-sm space-y-4">
                        <p>{t("Muito obrigado pelas informações de Sorriso,")} <span className="font-bold text-clinic-blue">{leadName}</span>.</p>
                        <p className="font-semibold text-clinic-purple text-base">{t("O Diretor Clínico da Clínica Santa Maria vai analisar individualmente a anatomia do seu sorriso.")}</p>
                        <p>{t("Entraremos em contacto no prazo máximo de 24 horas úteis, enviando um plano e estimativa adequados ao seu caso via WhatsApp/Telemóvel.")}</p>
                      </div>
                      <div className="pt-2">
                        <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-5 py-2.5 rounded-full border border-emerald-100 uppercase tracking-widest">
                          {t("ID de Diagnóstico Dental Seguro ✓")}
                        </span>
                      </div>
                    </motion.div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                      <button 
                        onClick={handleReset} 
                        className="w-full bg-clinic-blue text-white font-bold py-4 px-8 rounded-2xl text-center hover:bg-clinic-purple transition-colors shadow-lg cursor-pointer"
                      >
                        {t("Simular Outro Caso / Recomeçar")}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {flowMode === 'manual' && step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-10"
              >
                <div className="flex flex-col gap-2 items-center md:items-start">
                  <button 
                    onClick={() => { setFlowMode('selector'); }} 
                    className="flex items-center gap-1.5 text-clinic-purple font-black text-xs uppercase hover:underline mb-2 cursor-pointer transition-all self-start"
                  >
                     <ChevronLeft size={14} /> {t("Voltar ao Início")}
                  </button>
                  <span className="bg-clinic-purple/10 text-clinic-purple px-4 py-1 rounded-full font-bold text-xs uppercase tracking-widest">{t("Passo 1: Especialidade")}</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-clinic-blue text-center md:text-left">{t("O que quer cuidar hoje?")}</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {translatedSpecialties.map((spec) => (
                    <button
                      key={spec.id}
                      onClick={() => { setSelectedSpecialty(spec); setStep(2); }}
                      className="group relative flex flex-col items-center md:items-start gap-4 p-8 rounded-[2.5rem] border-2 border-gray-100 transition-all hover:border-clinic-purple hover:bg-clinic-purple/[0.02] text-left hover:shadow-xl active:scale-95 cursor-pointer"
                    >
                      <div className="p-5 rounded-2xl bg-clinic-bg text-clinic-blue group-hover:bg-clinic-purple group-hover:text-white transition-colors shadow-sm">
                        {spec.icon}
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="font-bold text-xl text-clinic-blue group-hover:text-clinic-purple transition-colors">{t(spec.name)}</h3>
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{t("Explorar tratamentos e preços.")}</p>
                      </div>
                      <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Plus className="text-clinic-purple" size={20} />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {flowMode === 'manual' && step === 2 && activeSpecialty && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-10"
              >
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex flex-col gap-2">
                    <button onClick={() => setStep(1)} className="flex items-center gap-2 text-clinic-purple font-bold text-xs uppercase hover:underline mb-2 transition-all cursor-pointer">
                       <ChevronLeft size={16} /> {t("Voltar às categorias")}
                    </button>
                    <h2 className="text-3xl md:text-4xl font-bold text-clinic-blue">{t("Tratamentos de")} {t(activeSpecialty.name)}</h2>
                  </div>
                  <div className="bg-clinic-bg px-6 py-3 rounded-2xl flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-clinic-purple">
                        {activeSpecialty.icon}
                     </div>
                     <span className="font-bold text-clinic-blue hidden md:block">{t(activeSpecialty.name)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeSpecialty.procedures.map((proc) => (
                    <button
                      key={proc.id}
                      onClick={() => toggleProcedure(proc.id)}
                      className={`relative flex items-start p-6 rounded-[2rem] border-2 transition-all text-left overflow-hidden ${
                        selectedProcedures.includes(proc.id)
                        ? 'border-clinic-purple bg-clinic-purple/[0.03] shadow-md'
                        : 'border-gray-50 hover:border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex-grow pr-10">
                        <h3 className={`font-bold text-lg mb-1 transition-colors ${selectedProcedures.includes(proc.id) ? 'text-clinic-purple' : 'text-clinic-blue'}`}>
                          {proc.name}
                        </h3>
                        <p className="text-gray-500 text-xs font-light leading-relaxed">{proc.description}</p>
                        <div className="mt-4 flex items-center gap-2">
                           <span className="text-[10px] font-bold uppercase text-gray-400">{t("Referência:")}</span>
                           <span className="text-sm font-bold text-clinic-blue">
                              {proc.priceMin === proc.priceMax ? `${proc.priceMin}€` : `${proc.priceMin}€ - ${proc.priceMax}€`}
                           </span>
                        </div>
                      </div>
                      <div className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedProcedures.includes(proc.id)
                        ? 'bg-clinic-purple border-clinic-purple text-white'
                        : 'border-gray-200'
                      }`}>
                        {selectedProcedures.includes(proc.id) ? <Check size={18} /> : <Plus size={18} className="text-gray-300" />}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-10 border-t border-gray-100">
                  <div className="text-center sm:text-left">
                     <p className="text-sm text-gray-500">{t("Selecionados:")} <span className="font-bold text-clinic-purple">{selectedProcedures.length} {t("tratamentos")}</span></p>
                  </div>
                  <button 
                    onClick={goToResult}
                    disabled={selectedProcedures.length === 0}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-clinic-blue text-white font-bold px-12 py-5 rounded-2xl hover:bg-clinic-purple disabled:opacity-50 disabled:grayscale transition-all shadow-xl active:scale-95 cursor-pointer"
                  >
                    {t("Ver Orçamento")} <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {flowMode === 'manual' && step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-12 max-w-4xl mx-auto"
              >
                <div className="text-center space-y-4">
                  <div className="inline-block bg-clinic-lime/20 text-clinic-blue px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4">{t("Estimativa Pronto!")}</div>
                  <h2 className="text-4xl md:text-5xl font-bold text-clinic-blue">{t("O seu plano de sorriso")}</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
                  <div className="lg:col-span-3 bg-clinic-blue text-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl flex flex-col justify-center items-center text-center relative overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-clinic-purple opacity-20 blur-3xl rounded-full"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-clinic-lime opacity-10 blur-3xl rounded-full"></div>
                    
                    <span className="relative z-10 text-clinic-purple font-black text-xs uppercase tracking-[0.3em] mb-6 block">{t("Valor Total Estimado")}</span>
                    <div className="relative z-10 flex items-center justify-center gap-4">
                       <div className="flex flex-col items-center">
                          <span className="text-sm font-bold opacity-50 mb-1">{t("Mínimo")}</span>
                          <span className="text-5xl md:text-7xl font-black">{min}€</span>
                       </div>
                       <div className="h-16 w-px bg-white/20 mx-4"></div>
                       <div className="flex flex-col items-center">
                          <span className="text-sm font-bold opacity-50 mb-1">{t("Máximo")}</span>
                          <span className="text-5xl md:text-7xl font-black">{max}€</span>
                       </div>
                    </div>
                    
                    <div className="relative z-10 mt-10 pt-8 border-t border-white/10 w-full">
                       <p className="text-sm font-light italic opacity-80 flex items-center justify-center gap-2">
                          <Info size={16} className="text-clinic-lime" /> {t("Inclui diagnóstico e acompanhamento especializado")}
                       </p>
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-clinic-bg/50 p-10 rounded-[3.5rem] border-2 border-white flex flex-col justify-center">
                    <h3 className="font-bold text-clinic-blue text-xl mb-6">{t("Próximos Passos:")}</h3>
                    <ul className="space-y-5">
                      {[
                        'Confirmação médica do orçamento',
                        'Acesso a condições de financiamento',
                        'Prioridade na agenda da clínica'
                      ].map((text, i) => (
                        <li key={i} className="flex items-start gap-4 text-gray-700">
                          <div className="shrink-0 w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center">
                             <Check size={18} className="text-clinic-lime" />
                          </div>
                          <span className="text-sm font-medium leading-snug">{t(text)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* ADVANCED CAMERA & MULTI-UPLOAD SECTION */}
                <div className="bg-clinic-bg/40 p-8 md:p-12 rounded-[3.5rem] border-2 border-white space-y-8 mt-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-clinic-blue flex items-center gap-3">
                        <span className="p-2 rounded-xl bg-clinic-purple/10 text-clinic-purple">
                          <Camera className="w-6 h-6" />
                        </span>
                        Diagnóstico por Foto (Opcional)
                      </h3>
                      <p className="text-sm text-gray-500 mt-2 font-light">
                        Ative a sua câmara ou carregue uma foto da sua boca para que os nossos médicos validem a sua simulação.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1.5 rounded-full border border-emerald-100 self-start md:self-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      100% Seguro e Confidencial
                    </div>
                  </div>

                  {submitStatus !== 'success' ? (
                    <div>
                      {photoOptionConsent === 'idle' && (
                        <div className="text-center py-6 max-w-2xl mx-auto space-y-8 animate-fade-in">
                          <div className="bg-clinic-purple/5 p-6 rounded-[2rem] border border-clinic-purple/10 inline-block">
                            <span className="text-5xl">🦷</span>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-3xl font-extrabold text-clinic-blue">Quer receber um Diagnóstico de Sorriso Gratuito?</h4>
                            <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed">
                              Envie-nos uma foto do seu sorriso para que os nossos médicos especialistas avaliem a sua simulação de investimento com 100% de precisão clínica e sem custos.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left">
                            <button
                              type="button"
                              onClick={() => {
                                setPhotoOptionConsent('yes');
                                setIsCameraModalOpen(true);
                                startCamera();
                              }}
                              className="bg-clinic-purple hover:bg-clinic-blue text-white font-extrabold py-6 px-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-clinic-purple/15 text-center cursor-pointer group"
                            >
                              <span className="p-3 rounded-2xl bg-white/10 group-hover:scale-110 transition-transform">
                                <Camera className="w-6 h-6" />
                              </span>
                              <div>
                                <span className="text-sm block">Sim, Ativar Câmara do Telemóvel / PC 📸</span>
                                <span className="text-[10px] font-medium opacity-80 mt-1 block">Solicitará permissão segura ao seu navegador</span>
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setPhotoOptionConsent('yes');
                              }}
                              className="bg-white border-2 border-gray-100 hover:border-clinic-purple/40 text-clinic-blue font-extrabold py-6 px-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-sm text-center cursor-pointer group"
                            >
                              <span className="p-3 rounded-2xl bg-clinic-bg group-hover:bg-clinic-purple/5 group-hover:scale-110 transition-transform text-clinic-purple">
                                <Upload className="w-6 h-6" />
                              </span>
                              <div>
                                <span className="text-sm block">Carregar Foto Existente da Galeria 📁</span>
                                <span className="text-[10px] font-medium text-gray-400 mt-1 block">Suporta ficheiros JPG, PNG, WebP</span>
                              </div>
                            </button>
                          </div>

                          <div className="pt-4">
                            <button
                              type="button"
                              onClick={() => setPhotoOptionConsent('no')}
                              className="text-gray-400 hover:text-clinic-purple font-semibold text-xs transition-colors underline decoration-dotted"
                            >
                              Continuar para os dados sem enviar foto (Apenas estimativa textual)
                            </button>
                          </div>
                        </div>
                      )}

                      {photoOptionConsent === 'yes' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start animate-fade-in">
                          {/* Left side: Camera or Upload Dropzone */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <label className="block text-sm font-bold text-clinic-blue">Foto do seu Sorriso 🦷</label>
                              <button 
                                type="button" 
                                onClick={() => { stopCamera(); setCapturedPhoto(null); setPhotoOptionConsent('idle'); }} 
                                className="text-xs text-clinic-purple hover:underline"
                              >
                                Alterar Método de Envio
                              </button>
                            </div>
                            
                            {!capturedPhoto && !isCameraActive && (
                              <div 
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-[2.5rem] p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[280px] ${
                                  dragActive 
                                    ? 'border-clinic-purple bg-clinic-purple/[0.03]' 
                                    : 'border-gray-200 bg-white hover:border-clinic-purple/50'
                                }`}
                              >
                                <Upload className="w-12 h-12 text-gray-300 group-hover:text-clinic-purple mb-4" />
                                <p className="font-bold text-clinic-blue text-sm mb-1">Arraste e solte o seu ficheiro aqui</p>
                                <p className="text-xs text-gray-400 font-light mb-6">Suporta formatos JPG, PNG, WebP</p>
                                
                                <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs cursor-pointer">
                                  <button
                                    type="button"
                                    onClick={() => {
                                  setIsCameraModalOpen(true);
                                  startCamera();
                                }}
                                    className="w-full bg-clinic-purple hover:bg-clinic-purple/95 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-md shadow-clinic-purple/10"
                                  >
                                    <Camera size={14} /> Ativar Câmara
                                  </button>
                                  
                                  <label className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-clinic-blue font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm text-center">
                                    <Upload size={14} /> Procurar Foto
                                    <input 
                                      type="file" 
                                      accept="image/*" 
                                      className="hidden" 
                                      onChange={handleFileChange} 
                                    />
                                  </label>
                                </div>

                                {cameraError && (
                                  <p className="text-red-500 text-[11px] font-bold mt-4 max-w-xs leading-relaxed bg-red-50 p-2.5 rounded-lg border border-red-100">{cameraError}</p>
                                )}
                              </div>
                            )}

                            {/* Camera streaming active */}
                            {isCameraActive && !isCameraModalOpen && (
                              <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-clinic-purple max-w-md mx-auto aspect-video bg-[#050505] flex flex-col justify-end">
                                <video
                                  ref={videoRef}
                                  className={`w-full h-full object-cover absolute top-0 left-0 transition-transform ${cameraFacingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                                  autoPlay
                                  playsInline
                                  muted
                                />
                                
                                {/* Floating Overlays / Camera Controls */}
                                <div className="absolute top-4 inset-x-4 flex justify-between items-center z-20 pointer-events-none">
                                  {/* Focus toggle button */}
                                  <button
                                    type="button"
                                    onClick={() => setMouthFocusActive(!mouthFocusActive)}
                                    className={`pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold text-[10px] md:text-[11px] uppercase tracking-wider backdrop-blur-md transition-all active:scale-95 shadow-md cursor-pointer ${
                                      mouthFocusActive 
                                        ? 'bg-clinic-lime border-clinic-lime text-clinic-blue shadow-clinic-lime/10' 
                                        : 'bg-black/60 border-white/10 text-white/80 hover:bg-black/75'
                                    }`}
                                  >
                                    <Smile size={11} className={mouthFocusActive ? 'animate-bounce' : ''} />
                                    <span>{mouthFocusActive ? 'Foco Boca ✨' : 'Geral 🔍'}</span>
                                  </button>

                                  {/* Flip Camera button */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const nextFacing = cameraFacingMode === 'user' ? 'environment' : 'user';
                                      setCameraFacingMode(nextFacing);
                                      startCamera(nextFacing);
                                    }}
                                    className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-xl text-white font-bold text-[10px] md:text-[11px] uppercase tracking-wider shadow-md border border-white/10 active:scale-95 transition-all cursor-pointer"
                                  >
                                    <RefreshCw size={11} />
                                    <span>{cameraFacingMode === 'user' ? 'Traseira 🔄' : 'Frontal 🔄'}</span>
                                  </button>
                                </div>

                                {/* Interactive dynamic watermark guidline */}
                                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10">
                                  <div className={`w-[55%] aspect-[1.3] max-w-[180px] border-[3px] border-dashed rounded-[45%] flex flex-col items-center justify-center bg-clinic-lime/[0.02] transition-all duration-300 ${mouthFocusActive ? 'border-clinic-lime animate-pulse' : 'border-white/20'}`}>
                                    <div className={`w-10 h-4 border-b-2 border-dashed rounded-b-full mt-1.5 ${mouthFocusActive ? 'border-clinic-lime/50' : 'border-white/15'}`}></div>
                                  </div>
                                  <span className="text-[8px] md:text-[9px] text-white bg-clinic-purple/95 px-3 py-1 rounded-full backdrop-blur-sm shadow border border-white/10 mt-3 font-extrabold uppercase tracking-wide select-none">
                                    {mouthFocusActive ? 'Alinhe a sua Boca aqui 👄' : 'Alinhe o seu rosto 👁️'}
                                  </span>
                                </div>
                                
                                {/* Teeth guidelines overlay */}
                                <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center">
                                  <div className="hidden">

                                  </div>
                                </div>

                                <div className="relative z-10 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between gap-4">
                                  <button
                                    type="button"
                                    onClick={stopCamera}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg text-xs"
                                  >
                                    Cancelar
                                  </button>
                                  <button
                                    type="button"
                                    onClick={capturePhoto}
                                    className="bg-clinic-lime text-clinic-blue font-black px-6 py-2.5 rounded-lg text-xs flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg cursor-pointer animate-pulse"
                                  >
                                    <Camera size={14} /> Capturar Foto
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Captured/Uploaded photo preview */}
                            {capturedPhoto && (
                              <div className="relative rounded-[2.5rem] border-2 border-clinic-purple overflow-hidden max-w-sm mx-auto shadow-lg bg-white p-3">
                                <img 
                                  src={capturedPhoto} 
                                  alt="Foto Dental" 
                                  className="w-full rounded-[2rem] aspect-square object-cover" 
                                />
                                <button
                                  type="button"
                                  onClick={() => setCapturedPhoto(null)}
                                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 text-red-600 hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center shadow-md border border-gray-100"
                                  title="Remover Foto"
                                >
                                  <X size={16} />
                                </button>
                                <div className="text-center mt-3 pb-1">
                                  <span className="text-[10px] text-clinic-purple font-black uppercase tracking-wider">Foto do Seu Exame Dental Carregada 🦷 ✓</span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Right side: Patient Lead Capture Form */}
                          <div className="space-y-4">
                            <div className="border-b border-gray-100 pb-2">
                              <span className="text-xs font-bold text-clinic-purple uppercase">Dados de Envio Dental</span>
                            </div>
                            <form onSubmit={handleCampaignSubmit} className="space-y-4">
                              <div>
                                <label className="block text-sm font-bold text-clinic-blue mb-1">O seu Nome Completo *</label>
                                <div className="relative">
                                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <User size={16} />
                                  </span>
                                  <input
                                    type="text"
                                    required
                                    value={leadName}
                                    onChange={(e) => setLeadName(e.target.value)}
                                    placeholder="ex: João Silva"
                                    className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-clinic-purple/20 focus:border-clinic-purple text-clinic-blue font-medium placeholder-gray-400 transition-all text-sm"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-bold text-clinic-blue mb-1">Telemóvel / WhatsApp *</label>
                                  <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                      <Phone size={16} />
                                    </span>
                                    <input
                                      type="tel"
                                      required
                                      value={leadPhone}
                                      onChange={(e) => setLeadPhone(e.target.value)}
                                      placeholder="ex: 912 345 678"
                                      className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-clinic-purple/20 focus:border-clinic-purple text-clinic-blue font-medium placeholder-gray-400 transition-all text-sm"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-sm font-bold text-clinic-blue mb-1">Email (Opcional)</label>
                                  <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                      <Mail size={16} />
                                    </span>
                                    <input
                                      type="email"
                                      value={leadEmail}
                                      onChange={(e) => setLeadEmail(e.target.value)}
                                      placeholder="ex: joao@email.com"
                                      className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-clinic-purple/20 focus:border-clinic-purple text-clinic-blue font-medium placeholder-gray-400 transition-all text-sm"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="block text-xs font-bold text-clinic-purple uppercase tracking-wider">
                                  Selecione o seu objetivo clínico (Opcional) 💡
                                </label>
                                <button
                                  type="button"
                                  onClick={() => setIsGlassPocketGuideOpen(true)}
                                  className="w-full flex items-center justify-between p-3.5 bg-clinic-purple/[0.04] border border-clinic-purple/20 hover:border-clinic-purple/40 rounded-xl text-left transition-all active:scale-98 cursor-pointer group"
                                >
                                  <div className="flex flex-wrap gap-1.5 items-center mr-2">
                                    {selectedInterests.length === 0 ? (
                                      <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                                        👉 Clique aqui para selecionar os seus objetivos clínicos...
                                      </span>
                                    ) : (
                                      selectedInterests.map(interest => (
                                        <span key={interest} className="inline-flex items-center gap-1 bg-clinic-purple text-white font-bold text-[10px] px-2.5 py-1 rounded-lg shadow-sm">
                                          {interest}
                                        </span>
                                      ))
                                    )}
                                  </div>
                                  <span className="text-xs font-black text-clinic-purple group-hover:translate-x-0.5 transition-transform flex items-center gap-1 shrink-0">
                                    Selecionar ⚙️
                                  </span>
                                </button>
                              </div>

                              <div>
                                <label className="block text-sm font-bold text-clinic-blue mb-1">Diga-nos o que sente ou o seu objetivo:</label>
                                <textarea
                                  value={leadNotes}
                                  onChange={(e) => setLeadNotes(e.target.value)}
                                  placeholder="ex: Pretendo colocar implantes e gostava de validar esta estimativa de preço."
                                  rows={3}
                                  className="w-full p-4 bg-white rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-clinic-purple/20 focus:border-clinic-purple text-clinic-blue font-medium placeholder-gray-400 transition-all text-sm resize-none"
                                />
                              </div>

                              {submitStatus === 'error' && (
                                <p className="text-red-600 text-xs font-bold text-center">Falta de conexão ou erro ao enviar dados. Por favor verifique o telemóvel e tente novamente.</p>
                              )}

                              <button
                                type="submit"
                                disabled={submitStatus === 'submitting'}
                                className="w-full bg-clinic-purple hover:bg-clinic-blue text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-all active:scale-95 shadow-xl shadow-clinic-purple/10 text-sm md:text-base"
                              >
                                {submitStatus === 'submitting' ? (
                                  <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    A Enviar Diagnóstico...
                                  </>
                                ) : (
                                  <>
                                    Enviar Simulador + Foto de Diagnóstico 🚀
                                  </>
                                )}
                              </button>
                            </form>
                          </div>
                        </div>
                      )}

                      {photoOptionConsent === 'no' && (
                        <div className="max-w-xl mx-auto space-y-6 animate-fade-in p-2 bg-white rounded-3xl">
                          <div className="flex items-center justify-between border-b pb-3">
                            <div>
                              <h4 className="text-lg font-bold text-clinic-blue">Finalizar Cálculo Textual</h4>
                              <p className="text-xs text-gray-400 font-light mt-0.5">Sem envio de foto de sorriso</p>
                            </div>
                            <button 
                              type="button" 
                              onClick={() => { setPhotoOptionConsent('idle'); }} 
                              className="text-xs text-clinic-purple font-bold hover:underline"
                            >
                              Adicionar Foto de Sorriso (Recomendado)
                            </button>
                          </div>

                          <form onSubmit={handleCampaignSubmit} className="space-y-4">
                            <div>
                              <label className="block text-sm font-bold text-clinic-blue mb-1">O seu Nome Completo *</label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                  <User size={16} />
                                </span>
                                <input
                                  type="text"
                                  required
                                  value={leadName}
                                  onChange={(e) => setLeadName(e.target.value)}
                                  placeholder="ex: João Silva"
                                  className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-clinic-purple/20 focus:border-clinic-purple text-clinic-blue font-medium placeholder-gray-400 transition-all text-sm"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-bold text-clinic-blue mb-1">Telemóvel / WhatsApp *</label>
                                <div className="relative">
                                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <Phone size={16} />
                                  </span>
                                  <input
                                    type="tel"
                                    required
                                    value={leadPhone}
                                    onChange={(e) => setLeadPhone(e.target.value)}
                                    placeholder="ex: 912 345 678"
                                    className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-clinic-purple/20 focus:border-clinic-purple text-clinic-blue font-medium placeholder-gray-400 transition-all text-sm"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-bold text-clinic-blue mb-1">Email (Opcional)</label>
                                <div className="relative">
                                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <Mail size={16} />
                                  </span>
                                  <input
                                    type="email"
                                    value={leadEmail}
                                    onChange={(e) => setLeadEmail(e.target.value)}
                                    placeholder="ex: joao@email.com"
                                    className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-clinic-purple/20 focus:border-clinic-purple text-clinic-blue font-medium placeholder-gray-400 transition-all text-sm"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="block text-xs font-bold text-clinic-purple uppercase tracking-wider">
                                Selecione o seu objetivo clínico (Opcional) 💡
                              </label>
                              <button
                                type="button"
                                onClick={() => setIsGlassPocketGuideOpen(true)}
                                className="w-full flex items-center justify-between p-3.5 bg-clinic-purple/[0.04] border border-clinic-purple/20 hover:border-clinic-purple/40 rounded-xl text-left transition-all active:scale-98 cursor-pointer group"
                              >
                                <div className="flex flex-wrap gap-1.5 items-center mr-2">
                                  {selectedInterests.length === 0 ? (
                                    <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                                      👉 Clique aqui para selecionar os seus objetivos clínicos...
                                    </span>
                                  ) : (
                                    selectedInterests.map(interest => (
                                      <span key={interest} className="inline-flex items-center gap-1 bg-clinic-purple text-white font-bold text-[10px] px-2.5 py-1 rounded-lg shadow-sm">
                                        {interest}
                                      </span>
                                    ))
                                  )}
                                </div>
                                <span className="text-xs font-black text-clinic-purple group-hover:translate-x-0.5 transition-transform flex items-center gap-1 shrink-0">
                                  Selecionar ⚙️
                                </span>
                              </button>
                            </div>

                            <div>
                              <label className="block text-sm font-bold text-clinic-blue mb-1">Diga-nos o que sente ou o seu objetivo:</label>
                              <textarea
                                value={leadNotes}
                                onChange={(e) => setLeadNotes(e.target.value)}
                                placeholder="ex: Gostava de colocar implantes e validar esta simulação."
                                rows={3}
                                className="w-full p-4 bg-white rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-clinic-purple/20 focus:border-clinic-purple text-clinic-blue font-medium placeholder-gray-400 transition-all text-sm resize-none"
                              />
                            </div>

                            {submitStatus === 'error' && (
                              <p className="text-red-600 text-xs font-bold text-center">Falta de conexão ou erro ao enviar dados. Por favor verifique o telemóvel e tente novamente.</p>
                            )}

                            <button
                              type="submit"
                              disabled={submitStatus === 'submitting'}
                              className="w-full bg-clinic-purple hover:bg-clinic-blue text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-all active:scale-95 shadow-xl shadow-clinic-purple/10 text-sm md:text-base"
                            >
                              {submitStatus === 'submitting' ? (
                                <>
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                  A Enviar Simulação...
                                </>
                              ) : (
                                <>
                                  Enviar Simulação Sem Foto 🚀
                                </>
                              )}
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center p-8 bg-white rounded-[2.5rem] border border-emerald-100 flex flex-col items-center justify-center text-center space-y-4 shadow-xl"
                    >
                      <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-2">
                        <CheckCircle size={36} />
                      </div>
                      <h4 className="text-2xl font-black text-clinic-blue">Orçamento e Foto Enviados!</h4>
                      <div className="text-gray-600 font-light max-w-lg leading-relaxed text-sm space-y-3">
                        <p>Recebemos as suas escolhas de tratamentos clínicos acompanhadas da imagem de diagnóstico.</p>
                        <p className="font-semibold text-clinic-purple">O Diretor Clínico da Clínica Santa Maria irá analisar pessoalmente o seu caso e responder-lhe em menos de 24 horas.</p>
                        <p>Entraremos em contacto preferencialmente através do telemóvel / WhatsApp fornecido.</p>
                      </div>
                      <div className="pt-4">
                        <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                          ID de Análise Dental Registado ✓
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12 bg-white p-4 rounded-[3rem] shadow-lg border border-gray-100">
                    <button 
                         onClick={() => window.location.href = '#/marcacoes'}
                         className="w-full md:w-auto bg-clinic-purple text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-clinic-blue hover:-translate-y-1 transition-all shadow-xl shadow-clinic-purple/20 flex items-center justify-center gap-3"
                    >
                        Confirmar com Especialista <ArrowRight size={20} />
                    </button>
                    <button 
                      onClick={handleReset} 
                      className="w-full md:w-auto px-10 py-5 text-clinic-blue font-bold hover:bg-gray-50 rounded-2xl transition-all"
                    >
                        Novo Cálculo
                    </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Trust Badges / Footer Info */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
         {[
           { title: "Transparência Total", text: "Preços baseados na tabela oficial da clínica sem taxas ocultas." },
           { title: "Personalização", text: "Cada orçamento é validado pelo Diretor Clínico antes de iniciar." },
           { title: "Garantia de Qualidade", text: "Trabalhamos com os melhores laboratórios e materiais europeus." }
         ].map((badge, i) => (
           <div key={i} className="bg-white/40 p-8 rounded-[2rem] border border-white text-center sm:text-left">
             <h4 className="font-bold text-clinic-blue mb-3">{badge.title}</h4>
             <p className="text-sm text-gray-600 font-light leading-relaxed">{badge.text}</p>
           </div>
         ))}
      </div>

      <div className="bg-clinic-blue/5 p-10 rounded-[3rem] border border-clinic-blue/10">
        <h4 className="font-extrabold text-clinic-blue flex items-center gap-2 mb-4 text-xl">
          <Info className="w-6 h-6 text-clinic-purple" /> {t("Nota sobre as estimativas")}
        </h4>
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed max-w-4xl">
          <p>
            {t("Os valores apresentados são baseados na tabela de preços em vigor e representam o investimento")} <strong>{t("mínimo expectável")}</strong> {t("para situações clínicas padrão.")}
          </p>
          <p>
            <strong>{t("Importante:")}</strong> {t("A medicina dentária é personalizada. Fatores como a qualidade óssea, complexidade anatómica e necessidades específicas de higienização podem alterar o plano final. Por isso,")} <u>{t("nenhuma estimativa online substitui a consulta de avaliação obrigatória")}</u>.
          </p>
        </div>
      </div>

      {/* Elegant Glassmorphic Overlay for Selecting Treatment Intentions */}
      {isGlassPocketGuideOpen && (
        <div className="fixed inset-0 z-[150] bg-clinic-blue/10 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white/30 border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2.5rem] p-6 sm:p-8 max-w-md w-full backdrop-blur-2xl animate-in zoom-in-95 duration-200 space-y-5 flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/30">
              <div>
                <span className="text-[10px] font-black tracking-wider uppercase text-clinic-purple">{t("Auxílio de Diagnóstico")}</span>
                <h3 className="font-extrabold text-clinic-blue text-lg tracking-tight">{t("Objetivo do Tratamento 🦷")}</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsGlassPocketGuideOpen(false)}
                className="p-2 hover:bg-white/30 rounded-full text-clinic-blue transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-clinic-blue/85 leading-relaxed font-semibold">
              {t("Selecione as opções que correspondem ao seu caso. O assistente ajudará a formular a sua mensagem de forma clara e profissional:")}
            </p>

            {/* List with Checkmarks */}
            <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
              {TREATMENT_POCKET_GUIDES.map((opt) => {
                const isSelected = selectedInterests.includes(opt.label);
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleObjectiveSelect(opt)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between gap-4 select-none active:scale-98 cursor-pointer ${
                      isSelected
                        ? 'bg-clinic-purple/20 border-clinic-purple/40 text-clinic-blue shadow-md'
                        : 'bg-white/30 hover:bg-white/50 border-white/30 text-clinic-blue/90'
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-black">{t(opt.label)}</span>
                      <span className={`text-[10px] sm:text-[11px] leading-tight font-medium ${isSelected ? 'text-clinic-purple/90 font-extrabold' : 'text-clinic-blue/60'}`}>
                        {t(opt.desc)}
                      </span>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs shrink-0 transition-all ${
                      isSelected 
                        ? 'bg-clinic-purple border-clinic-purple text-white font-extrabold scale-110 shadow-sm' 
                        : 'border-white/40 text-transparent bg-white/20'
                    }`}>
                      {isSelected ? '✓' : ''}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer with counts and Confirm button */}
            <div className="pt-2 flex flex-col gap-3">
              <div className="flex justify-between items-center text-[10px] text-clinic-blue/70 uppercase tracking-wider font-extrabold px-1">
                <span>{t("Opções Selecionadas")}</span>
                <span className="text-clinic-purple font-black">{selectedInterests.length} {t("de")} {TREATMENT_POCKET_GUIDES.length}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsGlassPocketGuideOpen(false)}
                className="w-full bg-clinic-purple/90 hover:bg-clinic-purple text-white font-extrabold py-4 rounded-xl shadow-lg transition-all active:scale-95 text-center cursor-pointer uppercase text-xs tracking-wider"
              >
                {t("Confirmar Seleção ✓")}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteCalculator;
