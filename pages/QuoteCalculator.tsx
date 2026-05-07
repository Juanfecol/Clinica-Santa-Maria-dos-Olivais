
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ArrowRight
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
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);

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
  };

  const { min, max } = calculateTotal();

  return (
    <div className="min-h-screen py-16 px-4 md:px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-clinic-purple/10 rounded-3xl mb-6"
        >
          <Calculator className="text-clinic-purple w-10 h-10" />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold text-clinic-blue mb-6 tracking-tight">
          Simulador de <span className="text-clinic-purple italic font-serif">Investimento</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
          Planeie o seu tratamento com transparência. Selecione as especialidades para obter uma estimativa baseada na tabela oficial.
        </p>
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 min-h-[600px] flex flex-col relative">
        {/* Progress Tracker */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-50 flex">
           <motion.div 
             className="h-full bg-clinic-lime"
             initial={{ width: 0 }}
             animate={{ width: `${(step / 3) * 100}%` }}
             transition={{ duration: 0.8, ease: "circOut" }}
           />
        </div>

        <div className="p-8 md:p-16 flex-grow">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-10"
              >
                <div className="flex flex-col gap-2 items-center md:items-start">
                  <span className="bg-clinic-purple/10 text-clinic-purple px-4 py-1 rounded-full font-bold text-xs uppercase tracking-widest">Passo 1: Especialidade</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-clinic-blue text-center md:text-left">O que quer cuidar hoje?</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {specialtiesData.map((spec) => (
                    <button
                      key={spec.id}
                      onClick={() => { setSelectedSpecialty(spec); setStep(2); }}
                      className="group relative flex flex-col items-center md:items-start gap-4 p-8 rounded-[2.5rem] border-2 border-gray-100 transition-all hover:border-clinic-purple hover:bg-clinic-purple/[0.02] text-left hover:shadow-xl active:scale-95"
                    >
                      <div className="p-5 rounded-2xl bg-clinic-bg text-clinic-blue group-hover:bg-clinic-purple group-hover:text-white transition-colors shadow-sm">
                        {spec.icon}
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="font-bold text-xl text-clinic-blue group-hover:text-clinic-purple transition-colors">{spec.name}</h3>
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">Explorar tratamentos e preços.</p>
                      </div>
                      <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Plus className="text-clinic-purple" size={20} />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && selectedSpecialty && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-10"
              >
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex flex-col gap-2">
                    <button onClick={() => setStep(1)} className="flex items-center gap-2 text-clinic-purple font-bold text-xs uppercase hover:underline mb-2 transition-all">
                       <ChevronLeft size={16} /> Voltar às categorias
                    </button>
                    <h2 className="text-3xl md:text-4xl font-bold text-clinic-blue">Tratamentos de {selectedSpecialty.name}</h2>
                  </div>
                  <div className="bg-clinic-bg px-6 py-3 rounded-2xl flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-clinic-purple">
                        {selectedSpecialty.icon}
                     </div>
                     <span className="font-bold text-clinic-blue hidden md:block">{selectedSpecialty.name}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedSpecialty.procedures.map((proc) => (
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
                           <span className="text-[10px] font-bold uppercase text-gray-400">Referência:</span>
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
                     <p className="text-sm text-gray-500">Selecionados: <span className="font-bold text-clinic-purple">{selectedProcedures.length} tratamentos</span></p>
                  </div>
                  <button 
                    onClick={goToResult}
                    disabled={selectedProcedures.length === 0}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-clinic-blue text-white font-bold px-12 py-5 rounded-2xl hover:bg-clinic-purple disabled:opacity-50 disabled:grayscale transition-all shadow-xl active:scale-95"
                  >
                    Ver Orçamento <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-12 max-w-4xl mx-auto"
              >
                <div className="text-center space-y-4">
                  <div className="inline-block bg-clinic-lime/20 text-clinic-blue px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4">Estimativa Pronto!</div>
                  <h2 className="text-4xl md:text-5xl font-bold text-clinic-blue">O seu plano de sorriso</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
                  <div className="lg:col-span-3 bg-clinic-blue text-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl flex flex-col justify-center items-center text-center relative overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-clinic-purple opacity-20 blur-3xl rounded-full"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-clinic-lime opacity-10 blur-3xl rounded-full"></div>
                    
                    <span className="relative z-10 text-clinic-purple font-black text-xs uppercase tracking-[0.3em] mb-6 block">Valor Total Estimado</span>
                    <div className="relative z-10 flex items-center justify-center gap-4">
                       <div className="flex flex-col items-center">
                          <span className="text-sm font-bold opacity-50 mb-1">Mínimo</span>
                          <span className="text-5xl md:text-7xl font-black">{min}€</span>
                       </div>
                       <div className="h-16 w-px bg-white/20 mx-4"></div>
                       <div className="flex flex-col items-center">
                          <span className="text-sm font-bold opacity-50 mb-1">Máximo</span>
                          <span className="text-5xl md:text-7xl font-black">{max}€</span>
                       </div>
                    </div>
                    
                    <div className="relative z-10 mt-10 pt-8 border-t border-white/10 w-full">
                       <p className="text-sm font-light italic opacity-80 flex items-center justify-center gap-2">
                          <Info size={16} className="text-clinic-lime" /> Inclui diagnóstico e acompanhamento especializado
                       </p>
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-clinic-bg/50 p-10 rounded-[3.5rem] border-2 border-white flex flex-col justify-center">
                    <h3 className="font-bold text-clinic-blue text-xl mb-6">Próximos Passos:</h3>
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
                          <span className="text-sm font-medium leading-snug">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12 bg-white p-4 rounded-[3rem] shadow-lg border border-gray-100">
                    <button 
                         onClick={() => window.location.href = '#/marcacoes'}
                         className="w-full md:w-auto bg-clinic-purple text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-clinic-blue hover:-translate-y-1 transition-all shadow-xl shadow-clinic-purple/20 flex items-center justify-center gap-3"
                    >
                        Confirmar com Especialista <ArrowRight size={20} />
                    </button>
                    <button 
                      onClick={reset} 
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
          <Info className="w-6 h-6 text-clinic-purple" /> Nota sobre as estimativas
        </h4>
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed max-w-4xl">
          <p>
            Os valores apresentados são baseados na tabela de preços em vigor e representam o investimento <strong>mínimo expectável</strong> para situações clínicas padrão.
          </p>
          <p>
            <strong>Importante:</strong> A medicina dentária é personalizada. Fatores como a qualidade óssea, complexidade anatómica e necessidades específicas de higienização podem alterar o plano final. Por isso, <u>nenhuma estimativa online substitui a consulta de avaliação obrigatória</u>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuoteCalculator;
