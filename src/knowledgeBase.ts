export const arvoreDecisao: any = {
  MENU_PRINCIPAL: {
    text: "Excelente! Escolha uma das opções abaixo para explorar a Clínica Santa Maria dos Olivais:",
    options: [
      { label: "Ver Tratamentos e Valores", next: "TRATAMENTOS" },
      { label: "Seguros e Pagamentos", next: "SEGUROS_PAGAMENTOS" },
      { label: "Agendar uma Avaliação Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Consulta Geral" },
      { label: "Informações da Clínica", next: "INFO_CLINICA" }
    ]
  },

  // --- RAMA: SEGUROS E PAGAMENTOS ---
  SEGUROS_PAGAMENTOS: {
    text: "Relativamente a seguros e acordos:\nNós funcionamos exclusivamente em regime privado, priorizando a elevada qualidade dos materiais e o tempo dedicado a cada consulta. 💎\n\nEmitimos sempre a fatura detalhada com todos os códigos médicos necessários para que possa solicitar o reembolso junto da sua seguradora ou subsistema (ADSE, Médis, Multicare, etc.), através do Regime Livre. 📄\n\nFacilidades de Pagamento 💳\nVanessa, você pode pagar cada tratamento que for fazendo. Em relação a implantes, o pagamento é no dia da cirurgia. Atenciosamente, Clínica Santa Maria dos Olivais.",
    options: [
      { label: "Agendar uma Avaliação Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Consulta Geral" },
      { label: "Voltar ao Menu Principal", next: "MENU_PRINCIPAL" }
    ]
  },

  TRATAMENTOS: {
    text: "Temos várias especialidades. Qual área desperta o seu interesse?",
    options: [
      { label: "Implantes Dentários", next: "IMPLANTES_MENU" },
      { label: "Estética e Branqueamento", next: "ESTETICA_MENU" },
      { label: "Ortodontia (Aparelhos)", next: "ORTODONTIA_MENU" },
      { label: "Próteses e Consertos", next: "PROTESES_MENU" },
      { label: "Medicina Geral e Cirurgia", next: "GERAL_MENU" }
    ]
  },
  
  // --- RAMA: IMPLANTES ---
  IMPLANTES_MENU: {
    text: "A Implantologia é a nossa grande especialidade. O que gostaria de saber?",
    options: [
      { label: "Implantes Unitários", next: "IMPLANTES_UNITARIOS" },
      { label: "Protocolos (Arcada Completa)", next: "IMPLANTES_PROTOCOLOS" },
      { label: "Voltar aos Tratamentos", next: "TRATAMENTOS" }
    ]
  },
  IMPLANTES_UNITARIOS: {
    text: "Pack (inclui coroa):\n• Implante Unitário: 745,00€\n• 2 Implantes: 1.400,00€\n• 4 Implantes: 2.300,00€\n• Enxerto ósseo: 200,00€ a 500,00€\n\nVamos agendar a sua avaliação?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Implantes Unitários" },
      { label: "Voltar", next: "IMPLANTES_MENU" }
    ]
  },
  IMPLANTES_PROTOCOLOS: {
    text: "O Protocolo Superior completo (4 a 6 implantes + prótese fixa final) fica por 4.800,00€ (inclui coroa):\n• Provisória Removível: +350,00€\n• Provisória Fixa: +1.200,00€\n\nPodemos marcar o seu horário?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Protocolo Superior" },
      { label: "Voltar", next: "IMPLANTES_MENU" }
    ]
  },

  // --- RAMA: ESTÉTICA E BRANQUEAMENTO ---
  ESTETICA_MENU: {
    text: "Transformamos o seu sorriso. Selecione a opção desejada:",
    options: [
      { label: "Facetas Dentárias", next: "FACETAS" },
      { label: "Branqueamento", next: "BRANQUEAMENTO" },
      { label: "Voltar aos Tratamentos", next: "TRATAMENTOS" }
    ]
  },
  FACETAS: {
    text: "Transformamos o seu sorriso:\n• Facetas 1 Arcada (10 dentes): 4.550,00€\n• 2 Arcadas (20 dentes): 6.500,00€\n• Dentes Anteriores (Zona frontal): 1.800,00€\n\nDeseja avançar para uma consulta?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Facetas Dentárias" },
      { label: "Voltar", next: "ESTETICA_MENU" }
    ]
  },
  BRANQUEAMENTO: {
    text: "Soluções de branqueamento:\n• Em Consultório: 200,00€\n• Kit para Casa: 150,00€\n• Seringa extra: 25,00€\n\nVamos agendar o seu clareamento?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Branqueamento" },
      { label: "Voltar", next: "ESTETICA_MENU" }
    ]
  },

  // --- RAMA: ORTODONTIA ---
  ORTODONTIA_MENU: {
    text: "Opções de Ortodontia:\n• Aparelho Fixo: 450,00€/arcada\n• Consulta de Estudo: 60,00€\n• Manutenção: 65,00€\n• Aparelho de contenção: a partir de 150,00€\n• Invisalign: sob consulta\n\nDeseja agendar?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Ortodontia" },
      { label: "Voltar aos Tratamentos", next: "TRATAMENTOS" }
    ]
  },

  // --- RAMA: PRÓTESES E CONSERTOS ---
  PROTESES_MENU: {
    text: "Temos laboratório para próteses novas e consertos. O que procura?",
    options: [
      { label: "Preços de Próteses Novas", next: "PROTESES_NOVAS" },
      { label: "Consertos e Ajustes", next: "PROTESES_CONSERTOS" },
      { label: "Voltar aos Tratamentos", next: "TRATAMENTOS" }
    ]
  },
  PROTESES_NOVAS: {
    text: "Temos laboratório para próteses novas:\n• Prótese Acrílica: de 180,00€ a 330,00€\n• Prótese Esquelética: de 260,00€ a 400,00€\n• Prótese Flexível: de 310,00€ a 440,00€\n\nGostaria de marcar uma avaliação?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Próteses Dentárias" },
      { label: "Voltar", next: "PROTESES_MENU" }
    ]
  },
  PROTESES_CONSERTOS: {
    text: "Consertos e Ajustes:\n• Ajuste de prótese: 5,00€\n• Conserto Acrílica: 60,00€\n• Conserto Esquelética/Flexível: 100,00€\n• Acrescentar dente: Valor do conserto + 10,00€ por dente\n• Rembase: 60,00€ (acrílica) ou 100,00€ (flexível)\n\nPodemos agendar?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Próteses e Consertos" },
      { label: "Voltar", next: "PROTESES_MENU" }
    ]
  },

  // --- RAMA: MEDICINA GERAL E CIRURGIA ---
  GERAL_MENU: {
    text: "Soluções completas para a sua saúde oral:",
    options: [
      { label: "Limpeza e Restaurações", next: "RESTAURACOES" },
      { label: "Desvitalização e Extrações", next: "CIRURGIA" },
      { label: "Voltar aos Tratamentos", next: "TRATAMENTOS" }
    ]
  },
  RESTAURACOES: {
    text: "Cuidados Gerais:\n• Destartarização + Polimento: 40,00€\n• Restauração Simples: 45,00€\n• Restauração Complexa: 65,00€\n• Restauração Estética: 75,00€\n• Placa de Bruxismo: 180,00€\n\nPodemos marcar o seu horário?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Restaurações e Limpeza" },
      { label: "Voltar", next: "GERAL_MENU" }
    ]
  },
  CIRURGIA: {
    text: "Cirurgias e Endodontia:\n• Endodontia (Incisivo/Canino): 180,00€\n• Endodontia (Molar): 240,00€\n• Extrações Simples: 30,00€ - 50,00€\n• Extração Siso: 75,00€ - 200,00€\n\nVamos agendar a sua consulta?",
    options: [
      { label: "Sim, Agendar Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Cirurgias e Endodontia" },
      { label: "Voltar", next: "GERAL_MENU" }
    ]
  },

  // --- RAMA: INFORMAÇÕES DA CLÍNICA ---
  INFO_CLINICA: {
    text: "Clínica Santa Maria dos Olivais.\nMorada: Estrada de Moscavide N 32C, 1800-279, Lisboa.\nPagamentos: Vanessa, você pode pagar cada tratamento que for fazendo. Em relação a implantes, o pagamento é no dia da cirurgia. Atenciosamente, Clínica Santa Maria dos Olivais.",
    options: [
      { label: "Ver Seguros e Pagamentos", next: "SEGUROS_PAGAMENTOS" },
      { label: "Agendar uma Avaliação Agora", next: "FINALIZAR_AGENDAMENTO", treatment: "Consulta Geral" },
      { label: "Voltar ao Menu Principal", next: "MENU_PRINCIPAL" }
    ]
  }
};
