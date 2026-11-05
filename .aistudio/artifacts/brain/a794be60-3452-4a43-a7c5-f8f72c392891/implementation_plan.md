# Integración del Chat IA LeadConnector & Sustitución de WhatsApp Flotante y Calendly

Sustituir el botón flotante de WhatsApp y el calendario integrado de Calendly por el widget oficial de Chat con IA de LeadConnector / GoHighLevel (`widget-id="6aecef46ce7c96a75adc3f9a"`), conectando la atención en tiempo real, consultas sobre implantes, evaluación de 20€ con la Dra. Ana Mata y el agendamiento directo en el CRM sin salir de la página.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> **Decisiones confirmadas en la fase de clarificación con el usuario:**
> - **Sustitución de WhatsApp**: Se reemplaza el botón flotante de WhatsApp y el botón de chatbot anterior en el Hub Flotante (FAB) por el nuevo widget de Chat IA de LeadConnector. Los enlaces fijos de contacto institucional (teléfono y pie de página) permanecen estables.
> - **Sustitución de Calendly / Marcações**: En lugar del iframe externo de Calendly, la página de agendamiento (`pages/Appointments.tsx`) y los botones de reserva en toda la web abrirán directamente la ventana del Chat IA para agendar con Felipe en tiempo real y registrar la cita en GoHighLevel.

---

### 1. Overview & Core Concept

- **Qué hace**: Integra el widget flotante de chat con IA en vivo en la esquina inferior de la web. Cuando el visitante hace clic o presiona cualquier botón de agendamiento, se abre la ventana conversacional donde Felipe responde preguntas sobre tratamientos, implantes, precios, la evaluación de 20€ con la Dra. Ana Mata, y muestra la disponibilidad de días y horas para agendar de inmediato en GoHighLevel.
- **Público Objetivo**: Pacientes nuevos y recurrentes que buscan resolver dudas de tratamientos dentales o agendar consulta de forma ágil desde cualquier dispositivo (móvil y escritorio).
- **Valor Principal**: Elimina la fricción de intermediarios y enlaces externos de Calendly/WhatsApp, centralizando la conversión y el registro automático en el CRM de la clínica.

---

### 2. User Experience & Visual Design

- **Burbuja Flotante del Chat**:
  - Se sitúa en la esquina inferior derecha de la pantalla, con un indicador visual accesible.
  - Al hacer clic, despliega la ventana conversacional con la identidad de la clínica.
- **Página de Agendamiento (`pages/Appointments.tsx`)**:
  - Se retira el contenedor de Calendly.
  - Se sustituye por un panel interactivo moderno y de alto impacto que explica las ventajas del agendamiento instantáneo con IA (evaluación médica de 20€, sin esperas, confirmación inmediata).
  - Incluye un botón primario de acción directa (*"Abrir Chat de Agendamento"* y *"Falar com o Assistente"*), complementado con la tarjeta oficial de `EvaluationInfo`.
- **Botones Globales de Agendamiento ("Agendar Consulta", "Marcar Avaliação")**:
  - Al pulsar cualquiera de estos botones en la cabecera, hero o páginas de tratamientos, se invoca la apertura programática del chat de LeadConnector. Si el usuario navega a `/marcacoes`, la página le ofrece la activación directa del chat y soporte de reserva guiada.
- **Alineación Visual**:
  - Mantiene los colores corporativos de la clínica (`clinic-blue` #2d3277, `clinic-purple` #6b46c1, `clinic-lime` #d4e157).
  - Cumple la disciplina visual sin píldoras estáticas decorativas ni elementos artificiales redundantes.

---

### 3. Key Product Decisions & Trade-Offs

- **Decisión 1: Integración del Script de LeadConnector en Vite (SPA)**
  - *Enfoque Seleccionado*: Opción 1 recomendada para SPAs Vite, agregando el script con `data-resources-url` y `data-widget-id="6aecef46ce7c96a75adc3f9a"` en `index.html`, complementado con una función auxiliar en React (`openLeadConnectorChat()`) para control programático desde componentes.
  - *Por qué*: Garantiza que el widget se cargue una sola vez de forma nativa y asíncrona, sin ralentizar el renderizado inicial y manteniéndose presente durante toda la navegación SPA.
  - *Alternativas Consideradas*: Cargar mediante `useEffect` dinámico en cada vista (más propenso a duplicación de iframes o errores de ciclo de vida al desmontar).

- **Decisión 2: Limpieza de Recursos de Calendly**
  - *Enfoque Seleccionado*: Retirar de `index.html` los recursos innecesarios de Calendly (`widget.css`, `widget.js` y `dns-prefetch`), reduciendo el peso de la página y solicitudes de red innecesarias.
  - *Por qué*: Evita transferencias de datos obsoletas y colisiones de estilos o scripts de terceros.

- **Decisión 3: Reorganización del Floating Action Button (FAB) Hub en `components/Layout.tsx`**
  - *Enfoque Seleccionado*: El botón flotante de WhatsApp y el antiguo chatbot genérico se reemplazan para dar protagonismo total al nuevo Chat IA de LeadConnector. Se mantiene el botón de diagnóstico por foto y llamada telefónica.
  - *Por qué*: Elimina la confusión para el paciente de tener dos burbujas de chat o múltiples canales de mensajería superpuestos en la esquina inferior.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                              index.html                                │
│   LeadConnector Script Loader (widget-id: 6aecef46ce7c96a75adc3f9a)     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                         Inyecta Widget Global
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        React Application (SPA)                         │
│                                                                        │
│   ┌────────────────────────┐            ┌──────────────────────────┐   │
│   │   components/Layout    │            │    pages/Appointments    │   │
│   │  - Retira FAB WhatsApp │            │  - Retira Calendly iframe│   │
│   │  - Disparador Chat IA  │            │  - Tarjeta de Agendamento│   │
│   │  - Botón Foto/Teléfono │            │  - Botón: "Agendar Agora"│   │
│   └───────────┬────────────┘            └────────────┬─────────────┘   │
│               │                                      │                 │
│               └───────────────┐      ┌───────────────┘                 │
│                               ▼      ▼                                 │
│                      openLeadConnectorChat()                           │
│              (Dispara apertura interactiva del widget)                 │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│              LeadConnector HQ Widget & CRM GoHighLevel                 │
│   - Atención en vivo con Felipe                                        │
│   - Consulta de implantes, precios y evaluación 20€ Dra. Ana Mata      │
│   - Selección de horario y registro directo en el CRM                  │
└────────────────────────────────────────────────────────────────────────┘
```

- **Mapeo de Componentes Afectados**:
  1. `index.html`: Inserción del script de LeadConnector antes de `</body>`; eliminación de los scripts y estilos de Calendly.
  2. `components/Layout.tsx`: Actualización de la botonera flotante y ciclo del FAB, reemplazando WhatsApp y el chatbot anterior por el lanzador del nuevo chat LeadConnector.
  3. `pages/Appointments.tsx`: Reemplazo del contenedor `calendly-inline-container` y su función de inicialización por la interfaz de agendamiento guiado por el Chat IA.
  4. `src/utils/chatWidget.ts`: Utilidad helper para abrir o enfocar el widget de LeadConnector programáticamente cuando el paciente hace clic en cualquier botón de agendamiento.
