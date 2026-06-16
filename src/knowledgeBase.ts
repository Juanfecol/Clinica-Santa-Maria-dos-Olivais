export const arvoreDecisao: any = {
  MENU_PRINCIPAL: {
    text: "Excelente! Escolha uma das opções abaixo para explorar a Clínica Santa Maria dos Olivais:",
    options: [
      { label: "Ver Tratamentos e Valores", next: "TRATAMENTOS" },
      { label: "Agendar uma Avaliação Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Consulta Geral" },
      { label: "Informações da Clínica", next: "INFO_CLINICA" }
    ]
  },
  TRATAMENTOS: {
    text: "Temos várias especialidades. Qual área desperta o seu interesse?",
    options: [
      { label: "Implantes Dentários", next: "IMPLANTES_MENU" },
      { label: "Estética e Facetas", next: "ESTETICA_MENU" },
      { label: "Ortodontia (Aparelhos)", next: "ORTODONTIA_MENU" },
      { label: "Medicina Geral e Próteses", next: "GERAL_MENU" },
      { label: "Voltar ao Menu Principal", next: "MENU_PRINCIPAL" }
    ]
  },
  
  // --- RAMIFICAÇÃO: IMPLANTES ---
  IMPLANTES_MENU: {
    text: "A Implantologia é a nossa grande especialidade. O que gostaria de saber?",
    options: [
      { label: "Implantes Unitários", next: "IMPLANTES_UNITARIOS" },
      { label: "Protocolos (Arcada Completa)", next: "IMPLANTES_PROTOCOLOS" },
      { label: "Voltar aos Tratamentos", next: "TRATAMENTOS" }
    ]
  },
  IMPLANTES_UNITARIOS: {
    text: "Aplicamos a Promoção:\n• Implante Unitário: 745€\n• 2 Implantes: 1.400€\n• 3 Implantes: 1.800€\n• 4 Implantes: 2.300€\n• Enxerto ósseo: 200€ a 500€\n\nVamos agendar a sua avaliação com a Dra. Ana Mata?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Implantes Unitários" },
      { label: "Voltar aos Implantes", next: "IMPLANTES_MENU" }
    ]
  },
  IMPLANTES_PROTOCOLOS: {
    text: "Protocolo Superior (4 a 6 implantes + prótese fixa final): 4.800€.\n• Provisória Removível: +350€\n• Provisória Fixa: +1.200€\n• Coroa sobre implante (cimentação externa): 650€\n\nPodemos marcar o seu horário?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Protocolo Superior" },
      { label: "Voltar aos Implantes", next: "IMPLANTES_MENU" }
    ]
  },

  // --- RAMIFICAÇÃO: ESTÉTICA ---
  ESTETICA_MENU: {
    text: "Transformamos o seu sorriso. Selecione a opção desejada:",
    options: [
      { label: "Facetas Dentárias", next: "FACETAS" },
      { label: "Branqueamento", next: "BRANQUEAMENTO" },
      { label: "Voltar aos Tratamentos", next: "TRATAMENTOS" }
    ]
  },
  FACETAS: {
    text: "Transformamos o seu sorriso:\n• Facetas 1 Arcada (10 dentes): 4.550€\n• 2 Arcadas (20 dentes): 6.500€\n• Facetas 4 Dentes Anteriores: 1.800€\n• Porcelana: 450€\n\nDeseja avançar para uma consulta?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Facetas Dentárias" },
      { label: "Voltar à Estética", next: "ESTETICA_MENU" }
    ]
  },
  BRANQUEAMENTO: {
    text: "Soluções de branqueamento:\n• Em Consultório: 200€\n• Kit para Casa: 150€\n• Seringa extra: 25€\n\nVamos agendar o seu clareamento?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Branqueamento" },
      { label: "Voltar à Estética", next: "ESTETICA_MENU" }
    ]
  },

  // --- RAMIFICAÇÃO: ORTODONTIA ---
  ORTODONTIA_MENU: {
    text: "Opções de Ortodontia:\n• Aparelho Fixo: 450€/arcada\n• Contenção Fixo: 150€/arcada, Removível: 180€/arcada\n• Disjuntor: 480€\n• Manutenção: 65€\n• Invisalign: sob consulta\n\nDeseja agendar?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Ortodontia" },
      { label: "Voltar aos Tratamentos", next: "TRATAMENTOS" }
    ]
  },

  // --- RAMIFICAÇÃO: MEDICINA GERAL E PRÓTESES ---
  GERAL_MENU: {
    text: "Temos soluções completas para a sua saúde oral:",
    options: [
      { label: "Restaurações e Limpeza", next: "RESTAURACOES" },
      { label: "Desvitalização e Extrações", next: "CIRURGIA" },
      { label: "Próteses Removíveis", next: "PROTESES" },
      { label: "Voltar aos Tratamentos", next: "TRATAMENTOS" }
    ]
  },
  RESTAURACOES: {
    text: "Cuidados Gerais:\n• Destartarização + Polimento: 40€\n• Restauração Simples: 45€\n• Restauração Complexa: 65€\n• Placa de Bruxismo: 180€\n\nPodemos marcar o seu horário?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Restaurações e Limpeza" },
      { label: "Voltar à Medicina Geral", next: "GERAL_MENU" }
    ]
  },
  CIRURGIA: {
    text: "Cirurgias e Endodontia:\n• Endodontia (Molar): 240€\n• Endodontia (Outros): 180€\n• Extração Siso: 75€-200€\n• Extração simples: 30€-50€\n\nVamos agendar?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Cirurgias e Endodontia" },
      { label: "Voltar à Medicina Geral", next: "GERAL_MENU" }
    ]
  },
  PROTESES: {
    text: "Tabelas de Próteses:\n• Próteses Acrílicas: 180€-330€\n• Esqueléticas: 260€-400€\n• Flexíveis: 310€-440€\n\nGostaria de marcar uma avaliação?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Próteses Dentárias" },
      { label: "Voltar à Medicina Geral", next: "GERAL_MENU" }
    ]
  },

  // --- RAMIFICAÇÃO: INFORMAÇÕES GERAIS ---
  INFO_CLINICA: {
    text: "Estamos na Estrada de Moscavide N 32C, Lisboa. O paciente pode pagar cada tratamento que for fazendo. Em relação a implantes, o pagamento é no dia da cirurgia.",
    options: [
      { label: "Agendar uma Avaliação Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Consulta Geral" },
      { label: "Voltar ao Menu Principal", next: "MENU_PRINCIPAL" }
    ]
  }

};
