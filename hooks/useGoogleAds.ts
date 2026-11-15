import { useCallback, useEffect } from 'react';
import { captureAttributionOnLoad, fireCleanGoogleAdsConversion } from '../src/utils/attribution';

export const useGoogleAds = () => {
  useEffect(() => {
    captureAttributionOnLoad();
  }, []);

  const trackConversion = useCallback((conversionLabel: string, value: number = 1.0) => {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: `AW-434250599/${conversionLabel}`,
        value,
        currency: 'EUR',
      });
    }
  }, []);

  // Conversión de WhatsApp
  const trackWhatsApp = () => trackConversion('grC7CL3rxeobEOfGiM8B', 5.0);

  // Conversión de Llamada
  const trackPhone = () => trackConversion('gGyeCMDrxeobEOfGiM8B', 5.0);

  // Conversión de Formulario (20 EUR, EU Healthcare Privacy Compliant + Enhanced Conversions)
  const trackForm = (userData?: { email?: string; phone?: string; name?: string }) =>
    fireCleanGoogleAdsConversion(userData);

  return { trackWhatsApp, trackPhone, trackForm };
};
