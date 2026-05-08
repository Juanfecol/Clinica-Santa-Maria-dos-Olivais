import { useCallback } from 'react';

interface MetaEventData {
  sourceUrl?: string;
  email?: string;
  phone?: string;
  name?: string;
  customData?: Record<string, unknown>;
}

export const useMetaConversions = () => {
  // Funcion generica para enviar cualquier evento a la Conversions API de Meta (server-side)
  const sendServerEvent = useCallback(async (
    eventName: string,
    eventData?: MetaEventData
  ): Promise<void> => {
    try {
      const response = await fetch('/api/meta-conversions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName,
          eventData: {
            sourceUrl: eventData?.sourceUrl || window.location.href,
            ...eventData,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.warn('Meta Conversions API warning:', error);
      } else {
        console.log(`Meta evento enviado: ${eventName}`);
      }
    } catch (error) {
      // No bloqueamos la experiencia del usuario si falla el tracking
      console.warn('Error enviando evento a Meta Conversions API:', error);
    }
  }, []);

  // Evento: ViewContent - cuando el usuario visita una pagina de servicio
  const trackViewContent = useCallback((url?: string) => {
    sendServerEvent('ViewContent', { sourceUrl: url || window.location.href });
  }, [sendServerEvent]);

  // Evento: Lead / CompleteRegistration - cuando el usuario envia el formulario de contacto
  const trackCompleteRegistration = useCallback((
    userData?: { name?: string; email?: string; phone?: string }
  ) => {
    sendServerEvent('CompleteRegistration', {
      name: userData?.name,
      email: userData?.email,
      phone: userData?.phone,
      sourceUrl: window.location.href,
    });
  }, [sendServerEvent]);

  // Evento: Contact - cuando el usuario hace clic en WhatsApp, telefono o formulario
  const trackContact = useCallback((method?: string) => {
    sendServerEvent('Contact', {
      sourceUrl: window.location.href,
      customData: { contact_method: method || 'unknown' },
    });
  }, [sendServerEvent]);

  // Evento: Schedule - cuando el usuario agenda una consulta
  const trackSchedule = useCallback((
    userData?: { name?: string; email?: string; phone?: string }
  ) => {
    sendServerEvent('Schedule', {
      name: userData?.name,
      email: userData?.email,
      phone: userData?.phone,
      sourceUrl: window.location.href,
    });
  }, [sendServerEvent]);

  return {
    trackViewContent,
    trackCompleteRegistration,
    trackContact,
    trackSchedule,
    sendServerEvent,
  };
};
