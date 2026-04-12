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
  {
    category: "Sobre Consultas e Marcações",
    items: [
      { question: "Qual é o valor da consulta de avaliação?", answer: "A nossa consulta de avaliação profissional tem o valor de 20,00€. Este passo é essencial para que a nossa equipa clínica possa realizar um diagnóstico preciso e delinear o plano de tratamento mais adequado às suas necessidades." },
      { question: "Qual é o horário de atendimento da clínica?", answer: "Para sua conveniência, estamos abertos de segunda a sexta-feira, das 10:00 às 19:00, e aos sábados, das 10:00 às 13:00." },
      { question: "Onde se localiza a clínica?", answer: "A Clínica Santa Maria dos Olivais situa-se na Estrada de Moscavide, nº 32 C, em Lisboa (1800-279)." }
    ]
  },
  {
    category: "Sobre Pagamentos e Seguros",
    items: [
      { question: "Têm acordos com seguradoras?", answer: "De momento, não dispomos de protocolos diretos com seguradoras. No entanto, emitimos sempre uma fatura detalhada de todos os atos clínicos para que possa solicitar o respetivo reembolso junto da sua entidade seguradora ou subsistema de saúde, de acordo com as condições da sua apólice." },
      { question: "Quais são as condições de pagamento para tratamentos de Implantologia?", answer: "No caso dos tratamentos de implantes, o pagamento deverá ser efetuado integralmente no dia da intervenção cirúrgica. Para os restantes tratamentos, o pagamento é realizado individualmente à medida que os procedimentos são executados." }
    ]
  },
  {
    category: "Sobre Tratamentos Específicos",
    items: [
      { question: "Quais as opções disponíveis para substituir dentes em falta?", answer: "Dispomos de soluções avançadas de Implantologia, com implantes unitários ou protocolos de arcada completa, bem como diversas opções de Próteses Removíveis (acrílicas, esqueléricas ou flexíveis) adaptadas a cada caso." },
      { question: "Realizam tratamentos de estética dentária?", answer: "Sim. A nossa equipa clínica realiza tratamentos de Branqueamento Dentário (em consultório ou kit doméstico), Facetas e restaurações estéticas para devolver a harmonia ao seu sorriso." },
      { question: "Trabalham com Ortodontia invisível?", answer: "Sim. Além dos aparelhos fixos convencionais, oferecemos o sistema Invisalign, que permite alinhar o seu sorriso de forma discreta e confortável. O orçamento para este tratamento é fornecido sob consulta após a avaliação clínica." },
      { question: "A clínica presta atendimento a crianças?", answer: "Sim. Dispomos de uma área dedicada à Odontopediatria (Medicina Dentária para crianças), focada na prevenção e no acompanhamento da saúde oral dos mais jovens num ambiente acolhedor." }
    ]
  }
];
