import { useCallback } from 'react';

export const useGoogleAds = () => {
  const trackConversion = useCallback((conversionLabel: string) => {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': `AW-434250599/${conversionLabel}`,
        'value': 1.0,
        'currency': 'EUR'
      });
      console.log(`Evento enviado: ${conversionLabel}`);
    } else {
      console.warn("Google Tag (gtag.js) no está detectado.");
    }
  }, []);

  // Conversión de WhatsApp
  const trackWhatsApp = () => trackConversion('grC7CL3rxeobEOfGiM8B');

  // Conversión de Llamada
  const trackPhone = () => trackConversion('gGyeCMDrxeobEOfGiM8B');

  // Conversión de Formulario
  const trackForm = () => trackConversion('koh5CPOs1uobEOfGiM8B');

  return { trackWhatsApp, trackPhone, trackForm };
};
