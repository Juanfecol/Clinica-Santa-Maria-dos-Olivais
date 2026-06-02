import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Language type definition
export type Language = 'pt' | 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translateObject: <T>(obj: T) => T;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// --- COMPREHENSIVE TRANSLATION DICTIONARY (PT -> ES & EN) ---
const translationMap: Record<string, { es: string; en: string }> = {
  // Navigation
  "Início": { es: "Inicio", en: "Home" },
  "Equipa": { es: "Equipo", en: "Our Team" },
  "Clínica": { es: "La Clínica", en: "Our Clinic" },
  "Contactos": { es: "Contactos", en: "Contacts" },
  "Marcações": { es: "Citas", en: "Appointments" },
  "Campanhas": { es: "Campañas", en: "Campaigns" },
  "Serviços": { es: "Servicios", en: "Services" },
  "Sobre Nós": { es: "Sobre Nosotros", en: "About Us" },
  "Links Rápidos": { es: "Enlaces Rápidos", en: "Quick Links" },
  "Políticas": { es: "Políticas", en: "Policies" },
  "Política de Cookies": { es: "Política de Cookies", en: "Cookie Policy" },
  "Política de Privacidade": { es: "Política de Privacidad", en: "Privacy Policy" },
  "Termos e Condições": { es: "Términos y Condiciones", en: "Terms and Conditions" },
  "Todos os direitos reservados.": { es: "Todos los derechos reservados.", en: "All rights reserved." },
  "Clínica Registada e Autorizada pela ERS": { es: "Clínica registrada y autorizada por la ERS", en: "Clinic Registered and Authorized by ERS" },
  "Licença de Funcionamento nº 19912/2021": { es: "Licencia de funcionamiento nº 19912/2021", en: "Operating License No. 19912/2021" },
  "Apoio ao Cliente": { es: "Atención al Cliente", en: "Customer Support" },
  "Contactos Gerais": { es: "Contactos Generales", en: "General Contacts" },
  "Como Chegar": { es: "Cómo llegar", en: "How to get here" },
  // Header & Search Actions
  "Pesquisar especialidade...": { es: "Buscar especialidad...", en: "Search specialty..." },
  "Ligar para a clínica": { es: "Llamar a la clínica", en: "Call the clinic" },
  "Enviar WhatsApp": { es: "Enviar WhatsApp", en: "Send WhatsApp" },
  "Marcar online": { es: "Reservar online", en: "Book online" },
  "Agende a sua Consulta": { es: "Reserve su Consulta", en: "Book your Consultation" },
  "Escolha o melhor horário para si diretamente no nosso calendário oficial de forma simples e rápida.": { 
    es: "Elija el mejor horario para usted directamente en nuestro calendario oficial de forma simple y rápida.", 
    en: "Choose the best time for you directly in our official calendar quickly and easily." 
  },
  "Marcações Online": { es: "Citas Online", en: "Online Booking" },
  "Agende a sua": { es: "Reserve su", en: "Book your" },
  "Consulta": { es: "Consulta", en: "Consultation" },
  // Buttons & CTAs
  "Descobrir Mais": { es: "Descubrir Más", en: "Discover More" },
  "Contactar": { es: "Contactar", en: "Contact Us" },
  "Enviar Mensagem": { es: "Enviar Mensaje", en: "Send Message" },
  "Carregando...": { es: "Cargando...", en: "Loading..." },
  "Voltar": { es: "Volver", en: "Back" },
  "Próximo": { es: "Siguiente", en: "Next" },
  "Ver Resultado": { es: "Ver Resultado", en: "See Result" },
  "Obter Orçamento Personalizado": { es: "Obtener Presupuesto Personalizado", en: "Get Personalized Quote" },
  "Agendar": { es: "Reservar", en: "Book Now" },
  "Marcar Consulta": { es: "Reservar Consulta", en: "Book Appointment" },
  "Agendar Consulta": { es: "Reservar Consulta", en: "Book Appointment" },
  "Recusar": { es: "Rechazar", en: "Decline" },
  "Aceitar": { es: "Aceptar", en: "Accept" },
  "Abrir no Google Maps": { es: "Abrir en Google Maps", en: "Open in Google Maps" },
  // Cookie Consent Banner
  "Utilizamos cookies para melhorar a sua experiência. Ao continuar a navegar, concorda com a nossa política de cookies.": {
    es: "Utilizamos cookies para mejorar su experiencia. Al continuar navegando, acepta nuestra política de cookies.",
    en: "We use cookies to improve your experience. By continuing to browse, you agree to our cookie policy."
  },
  // Clinic Section (Clinic.tsx)
  "Sobre a Nossa Clínica": { es: "Sobre nuestra clínica", en: "About Our Clinic" },
  "A Clínica Santa Maria dos Olivais é um espaço dedicado à excelência em cuidados dentários, onde a saúde e a estética do seu sorriso são a nossa prioridade. Equipada com tecnologia de ponta e um ambiente acolhedor, a nossa clínica oferece uma ampla gama de tratamentos, desde medicina dentária geral até procedimentos de reabilitação especializados.": {
    es: "La Clínica Santa Maria dos Olivais es un espacio dedicado a la excelencia en el cuidado dental, donde la salud y la estética de su sonrisa son nuestra prioridad. Equipada con tecnología de punta y un ambiente acogedor, nuestra clínica ofrece una amplia gama de tratamientos, desde odontología general hasta procedimientos de rehabilitación especializados.",
    en: "The Clínica Santa Maria dos Olivais is a space dedicated to excellence in dental care, where the health and aesthetics of your smile are our priority. Equipped with state-of-the-art technology and a welcoming environment, our clinic offers a wide range of treatments, from general dentistry to specialized rehabilitation procedures."
  },
  "Os Nossos Valores e Compromisso": { es: "Nuestros Valores y Compromiso", en: "Our Values and Commitment" },
  "Na Clínica Santa Maria dos Olivais, acreditamos que a saúde oral é essencial para o bem-estar geral. O nosso compromisso é oferecer tratamentos de elevada qualidade num ambiente acolhedor, seguro e altamente profissional.": {
    es: "En la Clínica Santa Maria dos Olivais, creemos que la salud oral es esencial para el bienestar general. Nuestro compromiso es ofrecer tratamientos de alta calidad en un ambiente acogedor, seguro y altamente profesional.",
    en: "At Clínica Santa Maria dos Olivais, we believe that oral health is essential for overall well-being. Our commitment is to offer high-quality treatments in a warm, safe, and highly professional environment."
  },
  "Excelência Clínica": { es: "Excelencia Clínica", en: "Clinical Excellence" },
  "Utilizamos tecnologia de vanguarda e técnicas avançadas de medicina dentária para garantir resultados de excelência e duradouros.": {
    es: "Utilizamos tecnología de vanguardia y técnicas avanzadas de medicina dental para garantizar resultados excelentes y duraderos.",
    en: "We use state-of-the-art technology and advanced dental medicine techniques to guarantee excellent and long-lasting results."
  },
  "Cuidado Personalizado": { es: "Cuidado Personalizado", en: "Personalized Care" },
  "Cada sorrisos e cada paciente são únicos, pelo que os nossos planos de tratamento são totalmente personalizados à sua medida.": {
    es: "Cada sonrisa y cada paciente son únicos, por lo que nuestros planes de tratamiento están totalmente personalizados a su medida.",
    en: "Each smile and each patient is unique, so our treatment plans are fully tailored to your individual needs."
  },
  "Conforto e Confiança": { es: "Confort y Confianza", en: "Comfort and Trust" },
  "Criamos uma atmosfera tranquila e humanizada para proporcionar uma experiência de consulta serena e sem qualquer receio.": {
    es: "Creamos un ambiente tranquilo y humanizado para brindar una experiencia de consulta serena y sin ningún temor.",
    en: "We create a peaceful and humanized atmosphere to provide a serene and completely fearless consultation experience."
  },
  "Compromisso e Valores da Clínica Santa Maria dos Olivais": {
    es: "Compromiso y valores de la Clínica Santa Maria dos Olivais",
    en: "Commitment and values of Clínica Santa Maria dos Olivais"
  },
  // Case Studies (CaseStudies.tsx)
  "Casos Clínicos": { es: "Casos Clínicos", en: "Clinical Cases" },
  "Transformações Visíveis": { es: "Transformaciones Visibles", en: "Visible Transformations" },
  "Conheça as histórias reais e veja os resultados antes e depois dos nossos pacientes, comprovando a qualidade do nosso trabalho clínico.": {
    es: "Conozca historias reales y vea los resultados antes y después de nuestros pacientes, que demuestran la calidad de nuestro trabajo clínico.",
    en: "Meet real patient stories and see before-and-after results, proving the high quality of our clinical work."
  },
  "Preço do Alinhador Invisível em Portugal": { es: "Precio de Alineador Invisible en Portugal", en: "Price of Invisible Aligners in Portugal" },
  "Antes": { es: "Antes", en: "Before" },
  "Depois": { es: "Después", en: "After" },
  "Caso clínico real": { es: "Caso clínico real", en: "Real clinical case" },
  "Tratamento de Alinhadores Invisíveis": { es: "Tratamiento de Alineadores Invisibles", en: "Invisible Aligners Treatment" },
  "Correcção de apinhamento severo. Smile makeover completo em apenas 10 meses de tratamento.": {
    es: "Corrección de apiñamiento severo. Cambio de sonrisa completo en solo 10 meses de tratamiento.",
    en: "Correction of severe teeth crowding. Complete smile makeover in just 10 months of treatment."
  },
  "Reabilitação Oral com Implantes": { es: "Rehabilitación Oral con Implantes", en: "Oral Rehabilitation with Implants" },
  "Fórmula implante unitário funcional e estético na zona anterior do dente.": {
    es: "Fórmula de implante unitario funcional y estético en la zona anterior del diente.",
    en: "Functional and aesthetic single implant restoration in the anterior zone."
  },
  // FAQ Page (FAQ.tsx & FAQ data)
  "Perguntas Frequentes": { es: "Preguntas Frecuentes", en: "Frequently Asked Questions" },
  "Sobre Consultas e Marcações": { es: "Sobre Consultas y Citas", en: "About Consultations & Bookings" },
  "Sobre Pagamentos e Seguros": { es: "Sobre Pagos y Seguros", en: "About Payments & Insurance" },
  "Sobre Tratamentos Específicos": { es: "Sobre Tratamientos Específicos", en: "About Specific Treatments" },
  // Insurance and Reimbursement Section
  "Aceitamos o seu Seguro em": { es: "Aceptamos su Seguro en", en: "We Accept Your Insurance in" },
  "Regime de Reembolso": { es: "Régimen de Reembolso", en: "Reimbursement Scheme" },
  "Na Clínica Santa Maria dos Olivais, escolhe o seu médico pela qualidade, não pela lista da seguradora. Atendimento premium e personalizado.": {
    es: "En la Clínica Santa Maria dos Olivais, usted elige a su médico por su calidad, no por la lista de la aseguradora. Atención premium y personalizada.",
    en: "At Clínica Santa Maria dos Olivais, you choose your doctor based on quality, not on the insurance company's list. Premium and personalized care."
  },
  "1. Tratamento": { es: "1. Tratamiento", en: "1. Treatment" },
  "Realiza o tratamento com os nossos especialistas com total liberdade de escolha clínica.": {
    es: "Realice el tratamiento con nuestros especialistas con total libertad de elección clínica.",
    en: "Undergo treatment with our specialists with total freedom of clinical choice."
  },
  "2. Faturação": { es: "2. Facturación", en: "2. Billing" },
  "Efetuamos a fatura detalhada com todos os códigos OMD exigidos pelas seguradoras como a ADSE, Médis, Allianz ou Multicare.": {
    es: "Emitimos la factura detallada con todos los códigos de la OMD exigidos por las aseguradoras como ADSE, Médis, Allianz o Multicare.",
    en: "We issue a detailed invoice with all OMD codes required by insurance providers such as ADSE, Médis, Allianz, or Multicare."
  },
  "3. Reembolso": { es: "3. Reembolso", en: "3. Reimbursement" },
  "O reembolso é processado pela sua seguradora de acordo com as condições específicas da sua apólice e prazos determinados pela mesma.": {
    es: "El reembolso es procesado por su aseguradora de acuerdo con las condiciones específicas de su póliza y los plazos determinados por la misma.",
    en: "The reimbursement is processed by your insurance provider in accordance with the specific conditions and deadlines of your policy."
  },
  "Não realizamos financiamento bancário direto. O pagamento é feito no ato, garantindo-lhe o melhor preço final sem juros e transparência total sobre o valor investido na sua saúde.": {
    es: "No ofrecemos financiación bancaria directa. El pago se realiza en el acto, garantizándole el mejor precio final sin intereses y total transparencia sobre el valor invertido en su salud.",
    en: "We do not offer direct bank financing. Payment is made at the time of service, guaranteeing you the best final interest-free price and total transparency on the value invested in your health."
  },
  // Contacts Page (Contact.tsx)
  "Preço de uma chamada de Rede Nacional": { es: "(Precio de llamada nacional local)", en: "(Price of a standard national network call)" },
  "Preço de uma chamada de Rede Móvel Nacional": { es: "(Precio de llamada móvil nacional)", en: "(Price of a standard mobile network call)" },
  // Contact Forms (ContactForm.tsx & others)
  "Pedir Avaliação Gratuita": { es: "Pedir Evaluación Gratuita", en: "Request Free Assessment" },
  "Marque a sua Consulta de Avaliação Gratuita": { es: "Reserve su Consulta de Evaluación Gratuita", en: "Book your Free Assessment Consultation" },
  "Utilize o formulário abaixo para nos contactar diretamente. A nossa equipa entrará em contacto num curto espaço de tempo.": {
    es: "Utilice el formulario de abajo para contactarnos directamente. Nuestro equipo se comunicará con usted a la brevedad.",
    en: "Use the form below to contact us directly. Our team will get back to you in a short period of time."
  },
  "Nome": { es: "Nombre", en: "Name" },
  "Nome Completo": { es: "Nombre Completo", en: "Full Name" },
  "Telefone": { es: "Teléfono", en: "Phone Number" },
  "Telemóvel / WhatsApp": { es: "Móvil / WhatsApp", en: "Mobile / WhatsApp" },
  "E-mail": { es: "Correo electrónico", en: "Email" },
  "Especialidade": { es: "Especialidad", en: "Specialty" },
  "Mensagem": { es: "Mensaje", en: "Message" },
  "Ex: 912 345 678": { es: "Ej: 912 345 678", en: "E.g. +351 912 345 678" },
  "Mensagem enviada com sucesso!": { es: "¡Mensaje enviado con éxito!", en: "Message sent successfully!" },
  "O número de telefone deve conter pelo menos 9 dígitos.": { 
    es: "El número de teléfono debe contener al menos 9 dígitos.", 
    en: "The phone number must contain at least 9 digits." 
  },
  "O número de telemóvel/WhatsApp deve conter pelo menos 9 dígitos.": { 
    es: "El número de móvil/WhatsApp debe contener al menos 9 dígitos.", 
    en: "The mobile/WhatsApp number must contain at least 9 digits." 
  },
  // Team Section & Positions (Team.tsx)
  "Conheça a nossa equipa de profissionais dedicados ao seu sorriso.": {
    es: "Conozca a nuestro equipo de profesionales dedicados a su sonrisa.",
    en: "Meet our team of professionals dedicated to your smile."
  },
  "Direção Clínica e Implantologia": { es: "Dirección Clínica e Implantología", en: "Clinical Direction & Implantology" },
  "Diretora Clínica e especialista em reabilitação oral avançada com implantes.": {
    es: "Directora Clínica y especialista en rehabilitación oral avanzada con implantes.",
    en: "Clinical Director and specialist in advanced oral rehabilitation with implants."
  },
  "Ortodontia": { es: "Ortodoncia", en: "Orthodontics" },
  "Especialista em Ortodontia Clínica e Alinhadores Invisíveis.": {
    es: "Especialista en Ortodoncia Clínica y Alineadores Invisibles.",
    en: "Specialist in Clinical Orthodontics and Invisible Aligners."
  },
  "Especialista em Alinhadores Spark e Ortodontia Clínica.": {
    es: "Especialista en Alineadores Spark y Ortodoncia Clínica.",
    en: "Specialist in Spark Aligners and Clinical Orthodontics."
  },
  "Periodontologia": { es: "Periodoncia", en: "Periodontology" },
  "Especialista em saúde gengival e tecidos de suporte dentário.": {
    es: "Especialista en salud gingival y tejidos de soporte dental.",
    en: "Specialist in gum health and dental support tissues."
  },
  "Odontopediatria": { es: "Odontopediatría", en: "Pediatric Dentistry" },
  "Especialista no atendimento e saúde oral dos más pequenos.": {
    es: "Especialista en la atención y salud buco-dental de los más pequeños.",
    en: "Specialist in dental care and oral health for the little ones."
  },
  "Dentisteria e Endodontia": { es: "Odontología General y Endodoncia", en: "General Dentistry & Endodontics" },
  "Focado na preservação dentária e tratamentos de canal.": {
    es: "Enfocado en la preservación dental y tratamientos de conducto.",
    en: "Focused on tooth preservation and root canal treatments."
  },
  "Inês Gama": { es: "Inês Gama", en: "Inês Gama" },
  "Assistente de Medicina Dentária": { es: "Asistente de Medicina Dental", en: "Dental Medicine Assistant" },
  "Apoio clínico especializado em todas as áreas da medicina dentária.": {
    es: "Soporte clínico especializado en todas las áreas de la medicina dental.",
    en: "Specialized clinical support in all areas of dentistry."
  },
  "Carla Claro": { es: "Carla Claro", en: "Carla Claro" },
  "Receção e Apoio ao Cliente": { es: "Recepción y Atención al Cliente", en: "Reception and Customer Care" },
  "Responsável pelo acolhimento e gestão personalizada del percurso de cada paciente.": {
    es: "Responsable de la acogida y gestión personalizada del recorrido de cada paciente.",
    en: "Responsible for welcoming and custom management of each patient's journey."
  },
  "Equipa Médica": { es: "Equipo Médico", en: "Medical Team" },
  "Assistentes": { es: "Asistentes", en: "Assistants" },
  "Receção e Apoio": { es: "Recepción y Soporte", en: "Reception & Support" },
  // Service list highlights and buttons
  "Reabilitação Oral e Implantes": { es: "Rehabilitación Oral e Implantes", en: "Oral Rehabilitation & Implants" },
  "Recupere o seu sorriso fixo. Implantes de titânio e coroas de cerâmica com a Dra. Ana Mata. Solução completa em Lisboa, sem necessidade de viagens de risco.": {
    es: "Recupere su sonrisa fija. Implantes de titanio y coronas de cerámica con la Dra. Ana Mata. Solución completa en Lisboa, sin necesidad de viajes de riesgo.",
    en: "Restore your fixed smile. Titanium implants and ceramic crowns with Dr. Ana Mata. Complete solution in Lisbon, avoiding risky dental tourism."
  },
  "A nossa diferença: Tratamento realizado em Portugal, com acompanhamento permanente presencial.": {
    es: "Nuestra diferencia: Tratamiento realizado en Portugal, con seguimiento presencial permanente.",
    en: "Our difference: Treatment performed in Portugal, with permanent in-person follow-up."
  },
  "Implante Unitário + Coroa: desde 745€": { es: "Implante Unitario + Corona: desde 745€", en: "Single Implant + Crown: from €745" },
  "Protocolo Superior (Arcada Completa): 4.800€": { es: "Protocolo Superior (Arcada Completa): 4.800€", en: "Upper Full Arch Protocol: €4,800" },
  "Agendar Avaliação Implantologia": { es: "Reservar Evaluación de Implantología", en: "Book Implantology Assessment" },
  "Ortodontia e Alinhamento Dentário": { es: "Ortodoncia y Alineación Dental", en: "Orthodontics and Teeth Alignment" },
  "Alinhamento dentário para crianças e adultos. Aparelhos fixos convencionais e as soluções mais modernas de alinhadores invisíveis com a Dra. Mariana Aberto.": {
    es: "Alineación dental para niños y adultos. Aparatos fijos convencionales y las soluciones más modernas de alineadores invisibles con la Dra. Mariana Aberto.",
    en: "Teeth alignment for children and adults. Conventional fixed braces and the most modern invisible aligner solutions with Dr. Mariana Aberto."
  },
  "Estudo Ortodôntico Completo: 60€": { es: "Estudio Ortodóncico Completo: 60€", en: "Complete Orthodontic Study: €60" },
  "Aparelho Fixo Convencional: desde 450€ (por arcada)": { es: "Aparato Fijo Convencional: desde 450€ (por arcada)", en: "Conventional Fixed Braces: from €450 (per arch)" },
  "Alinhadores Invisíveis: Sob consulta médica.": { es: "Alineadores Invisibles: Bajo consulta médica.", en: "Invisible Aligners: Under medical consultation." },
  "Marcar Estudo Ortodôntico": { es: "Reservar Estudio Ortodóncico", en: "Book Orthodontic Study" },
  "Estética e Facetas": { es: "Estética y Carillas", en: "Cosmetic Veneers" },
  "Melhoria da estética e harmonia do sorriso através da dentisteria avançada.": {
    es: "Mejora de la estética y armonía de la sonrisa mediante odontología avanzada.",
    en: "Improvement of smile aesthetics and harmony through advanced dentistry."
  },
  "Transforme o seu sorriso com facetas estéticas de alta qualidade.": {
    es: "Transforme su sonrisa con carillas estéticas de alta calidad.",
    en: "Transform your smile with high-quality aesthetic veneers."
  },
  "Facetas 4 Dentes: 1.800€": { es: "Carillas para 4 Dientes: 1.800€", en: "Veneers for 4 Teeth: €1,800" },
  "Facetas 1 Arcada: 4.550€": { es: "Carillas para 1 Arcada: 4.550€", en: "Veneers for 1 Arch: €4,550" },
  "Branqueamento: 200€": { es: "Blanqueamiento: 200€", en: "Teeth Whitening: €200" },
  // New Translations
  "Com": { es: "Con", en: "With" },
  "anos de": { es: "años de", en: "years of" },
  "Experiência": { es: "Experiencia", en: "Experience" },
  "Implantes | Estética Dentária | Ortodontia": { es: "Implantes | Estética Dental | Ortodoncia", en: "Implants | Cosmetic Dentistry | Orthodontics" },
  "Clínica Dentária": { es: "Clínica Dental", en: "Dental Clinic" },
  "Agende Sua Consulta": { es: "Reserve su Consulta", en: "Book your Consultation" },
  "Recomendado": { es: "Recomendado", en: "Recommended" },
  "Facetas": { es: "Carillas", en: "Veneers" },
  "Medicina Dentária": { es: "Medicina Dental", en: "General Dentistry" },
  "Desvitalização": { es: "Endodoncia", en: "Root Canal Treatment" },
  "Próteses": { es: "Prótesis", en: "Dentures" },
  "ORTODONTIA, ALINHADORES INVISÍVEIS": {
    es: "ORTODONCIA, ALINEADORES INVISIBLES",
    en: "ORTHODONTICS, INVISIBLE ALIGNERS"
  },
  "Perspetiva Frontal": {
    es: "Perspectiva Frontal",
    en: "Frontal View"
  },
  "Sorriso Frontal": {
    es: "Sonrisa Frontal",
    en: "Frontal Smile"
  },
  "Perfil Esquerdo": {
    es: "Perfil Izquierdo",
    en: "Left Profile"
  },
  "Perfil Direito": {
    es: "Perfil Derecho",
    en: "Right Profile"
  },
  "Sorria de frente, mostrando bem os dentes": {
    es: "Sonría de frente, mostrando bien los dientes",
    en: "Smile from the front, showing your teeth clearly"
  },
  "Vire o rosto ligeiramente para a esquerda": {
    es: "Gire el rostro ligeramente hacia la izquierda",
    en: "Turn your face slightly to the left"
  },
  "Vire o rosto ligeiramente para a direita": {
    es: "Gire el rostro ligeramente hacia la derecha",
    en: "Turn your face slightly to the right"
  },
  "Alinhe a sua BOCA neste guia 👄": {
    es: "Alinee su BOCA en esta guía 👄",
    en: "Align your MOUTH inside this guide 👄"
  },
  "Alinhe o seu perfil ESQUERDO neste guia ◀": {
    es: "Alinee su perfil IZQUIERDO en esta guía ◀",
    en: "Align your LEFT profile inside this guide ◀"
  },
  "Alinhe o seu perfil DIREITO neste guia ▶": {
    es: "Alinee su perfil DERECHO en esta guía ▶",
    en: "Align your RIGHT profile inside this guide ▶"
  },
  "(Obrigatório)": {
    es: "(Obligatorio)",
    en: "(Required)"
  },
  "(Opcional)": {
    es: "(Opcional)",
    en: "(Optional)"
  },
  "Sem fotos": {
    es: "Sin fotos",
    en: "No photos"
  },
  "Modo Guia Oral Adaptado": {
    es: "Modo de Guía Oral Adaptado",
    en: "Adapted Oral Guide Mode"
  },
  "Selecione um ângulo para tirar ou carregar foto:": {
    es: "Seleccione un ángulo para tomar o cargar foto:",
    en: "Select an angle to capture or upload photo:"
  },
  "Pode carregar até 3 perspetivas do seu sorriso (Frontal, Perfil Esquerdo e Perfil Direito) para obter um Smile Design 100% preciso.": {
    es: "Puede cargar hasta 3 perspectivas de su sonrisa (Frontal, Perfil Izquierdo y Perfil Derecho) para obtener un Smile Design 100% preciso.",
    en: "You can upload up to 3 perspectives of your smile (Front, Left Profile, and Right Profile) to obtain a 100% accurate Smile Design."
  },
  "Selecione o ângulo acima antes de capturar/carregar a foto correspondente.": {
    es: "Seleccione el ángulo arriba antes de capturar/cargar la foto correspondiente.",
    en: "Select the angle above before capturing/uploading the corresponding photo."
  },
  "MEDICINA DENTÁRIA E DESVITALIZAÇÃO": {
    es: "MEDICINA DENTAL Y ENDODONCIA",
    en: "GENERAL DENTISTRY AND ROOT CANAL"
  },
  "Medicina Dentária e Desvitalização": {
    es: "Medicina Dental y Endodoncia",
    en: "General Dentistry and Root Canal Treatment"
  },
  "Cuidados dentários gerais e tratamentos de desvitalização.": {
    es: "Cuidados dentales generales y tratamientos de endodoncia.",
    en: "General dental care and root canal treatments."
  },
  "Diagnóstico médico rigoroso com tecnologia digital.": {
    es: "Diagnóstico médico riguroso con tecnología digital.",
    en: "Rigorous medical diagnosis with digital technology."
  },
  "Cuidados essenciais de saúde oral, incluindo restaurações e higiene oral preventiva.": {
    es: "Cuidados esenciales de salud oral, incluyendo restauraciones e higiene oral preventiva.",
    en: "Essential oral healthcare, including tooth restorations and preventive oral hygiene."
  },
  "Estética profissional segura para um sorriso mais luminoso.": {
    es: "Estética profesional segura para una sonrisa más limpia y luminosa.",
    en: "Professional and safe aesthetic whitening for a brighter smile."
  },
  "Cuidados especializados de saúde oral dedicados às crianças num ambiente tranquilo e acolhedor.": {
    es: "Cuidados especializados de salud dental infantil dedicados a los niños en un ambiente tranquilo y acogedor.",
    en: "Specialized oral healthcare dedicated to children in a peaceful and welcoming environment."
  },
  "Reabilitação oral e estética através de implantes unitários ou protocolos completos para recuperar a função mastigatória e o sorriso.": {
    es: "Rehabilitación oral y estética mediante implantes unitarios o protocolos completos para recuperar la función masticatoria y la sonrisa.",
    en: "Oral rehabilitation and aesthetics through single implants or full-arch protocols to restore both chewing function and your smile."
  },
  "Tratamento especializado de canais para preservação da peça dentária natural e alívio imediato da dor.": {
    es: "Tratamientos de endodoncia especializados para preservar las piezas dentales naturales y aliviar el dolo de forma inmediata.",
    en: "Specialized root canal treatment to preserve your natural teeth and provide immediate pain relief."
  },
  // Home Page Content
  "Especialistas em Implantologia, Ortodontia (Invisalign) e Estética Dentária em Olivais, Lisboa. 10 anos de excelência médica.": {
    es: "Especialistas en Implantología, Ortodoncia (Invisalign) y Estética Dental en Olivais, Lisboa. 10 años de excelencia médica.",
    en: "Specialists in Implantology, Orthodontics (Invisalign) and Cosmetic Dentistry in Olivais, Lisbon. 10 years of medical excellence."
  },
  "Transforme o seu": { es: "Transforme su", en: "Transform your" },
  "sorriso": { es: "sonrisa", en: "smile" },
  "hoje!": { es: "¡hoy!", en: "today!" },
  "Sorria com Confiança": { es: "Sonría con Confianza", en: "Smile with Confidence" },
  "Oferecemos cuidados dentários personalizados com tecnologia de ponta para toda a família.": {
    es: "Ofrecemos atención dental personalizada con tecnología de vanguardia para toda la familia.",
    en: "We offer personalized dental care with state-of-the-art technology for the entire family."
  },
  // Quote Calculator Page
  "O que procura melhorar no seu sorriso?": { es: "¿Qué desea mejorar en su sonrisa?", en: "What are you looking to improve in your smile?" },
  "Calculadora de Orçamento Gratuita": { es: "Calculadora de Presupuesto Gratuita", en: "Free Dental Quote Calculator" },
  "Calcule o custo estimado do seu tratamento dentário em menos de 1 minuto.": {
    es: "Calcule el costo estimado de su tratamiento dental en menos de 1 minuto.",
    en: "Estimate the approximate cost of your dental treatment in less than 1 minute."
  },
  "Qual é o seu principal objetivo?": { es: "¿Cuál es su principal objetivo?", en: "What is your main goal?" },
  "Substituir dentes em falta": { es: "Reemplazar dientes perdidos", en: "Replace missing teeth" },
  "Alinhar dentes (Aparelho ou Invisalign)": { es: "Alinear dientes (Brackets o Invisalign)", en: "Align teeth (Braces or Invisalign)" },
  "Estética (Clarear ou Facetas)": { es: "Estética (Blanquear o Carillas)", en: "Aesthetics (Whitening or Veneers)" },
  "Tratamento Geral ou Higiene": { es: "Tratamiento General o Higiene", en: "General Treatment or Hygiene" },
  "Quantos dentes em falta precisa de substituir?": { es: "¿Cuántos dientes perdidos necesita reemplazar?", en: "How many missing teeth do you need to replace?" },
  "Apenas 1 dente": { es: "Solo 1 diente", en: "Only 1 tooth" },
  "Vários dentes": { es: "Varios dientes", en: "Multiple teeth" },
  "Arcada Completa (Todos os dentes)": { es: "Arcada Completa (Todos los dientes)", en: "Full Arch (All teeth)" },
  "Passo": { es: "Paso", en: "Step" },
  "de": { es: "de", en: "of" },
  "Opção de Tratamento de Preferência:": { es: "Opción de Tratamiento Preferida:", en: "Preferred Treatment Option:" },
  "Implante Dentário Fixo (Recomendado)": { es: "Implante Dental Fijo (Recomendado)", en: "Fixed Dental Implant (Recommended)" },
  "Prótese Removível Estética": { es: "Prótesis Removible Estética", en: "Aesthetic Removable Denture" },
  "Qual é a sua preferência de alinhamento?": { es: "¿Cuál es su preferencia de alineación?", en: "What is your alignment preference?" },
  "Sistemas Invisíveis (Invisalign / Spark)": { es: "Sistemas Invisibles (Invisalign / Spark)", en: "Invisible Aligner Systems (Invisalign / Spark)" },
  "Aparelho Fixo Metálico Tradicional": { es: "Aparato Fijo Metálico Tradicional", en: "Traditional Metal Fixed Braces" },
  "Não tenho certeza / Ver ambos": { es: "No estoy seguro / Ver ambos", en: "Not sure / See both" },
  "O que mais gostaria de melhorar esteticamente?": { es: "¿Qué más le gustaría mejorar estéticamente?", en: "What else would you like to improve aesthetically?" },
  "Branqueamento Dentário Profissional": { es: "Blanqueamiento Dental Profesional", en: "Professional Teeth Whitening" },
  "Facetas de Cerâmica Premium": { es: "Carillas de Cerámica Premium", en: "Premium Ceramic Veneers" },
  "Ambos os tratamentos combinados": { es: "Ambos tratamientos combinados", en: "Both treatments combined" },
  "Que tratamento geral necessita?": { es: "¿Qué tratamiento general necesita?", en: "What general treatment do you need?" },
  "Limpeza (Destartarização + Jato de Bicarbonato)": { es: "Limpieza (Limpieza dental + Chorros de Bicarbonato)", en: "Cleaning (Scaling + Airflow Polishing)" },
  "Restauração de Cárie": { es: "Restauración de Caries", en: "Cavity Restoration" },
  "Desvitalização / Canal": { es: "Desvitalización / Tratamiento de conductos", en: "Root Canal Treatment" },
  "Não sei / Preciso de uma avaliação geral": { es: "No sé / Necesito una evaluación general", en: "Not sure / Need General Assessment" },
  "Quase pronto! Insira os seus dados para ver o cálculo": { es: "¡Casi listo! Ingrese sus datos para ver el cálculo", en: "Almost ready! Enter your details to view the estimate" },
  "O seu telemóvel/WhatsApp": { es: "Su móvil/WhatsApp", en: "Your Mobile/WhatsApp" },
  "Ao continuar, aceita as nossas políticas de privacidade.": { es: "Al continuar, acepta nuestras políticas de privacidad.", en: "By continuing, you accept our privacy policies." },
  "Calculado com Sucesso!": { es: "¡Calculado con éxito!", en: "Successfully Estimated!" },
  "Obrigado pelo seu interesse, ": { es: "Gracias por su interés, ", en: "Thank you for your interest, " },
  "Aqui está a estimativa para o seu caso:": { es: "Aquí está el presupuesto estimado para su caso:", en: "Here is the estimate for your case:" },
  "Intervalo Estimado": { es: "Rango Estimado", en: "Estimated Range" },
  "Tratamento Sugerido": { es: "Tratamiento Sugerido", en: "Suggested Treatment" },
  "Este simulador oferece um valor de referência meramente indicativo com base nos preços médios de tabela da clínica. Não dispensa de forma alguma a realização de uma consulta de diagnóstico clínico presencial e exames radiológicos para obter um orçamento definitivo fechado à sua medida.": {
    es: "Este simulador ofrece un valor de referencia meramente indicativo basado en los precios medios de tarifa de la clínica. No sustituye en ningún caso la realización de una consulta de diagnóstico clínico presencial y exámenes radiológicos para obtener un presupuesto definitivo a su medida.",
    en: "This simulator offers a reference value that is purely indicative based on the clinic's standard average rates. It in no way replaces the need for a face-to-face clinical diagnostic consultation and X-ray examinations to obtain a final definitive quote tailored to your case."
  },
  "Falar com Especialista por WhatsApp": { es: "Hablar con Especialista por WhatsApp", en: "Speak with Specialist on WhatsApp" },
  "Simulação Guardada! Entraremos em contacto muito brevemente pelo WhatsApp ou telefone para ajudar a agendar a sua consulta com o especialista correspondente.": {
    es: "¡Simulación Guardada! Nos pondremos en contacto con usted brevemente por WhatsApp o teléfono para ayudarle a reservar su cita con el especialista correspondiente.",
    en: "Simulation Saved! We will contact you very soon via WhatsApp or phone to help arrange your consultation with the corresponding specialist."
  },
  "Recomeçar": { es: "Volver a empezar", en: "Start Over" },
  // Blog Page (Blog.tsx)
  "Blog e Dicas de Saúde Oral": { es: "Blog y Consejos de Salud Oral", en: "Oral Health Blog & Tips" },
  "Leia os nossos artigos e mantenha o seu sorriso brilhante e saudável.": { es: "Lea nuestros artículos y mantenga su sonrisa brillante y saludable.", en: "Read our articles and keep your smile glowing and healthy." },
  "Ler Artigo": { es: "Leer Artículo", en: "Read Article" },
  "Voltar para o Blog": { es: "Volver al Blog", en: "Back to Blog" },
  "Por Dr.": { es: "Por el Dr. ", en: "By Dr. " },
  "Duração de Leitura:": { es: "Duración de lectura:", en: "Reading time:" },
  "minutos": { es: "minutos", en: "minutes" },
  // Thank You Page (ThankYou.tsx)
  "Agendamento Recebido com Sucesso!": { es: "¡Cita Recibida con Éxito!", en: "Appointment Request Received!" },
  "Obrigado por confiar na Clínica Santa Maria dos Olivais.": { es: "Gracias por confiar en la Clínica Santa Maria dos Olivais.", en: "Thank you for trusting Clínica Santa Maria dos Olivais." },
  "A sua hora e dados foram pré-registados de forma automática no nosso integrador. Entraremos em contacto pelo telemóvel fornecido num prazo máximo de 12 a 24 horas para confirmar os detalhes finais do agendamento.": {
    es: "Su hora y datos han sido pre-registrados de forma automática en nuestro integrador. Nos comunicaremos con usted por el móvil proporcionado en un plazo máximo de 12 a 24 horas para confirmar los detalles finales de la reserva.",
    en: "Your time and details have been auto-registered in our system. We will contact you via the phone number provided within 12 to 24 hours to confirm the final details of your appointment."
  },
  "Se tiver urgência, pode adiantar e enviar um WhatsApp direto:": {
    es: "Si tiene urgencia, puede adelantarse y enviar un WhatsApp directo:",
    en: "If it is urgent, you can speed up the process and send a direct WhatsApp message:"
  },
  "Falar Diretamente por WhatsApp": { es: "Hablar directamente por WhatsApp", en: "Speak Directly on WhatsApp" },
  "Voltar à Página Inicial": { es: "Volver a la Página de Inicio", en: "Back to Homepage" },
  "Obrigado! Recebemos o seu pedido de marcação.": { es: "¡Gracias! Recibimos su solicitud de cita.", en: "Thank you! We have received your booking request." },
  "A nossa equipa entrará em contacto consigo nas próximas 24 horas para confirmar o horário.": { es: "Nuestro equipo se pondrá en contacto con usted en las próximas 24 horas para confirmar la hora.", en: "Our team will contact you within the next 24 hours to confirm the schedule." },
  "Localização da Clínica": { es: "Ubicación de la Clínica", en: "Clinic Location" },
  "Falar Agora no WhatsApp": { es: "Hablar ahora por WhatsApp", en: "Speak Now on WhatsApp" },
  "Aproveite para conhecer todos os nossos serviços": { es: "Aproveche para conocer todos nuestros servicios", en: "Take the opportunity to know all our services" },
  // Layout & Navigation Sidebar / FAB Hub
  "Atendimento Rápido": { es: "Atención Rápida", en: "Quick Support" },
  "Fale Connosco 🦷": { es: "Hable con nosotros 🦷", en: "Talk to us 🦷" },
  "Resposta célere": { es: "Respuesta rápida", en: "Fast response" },
  "Reserva imediata": { es: "Reserva inmediata", en: "Instant booking" },
  "Chamada Direta": { es: "Llamada Directa", en: "Direct Call" },
  "Linha Grátis 24h": { es: "Línea Gratuita 24h", en: "24h Free Line" },
  "Contactem-me": { es: "Contáctenme", en: "Contact Me" },
  "Ligamos de volta": { es: "Le llamamos de vuelta", en: "We call you back" },
  "Deixe os seus dados e entraremos em contacto brevemente.": { es: "Deje sus datos y nos pondremos en contacto a la brevedad.", en: "Leave your details and we will contact you shortly." },
  "Criamos sorrisos perfeitos,": { es: "Creamos sonrisas perfectas,", en: "We create perfect smiles," },
  "combinando excelência médica": { es: "combinando la excelencia médica", en: "combining medical excellence" },
  "com conforto absoluto.": { es: "con absoluto confort.", en: "with absolute comfort." },
  "Redes sociais": { es: "Redes sociales", en: "Social media" },
  "Localização": { es: "Ubicación", en: "Location" },
  "Receção": { es: "Recepción", en: "Reception" },
  "marcação de consultas - urgências e dúvidas": { es: "reserva de citas - urgencias y dudas", en: "appointment booking - emergencies and questions" },
  // Team Page Strings
  "A Nossa Equipa Clínica": { es: "Nuestro Equipo Clínico", en: "Our Clinical Team" },
  "Comprometidos com a excelência nos Olivais. Conheça os profissionais dedicados a cuidar do seu sorriso com as mais avançadas técnicas de medicina dentária.": {
    es: "Comprometidos con la excelencia en Olivais. Conozca a los profesionales dedicados a cuidar su sonrisa con las técnicas más avanzadas de la odontología.",
    en: "Committed to excellence in Olivais. Meet the professionals dedicated to caring for your smile with the most advanced dentistry techniques."
  },
  "Corpo Clínico Especialista": { es: "Cuerpo Clínico Especialista", en: "Specialist Clinical Staff" },
  "Apoio e Atendimento": { es: "Apoyo y Atención al Cliente", en: "Reception & Support Team" },
  // FAQ Page Entries
  "Como funciona o agendamento de consultas na clínica?": { es: "¿Cómo funciona la reserva de citas en la clínica?", en: "How does booking consultations at the clinic work?" },
  "Qual é o valor da consulta de avaliação?": { es: "¿Cuál es el precio de la consulta de evaluación?", en: "What is the cost of the assessment consultation?" },
  "A nossa consulta de avaliação profissional tem o valor de 20,00€. Este passo é essencial para que a nossa equipa clínica possa realizar um diagnóstico preciso e delinear o plano de tratamento mais adequado às suas necessidades.": {
    es: "Nuestra consulta de evaluación profesional cuesta 20,00€. Este paso es esencial para que nuestro equipo clínico pueda realizar un diagnóstico preciso y diseñar el plan de tratamiento más adecuado a sus necesidades.",
    en: "Our professional assessment consultation costs €20.00. This step is essential for our clinical team to perform an accurate diagnosis and outline the most appropriate treatment plan for your needs."
  },
  "Qual é o horário de atendimento da clínica?": { es: "¿Cuál es el horario de atención de la clínica?", en: "What are the clinic's operating hours?" },
  "Para sua conveniência, estamos abertos de segunda a sexta-feira, das 10:00 às 19:00, e aos sábados, das 10:00 às 13:00.": {
    es: "Para su comodidad, estamos abiertos de lunes a viernes, de 10:00 a 19:00, y los sábados de 10:00 a 13:00.",
    en: "For your convenience, we are open Monday to Friday, from 10:00 AM to 7:00 PM, and Saturdays, from 10:00 AM to 1:00 PM."
  },
  "Onde se localiza a clínica?": { es: "¿Dónde está ubicada la clínica?", en: "Where is the clinic located?" },
  "A Clínica Santa Maria dos Olivais situa-se na Estrada de Moscavide, nº 32 C, em Lisboa (1800-279).": {
    es: "La Clínica Santa Maria dos Olivais se encuentra en la Estrada de Moscavide, nº 32 C, en Lisboa (1800-279).",
    en: "The Clínica Santa Maria dos Olivais is located at Estrada de Moscavide, No. 32 C, in Lisbon (1800-279)."
  },
  "Têm acordos com seguradoras?": { es: "¿Tienen convenios con aseguradoras?", en: "Do you have agreements with insurance companies?" },
  "De momento, não dispomos de protocolos diretos com seguradoras. No entanto, emitimos sempre uma fatura detalhada de todos os atos clínicos para que possa solicitar o respetivo reembolso junto da sua entidade seguradora ou subsistema de saúde, de acordo com as condições da sua apólice.": {
    es: "Por el momento, no disponemos de convenios directos con aseguradoras. Sin embargo, emitimos siempre una factura detallada de todos los actos clínicos para que pueda solicitar el reembolso correspondiente a su entidad aseguradora o subsistema de salud, de acuerdo con las condiciones de su póliza.",
    en: "At the moment, we do not have direct agreements with insurance companies. However, we always issue a detailed invoice for all clinical acts so that you can request the respective reimbursement from your insurance provider or health subsystem, in accordance with your policy conditions."
  },
  "Quais são as condições de pagamento para tratamentos de Implantologia?": { es: "¿Cuáles son las condiciones de pago para los tratamientos de Implantología?", en: "What are the payment conditions for Implantology treatments?" },
  "No caso dos tratamentos de implantes, o pagamento deverá ser efetuado integralmente no dia da intervenção cirúrgica. Para os restantes tratamentos, o pagamento é realizado individualmente à medida que os procedimentos são executados.": {
    es: "En el caso de los tratamientos de implantes, el pago debe realizarse en su totalidad el día de la intervención quirúrgica. Para el resto de tratamientos, el pago se realiza individualmente a medida que se ejecutan los procedimientos.",
    en: "In the case of implant treatments, payment must be made in full on the day of the surgical intervention. For other treatments, payment is made individually as the procedures are carried out."
  },
  "Quais as opções disponíveis para substituir dentes em falta?": { es: "¿Qué opciones hay disponibles para reemplazar los dientes perdidos?", en: "What options are available to replace missing teeth?" },
  "Dispomos de soluções avançadas de Implantologia, com implantes unitários ou protocolos de arcada completa, bem como diversas opções de Próteses Removíveis (acrílicas, esqueléricas ou flexíveis) adaptadas a cada caso.": {
    es: "Disponemos de soluciones avanzadas de Implantología, con implantes unitarios o protocolos de arcada completa, así como diversas opciones de Próteses Removíveis (acrílicas, esqueléticas o flexibles) adaptadas a cada caso.",
    en: "We have advanced Implantology solutions, with single implants or full arch protocols, as well as various options of Removable Dentures (acrylic, skeletal, or flexible) adapted to each case."
  },
  "Realizam tratamentos de estética dentária?": { es: "¿Realizan tratamientos de estética dental?", en: "Do you offer cosmetic dental treatments?" },
  "Sim. A nossa equipa clínica realiza tratamentos de Branqueamento Dentário (em consultório ou kit doméstico), Facetas e restaurações estéticas para devolver a harmonia ao seu sorriso.": {
    es: "Sí. Nuestro equipo clínico realiza tratamientos de Blanqueamiento Dental (en clínica o kit casero), Carillas y restauraciones estéticas para devolver la armonía a su sonrisa.",
    en: "Yes. Our clinical team performs Teeth Whitening treatments (in-office or home kit), Veneers, and aesthetic restorations to restore harmony to your smile."
  },
  "Trabalham com Ortodontia invisível?": { es: "¿Trabajan con Ortodoncia invisible?", en: "Do you work with invisible Orthodontics?" },
  "Sim. Além dos aparelhos fixos convencionais, oferecemos o sistema Invisalign, que permite alinhar o seu sorriso de forma discreta e confortável. O orçamento para este tratamento é fornecido sob consulta após a avaliação clínica.": {
    es: "Sí. Además de los aparatos fijos convencionales, ofrecemos el sistema Invisalign, que permite alinear su sonrisa de forma discreta y cómoda. El presupuesto para este tratamiento se facilita bajo consulta tras la evaluación clínica.",
    en: "Yes. In addition to conventional fixed braces, we offer the Invisalign system, which allows you to align your smile discreetly and comfortably. The quote for this treatment is provided on request following a clinical consultation."
  },
  "A clínica presta atendimento a crianças?": { es: "¿La clínica ofrece atención a niños?", en: "Does the clinic provide care for children?" },
  "Sim. Dispomos de uma área dedicada à Odontopediatria (Medicina Dentária para crianças), focada na prevenção e no acompanhamento da saúde oral dos mais jovens num ambiente acolhedor.": {
    es: "Sí. Disponemos de un área dedicada a la Odontopediatría (Odontología para niños), enfocada en la prevención y el seguimiento de la salud buco-dental de los más privados en un ambiente acogedor.",
    en: "Yes. We have an area dedicated to Pediatric Dentistry (Dentistry for children), focused on the prevention and monitoring of children's oral health in a welcoming environment."
  },
  // Quote Calculator Form Labels & UI
  "Como prefere simular o seu investimento?": { es: "¿Cómo prefiere calcular su inversión?", en: "How would you prefer to estimate your investment?" },
  "Escolha a opção que melhor se ajusta às suas necessidades. O diagnóstico por foto é validado diretamente por médicos dentistas qualificados de forma 100% gratuita.": {
    es: "Elija la opción que mejor se adapte a sus necesidades. El diagnóstico por foto es validado directamente por odontólogos calificados de forma 100% gratuita.",
    en: "Choose the option that best fits your needs. The photographic diagnosis is validated directly by qualified dentists, 100% free of charge."
  },
  "Passo 1: Especialidade": { es: "Paso 1: Especialidad", en: "Step 1: Specialty" },
  "O que quer cuidar hoje?": { es: "¿Qué desea cuidar hoy?", en: "What do you want to take care of today?" },
  "Explorar tratamentos e preços.": { es: "Explorar tratamientos y precios.", en: "Explore treatments and prices." },
  "Tratamentos de": { es: "Tratamientos de", en: "Treatments for" },
  "Referência:": { es: "Referencia:", en: "Reference:" },
  "Selecionados:": { es: "Seleccionados:", en: "Selected:" },
  "tratamentos": { es: "tratamientos", en: "treatments" },
  "Ver Orçamento": { es: "Ver Presupuesto", en: "See Quote" },
  "Estimativa Pronto!": { es: "¡Estimación lista!", en: "Estimate Ready!" },
  "O seu plano de sorriso": { es: "Su plan de sonrisa", en: "Your Smile Plan" },
  "Valor Total Estimado": { es: "Valor Total Estimado", en: "Estimated Total Level" },
  "Mínimo": { es: "Mínimo", en: "Minimum" },
  "Máximo": { es: "Máximo", en: "Maximum" },
  "Inclui diagnóstico e acompanhamento especializado": { es: "Incluye diagnóstico y seguimiento especializado", en: "Includes professional diagnosis and specialized monitoring" },
  "Próximos Passos:": { es: "Próximos Pasos:", en: "Next Steps:" },
  "Confirmação médica do orçamento": { es: "Confirmación médica del presupuesto", en: "Medical confirmation of the quote" },
  "Acesso a condições de financiamento": { es: "Acceso a condiciones de financiamiento", en: "Access to flexible financing options" },
  "Prioridade na agenda da clínica": { es: "Prioridad en la agenda de la clínica", en: "Priority booking in our clinic's schedule" },
  "De momento, a câmara não é suportada por este navegador ou ambiente (ex: ligação não descodificada ou restrições de iFrame seguro). Por favor, utilize um telemóvel ou carregue uma foto da sua galeria.": {
    es: "Por el momento, la cámara no es compatible con este navegador o entorno (ej: conexión no segura o restricciones de iFrame). Por favor, use su móvil o suba una foto de su galería.",
    en: "Currently, your camera is not supported by this browser or environment (e.g. non-secure connection or secure iFrame constraints). Please use a mobile phone or upload a photo from your gallery."
  },
  "Câmara física não encontrada: Não foi detetada nenhuma câmara ou webcam activa neste dispositivo. Pode selecionar facilmente uma imagem da galeria utilizando o botão 'Carregar Foto 📁'.": {
    es: "Caja de cámara física no detectada. Por favor, suba una foto desde su galería.",
    en: "Physical camera not found on this device. You can easily upload a picture from your gallery instead."
  },
  "Acesso à câmara recusado: Por favor ative as permissões de câmara no seu navegador ou carregue um ficheiro usando 'Procurar Foto'.": {
    es: "Acceso a la cámara rechazado: Por favor, active los permisos de cámara en su navegador o suba una foto.",
    en: "Camera access denied. Please activate camera permissions in your browser or upload a picture."
  },
  "A sua câmara não suporta a resolução solicitada. Por favor, envie uma foto diretamente do seu rolo de câmara.": {
    es: "Su cámara no es compatible. Por favor, suba una foto directamente de su galería.",
    en: "Your camera does not support the requested configuration. Please upload a photo from your roll."
  },
  "Por favor, preencha o seu nome e telemóvel!": { es: "¡Por favor, ingrese su nombre y móvil!", en: "Please enter your name and phone number!" },
  "Diagnóstico Clínico por Foto": { es: "Diagnóstico Clínico por Foto", en: "Clinical Diagnosis by Photo" },
  "Envie uma foto simples do seu sorriso. Os nossos médicos especialistas vão avaliar a anatomia do seu caso para lhe apresentar um orçamento real com 100% de precisão clínica.": {
    es: "Envíe una foto simple de su sonrisa. Nuestros especialistas evaluarán la anatomía de su caso para presentarle un presupuesto real con 100% de precisión clínica.",
    en: "Send a simple photo of your smile. Our medical specialists will evaluate your case's anatomy to provide a real quote with 100% clinical precision."
  },
  "Simulador de Investimento": { es: "Simulador de Inversión", en: "Investment Simulator" },
  "Simule o seu orçamento oficial com transparência. Opte pelo diagnóstico clínico inovador orientado por foto ou pelo simulador manual passo a passo.": {
    es: "Simule su presupuesto oficial con total transparencia. Elija entre el innovador diagnóstico clínico orientado por foto o el simulador manual paso a paso.",
    en: "Simulate your official budget with transparency. Choose between the innovative photo-led clinic diagnosis or the step-by-step manual estimator."
  },
  "Diagnóstico por Imagem": { es: "Diagnóstico por Imagen", en: "Imaging Diagnosis" },
  "100% Real & Gratuito": { es: "100% Real y Gratis", en: "100% Real & Free" },
  "Tire uma fotografia ao seu sorriso com o seu telemóvel ou computador. Os nossos médicos dentistas vão analisar a anatomia do seu sorriso e fornecer-lhe-ão gratuitamente uma estimativa precisa e personalizada.": {
    es: "Tome una foto de su sonrisa con su móvil o PC. Nuestros odontólogos evaluarán la anatomía de su sonrisa de forma totalmente gratuita.",
    en: "Take a photo of your smile using your mobile or computer. Our dentists will analyze its anatomy and provide you with a free precise estimate."
  },
  "Avaliação clínica real por Médicos Dentistas": { es: "Evaluación clínica real por Odontólogos", en: "Real clinical assessment by Dentists" },
  "Indicação exata de tratamentos recomendados": { es: "Indicación exacta de tratamientos sugeridos", en: "Precise indication of recommended treatments" },
  "Privacidade total dos seus dados (RGPD)": { es: "Privacidad total de sus datos (RGPD)", en: "Total data privacy & GDPR compliance" },
  "Resposta célere em menos de 24 horas úteis": { es: "Respuesta rápida en menos de 24 horas hábiles", en: "Fast response in under 24 business hours" },
  "Iniciar Diagnóstico por Foto 🦷": { es: "Iniciar Diagnóstico por Foto 🦷", en: "Start Diagnosis by Photo 🦷" },
  "Preços de Tabela 📋": { es: "Precios de Tarifa 📋", en: "Standard Price List 📋" },
  "Simulador Manual de": { es: "Simulador Manual de", en: "Manual Estimator for" },
  "Tratamentos": { es: "Tratamientos", en: "Treatments" },
  "Selecione os tratamentos e especialidades que deseja (implantes, higiene, aparelhos, estética) para consultar os custos de referência aproximados com base na nossa tabela de preços oficial.": {
    es: "Seleccione los tratamientos y especialidades que desea para consultar los costos de referencia aproximados de nuestra tarifa oficial.",
    en: "Select your desired treatments and specialties (implants, hygiene, braces, cosmetics) to check reference costs from our official standard rates."
  },
  "Consulte preços oficiais da tabela clínica": { es: "Consulte los precios oficiales de tarifa clínica", en: "Consult official prices from our standard tables" },
  "Simule múltiplas especialidades juntas": { es: "Simule múltiples especialidades juntas", en: "Estimate multiple specialties combined" },
  "Sem necessidade de partilhar imagens": { es: "Sin necesidad de compartir fotos", en: "No need to share images" },
  "Cálculo e estimativa teórica instantânea": { es: "Cálculo y estimación teórica al instante", en: "Instant theoretical estimate calculations" },
  "Simular Manualmente 📋": { es: "Calcular Manualmente 📋", en: "Estimate Manually 📋" },
  "Voltar aos métodos": { es: "Volver a los métodos", en: "Back to methods" },
  "Diagnóstico Gratuito 100% Seguro": { es: "Diagnóstico Gratis 100% Seguro", en: "Free 100% Secure Assessment" },
  "Fotografia do seu Sorriso/Dentes *": { es: "Fotografía de su Sonrisa/Dientes *", en: "Smile/Teeth Photograph *" },
  "É necessário carregar ou tirar uma foto para submeter esta consulta.": { es: "Es necesario subir o tomar una foto para enviar la solicitud.", en: "It is required to take or upload a photo to submit this request." },
  "Tire uma fotografia ou arraste o ficheiro": { es: "Tome una foto o arrastre el archivo aquí", en: "Take a photo or drag the file here" },
  "Suporta formatos JPEG, PNG, WebP do telemóvel ou PC": { es: "Formatos JPG, PNG, WebP desde móvil o PC", en: "Supports JPG, PNG, WebP formats from phone or PC" },
  "Ativar Câmara 📸": { es: "Activar Cámara 📸", en: "Activate Camera 📸" },
  "Carregar Foto 📁": { es: "Subir Foto 📁", en: "Upload Photo 📁" },
  "Procurar Foto": { es: "Buscar Foto", en: "Browse Photo" },
  "Voltar às categorias": { es: "Volver a las categorías", en: "Back to categories" },
  "Voltar ao Início": { es: "Volver al Inicio", en: "Back to Home" },
  // Dental Specialties Definitions (for Selector mapping)
  "Consultas e Diagnóstico": { es: "Consultas y Diagnóstico", en: "Consultations & Diagnosis" },
  "Consulta de Avaliação": { es: "Consulta de Evaluación", en: "Assessment Consultation" },
  "Avaliação inicial obrigatória (não reembolsável).": { es: "Evaluación inicial obligatoria (no reembolsable).", en: "Mandatory initial assessment (non-refundable)." },
  "Consulta Medicada": { es: "Consulta Medicada", en: "Medicated Consultation" },
  "Consulta para prescrição ou ajuste de medicação.": { es: "Consulta para receta o ajuste de medicación.", en: "Consultation for medical prescription or adjustments." },
  "Consulta de Observação Pós-Tratamento": { es: "Consulta de Observación Post-Tratamiento", en: "Post-Treatment Follow-up Consultation" },
  "Acompanhamento após tratamento clínico.": { es: "Seguimiento médico tras el tratamiento.", en: "Clinical monitoring following a dental treatment." },
  "Consulta de Estudo Ortodôntico": { es: "Consulta de Estudio Ortodóncico", en: "Orthodontic Study Consultation" },
  "Planeamento completo para aparelho dentário.": { es: "Planificación completa para el aparato dental.", en: "Comprehensive mapping and planning for dental braces." },
  "Raio X Periapical": { es: "Radiografía Periapical", en: "Periapical X-Ray" },
  "Radiografia localizada para diagnóstico interno.": { es: "Radiografía localizada para el diagnóstico interno.", en: "Localized X-ray for internal tooth diagnosis." },
  "Higiene e Prevenção": { es: "Higiene y Prevención", en: "Hygiene & Prevention" },
  "Destartarização + Polimento": { es: "Limpieza Dental + Pulido", en: "Scaling + Polishing" },
  "Limpeza profissional profunda e polimento dental.": { es: "Limpieza profesional profunda y pulido dental.", en: "Deep professional cleaning and teeth polishing." },
  "Profilaxia": { es: "Profilaxis", en: "Prophylaxis" },
  "Prevenção básica e limpeza superficial.": { es: "Prevención básica y limpeza superficial.", en: "Basic preventive care and superficial cleaning." },
  "Selante por Arcada": { es: "Sellador por Arcada", en: "Fissure Sealant per Arch" },
  "Proteção preventiva contra cáries.": { es: "Protección preventiva contra las caries.", en: "Preventive protective coating against cavities." },
  "Placa de Relaxamento / Bruxismo": { es: "Placa de Relajación / Bruxismo", en: "Bruxism / Relaxation Night Guard" },
  "Proteção contra o desgaste noturno (por arcada).": { es: "Protección contra el desgaste dental nocturno (por arcada).", en: "Protection against night grinding wear (per arch)." },
  "Dentisteria e Estética": { es: "Odontología y Estética", en: "Conservative & Cosmetic Dentistry" },
  "Branqueamento em Consultório": { es: "Blanqueamiento en Clínica", en: "In-Office Teeth Whitening" },
  "Resultados imediatos em sessão clínica.": { es: "Resultados inmediatos en sesión clínica.", en: "Immediate teeth whitening results in a single session." },
  "Branqueamento (Kit Casa)": { es: "Blanqueamiento (Kit Casa)", en: "Take-Home Teeth Whitening Kit" },
  "Tratamento em casa com acompanhamento clínico.": { es: "Tratamiento em casa com acompanhamento clínico.", en: "Convenient at-home treatment with clinical supervision." },
  "Branqueamento (Seringa Adicional)": { es: "Blanqueamiento (Jeringa Adicional)", en: "Whitening Gel Refill Syringe" },
  "Recarga de gel para manutenção do branqueamento casa.": { es: "Recarga de gel para el mantenimiento en casa del blanqueamiento.", en: "Gel refill syringe to maintain your at-home whitening." },
  "Restauração Simples": { es: "Reconstrucción Simple", en: "Simple Cavity Filling" },
  "Tratamento de cárie em face única.": { es: "Tratamiento de caries en una sola cara del diente.", en: "Decay treatment on a single tooth surface." },
  "Restauração Complexa": { es: "Reconstrucción Compleja", en: "Complex Cavity Filling" },
  "Tratamento de carie em faces múltiplas.": { es: "Tratamiento de caries en múltiples caras del diente.", en: "Cavity restoration covering multiple tooth surfaces." },
  "Restauração Estética": { es: "Reconstrucción Estética", en: "Cosmetic Restoration" },
  "Reconstrução de dente focada na perfeição visual.": { es: "Reconstrucción dental enfocada en la estética visual óptima.", en: "Tooth reconstruction focusing on pristine visual appearance." },
  "Restauração Dente Decíduo": { es: "Reconstrucción Diente de Leche", en: "Deciduous Tooth Filling" },
  "Restauração em dentes de leite.": { es: "Tratamiento y restauración en dientes de leche de niños.", en: "Restoration procedure on primary baby teeth." },
  "Restauração Provisória": { es: "Reconstrucción Provisional", en: "Temporary Filling" },
  "Proteção temporária do dente.": { es: "Material de protección temporaria del dente cuspídeo.", en: "Temporary protective filling material on a tooth." },
  "Cirurgia e Endodontia": { es: "Cirugía y Endodoncia", en: "Surgery & Endodontics" },
  "Extração Dente Incisivo": { es: "Extracción de Diente Incisivo", en: "Incisor Tooth Extraction" },
  "Remoção de dente frontal.": { es: "Extracción quirúrgica de diente frontal.", en: "Surgical removal of a front incisor tooth." },
  "Extração Dente Canino / Pré-Molar": { es: "Extracción de Canino / Premolar", en: "Canine / Premolar Tooth Extraction" },
  "Remoção de dentes intermédios.": { es: "Extracción de pieza dental intermedia.", en: "Removal of middle/transitional teeth." },
  "Extração Dente Molar": { es: "Extracción de Diente Molar", en: "Molar Tooth Extraction" },
  "Remoção de dentes posteriores.": { es: "Extracción de diente posterior en arcada.", en: "Removal of posterior molar teeth." },
  "Extração Siso Erupcionado": { es: "Extracción de Muela del Juicio", en: "Erupted Wisdom Tooth Extraction" },
  "Extração de dente do siso visível.": { es: "Extracción de cordal (siso) visible en boca.", en: "Standard extraction of a visible wisdom tooth." },
  "Extração Siso Incluso": { es: "Cirugía de Siso Retenido", en: "Impacted Wisdom Tooth Surgery" },
  "Extração cirúrgica de siso dentro do osso.": { es: "Remoción quirúrgica de muela de juicio dentro del hueso.", en: "Surgical extraction of bone-impacted wisdom teeth." },
  "Extração Dente Decíduo": { es: "Extracción de Diente de Leche", en: "Deciduous Tooth Extraction" },
  "Remoção de dente de leite.": { es: "Remoción de muela infantil decidua.", en: "Gentle removal of primary baby tooth." },
  "Desvitalização Incisivo / Pré-Molar": { es: "Endodoncia Incisivo / Premolar", en: "Incisor / Premolar Root Canal" },
  "Tratamento de canal em dentes frontais/médios.": { es: "Tratamiento de conductor de canal en dientes frontales.", en: "Root canal therapy for front and middle teeth." },
  "Desvitalização Molar": { es: "Endodoncia Molar", en: "Molar Root Canal Therapy" },
  "Tratamento de canal em dentes posteriores.": { es: "Tratamiento de conductos en molares posteriores.", en: "Comprehensive root canal therapy for back molars." },
  "Pulpectomia / Pulpotomia": { es: "Pulpectomía / Pulpotomía", en: "Pulpectomy / Pulpotomy" },
  "Tratamentos parciais ou totais da polpa.": { es: "Procedimientos clínicos en el nervio (pulpa dental).", en: "Partial or complete removal of dental root pulp." },
  "Curetagem (por quadrante)": { es: "Curetaje periodontal (por cuadrante)", en: "Gingival Scaling & Root Planing (per quadrant)" },
  "Tratamento para limpeza profunda das gengivas.": { es: "Tratamiento de limpieza profunda para encías enfermas.", en: "Periodontal pocket deep cleaning and planing." },
  "Cirurgia Remodelação Rebordo": { es: "Remodelación Ósea de Reborde", en: "Alveolar Ridge Contouring Surgery" },
  "Preparação do osso alveolar para prótese.": { es: "Adecuación quirúrgica del hueso maxilar para prótesis.", en: "Surgical contouring of the alveolar ridge bone for dentures." },
  "Drenagem Abcesso": { es: "Drenaje de Abceso Dental", en: "Emergency Dental Abscess Drainage" },
  "Alívio de infeção aguda.": { es: "Intervención de emergencia para el alivio de infección.", en: "Urgent drainage for immediate relief of tooth infections." },
  "Implantologia": { es: "Implantología", en: "Implant Dentistry" },
  "Implante Unitário (Apenas Cirurgia)": { es: "Implante Unitario (Solo Cirugía)", en: "Single Dental Implant (Surgery Only)" },
  "Colocação cirúrgica da raiz de titânio.": { es: "Colocación quirúrgica del perno de titanio bajo la encía.", en: "Surgical placement of titanium root fixture." },
  "Implante + Coroa Metalo-cerâmica": { es: "Implante + Corona Metalocerámica", en: "Dental Implant with Metalloceramic Crown" },
  "Substituição completa de um dente.": { es: "Tratamiento integral para el reemplazo completo de un diente.", en: "Complete high-precision replacement of a single missing tooth." },
  "Reabilitação 2 Implantes": { es: "Rehabilitación de 2 Implantes", en: "Implant Rehabilitation with 2 Fixtures" },
  "Substituição múltipla de dentes.": { es: "Fórmula de reemplazo para puentes sobre dos implantes.", en: "Aesthetic multiple replacement setup with implants." },
  "Reabilitação 3 Implantes": { es: "Rehabilitación de 3 Implantes", en: "Implant Rehabilitation with 3 Fixtures" },
  "Substituição de múltiplos dentes.": { es: "Reemplazo de brecha múltiple de dientes.", en: "Multiple missing teeth replacement using implants." },
  "Reabilitação 4 Implantes": { es: "Rehabilitación de 4 Implantes", en: "Implant Rehabilitation with 4 Fixtures" },
  "Base para ponte fixa extensa.": { es: "Soporte para puente fijo atornillado extenso.", en: "Anchor base layout for complex fixed dental bridges." },
  "Protocolo Superior (Arcada Completa)": { es: "Protocolo Superior (Arcada Completa)", en: "Upper Full Arch Implant Protocol" },
  "Toda a arcada fixa sobre implantes.": { es: "Toda la dentadura permanente fija sobre 4 a 6 implantes.", en: "Priscilla full fixed framework arch over dental implants." },
  "Coroa sobre Implante (Cerâmica/Zircónia)": { es: "Corona sobre Implante (Circonio/Cerámica)", en: "Implant Crown (Ceramic/Zirconia)" },
  "Parte visível do dente sobre o implante (exceto cirurgia).": { es: "Corona definitiva de alta estética atornillada al implante.", en: "Extreme aesthetics prosthetic implant crown (surgery excluded)." },
  "Enxerto Ósseo": { es: "Injerto Óseo", en: "Dental Bone Grafting" },
  "Recuperação de volume ósseo perdido.": { es: "Colocación de biomaterial para restaurar hueso perdido.", en: "Surgical reconstruction of reabsorbed jawbone volume." },
  "Limpeza Prótese Fixa Implante": { es: "Limpieza Prótesis Fija sobre Implantes", en: "Fixed Implant Bridge Professional Cleaning" },
  "Manutenção periódica de prótese fixa.": { es: "Mantenimiento periódico preventivo de arcada completa.", en: "Professional periodic maintenance of fixed hybrid dentures." },
  "Prótese Provisória (Removível / Fixa)": { es: "Prótesis Provisional (Removible / Fija)", en: "Provisional Dental Denture (Removable or Fixed)" },
  "Dentes temporários durante a cicatrização.": { es: "Dientes temporales colocados durante la osteointegración.", en: "Temporary teeth placed during the healing process." },
  "Recolocação / Aperto Coroa": { es: "Recolocación u Aperto Coroa", en: "Crown Recementation & Tightening" },
  "Pequenos ajustes em coroas sobre implantes.": { es: "Pequeños ajustes clínicos en prótesis sobre implantes.", en: "Minor clinical adjustments to prosthetic crowns on implants." },
  "Aparelho Ortodôntico Fixo": { es: "Aparato Ortodóncico Fijo", en: "Fixed Orthodontic Appliance (Braces)" },
  "Sistema metálico tradicional (por arcada).": { es: "Brackets metálicos tradicionales por arcada.", en: "Traditional metallic bracket system (per arch)." },
  "Invisalign (Alinhadores)": { es: "Invisalign (Alineadores Invisibles)", en: "Invisalign Clear aligners" },
  "Tratamento invisível removível. Sob consulta.": { es: "Tratamiento estético de alineadores invisibles. Bajo consulta.", en: "Removable aesthetic aligner technology. On consultation." },
  "Aparelho Disjuntor / Mantedor Espaço": { es: "Aparato Disyuntor / Mantenedor de Espacio", en: "Palatal Expander or Space Maintainer" },
  "Aparelhados especiais para expansão ou contenção.": { es: "Aparatos especiales para correcciones óseas infantiles.", en: "Special orthotic appliances for child expansion or space saving." },
  "Aparelho Contenção (Fixo / Removível)": { es: "Aparato de Contención (Fijo / Removible)", en: "Post-Braces Retention Wire / Aligner" },
  "Manutenção do sorriso após tratamento.": { es: "Fase esencial para estabilizar los dientes tras ortodoncia.", en: "Retention appliances to maintain smile layout post-treatment." },
  "Consulta Manutenção (Normal / Invisalign)": { es: "Consulta de Mantenimiento (Aparato / Invisalign)", en: "Periodic Adjustment Consultation (Braces/Invisalign)" },
  "Ajuste periódico obrigatório.": { es: "Visita periódica para ajustes clínicos de fuerza de ortodoncia.", en: "Mandatory clinical adjustment visits." },
  "Retirar Aparelho (Fora da Clínica)": { es: "Retirar Aparato de otra clínica", en: "Braces Removal (from outside provider)" },
  "Remoção e polimento final.": { es: "Despegado de brackets con pulido profiláctico de esmalte.", en: "Bracket debonding, cleanup, and enamel polishing." },
  "Próteses e Reabilitação": { es: "Prótesis y Rehabilitación", en: "Prosthodontics & Rehabilitation" },
  "Prótese Acrílica (Até 14 dentes)": { es: "Prótesis Acrílica (Hasta 14 dentes)", en: "Removable Acrylic Denture (Up to 14 teeth)" },
  "Soluções removíveis tradicional.": { es: "Dentadura postiza removible clásica de resina acrílica.", en: "Classic removable acrylic denture solution." },
  "Prótese Esquelérica": { es: "Prótesis Esquelética Metálica", en: "Removable Chrome Cobalt Skeletal Denture" },
  "Prótese metálica fina e resistente.": { es: "Estructura metálica de cromo cobalto, fina y de alta fuerza.", en: "Slim, highly durable metallic skeletal prosthetic structure." },
  "Prótese Flexível": { es: "Prótesis Flexible de Nylon", en: "Removable Flexible Deflex / Valplast Denture" },
  "Prótese confortável sem ganchos visíveis.": { es: "Nylon semirrígido translúcido muy estético y cómodo sin ganchos de metal.", en: "Nylon flex denture material with no visible metallic clasps." },
  "Coroa Metalo-cerâmica sobre Dente": { es: "Corona Metalocerámica sobre Diente", en: "Metalloceramic Dental Crown on Natural Tooth" },
  "Substituição definitiva de dente natural.": { es: "Corona de material metal-porcelana sobre muñón natural.", en: "Definitive crown restoration over a natural tooth root." },
  "Coroa Cerâmica / Zircónia / Porcelana": { es: "Corona de Circonio / Cerámica Pura", en: "All-Ceramic / Pure Zirconia Dental Crown" },
  "Estética superior em reabilitação oral.": { es: "Corona estética sin metales, ideal para dientes del sector anterior.", en: "Premium metal-free ceramic crown for front smiles." },
  "Coroa Provisória / Cimentação": { es: "Corona Provisional / Cementación", en: "Provisional Crown & Recementation" },
  "Ajustes e soluções temporárias.": { es: "Coronas de resina y cementado provisional de urgencia.", en: "Temporary acrylic crowns and emergency crown cementation." },
  "Conserto / Rembase de Prótese": { es: "Reparación / Rebase de Prótesis", en: "Denture Repair & Relining" },
  "Reparação de fraturas ou reajuste de base.": { es: "Soldadura de grietas acrílicas o base adaptada tras reabsorción.", en: "Denture crack welding or acrylic base customization." },
  "Acrescento de Dente (Acrílica / Flexível)": { es: "Añadir Diente a Prótesis Existente", en: "Add Tooth to Removable Denture" },
  "Adição de dente em prótese existente (+10€/dente).": { es: "Añadidos de muelas u ganchos en prótesis acrílicas existentes.", en: "Adding teeth to an existing denture (+10€/additional tooth)." },
  "Ajuste Prótese": { es: "Ajuste de Prótesis", en: "Denture Occlusal Adjustment" },
  "Pequenos ajustes de conforto.": { es: "Alivio de roces incómodos en encías por prótesis.", en: "Denture relief to remove uncomfortable friction sores." },
  // Manual Pocket Guides & Calculator Details
  "Implantes Dentários 🦷": { es: "Implantes Dentales 🦷", en: "Dental Implants 🦷" },
  "Preenchimento e reabilitação de dentes em falta": { es: "Reemplazo terapéutico de muelas ausentes", en: "Therapeutic replacement of missing teeth" },
  "Arcada Completa 👄": { es: "Arcada Completa 👄", en: "Full Arch 👄" },
  "Reabilitação total fixa de uma ou ambas as arcadas sobre implantes": { es: "Rehabilitación total fija sobre implantes de toda la sonrisa", en: "Priscilla fixed arch over multiple dental implants" },
  "Facetas Estéticas ✨": { es: "Carillas Estéticas ✨", en: "Cosmetic Veneers ✨" },
  "Melhoria da cor, formato e harmonia do sorriso": { es: "Corrección quirúrgica de manchas o formas asimétricas", en: "Smile correction for pristine color and shape" },
  "Alinhadores / Aparelho 🔍": { es: "Alineadores / Ortodoncia 🔍", en: "Clear Aligners or Braces 🔍" },
  "Correção ortodôntica do posicionamento dos dentes": { es: "Enderezado estético por Invisalign o brackets", en: "Orthodontic teeth straightening by Invisalign or braces" },
  "Outros / Higiene Oral 🩹": { es: "Otros / Higiene Dental 🩹", en: "General Dentistry / Cleaning 🩹" },
  "Destartarização, dores agudas ou consulta geral de diagnóstico": { es: "Limpieza profunda, caries dolorosas u observación general", en: "Preventive scale, pain relief, or general dental exam" },
  // Extra Calculator Consent modal
  "Fale Connosco": { es: "Hable con nosotros", en: "Speak with us" },
  "Simulações em Curso": { es: "Simulaciones en Curso", en: "Calculations in Progress" },
  "Diagnóstico de Sorriso - Câmara Ativa": { es: "Diagnóstico de Sonrisa - Cámara Activa", en: "Smile Assessment - Camera Active" },
  "Foco Boca": { es: "Foco Boca", en: "Mouth Focus" },
  "Vista Padrão": { es: "Vista Estándar", en: "Standard View" },
  "Fechar": { es: "Cerrar", en: "Close" },
  "Garantia de Confidencialidade nos Olivais. A imagem recolhida é processada localmente e de forma segura, em total conformidade com o RGPD, destinando-se apenas ao diagnóstico clínico dos especialistas da clínica.": {
    es: "Garantía de confidencialidad médica en Lisboa. Tratamiento seguro de datos, en cumplimiento total con el RGPD.",
    en: "Confidentiality guarantee in Lisbon. Secure HIPAA-ready and GDPR-ready transmission strictly for expert dentist diagnostic purposes."
  },
  "A Clínica Santa Maria dos Olivais situa-se em Lisboa, Portugal. Fornecemos orçamentos de acompanhamento permanente com suporte presencial em clínica de proximidade, sem recorrer a turismo dentário na Europa de Leste.": {
    es: "Nuestra clínica se ubica en Lisboa, Portugal. Brindamos servicios integrados combinando la calidez y el seguimiento continuo.",
    en: "Our clinic is located in Lisbon, Portugal. We provide integrated treatments combining local post-op checks, never using overseas medical tourism."
  },
  "A Clínica Santa Maria dos Olivais situa-se em Lisboa, Estrada de Moscavide 32C.": {
    es: "La clínica está en Lisboa, Portugal, Estrada de Moscavide 32C.",
    en: "The clinic is located in Lisbon, Portugal, Estrada de Moscavide 32C."
  },
  "A Clínica Santa Maria dos Olivais situa-se em Lisboa, Estrada de Moscavide N 32C. Para sua segurança e acompanhamento personalizado pós-cirúrgico permanente, os nossos planos de reabilitação e implantes dentários são realizados em Portugal por especialistas da clínica reconhecidos pela Ordem dos Médicos Dentistas.": {
    es: "La clínica está en Lisboa, Portugal. Nuestros planos de implantes dentarios y rehabilitación dental se realizan íntegramente en Portugal con seguimiento presencial de nuestros odontólogos colegiados.",
    en: "The clinic is located in Lisbon, Portugal. Our dental implant and rehabilitation treatments are carried out entirely in Portugal with permanent hands-on clinical follow-ups."
  },
  // Service list items (servicesData.ts mapping translation fallback)
  "Melhoria estética do sorriso com lâminas de alta precisão, garantindo um resultado natural e duradouro.": {
    es: "Mejora estética de la sonrisa con láminas de alta precisión, garantizando un resultado natural y duradero.",
    en: "Smile aesthetic upgrade using high-precision veneers, guaranteeing a comfortable and permanent smile change."
  },
  "Soluções avançadas para alinhamento dentário, utilizando aparelhos fixos ou sistemas invisíveis (Invisalign) para um sorriso alinhado.": {
    es: "Soluciones de ortodoncia avanzada para el correcto alineamiento de sus dientes mediante Invisalign o brackets convencionales.",
    en: "Advanced orthodontics solutions for teeth alignment by using state-of-the-art clear aligners (Invisalign) or braces."
  },
  "Soluções personalizadas em próteses fixas e removíveis, utilizando materiais de alta qualidade para devolver a função e a estética do seu sorriso.": {
    es: "Soluciones de prótesis dental fijas sobre muñones y opciones estéticas removibles de nylon de excelente ajuste.",
    en: "Premium fixed and removable dental appliances and prostheses made to restore chewing function and aesthetics."
  },
  "Manutenção e Reparação": { es: "Mantenimiento y Ajustes", en: "Appliance Repair & Relining" },
  "Preços de Odontopediatria": { es: "Precios de Odontopediatría", en: "Pediatric Dentistry Prices" },
  "Branqueamento Dentário": { es: "Blanqueamiento Dental", en: "Teeth Whitening" },
  "Prótese Fixa e Prótese Removível": { es: "Prótesis Fijas y Removibles", en: "Fixed & Removable Dentures" },
  "Consultas e Diagnóstico Geral": { es: "Consultas y Odontología General", en: "Consultations & General Dentistry" },
  "A Clínica Santa Maria dos Olivais é um espaço dedicado à excelência...": {
    es: "La Clínica Santa Maria dos Olivais es un espacio de salud bucodental de referencia...",
    en: "The Clínica Santa Maria dos Olivais is a state-of-the-art dental care reference..."
  },
  "Registo ERS": { es: "Registro ERS", en: "ERS Registry" },
  "Como Chegar 🗺️": { es: "Cómo llegar 🗺️", en: "How to get here 🗺️" },
  "Para sua segurança e acompanhamento personalizado pós-cirúrgico permanente, os nossos planos de reabilitação e implantes dentários são realizados em Portugal por especialistas da clínica reconhecidos pela Ordem dos Médicos Dentistas.": {
    es: "Para su seguridad y seguimiento postoperatorio continuo, nuestro equipo de cirujanos realiza todos los implantes en Portugal.",
    en: "For your safety and hands-on follow-up, our experienced dental surgeons perform all implant surgeries locally in Portugal."
  },
  "A Clínica Santa Maria dos Olivais situa-se sob responsabilidade médica reconhecida. Os preços apresentados no simulador de investimento destinam-se a Lisboa, Portugal.": {
    es: "Los precios de este simulador y estimador express corresponden a nuestra clínica física en Lisboa, Portugal.",
    en: "All price calculations in this simulator refer to our brick-and-mortar dental clinic in Lisbon, Portugal."
  },
  // Quote Calculator additional static texts
  "Tratamentos de ": { es: "Tratamientos de ", en: "Treatments for " },
  "Não foi possível iniciar a câmara": { es: "No fue posible encender la cámara", en: "Could not activate the camera device" },
  "Antes e Depois": { es: "Antes y Después", en: "Before & After" },
  "Apenas mais um passo...": { es: "Solo un paso más...", en: "Almost there..." },
  "Fale com o nosso Assistente no Manychat": { es: "Hable con nuestro Asistente", en: "Chat with our Smart Assistant" },
  "Conversar Agora": { es: "Conversar Ahora", en: "Chat Now" },
  "Fale com um Especialista no Manychat": { es: "Hable con un Especialista", en: "Speak with an Expert" },
  "Destaques:": { es: "Destacado:", en: "Highlights:" },
  "Transparência de Preços": { es: "Transparencia de Tarifas", en: "Fee Transparency" },
  "Aparelhos e Tratamentos": { es: "Brackets y Tratamientos", en: "Braces & Orthodontic Treatments" },
  "Tabela de Preços - Ortodontia": { es: "Tabla de Precios - Ortodoncia", en: "Orthodontics Price List" },
  "Ortodontia Clínica": { es: "Ortodoncia Clínica", en: "Clinical Orthodontics" },
  "Contenções": { es: "Contenciones", en: "Retentions" },
  "Pós-Tratamento": { es: "Post-Tratamiento", en: "Post-Treatment Care" },
  "Tabela de Preços - Facetas": { es: "Tabla de Precios - Carillas", en: "Dental Veneers Price List" },
  "Facetas Dentárias": { es: "Carillas Dentales", en: "Dental Veneers" },
  "Serviços Clínicos Gerais": { es: "Servicios Clínicos Generales", en: "General Clinical Services" },
  "Higiene e Diagnóstico": { es: "Higiene y Diagnóstico", en: "Hygiene & Diagnosis" },
  "Tabela de Preços - Endodontia": { es: "Tabla de Precios - Endodoncia", en: "Endodontics Price List" },
  "Endodontia": { es: "Endodoncia", en: "Endodontics" },
  "Branqueamento": { es: "Blanqueamiento", en: "Teeth Whitening" },
  "Saúde Infantil": { es: "Salud Infantil", en: "Child Dental Health" },
  "Saúde Oral Escolar": { es: "Salud Bucal Escolar", en: "School Oral Health" },
  "Nota: Os tratamentos são pagos conforme realizados. No caso de implantes, o pagamento é efetuado no dia da cirurgia.": {
    es: "Nota: Los tratamientos se abonan a medida que se realizan. Para implantes, el pago se efectúa el día de la cirugía.",
    en: "Note: Dental treatments are paid as they are performed. In the case of dental implants, payment is made on surgery day."
  },
  "Nota: Os tratamentos são pagos conforme realizados.": {
    es: "Nota: Los tratamientos se pagan a medida que se realizan.",
    en: "Note: All treatments are paid as the procedures are carried out."
  },
  "Nota: Os valores das próteses removíveis variam conforme o número de dentes e o material utilizado.": {
    es: "Nota: Los costes de las prótesis removibles varían según el número de dientes y los materiales.",
    en: "Note: The cost of removable dentures varies depending on the number of teeth and materials used."
  },
  "1 dente": { es: "1 diente", en: "1 tooth" },
  "2 dentes": { es: "2 dientes", en: "2 teeth" },
  "5 dentes": { es: "5 dientes", en: "5 teeth" },
  "10 dentes": { es: "10 dientes", en: "10 teeth" },
  "14 dentes (Total)": { es: "14 dientes (Total)", en: "14 teeth (Total)" },
  "14 dentes": { es: "14 dientes", en: "14 teeth" },
  "Coroa Provisória": { es: "Corona Provisional", en: "Provisional Dental Crown" },
  "Coroa Metalo-cerâmica": { es: "Corona Metalocerámica", en: "Metalloceramic Dental Crown" },
  "Coroa Cerâmica Pura / Zircónia": { es: "Corona de Cerámica Pura o Circonio", en: "Pure Ceramic / Zirconia Crown" },
  "Protocolo Completo Final": { es: "Protocolo Fijo Completo Final", en: "Final Fixed Full Arch Hybrid Bridge" },
  "Protocolo Superior (4 a 6 Implantes)": { es: "Protocolo Superior (4 a 6 Implantes)", en: "Upper Arch Protocol (4 to 6 Implants)" },
  "Prótese Provisória Removível": { es: "Prótesis Provisional Removible", en: "Provisional Removable Denture" },
  "Prótese Provisória Fixa": { es: "Prótesis Provisional Fija", en: "Provisional Fixed Denture" },
  "Ajuste de Prótese": { es: "Ajuste de Prótesis u Oclusión", en: "Accurate Dental Denture Adjustment" },
  "Conserto de Prótese Acrílica": { es: "Reparación de Prótesis de Acrílico", en: "Acrylic Denture Repair Welding" },
  "Conserto Esquelética / Flexível": { es: "Reparación de Prótesis Esquelética o Flexible", en: "Flexible or Skeletal Prosthetic Repair" },
  "Acrescento de Dente (Acrílica)": { es: "Añadir Diente a Prótesis Acrílica", en: "Add Extra Tooth (Acrylic Denture)" },
  "Acrescento de Dente (Flexível)": { es: "Añadir Diente a Prótesis Flexible", en: "Add Extra Tooth (Flexible Denture)" },
  "Rembase de Prótese Acrílica": { es: "Rebase de Prótesis Acrílica", en: "Relining of Acrylic Removable Denture" },
  "Rembase de Prótese Flexível": { es: "Rebase de Prótesis Flexible", en: "Relining of Flexible Removable Denture" },
  "Extração de Dente Decíduo": { es: "Extracción de Diente Deciduo (Leche)", en: "Gentle Extraction of Primary Baby Tooth" },
  "Restauração de Dente Decíduo": { es: "Empaste en Diente Deciduo (Leche)", en: "Deciduous Tooth Composite Filling" },
  "Selante": { es: "Sellador de Fisuras", en: "Teeth Preventive Sealant Coating" },
  "Aparelho Mantenedor de Espaço": { es: "Mantenedor de Espacio Infantil", en: "Child Space Maintainer Appliance" },
  "Desvitalização de Molar": { es: "Endodoncia en Molar Posterior", en: "Molar Tooth Root Canal Treatment" },
  "Desvitalização de Incisivo / Canino / Pré-Molar": { es: "Endodoncia en Incisivo o Premolar", en: "Incisor / Canine / Premolar Root Canal" },
  "Pulpectomia + Restauração": { es: "Pulpectomía Infantil + Empaste", en: "Child Pulpectomy + Composite Filling" },
  "Pulpotomia + Restauração": { es: "Pulpotomía Infantil + Empaste", en: "Child Pulpotomy + Composite Filling" },
  "Branqueamento (Kit para Casa)": { es: "Blanqueamiento (Kit para Casa)", en: "At-Home Teeth Bleaching Kit" },
  "Seringa para Kit de Casa": { es: "Seringa de Blanqueamiento para Casa", en: "Bleaching Gel Refill Syringe for Home Kit" },
  "1 Implante": { es: "1 Implante dental de titanio", en: "1 Titanium dental implant" },
  "2 Implantes": { es: "2 Implantes dentales de titanio", en: "2 Titanium dental implants" },
  "3 Implantes": { es: "3 Implantes dentales de titanio", en: "3 Titanium dental implants" },
  "4 Implantes": { es: "4 Implantes dentales de titanio", en: "4 Titanium dental implants" },
  "Protocolo Fixo": { es: "Protocolo Fijo Atornillado", en: "Fixed Protocol Hybrid Smile Makeover" },
  "Provisória Removível": { es: "Corona Provisional Removible", en: "Removable Provisional Setup" },
  "Provisória Fixa": { es: "Corona Provisional Fija", en: "Fixed Provisional Crown" },
  "Consulta de avaliação": { es: "Consulta de evaluación general", en: "General diagnostic assessment exam" },
  "Aparelho Disjuntor": { es: "Aparato Disyuntor Palatino", en: "Palatal Expander or Space Maintainer" },
  "Mantenedor de Espaço": { es: "Mantenedor de Espacio Coronario", en: "Prophylactic Space Maintainer" },
  "Consulta de Manutenção": { es: "Consulta de Mantenimiento periódico", en: "Monthly braces adjustment consultation" },
  "Invisalign": { es: "Alineadores Invisibles Invisalign", en: "Invisalign State-of-the-Art Aligners" },
  "Manutenção Invisalign": { es: "Mantenimiento del plan Invisalign", en: "Clinical control check of Invisalign aligners" },
  "Retirar Aparelho": { es: "Retirada de brackets de otra clínica", en: "Professional orthodontic braces removal" },
  "Contenção Fixa": { es: "Contención Ortodóncica Fija", en: "Fixed metal dental retainer wire" },
  "Contenção Removível": { es: "Contención Ortodóncica Removible", en: "Removable clear dental retainer tray" },
  "Facetas – 1 Arcada (10 dentes)": { es: "Carillas – 1 Arcada Completa (10 carillas)", en: "Veneers – Full 1 Arch Makeover (10 teeth)" },
  "Facetas – 2 Arcadas (20 dentes)": { es: "Carillas – 2 Arcadas Completas (20 carillas)", en: "Veneers – Full Smile Makeover (20 teeth)" },
  "Facetas – 4 Dentes Anteriores": { es: "Carillas – 4 Dientes Frontales", en: "Veneers – 4 Front Aesthetic Teeth" },
  "Observação Pós-Tratamento": { es: "Observación Post-Tratamiento o control", en: "Post-op follow-up observation" },
  // Policy pages headers
  "Informação em conformidade com a Lei n.º 41/2004 e o RGPD.": {
    es: "Información clínica en cumplimiento estricto del RGPD europeo.",
    en: "Clinical information in full compliance with European GDPR laws."
  },
  "O que são Cookies?": { es: "¿Qué son las Cookies?", en: "What are Cookies?" },
  "Os cookies são pequenos ficheiros de texto que o nosso servidor envia para o seu navegador (browser) durante a sua visita. Estes ficheiros permitem-nos reconhecer o utilizador em visitas futuras, personalizar a sua experiência e garantir a segurança técnica do website.": {
    es: "Las cookies son pequeños archivos de texto que nuestro sitio envía a su navegador durante su visita para personalizar la experiencia.",
    en: "Cookies are small text files sent to your browser to customize your navigate flow and secure Web infrastructure."
  },
  "Categorias de Cookies Utilizadas": { es: "Categorías de Cookies Utilizadas", en: "Cookie Categories Used" },
  "Cookies de Sessão e Técnicos": { es: "Cookies de Sesión y Técnicos", en: "Technical & Session Cookies" },
  "Essenciais para o carregamento correto do site e navegação segura. Não recolhem dados pessoais para fins de marketing.": {
    es: "Esenciales para el correcto funcionamiento del sitio web.",
    en: "Strictly necessary for standard and secure website loading."
  },
  "Cookies de Desempenho (Analytics)": { es: "Cookies de Rendimiento (Analytics)", en: "Performance Cookies (Analytics)" },
  "Recolhem informação estatística anónima sobre como os utilizadores navegam, permitindo-nos melhorar a velocidade e conteúdos do site.": {
    es: "Recopilan datos de uso estadístico completamente anónimos.",
    en: "Collect completely anonymous statistical browsing data."
  },
  "Cookies de Publicidade e Redes Sociais": { es: "Cookies de Publicidad y Redes Sociales", en: "Social Networks & Advertising Cookies" },
  "Ferramentas de parceiros tecnológicos que ajudam a medir a eficácia de anúncios e a apresentar propostas relevantes nas redes sociais, de acordo com os interesses demonstrados.": {
    es: "Nos permiten optimizar campañas de marketing en redes sociales.",
    en: "Help measure campaign conversions on social networks."
  },
  "Controlo e Gestão de Cookies": { es: "Control y Gestión de Cookies", en: "Cookie Management & Controls" },
  "O utilizador pode, a qualquer momento, bloquear ou eliminar cookies através das configurações de privacidade do seu navegador. Alertamos que a desativação de certos cookies poderá impossibilitar a utilização de algumas funcionalidades interativas do nosso website.": {
    es: "Puede cambiar o bloquear cookies en cualquier momento en el navegador.",
    en: "You can modify or block cookies at any time inside browser privacy settings."
  },
  "Para esclarecimentos adicionais sobre a nossa gestão de dados, contacte o nosso encarregado de proteção de dados através de:": {
    es: "Para cualquier duda de RGPD, contacte con nuestro delegado de datos:",
    en: "For any GDPR details, contact our data protection officer:"
  },
  "Proteção de dados em conformidade com o RGPD (UE 2016/679) e Lei n.º 58/2019.": {
    es: "Protección de datos conforme al RGPD europeo.",
    en: "Personal data protection in strict compliance with GDPR laws."
  },
  "Entidade Responsável": { es: "Entidad Responsable", en: "Controller Entity" },
  "A Clínica Santa Maria dos Olivais, com sede em": {
    es: "La Clínica Santa Maria dos Olivais, con sede física en",
    en: "The Clínica Santa Maria dos Olivais, with headquarters at"
  },
  "é a responsável pelo tratamento dos seus dados pessoais. Assumimos o compromisso ético e legal de proteger a sua privacidade e os seus dados de saúde.": {
    es: "es responsable de tratar sus datos personales con la máxima confidencialidad médica.",
    en: "is responsible for processing your personal data under strict doctor-patient privileges."
  },
  "Dados de Categoria Especial (Saúde)": { es: "Datos de Categoría Especial (Salud)", en: "Special Category Data (Health Records)" },
  "Ao abrigo do Artigo 9.º, n.º 2, alínea h) do RGPD, a Clínica trata dados relativos à saúde para fins de diagnóstico médico e prestação de cuidados de saúde. Estes dados são tratados exclusivamente por profissionais sujeitos a segredo profissional.": {
    es: "De acuerdo al RGPD artículo 9, tratamos información de salud estrictamente con fines de diagnóstico y cuidados médicos.",
    en: "In compliance with GDPR article 9, health records are processed exclusively for professional diagnostic care."
  },
  "Finalidades do Tratamento": { es: "Finalidades de Tratamiento", en: "Data Processing Purposes" },
  "Gestão Clínica:": { es: "Gestión Médica:", en: "Clinic Management:" },
  "Agendamento, diagnóstico e histórico clínico.": { es: "Citas, diagnósticos y fichas clínicas.", en: "Bookings, diagnosis, and patient charts." },
  "Comunicações:": { es: "Comunicaciones:", en: "Communications:" },
  "Contacto para confirmação de consultas e informações administrativas.": {
    es: "Contacto para confirmación telefónica de reservas.",
    en: "Calling for appointment reminders and updates."
  },
  "Obrigações Legais:": { es: "Obligaciones Legales:", en: "Legal Requirements:" },
  "Faturação e reporte a autoridades de saúde (ERS e outras).": {
    es: "Facturación legal y reportes obligatorios a la ERS.",
    en: "Fiscal billing and required healthcare report authorities."
  },
  "Direitos dos Titulares": { es: "Derechos del Paciente", en: "Patient Rights" },
  "Como utilizador e paciente, possui os direitos de:": {
    es: "Como paciente y usuario, usted dispone de los siguientes derechos:",
    en: "As a patient and user, you have full rights to:"
  },
  "Acesso e Retificação": { es: "Acceso y Rectificación", en: "Access & Rectification" },
  "Pode solicitar os dados que temos sobre si e corrigir qualquer inexatidão.": {
    es: "Puede ver su ficha de paciente y corregir errores.",
    en: "Ask to see your personal records and amend fields."
  },
  "Esquecimento": { es: "Suprimir (Olvido)", en: "Erasure (To Be Forgotten)" },
  "Solicitar a eliminação dos dados (exceto os que somos legalmente obrigados a manter em arquivo clínico).": {
    es: "Pedir la eliminación de datos, salvo los expedientes que la ley sanitaria obliga a conservar.",
    en: "Request data deletion, except files that dental health laws require our archive to maintain."
  },
  "Portabilidade": { es: "Portabilidad", en: "Data Portability" },
  "Receber os seus dados em formato estruturado para transmissão a outro médico.": {
    es: "Obtener su expediente estructurado para enviarlo a otro colega médico.",
    en: "Obtain your diagnostic records structured to send to another clinician."
  },
  "Reclamação": { es: "Reclamación", en: "Lodge a Complaint" },
  "Direito de contactar a CNPD (Comissão Nacional de Proteção de Dados).": {
    es: "Direcho a reclamar ante la CNPD.",
    en: "Right to contact the CNPD protective authority."
  },
  "Para exercer os seus direitos, contacte-nos:": {
    es: "Para ejecutar o ejercer sus derechos escríbanos:",
    en: "To exercise any rights, write to us at:"
  },
  "Condições de utilização e transparência legal.": {
    es: "Condiciones reglamentarias de uso y transparencia legal.",
    en: "Terms of use, transparency rules, and arbitration details."
  },
  "Aviso de Responsabilidade Médica": { es: "Aviso de Responsabilidad Médica", en: "Medical Disclaimer" },
  "O conteúdo deste website é meramente informativo. Nenhuma informação aqui presente substitui o aconselhamento, diagnóstico ou plano de tratamento realizado presencialmente por um médico dentista qualificado.": {
    es: "El contenido de esta web es informativo. No sustituye la consulta física presencial de un odontólogo colegiado.",
    en: "Website contents are strictly informative. Nothing replaces an in-person dental consultation."
  },
  "Propriedade Intelectual": { es: "Propiedad Intelectual", en: "Intellectual Property" },
  "Todos os conteúdos, imagens e vídeos da campanha \"Excelência e Proximidade\" são propriedade intelectual da Clínica Santa Maria dos Olivais. É proibida a sua cópia ou utilização sem consentimento prévio e por escrito.": {
    es: "Todo el material, fotos y videos pertenecen a la clínica. Prohibida su copia.",
    en: "All materials, text and media belong to the clinic. Copying is prohibited."
  },
  "Resolução Alternativa de Litígios (RAL)": { es: "Resolución de Conflictos de Consumo (RAL)", en: "Alternative Dispute Resolution (RAL)" },
  "Em cumprimento da Lei n.º 144/2015, informamos que em caso de litígio, o consumidor poderá recorrer ao:": {
    es: "En caso de litigio, el consumidor puede dirigirse a la entidad de arbitraje:",
    en: "In the event of a dispute, users can appeal to arbitration body:"
  },
  "Centro de Arbitragem de Conflitos de Consumo de Lisboa (CACCL)": {
    es: "Centro de Arbitraje de Conflictos de Consumo de Lisboa (CACCL)",
    en: "Lisbon Consumer Dispute Arbitration Center (CACCL)"
  },
  "Livro de Reclamações Eletrónico": { es: "Libro de Reclamaciones Electrónico", en: "Electronic Complaints Book" },
  "Poderá aceder ao Livro de Reclamações Eletrónico para apresentar a sua reclamação através da plataforma oficial em:": {
    es: "Puede acceder a presentar una queja formal en la web estatal oficial de reclamaciones:",
    en: "You can submit an official state complaint logging into the portal:"
  },
  "Lei e Foro Aplicáveis": { es: "Legislación y Fuero", en: "Applicable Law & Jurisdiction" },
  "Os presentes termos regem-se pela Lei Portuguesa. Para qualquer litígio emergente, as partes elegem o Tribunal da Comarca de Lisboa como foro exclusivo.": {
    es: "Estos términos se rigen ante la ley portuguesa y los tribunales de Lisboa.",
    en: "These terms are ruled under Portuguese law and the courts of Lisbon."
  },
  "Data da última revisão: Junho 2024": { es: "Última actualización: Junio 2024", en: "Last review date: June 2024" },
  // --- ADDITIONAL COMPREHENSIVE DICTIONARY MAPPINGS FOR 100% TRANSLATION CAPACITY ---
  "Campanha Exclusiva": { es: "Campaña Exclusiva", en: "Exclusive Campaign" },
  "Clínica Santa Maria dos Olivais: Excelência e Proximidade": { es: "Clínica Santa Maria dos Olivais: Excelencia y Cercanía", en: "Clínica Santa Maria dos Olivais: Excellence & Proximity" },
  "Excelência e Proximidade": { es: "Excelencia y Cercanía", en: "Excellence & Proximity" },
  "Uma Década a Criar Sorrisos em Lisboa": { es: "Una Década Creando Sonrisas en Lisboa", en: "A Decade of Creating Smiles in Lisbon" },
  "Com 10 anos de experiência, a nossa clínica em Olivais é referência em Implantologia e Estética Dentária. Aliamos o rigor técnico à inovação para oferecer tratamentos personalizados, desde Facetas Estéticas a reabilitações complexas, focando sempre na sua saúde e harmonia facial.": {
    es: "Con 10 años de experiencia, nuestra clínica en Olivais es un referente en Implantología y Estética Dental. Combinamos el rigor técnico con la innovación para ofrecer tratamientos personalizados, desde carillas estéticas hasta rehabilitaciones complejas, enfocándonos siempre en su salud y armonía facial.",
    en: "With 10 years of experience, our clinic in Olivais is a reference in Implantology and Cosmetic Dentistry. We combine technical rigor with innovation to offer personalized treatments, from cosmetic veneers to complex rehabilitations, always focusing on your oral health and facial harmony."
  },
  "Implante Unitário + Coroa": { es: "Implante Unitario + Corona", en: "Single Dental Implant + Crown" },
  "Desde 745 €*": { es: "Desde 745 €*", en: "From 745 €*" },
  "(Inclui fase cirúrgica e coroa metalo-cerâmica)": { es: "(Incluye fase quirúrgica y corona metalocerámica)", en: "(Includes surgical phase and metal-ceramic crown)" },
  "Protocolo Superior (Dentes Fixos)": { es: "Protocolo Superior (Dientes Fijos)", en: "All-on-4 / All-on-6 Upper Protocol (Fixed Teeth)" },
  "Desde 4.800 €*": { es: "Desde 4.800 €*", en: "From 4,800 €*" },
  "(Reabilitação total de arcada)": { es: "(Reforma total de arcada)", en: "(Full arch makeover)" },
  "Facetas Estéticas (Pack 4 dentes)": { es: "Carillas Estéticas (Pack de 4 dientes)", en: "Aesthetic Veneers (4-Teeth Pack)" },
  "Desde 1.800 €*": { es: "Desde 1.800 €*", en: "From 1,800 €*" },
  "(Zona estética frontal)": { es: "(Zona estética frontal)", en: "(Frontal smile zone)" },
  "*Nota Legal: Valores de referência para casos standard, sujeitos a avaliação médica presencial. Não inclui enxertos ósseos se necessários.": {
    es: "*Nota legal: Precios de referencia para casos estándar, sujetos a evaluación médica presencial. No incluye injertos óseos de ser necesarios.",
    en: "*Legal Note: Reference values for standard cases, subject to physical medical assessment. Does not include bone grafts if necessary."
  },
  "Marque a Sua Consulta": { es: "Pida su Cita", en: "Book your Consultation" },
  "Email": { es: "Correo electrónico", en: "Email" },
  "Blog Educativo": { es: "Blog Educativo", en: "Educational Blog" },
  "Dicas e conselhos de saúde oral em vídeo.": { es: "Consejos y sugerencias de saúde oral em vídeo.", en: "Oral health tips and advice in video." },
  "Educação Infantil": { es: "Educación Infantil", en: "Pediatric Education" },
  "Cuidado Implantes": { es: "Cuidado de Implantes", en: "Implant Care" },
  "Convite Dente Banado": { es: "Invitación Diente Bañado", en: "Veneers Invitation" },
  "Gestão da Dor": { es: "Gestión del Dolor", en: "Pain Management" },
  "Prevenção Geral": { es: "Prevención General", en: "General Prevention" },
  "Saúde Gengival": { es: "Salud de las Encías", en: "Gum Health" },
  "Implantes Dentários": { es: "Implantes Dentales", en: "Dental Implants" },
  "O que são Implantes?": { es: "¿Qué son los implantes?", en: "What are Dental Implants?" },
  "Convite Revisão": { es: "Invitación de Control", en: "Recall / Visit Invitation" },
  "Limpeza Dentária GBT": { es: "Limpieza Dental GBT", en: "GBT Professional Cleaning" },
  "Manutenção Implantes": { es: "Mantenimiento de Implantes", en: "Implant Maintenance" },
  "Facetas (Convite)": { es: "Carillas (Invitación)", en: "Veneers (Invitation)" },
  "Alineadores": { es: "Alineadores Invisibles", en: "Invisible Aligners" },
  "Prevenção (Convite)": { es: "Prevención (Invitación)", en: "Prevention (Invitation)" },
  "Problema Silencioso": { es: "Problema Silencioso", en: "Silent Disease" },
  "Problemas Periodontais": { es: "Problemas Periodontales", en: "Periodontal Issues" },
  "Próteses Fixas": { es: "Prótesis Fijas", en: "Fixed Prosthodontics" },
  "Solução Facetas": { es: "Solución de Carillas", en: "Veneers Solution" },
  "Limpeza e Destartarização": { es: "Limpieza y Tartrectomía", en: "Ultrasonic Scaling and Cleaning" },
  "Soluções de Reabilitação Oral de Alta Precisão (Clique num item para copiar o link da campanha 🔗)": {
    es: "Soluciones de Rehabilitación Oral de Alta Precisión (¡Haga clic en un elemento para copiar el enlace de campaña! 🔗)",
    en: "High-Precision Oral Rehabilitation Solutions (Click on any treatment to copy the campaign link 🔗)"
  },
  "Clique num tratamento para copiar o link da campanha 🔗": {
    es: "¡Haga clic en un tratamiento para copiar el enlace de campaña! 🔗",
    en: "Click on any treatment to copy the campaign link 🔗"
  },
  "Especialista:": { es: "Especialista:", en: "Specialist:" },
  "Horário:": { es: "Horario:", en: "Schedule:" },
  "Tabela de Preços": { es: "Tabla de Precios", en: "Price List" },
  "Nota importante sobre pagamentos": { es: "Nota importante sobre pagos", en: "Important note about payments" },
  "Urgências": { es: "Urgencias", en: "Emergencies" },
  "Avaliação": { es: "Evaluación", en: "Assessment" },
  "Outros": { es: "Otros", en: "Others" },
  "A Nossa Diferença: Tratamento realizado em Portugal, com acompanhamento permanente presencial.": {
    es: "Nuestra Diferencia: Tratamiento realizado en Portugal, con seguimiento presencial permanente.",
    en: "Our Difference: Treatment fully performed in Portugal, with constant in-person specialist follow-up."
  },
  "A Clínica Santa Maria dos Olivais é um space dedicado à excelência em cuidados dentários, onde a saúde e a estética do seu sorriso são a nossa prioridade. Equipada com tecnologia de ponta e um ambiente acolhedor, a nossa clínica oferece uma ampla gama de tratamentos, desde medicina dentária geral até procedimentos de reabilitação especializados.": {
    es: "La Clínica Santa Maria dos Olivais es un espacio dedicado a la excelencia en el cuidado dental, donde la salud y la estética de su sonrisa son nuestra prioridad. Equipada con tecnología de punta y un ambiente acogedor, la nuestra oferta una amplia gama de tratamientos, desde odontología general hasta procedimientos de rehabilitación especializados.",
    en: "Clínica Santa Maria dos Olivais is a clinic dedicated to dental care excellence, prioritizing both oral health and aesthetics. Equipped with state-of-the-art technology and a friendly atmosphere, our clinic offers comprehensive solutions, from preventative general care to complex dental rejuvenations."
  },
  "Erro ao enviar. Tente novamente.": { es: "Error al enviar. Inténtelo de nuevo.", en: "Error sending message. Please try again." },
  "Foco Boca: Ativo ✨": { es: "Foco Boca: Activo ✨", en: "Mouth Focus: Active ✨" },
  "Foco Boca: Desativo 🔍": { es: "Foco Boca: Desactivado 🔍", en: "Mouth Focus: Inactive 🔍" },
  "Traseira 🔄": { es: "Trasera 🔄", en: "Rear 🔄" },
  "Frontal 🔄": { es: "Frontal 🔄", en: "Front 🔄" },
  "Alinhe o seu rosto aqui 👁️": { es: "Alinee su rostro aquí 👁️", en: "Align your face here 👁️" },
  "Modo Ultra-Foco Dental Ativo ✓": { es: "Modo Ultra-Enfoque Dental Activo ✓", en: "Ultra-Focus Dental Mode Active ✓" },
  "Modo Panorâmico": { es: "Modo Panorámico", en: "Panoramic Mode" },
  "Cancelar": { es: "Cancelar", en: "Cancel" },
  "Capturar Sorriso 📸": { es: "Capturar Sonrisa 📸", en: "Capture Smile 📸" },
  "Remover Foto": { es: "Eliminar Foto", en: "Remove Photo" },
  "Foto de Sorriso Pronta 🦷 ✓": { es: "¡Foto de Sonrisa Lista! 🦷 ✓", en: "Smile Photo Ready! 🦷 ✓" },
  "Dados para Receber o Diagnóstico": { es: "Datos para Recibir el Diagnóstico", en: "Details to Receive Assessment" },
  "O seu Nome Completo *": { es: "Su Nombre Completo *", en: "Your Full Name *" },
  "Telemóvel / WhatsApp *": { es: "Móvil / WhatsApp *", en: "Mobile / WhatsApp *" },
  "Dica: Pode carregar várias fotos (diferentes ângulos) arrastando-as juntas.": { es: "Consejo: Puede cargar varias fotos (diferentes ángulos) arrastrándolas juntas.", en: "Tip: You can upload multiple photos (different angles) by dragging them together." },
  "Diagnóstico por Foto (Opcional)": { es: "Diagnóstico por Foto (Opcional)", en: "Photo-based Assessment (Optional)" },
  "Ative a sua câmara ou carregue uma foto da sua boca para que os nossos médicos validem a sua simulação.": { es: "Active su cámara o cargue una foto de su boca para que nuestros médicos validen su simulación.", en: "Activate your camera or upload a photo of your mouth so that our doctors can validate your simulation." },
  "Confirmar com Especialista": { es: "Confirmar con Especialista", en: "Confirm with Specialist" },
  "Novo Cálculo": { es: "Nuevo Cálculo", en: "New Estimate" },
  "Transparência Total": { es: "Transparencia Total", en: "Total Transparency" },
  "Preços baseados na tabela oficial da clínica sem taxas ocultas.": { es: "Precios basados en la tarifa oficial de la clínica sin tasas ocultas.", en: "Prices based on the clinic's official rate sheet with no hidden fees." },
  "Personalização": { es: "Personalización", en: "Personalization" },
  "Cada orçamento é validado pelo Diretor Clínico antes de iniciar.": { es: "Cada presupuesto es validado por el Director Clínico antes de comenzar.", en: "Each estimate is validated by the Clinical Director before starting." },
  "Garantia de Qualidade": { es: "Garantía de Calidad", en: "Quality Guarantee" },
  "Trabalhamos com os melhores laboratórios e materiais europeus.": { es: "Trabajamos con los mejores laboratorios y materiales europeos.", en: "We partner with top European laboratories and materials." },
  "Nota sobre as estimativas": { es: "Nota sobre las estimaciones", en: "Note about the estimates" },
  "Os valores apresentados são baseados na tabela de preços em vigor e representam o investimento": { es: "Los valores presentados están basados en la tarifa de precios vigente y representan la inversión", en: "The values presented are based on our current price list and represent the" },
  "mínimo expectável": { es: "mínima esperada", en: "minimum expected investment" },
  "para situações clínicas padrão.": { es: "para situaciones clínicas estándar.", en: "for standard clinical cases." },
  "Importante:": { es: "Importante:", en: "Important:" },
  "A medicina dentária é personalizada. Fatores como a qualidade óssea, complexidade anatómica e necessidades específicas de higienização podem alterar o plano final. Por isso,": { es: "La odontología es personalizada. Factores como la calidad ósea, la complejidad anatómica y las necesidades higiénicas específicas pueden alterar el plan definitivo. Por ello,", en: "Dental medicine is personalized. Factors like bone quality, anatomical complexity, and specific hygiene needs may alter the final plan. Therefore," },
  "nenhuma estimativa online substitui a consulta de avaliação obrigatória": { es: "ninguna estimación online sustituye a la consulta de evaluación obligatoria", en: "no online estimate replaces the mandatory in-person evaluation" },
  "Auxílio de Diagnóstico": { es: "Auxilio de Diagnóstico", en: "Assessment Aid" },
  "Objetivo do Tratamento 🦷": { es: "Objetivo del Tratamiento 🦷", en: "Treatment Goal 🦷" },
  "Selecione as opções que correspondem ao seu caso. O assistente ajudará a formular a sua mensagem de forma clara e profissional:": { es: "Seleccione las opciones correspondientes a su caso. El asistente le ayudará a formular su mensaje de manera clara y profesional:", en: "Select the options that match your case. The assistant will help you formulate a clear and professional message:" },
  "Opções Selecionadas": { es: "Opciones Seleccionadas", en: "Selected Options" },
  "Confirmar Seleção ✓": { es: "Confirmar Selección ✓", en: "Confirm Selection ✓" },
  // Thank You Page (ThankYou.tsx),
  // Layout & Navigation Sidebar / FAB Hub,
  // Team Page Strings,
  // FAQ Page Entries,
  // Quote Calculator Form Labels & UI,
  // Dental Specialties Definitions (for Selector mapping),
  // Manual Pocket Guides & Calculator Details,
  // Extra Calculator Consent modal,
  // Service list items (servicesData.ts mapping translation fallback),
  // Quote Calculator additional static texts,
  // Policy pages headers,
  // --- ADDITIONAL COMPREHENSIVE DICTIONARY MAPPINGS FOR 100% TRANSLATION CAPACITY ---,
  "Os cookies são pequenos ficheiros de texto que o nosso servidor envia para o seu navegador (browser) durante a sua visita. Estes ficheiros permitem-nos reconhecer o utilizador em visitas futures, personalizar a sua experiência e garantir a segurança técnica do website.": { es: "Las cookies son pequeños archivos de texto que nuestro servidor envía a su navegador (browser) durante su visita. Estos archivos nos permiten reconocer al usuario en futuras visitas, personalizar su experiencia y garantizar la seguridad técnica del sitio web.", en: "Cookies are small text files that our server sends to your browser during your visit. These files allow us to recognize the user in future visits, personalize your experience, and ensure the technical security of the website." },
  // Thank You Page (ThankYou.tsx)
  "Estimado Paciente": { es: "Estimado Paciente", en: "Dear Patient" },
  "Consulta Geral": { es: "Consulta General", en: "General Consultation" },
  "Olá, o meu nome é ": { es: "Hola, mi nombre es ", en: "Hello, my name is " },
  ". Acabei de preencher o formulário no site sobre ": { es: ". Acabo de rellenar el formulario en la web sobre ", en: ". I have just filled out the website form regarding " },
  " e gostaria de ser contactado.": { es: " y me gustaría ser contactado.", en: " and would like to be contacted." },
  "\"Aproveite para conhecer todos os nossos serviços\"": { es: "\"Aproveche para conocer todos nuestros servicios\"", en: "\"Take the opportunity to discover all our services\"" },
  // Added Missing Translations for 100% complete multi-language support
  "Sisos & Sorrisos Lda": { es: "Sisos & Sorrisos Lda", en: "Sisos & Sorrisos Lda" },
  "Estrada de Moscavide n 32 c, 1800-279 Lisboa": { es: "Estrada de Moscavide n.º 32C, 1800-279, Lisboa", en: "No. 32C Estrada de Moscavide, 1800-279, Lisbon" },
  "Desvitalização Molar: 240€": { es: "Endodoncia Molar: 240€", en: "Molar Root Canal: €240" },
  "Desvitalização Incisivo/Canino: 180€": { es: "Endodoncia Incisivo/Canino: 180€", en: "Incisor/Canine Root Canal: €180" },
  "Extração de Siso: 75€ a 200€": { es: "Extracción de Muela de Juicio: 75€ a 200€", en: "Wisdom Tooth Extraction: €75 to €200" },
  "Transparência:": { es: "Transparencia:", en: "Transparency:" },
  "Câmara física não encontrada: Não foi detetada nenhuma câmara ou webcam ativa neste dispositivo. Pode selecionar facilmente uma imagem da galeria utilizando o botão 'Carregar Foto 📁'.": {
    es: "Cámara física no encontrada. No se detectó ninguna cámara activa en este dispositivo. Puede subir una foto desde su galería.",
    en: "Physical camera not found. No active camera detected on this device. You can easily upload a photo from your gallery instead."
  },
  "Erro técnico": { es: "Error técnico", en: "Technical error" },
  "Por favor, carregue uma foto utilizando o botão ao lado.": { es: "Por favor, cargue una foto usando el botón de al lado.", en: "Please upload a photo using the button on the right." },

  // App-wide and newly identified UI components translations
  "Blog": { es: "Blog", en: "Blog" },
  "FAQ": { es: "FAQ", en: "FAQ" },
  "WhatsApp": { es: "WhatsApp", en: "WhatsApp" },
  "Livro de Reclamações": { es: "Libro de Reclamaciones", en: "Complaints Book" },
  "Clínica Santa Maria dos Olivais": { es: "Clínica Santa Maria dos Olivais", en: "Clínica Santa Maria dos Olivais" },
  "Senha incorreta!": { es: "¡Contraseña incorrecta!", en: "Incorrect password!" },
  "Alterações guardadas com sucesso! O site foi atualizado.": { es: "¡Cambios guardados con éxito! El sitio web ha sido actualizado.", en: "Changes saved successfully! The website has been updated." },
  "Mais informações aqui": { es: "Más información aquí", en: "More information here" },
  "Fique atento!": { es: "¡Esté atento!", en: "Stay tuned!" },
  "Novas campanhas e promoções especiais serão anunciadas aqui.": { es: "Nuevas campañas y promociones especiales se anunciarán aquí.", en: "New campaigns and special promotions will be announced here." },
  "Clínica Santa Maria dos Olivais:": { es: "Clínica Santa Maria dos Olivais:", en: "Clínica Santa Maria dos Olivais:" },
  "Nossos Serviços Dentários": { es: "Nuestros Servicios Dentales", en: "Our Dental Services" },
  "Ver Detalhes": { es: "Ver Detalles", en: "View Details" },
  "Por favor, introduza o seu nome.": { es: "Por favor, introduzca su nombre.", en: "Please enter your name." },
  "Por favor, introduza o seu número de telemóvel.": { es: "Por favor, introduzca su número de teléfono celular.", en: "Please enter your mobile phone number." },
  "Diagnóstico Clínico": { es: "Diagnóstico Clínico", en: "Clinical Diagnosis" },
  "por Foto": { es: "por Foto", en: "by Photo" },
  "Simulador de": { es: "Simulador de", en: "Simulator of" },
  "Investimento": { es: "Inversión", en: "Investment" },
  "🦷 Avaliação Digital de Sorriso": { es: "🦷 Evaluación Digital de Sonrisa", en: "🦷 Digital Smile Assessment" },
  "Como prefere simular o seu investment?": { es: "¿Cómo prefiere simular su inversión?", en: "How do you prefer to simulate your investment?" },
  "ex: João Silva": { es: "ej: Juan Silva", en: "eg: John Smith" },
  "Email (Opcional)": { es: "Correo electrónico (Opcional)", en: "Email (Optional)" },
  "ex: joao@email.com": { es: "ej: juan@correo.com", en: "eg: john@email.com" },
  "Selecione o seu objetivo clínico (Opcional) 💡": { es: "Seleccione su objetivo clínico (Opcional) 💡", en: "Select your clinical goal (Optional) 💡" },
  "👉 Clique aqui para selecionar os seus objetivos clínicos...": { es: "👉 Haga clic aquí para seleccionar sus objetivos clínicos...", en: "👉 Click here to select your clinical goals..." },
  "Selecionar ⚙️": { es: "Seleccionar ⚙️", en: "Select ⚙️" },
  "Diga-nos o que sente ou qual o seu objetivo:": { es: "Díganos lo que siente o cuál es su objetivo:", en: "Tell us what you feel or what your goal is:" },
  "ex: Gostava de preencher falta de dentes com implantes / corrigir alinhamento.": { es: "ej: Me gustaría reponer dientes perdidos con implantes / corregir la alineación.", en: "eg: I would like to fill missing teeth with implants / correct alignment." },
  "Falta de conexão ou erro ao enviar dados. Por favor verifique as informações e o telemóvel.": { es: "Falta de conexión o error al enviar dados. Por favor verifique los datos y el número de teléfono móvil.", en: "Connection failure or error sending data. Please verify the information and the mobile phone number." },
  "Nota: Carregue ou tire uma foto para poder submeter o diagnóstico.": { es: "Nota: Suba o tome una foto para poder enviar el diagnóstico.", en: "Note: Upload or take a photo to submit the diagnosis." },
  "A Enviar Diagnóstico...": { es: "Enviando diagnóstico...", en: "Sending Diagnosis..." },
  "Enviar Foto Diagnóstico Segura 🚀": { es: "Enviar Foto de Diagnóstico Segura 🚀", en: "Send Secure Diagnostic Photo 🚀" },
  "Foto de Diagnóstico Recebida!": { es: "¡Foto de Diagnóstico Recibida!", en: "Diagnostic Photo Received!" },
  "Muito obrigado pelas informações de Sorriso,": { es: "Muchas gracias por la información de Sonrisa,", en: "Thank you very much for the Smile information," },
  "O Diretor Clínico da Clínica Santa Maria vai analisar individualmente a anatomia do seu sorriso.": { es: "El Director Clínico de la Clínica Santa Maria analizará individualmente la anatomía de su sonrisa.", en: "The Clinical Director of Clínica Santa Maria will individually analyze your smile anatomy." },
  "Entraremos em contacto no prazo máximo de 24 horas úteis, enviando um plano e estimativa adequados ao seu caso via WhatsApp/Telemóvel.": { es: "Nos pondremos en contacto en un plazo máximo de 24 horas hábiles, enviando un plan y presupuesto adecuado a su caso vía WhatsApp/Celular.", en: "We will reach out within a maximum of 24 business hours, sending a plan and quote suited to your case via WhatsApp/Mobile." },
  "ID de Diagnóstico Dental Seguro ✓": { es: "ID de Diagnóstico Dental Seguro ✓", en: "Secure Dental Diagnosis ID ✓" },
  "Simular Outro Caso / Recomeçar": { es: "Simular Otro Caso / Reiniciar", en: "Simulate Another Case / Restart" },
  "Por favor, envie apenas ficheiros de imagem (JPG, PNG).": { es: "Por favor, envíe solo archivos de imagen (JPG, PNG).", en: "Please upload only image files (JPG, PNG)." },
  "Serviço não encontrado:": { es: "Servicio no encontrado:", en: "Service not found:" },
  "Pagamento faseado sem juros diretamente com a clínica. Pague durante o tratamento e finalize no dia da cirurgia.": { es: "Pago fraccionado sin intereses directamente con la clínica. Pague durante el tratamiento y finalice el día de la cirugía.", en: "Interest-free installment payment directly with the clinic. Pay during treatment and finalize on the day of surgery." }
};

// --- ELEGANT NORMALIZATION HELPER TO ENSURE 100% RELIABLE DICTIONARY SEARCH ---
const normalizeKey = (str: string): string => {
  return str
    .replace(/\s+/g, ' ')                          // Collapses duplicate/multiple whitespace, spaces, and linebreaks
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()🦷❤️▼▲]/g, '') // Removes symbols, emojis, and styling characters
    .replace(/["'”’“‘]/g, '')                        // Removes all formats of single/double quotes
    .trim()
    .toLowerCase();
};

const normCache: Record<string, string> = {};

const getCachedNormalizedKey = (str: string): string => {
  const cached = normCache[str];
  if (cached !== undefined) {
    return cached;
  }
  const norm = normalizeKey(str);
  normCache[str] = norm;
  return norm;
};

// Use highly efficient internal Maps instead of dynamic lookup arrays for maximum speed
const directTranslationMap = new Map<string, { es: string; en: string }>();
const normalizedTranslationMap = new Map<string, { es: string; en: string }>();
const precalculatedNormalizedKeys: { originalKey: string; normalizedKey: string }[] = [];

// Warm-up and index the lookup maps on startup once
Object.keys(translationMap).forEach((key) => {
  const cleanKey = key.trim();
  directTranslationMap.set(key, translationMap[key]);
  if (cleanKey !== key) {
    directTranslationMap.set(cleanKey, translationMap[key]);
  }

  const norm = getCachedNormalizedKey(key);
  if (norm) {
    normalizedTranslationMap.set(norm, translationMap[key]);
    precalculatedNormalizedKeys.push({ originalKey: key, normalizedKey: norm });
  }
});

// A multi-language resolved lookup cache map (maps `${language}:${rawKey}` -> translatedString)
// to bypass normalization, direct map checks, and fuzzy matching completely on subsequent renders.
const finalTranslationCache = new Map<string, string>();

// --- EXTRA ROBUST FUZZY MATCHING INTERNALS WITH HIGHEST VISUAL TOLERANCE ---
const fuzzyCache: Record<string, { es: string; en: string } | null> = {};

const getLevenshteinDistance = (a: string, b: string): number => {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    new Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return matrix[a.length][b.length];
};

const getSimilarity = (a: string, b: string): number => {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1.0;
  return 1.0 - getLevenshteinDistance(a, b) / maxLen;
};

const findFuzzyMatch = (cleanKey: string): { es: string; en: string } | null => {
  const normKey = getCachedNormalizedKey(cleanKey);
  if (!normKey) return null;

  // Check high-performance memory cache
  const cached = fuzzyCache[normKey];
  if (cached !== undefined) {
    return cached;
  }

  let bestMatchKey: string | null = null;
  let highestSimilarity = 0;

  for (let i = 0; i < precalculatedNormalizedKeys.length; i++) {
    const entry = precalculatedNormalizedKeys[i];
    const { originalKey, normalizedKey: normMapKey } = entry;

    // Direct match if normalization matches
    if (normKey === normMapKey) {
      const match = translationMap[originalKey];
      fuzzyCache[normKey] = match;
      return match;
    }

    const similarity = getSimilarity(normKey, normMapKey);
    if (similarity > highestSimilarity) {
      highestSimilarity = similarity;
      bestMatchKey = originalKey;
    }
  }

  // 0.80 similarity minimum tolerance (captures typos, text splits, casing, and quote mismatches)
  if (highestSimilarity >= 0.80 && bestMatchKey) {
    const match = translationMap[bestMatchKey];
    fuzzyCache[normKey] = match;
    return match;
  }

  fuzzyCache[normKey] = null;
  return null;
};

// --- MULTI-LANGUAGE FALLBACK CHAINING FOR HIGH-RESILIENCE TRANSLATION ---
const getTranslationWithFallback = (
  translation: { es: string; en: string } | undefined | null,
  targetLang: Language,
  defaultKey: string
): string => {
  if (!translation) return defaultKey;
  if (targetLang === 'pt') return defaultKey;

  const val = translation[targetLang as 'es' | 'en'];
  if (val && val.trim() !== '') {
    return val;
  }

  // Chained Fallback Logic:
  // If the target language is Spanish ('es') and the translation is missing or empty,
  // we fallback to English ('en') before defaulting to Portuguese (defaultKey).
  if (targetLang === 'es') {
    const fallbackVal = translation['en'];
    if (fallbackVal && fallbackVal.trim() !== '') {
      return fallbackVal;
    }
  }

  // Default fallback back to the original Portuguese key
  return defaultKey;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('site_lang');
    return (saved as Language) || 'pt';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('site_lang', lang);
    // Smoothly update the html element's lang attribute
    const langAttrMap: Record<Language, string> = {
      pt: 'pt-PT',
      es: 'es-ES',
      en: 'en-US'
    };
    document.documentElement.lang = langAttrMap[lang];
  };

  useEffect(() => {
    const langAttrMap: Record<Language, string> = {
      pt: 'pt-PT',
      es: 'es-ES',
      en: 'en-US'
    };
    document.documentElement.lang = langAttrMap[language];
  }, [language]);

  // Translate simple text keys and sanitize whitespaces with chaining
  const t = (key: string): string => {
    if (!key) return '';
    if (language === 'pt') return key;

    const cacheKey = `${language}:${key}`;
    const cached = finalTranslationCache.get(cacheKey);
    if (cached !== undefined) {
      return cached;
    }

    const cleanKey = key.trim();
    let result = key;

    let found = false;
    // 1. Direct O(1) matching using indexed Map
    const translation = directTranslationMap.get(cleanKey);
    if (translation) {
      result = getTranslationWithFallback(translation, language, key);
      found = true;
    } else {
      // 2. Normalization O(1) matching using index Map
      const norm = getCachedNormalizedKey(cleanKey);
      const normalizedTranslation = normalizedTranslationMap.get(norm);
      if (normalizedTranslation) {
        result = getTranslationWithFallback(normalizedTranslation, language, key);
        found = true;
      } else {
        // 3. Robust, high-resilience fuzzy matching to tolerate typos or text splits
        const fuzzyTranslation = findFuzzyMatch(cleanKey);
        if (fuzzyTranslation) {
          result = getTranslationWithFallback(fuzzyTranslation, language, key);
          found = true;
        }
      }
    }

    if (!found) {
      console.warn(`[LanguageContext] Translation key not found in translationMap (lang: ${language}): "${key}"`);
    }

    finalTranslationCache.set(cacheKey, result);
    return result;
  };

  // Traverses an object tree and replaces text fields recursively on demand
  const translateObject = <T,>(obj: T): T => {
    if (!obj || language === 'pt') return obj;

    if (typeof obj === 'string') {
      const cacheKey = `${language}:${obj}`;
      const cached = finalTranslationCache.get(cacheKey);
      if (cached !== undefined) {
        return cached as unknown as T;
      }

      const clean = obj.trim();
      let result: any = obj;

      const directMatch = directTranslationMap.get(clean);
      if (directMatch) {
        result = getTranslationWithFallback(directMatch, language, obj);
      } else {
        const norm = getCachedNormalizedKey(clean);
        const normalizedMatch = normalizedTranslationMap.get(norm);
        if (normalizedMatch) {
          result = getTranslationWithFallback(normalizedMatch, language, obj);
        } else {
          const fuzzyTranslation = findFuzzyMatch(clean);
          if (fuzzyTranslation) {
            result = getTranslationWithFallback(fuzzyTranslation, language, obj);
          }
        }
      }

      finalTranslationCache.set(cacheKey, result);
      return result as unknown as T;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => translateObject(item)) as unknown as T;
    }

    if (typeof obj === 'object') {
      const copy: any = { ...obj };
      for (const k in copy) {
        if (Object.prototype.hasOwnProperty.call(copy, k)) {
          // Special exception: preserve urls, maps, email keys or assets
          if (['src', 'img', 'thumbnail', 'path', 'videoSrc', 'mapsLink', 'email', 'phone', 'mobile', 'instagram', 'facebook', 'whatsapp', 'slug'].includes(k)) {
            continue;
          }
          copy[k] = translateObject(copy[k]);
        }
      }
      return copy as T;
    }

    return obj;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateObject }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
