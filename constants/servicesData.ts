export const services = [
  { id: "01", slug: "implantologia", title: "Implantologia", category: "IMPLANTOLOGIA" },
  { id: "02", slug: "ortodontia", title: "Ortodontia", category: "ORTODONTIA" },
  { id: "03", slug: "facetas", title: "Facetas", category: "ESTÉTICA" },
  { id: "04", slug: "clinica-geral", title: "Clínica Geral", category: "CLÍNICA GERAL" },
  { id: "05", slug: "desvitalizacao", title: "Desvitalização", category: "CLÍNICA GERAL" },
  { id: "06", slug: "branqueamento", title: "Branqueamento", category: "ESTÉTICA" },
  { id: "07", slug: "proteses", title: "Próteses", category: "IMPLANTOLOGIA" },
  { id: "08", slug: "odontopediatria", title: "Odontopediatria", category: "CLÍNICA GERAL" }
];

export const serviceDetails: Record<string, any> = {
  implantologia: {
    title: 'Implantologia',
    description: 'Reabilitação oral e estética através de implantes unitários ou protocolos completos para recuperar a função mastigatória e o sorriso.',
    prices: [{ name: 'Consulta de avaliação', value: '20,00€' }],
    note: "Nota: Os tratamentos são pagos conforme realizados. No caso de implantes, o pagamento é efetuado no dia da cirurgia.",
    videoSrc: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/IMPLANTEHOJE.mp4'
  },
  ortodontia: {
    title: 'Ortodontia',
    description: 'Soluções avançadas para alinhamento dentário, utilizando aparelhos fixos ou sistemas invisíveis (Invisalign) para um sorriso alinhado.',
    prices: [{ name: 'Consulta de avaliação', value: '20,00€' }],
    note: "Nota: Os tratamentos são pagos conforme realizados.",
    videoSrc: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/SORRISO.mp4'
  },
  facetas: {
    title: 'Facetas',
    description: 'Melhoria estética do sorriso com lâminas de alta precisão, garantindo um resultado natural e duradouro.',
    prices: [{ name: 'Consulta de avaliação', value: '20,00€' }],
    note: "Nota: Os tratamentos são pagos conforme realizados.",
    videoSrc: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/FACETAS.mp4'
  },
  'clinica-geral': {
    title: 'Clínica Geral',
    description: 'Cuidados essenciais de saúde oral, incluindo restaurações e higiene oral preventiva.',
    prices: [
      { name: 'Consulta de avaliação', value: '20,00€' },
      { name: 'Destartarização', value: '40,00€' }
    ],
    note: "Nota: Os tratamentos são pagos conforme realizados.",
    videoSrc: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/GENERALISTA.mp4'
  },
  desvitalizacao: {
    title: "Desvitalização",
    description: "Tratamento especializado de canais para preservação da peça dentária natural e alívio imediato da dor.",
    prices: [{ name: 'Consulta de avaliação', value: '20,00€' }],
    note: "Nota: Os tratamentos são pagos conforme realizados.",
    videoSrc: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_EDODONTIA.mp4'
  },
  branqueamento: {
    title: "Branqueamento",
    description: "Estética profissional segura para um sorriso mais luminoso.",
    prices: [
      { name: 'Branqueamento em Consultório', value: '200,00€' },
      { name: 'Kit Branqueamento Doméstico', value: '150,00€' }
    ],
    note: "Nota: Os tratamentos são pagos conforme realizados.",
    videoSrc: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_LIMPEZA.mp4'
  },
  proteses: {
    title: "Próteses",
    description: "Opções acrílicas e flexíveis para recuperação da função mastigatória e estética.",
    prices: [{ name: 'Próteses', value: 'Desde 180,00€' }],
    note: "Nota: Os tratamentos são pagos conforme realizados.",
    videoSrc: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/PROTESISFIXAS.mp4'
  },
  odontopediatria: {
    title: "Odontopediatria",
    description: "Cuidados especializados de saúde oral dedicados às crianças num ambiente tranquilo e acolhedor.",
    prices: [{ name: 'Consulta de avaliação', value: '20,00€' }],
    note: "Nota: Os tratamentos são pagos conforme realizados.",
    videoSrc: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/ODONTO02.mp4'
  }
};

export const faq = [
  { question: "¿Qual o valor da consulta de avaliação?", answer: "O valor da nossa consulta de avaliação é de 20,00€." },
  { question: "¿Aceitam seguradoras?", answer: "Não temos protocolos diretos com seguradoras, mas emitimos fatura detalhada para que possa solicitar o seu reembolso." },
  { question: "¿Como funcionam os pagamentos?", answer: "Os tratamentos são pagos conforme realizados. No caso de implantes, o pagamento é efetuado no dia da cirurgia." }
];
