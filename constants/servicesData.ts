export const services = [
  { id: "01", slug: "implantologia", title: "Implantologia", category: "IMPLANTOLOGIA" },
  { id: "02", slug: "ortodontia", title: "Ortodontia", category: "ORTODONTIA" },
  { id: "03", slug: "facetas", title: "Facetas", category: "ESTÉTICA" },
  { id: "04", slug: "medicina-dentaria", title: "Medicina Dentária", category: "MEDICINA DENTÁRIA" },
  { id: "05", slug: "desvitalizacao", title: "Desvitalização", category: "MEDICINA DENTÁRIA" },
  { id: "06", slug: "branqueamento", title: "Branqueamento", category: "ESTÉTICA" },
  { id: "07", slug: "proteses", title: "Próteses", category: "IMPLANTOLOGIA" },
  { id: "08", slug: "odontopediatria", title: "Odontopediatria", category: "MEDICINA DENTÁRIA" }
];

export const serviceDetails: Record<string, any> = {
  implantologia: {
    title: 'Implantologia',
    description: 'Reabilitação oral e estética através de implantes unitários ou protocolos completos para recuperar a função mastigatória e o sorriso.',
    priceGroups: [
      {
        title: "Implantes Dentários",
        category: "Unitários e Múltiplos",
        items: [
          { name: '1 Implante', value: '745€' },
          { name: '2 Implantes', value: '1.400€' },
          { name: '3 Implantes', value: '1.800€' },
          { name: '4 Implantes', value: '2.300€' }
        ]
      },
      {
        title: "Protocolo Superior",
        category: "Arcada Completa",
        items: [
          { name: 'Protocolo Fixo', value: '4.800€', description: 'Inclui 4 a 6 implantes' },
          { name: 'Provisória Removível', value: '+350€', description: 'Opcional' },
          { name: 'Provisória Fixa', value: '+1.200€', description: 'Opcional' }
        ]
      }
    ],
    prices: [{ name: 'Consulta de avaliação', value: '20,00€' }],
    note: "Nota: Os tratamentos são pagos conforme realizados. No caso de implantes, o pagamento é efetuado no dia da cirurgia.",
    videoSrc: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/IMPLANTEHOJE.mp4'
  },
  ortodontia: {
    title: 'Ortodontia',
    description: 'Soluções avançadas para alinhamento dentário, utilizando aparelhos fixos ou sistemas invisíveis (Invisalign) para um sorriso alinhado.',
    priceGroups: [
      {
        title: "Aparelhos e Tratamentos",
        category: "Ortodontia Clínica",
        items: [
          { name: 'Consulta de Estudo Ortodôntico', value: '60,00€' },
          { name: 'Aparelho Ortodôntico Fixo', value: '450,00€', description: 'Valor por arcada' },
          { name: 'Aparelho Disjuntor', value: '480,00€' },
          { name: 'Mantenedor de Espaço', value: '130,00€' },
          { name: 'Consulta de Manutenção', value: '65,00€' },
          { name: 'Invisalign', value: 'Sob Consulta', description: 'Alinhadores Invisíveis' },
          { name: 'Manutenção Invisalign', value: '75,00€' },
          { name: 'Retirar Aparelho', value: '100,00€', description: 'Colocado fora da clínica' }
        ]
      },
      {
        title: "Contenções",
        category: "Pós-Tratamento",
        items: [
          { name: 'Contenção Fixa', value: '150,00€', description: 'Valor por arcada' },
          { name: 'Contenção Removível', value: '180,00€', description: 'Valor por arcada' }
        ]
      }
    ],
    prices: [{ name: 'Consulta de avaliação', value: '20,00€' }],
    note: "Nota: Os tratamentos são pagos conforme realizados.",
    videoSrc: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/SORRISO.mp4'
  },
  facetas: {
    title: 'Facetas',
    description: 'Melhoria estética do sorriso com lâminas de alta precisão, garantindo um resultado natural e duradouro.',
    priceGroups: [
      {
        title: "Facetas Dentárias",
        category: "Estética",
        items: [
          { name: 'Facetas – 1 Arcada (10 dentes)', value: '4.550€', description: 'até 2.º pré-molar' },
          { name: 'Facetas – 2 Arcadas (20 dentes)', value: '6.500€', description: 'até 2.º pré-molar' },
          { name: 'Facetas – 4 Dentes Anteriores', value: '1.800€', description: 'Zona estética frontal' }
        ]
      }
    ],
    prices: [{ name: 'Consulta de avaliação', value: '20,00€' }],
    note: "Nota: Os tratamentos são pagos conforme realizados.",
    videoSrc: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/FACETAS.mp4'
  },
  'medicina-dentaria': {
    title: 'Medicina Dentária',
    description: 'Cuidados essenciais de saúde oral, incluindo restaurações e higiene oral preventiva.',
    priceGroups: [
      {
        title: "Serviços Clínicos Gerais",
        category: "Higiene e Diagnóstico",
        items: [
          { name: 'Consulta de Avaliação', value: '20,00€' },
          { name: 'Destartarização + Polimento', value: '40,00€' },
          { name: 'Raio X Periapical', value: '10,00€' },
          { name: 'Observação Pós-Tratamento', value: '5,00€' }
        ]
      }
    ],
    prices: [{ name: 'Consulta de avaliação', value: '20,00€' }],
    note: "Nota: Os tratamentos são pagos conforme realizados.",
    videoSrc: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/GENERALISTA.mp4'
  },
  desvitalizacao: {
    title: "Desvitalização",
    description: "Tratamento especializado de canais para preservação da peça dentária natural e alívio imediato da dor.",
    priceGroups: [
      {
        title: "Tabela de Preços - Desvitalizações",
        category: "Endodontia",
        items: [
          { name: 'Desvitalização de Incisivo / Canino / Pré-Molar', value: '180,00€' },
          { name: 'Desvitalização de Molar', value: '240,00€' },
          { name: 'Pulpectomia + Restauração', value: '120,00€' },
          { name: 'Pulpotomia + Restauração', value: '80,00€' }
        ]
      }
    ],
    prices: [{ name: 'Consulta de avaliação', value: '20,00€' }],
    note: "Nota: Os tratamentos são pagos conforme realizados.",
    videoSrc: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_EDODONTIA.mp4'
  },
  branqueamento: {
    title: "Branqueamento",
    description: "Estética profissional segura para um sorriso mais luminoso.",
    priceGroups: [
      {
        title: "Tabela de Preços - Branqueamento",
        category: "Estética",
        items: [
          { name: 'Branqueamento em Consultório', value: '200,00€' },
          { name: 'Branqueamento (Kit para Casa)', value: '150,00€' },
          { name: 'Seringa para Kit de Casa', value: '25,00€', description: 'Individual' }
        ]
      }
    ],
    prices: [{ name: 'Consulta de avaliação', value: '20,00€' }],
    note: "Nota: Os tratamentos são pagos conforme realizados.",
    videoSrc: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/REEL_LIMPEZA.mp4'
  },
  proteses: {
    title: "Próteses",
    description: "Soluções personalizadas em próteses fixas e removíveis, utilizando materiais de alta qualidade para devolver a função e a estética do seu sorriso.",
    priceGroups: [
      {
        title: "Próteses Removíveis Acrílicas",
        category: "Removíveis",
        items: [
          { name: '1 dente', value: '180,00€' },
          { name: '2 dentes', value: '190,00€' },
          { name: '5 dentes', value: '240,00€' },
          { name: '10 dentes', value: '290,00€' },
          { name: '14 dentes (Total)', value: '330,00€' }
        ]
      },
      {
        title: "Próteses Removíveis Esqueléticas",
        category: "Removíveis",
        items: [
          { name: '1 dente', value: '260,00€' },
          { name: '2 dentes', value: '270,00€' },
          { name: '5 dentes', value: '310,00€' },
          { name: '10 dentes', value: '360,00€' },
          { name: '14 dentes', value: '400,00€' }
        ]
      },
      {
        title: "Próteses Removíveis Flexíveis",
        category: "Removíveis",
        items: [
          { name: '1 dente', value: '310,00€' },
          { name: '2 dentes', value: '320,00€' },
          { name: '5 dentes', value: '350,00€' },
          { name: '10 dentes', value: '400,00€' },
          { name: '14 dentes', value: '440,00€' }
        ]
      },
      {
        title: "Prótese Fixa e Coroas",
        category: "Fixas",
        items: [
          { name: 'Coroa Provisória', value: '70,00€' },
          { name: 'Coroa Metalo-cerâmica', value: '550,00€' },
          { name: 'Coroa Cerâmica Pura / Zircónia', value: '650,00€' }
        ]
      },
      {
        title: "Próteses sobre Implantes",
        category: "Implantologia",
        items: [
          { name: 'Protocolo Completo Final', value: '5.000,00€', description: 'Por arcada' },
          { name: 'Protocolo Superior (4 a 6 Implantes)', value: '4.800,00€' },
          { name: 'Prótese Provisória Removível', value: '350,00€' },
          { name: 'Prótese Provisória Fixa', value: '1.200,00€' },
          { name: 'Limpeza de Prótese Fixa', value: '100,00€', description: 'Por arcada' }
        ]
      },
      {
        title: "Manutenção e Reparação",
        category: "Serviços",
        items: [
          { name: 'Ajuste de Prótese', value: '5,00€' },
          { name: 'Conserto de Prótese Acrílica', value: '60,00€' },
          { name: 'Conserto Esquelética / Flexível', value: '100,00€' },
          { name: 'Acrescento de Dente (Acrílica)', value: '60,00€', description: '+ 10€ por cada dente extra' },
          { name: 'Acrescento de Dente (Flexível)', value: '100,00€', description: '+ 10€ por cada dente extra' },
          { name: 'Rembase de Prótese Acrílica', value: '60,00€' },
          { name: 'Rembase de Prótese Flexível', value: '100,00€' }
        ]
      }
    ],
    prices: [{ name: 'Consulta de avaliação', value: '20,00€' }],
    note: "Nota: Os valores das próteses removíveis variam conforme o número de dentes e o material utilizado.",
    videoSrc: 'https://clinica-santa-maria-dos-olivais.b-cdn.net/PROTESISFIXAS.mp4'
  },
  odontopediatria: {
    title: "Odontopediatria",
    description: "Cuidados especializados de saúde oral dedicados às crianças num ambiente tranquilo e acolhedor.",
    priceGroups: [
      {
        title: "Preços de Odontopediatria",
        category: "Saúde Infantil",
        items: [
          { name: 'Extração de Dente Decíduo', value: '35,00€', description: 'dente de leite' },
          { name: 'Restauração de Dente Decíduo', value: '45,00€' },
          { name: 'Pulpotomia + Restauração', value: '80,00€' },
          { name: 'Pulpectomia + Restauração', value: '120,00€' },
          { name: 'Selante', value: '40,00€', description: 'por arcada' },
          { name: 'Aparelho Mantenedor de Espaço', value: '130,00€' }
        ]
      }
    ],
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
