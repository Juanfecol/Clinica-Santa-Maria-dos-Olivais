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
    doctor: 'Dra. Ana Mata (Diretora Clínica)',
    schedule: 'Seg e Sex (14h-18h30), Ter e Qui (11h-16h)',
    description: 'Recupere o seu sorriso fixo com implantes de titânio de alta qualidade.',
    prices: [
      { name: 'Implante Unitário + Coroa Metalo-cerâmica', value: '745€' },
      { name: 'Protocolo Superior (4 a 6 implantes + prótese fixa final)', value: '4.800€' },
      { name: 'Enxerto Ósseo', value: 'A partir de 200€ (ou 500€ conforme complexidade)' }
    ],
    note: "Nota: Os implantes são pagos no dia da cirurgia."
  },
  facetas: {
    title: 'Estética e Facetas',
    doctor: 'R.O.',
    schedule: 'Sob consulta',
    description: 'Melhoria da estética e harmonia do sorriso através da dentisteria avançada.',
    prices: [
      { name: 'Facetas 4 Dentes Anteriores (Zona Estética)', value: '1.800€' },
      { name: 'Facetas 1 Arcada (10 dentes)', value: '4.550€' },
      { name: 'Facetas 2 Arcadas (20 dentes)', value: '6.500€' },
      { name: 'Branqueamento em Consultório', value: '200€' }
    ]
  },
  ortodontia: {
    title: 'Ortodontia',
    doctor: 'Dra. Mariana Aberto',
    schedule: 'Quarta-feira',
    description: 'Alinhamento dentário moderno com aparelhos fixos ou alinhadores invisíveis.',
    prices: [
      { name: 'Aparelho Ortodôntico Fixo', value: '450€ por arcada' },
      { name: 'Consulta de Manutenção', value: '65€' },
      { name: 'Invisalign', value: 'Preço sob consulta' },
      { name: 'Manutenção Invisalign', value: '75€' },
      { name: 'Aparelhos de Contenção (Fixo/Removível)', value: '150€ a 180€' }
    ]
  },
  'clinica-geral': {
    title: 'Clínica Geral e Desvitalização',
    doctor: 'Dra. Orizanda Claret (Terça), Dr. Francisco (Quinta), Tomás Machado (Segunda)',
    schedule: 'Vários dias',
    description: 'Cuidados dentários gerais e tratamentos de desvitalização.',
    prices: [
      { name: 'Desvitalização Molar', value: '240€' },
      { name: 'Desvitalização Incisivo/Canino', value: '180€' },
      { name: 'Extração de Siso (Erupcionado/Incluso)', value: '75€ a 200€' }
    ]
  },
  desvitalizacao: {
    title: "Desvitalização",
    description: "Tratamento para salvar dentes danificados, eliminando a dor e prevenindo a perda dentária.",
    doctor: 'Dra. Orizanda Claret',
    schedule: 'Sob consulta',
    prices: [{ name: 'Consulta de avaliação', value: '20,00€' }],
    note: "Nota: Os implantes são pagos no dia da cirurgia."
  },
  branqueamento: {
    title: "Branqueamento",
    description: "Recupere a luminosidade do seu sorriso com técnicas seguras e eficazes.",
    doctor: 'Dra. Ana Mata',
    schedule: 'Sob consulta',
    prices: [{ name: 'Consulta de avaliação', value: '20,00€' }],
    note: "Nota: Os implantes são pagos no dia da cirurgia."
  },
  proteses: {
    title: "Próteses",
    description: "Soluções fixas ou removíveis para restaurar a função e estética do seu sorriso.",
    doctor: 'Dra. Ana Mata',
    schedule: 'Sob consulta',
    prices: [{ name: 'Consulta de avaliação', value: '20,00€' }],
    note: "Nota: Os implantes são pagos no dia da cirurgia."
  },
  odontopediatria: {
    title: "Odontopediatria",
    description: "Cuidados especializados para a saúde oral dos mais pequenos.",
    doctor: 'Dra. Mariana Aberto',
    schedule: 'Sob consulta',
    prices: [{ name: 'Consulta de avaliação', value: '20,00€' }],
    note: "Nota: Os implantes são pagos no dia da cirurgia."
  }
};

export const faq = [
  { question: "¿Cómo puedo agendar una cita?", answer: "Puedes agendar a través de nuestro sitio web, llamándonos o por WhatsApp." },
  { question: "¿Aceptan seguros?", answer: "Sí, trabajamos en régimen de reembolso." }
];
