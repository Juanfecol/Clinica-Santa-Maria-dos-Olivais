import React, { useState, useEffect } from 'react';

export const CookieConsent: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    } else if (consent === 'granted') {
      loadScripts();
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'granted');
    setShow(false);
    loadScripts();
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'denied');
    setShow(false);
  };

  const loadScripts = () => {
    // Scripts are now pre-loaded in index.html for better reliability and performance.
    // Here we just notify the SDKs (if needed) and ensure global helpers are available.
    
    if ((window as any).fbq) {
      (window as any).fbq('consent', 'grant');
    }

    // Global tracking for elements with ID (buttons, links)
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const element = target.closest?.('[id]') as HTMLElement | null;
      if (element && element.id && (window as any).MC) {
         (window as any).MC.track('element_click', {
           element_id: element.id,
           text: element.innerText?.substring(0, 50) || element.textContent?.substring(0, 50) || '',
           path: window.location.pathname
         });
      }
    };
    document.addEventListener('click', handleGlobalClick);

    // Initial PageView for Manychat
    if ((window as any).MC) {
      (window as any).MC.track('page_view', { path: window.location.pathname });
    }

    (window as any).trackEvent = function(eventName: string, eventParams: object = {}) {
        if ((window as any).gtag) {
          (window as any).gtag('event', eventName, { ...eventParams, 'send_to': ['AW-434250599', 'AW-1135006626'] });
        }
        // Manychat event tracking
        if ((window as any).MC) {
          (window as any).MC.track(eventName, eventParams);
        }
    };
    
    (window as any).trackMeta = function(eventName: string, params: object = {}, isStandard: boolean = true) {
        if ((window as any).fbq) {
          if (isStandard) {
            (window as any).fbq('track', eventName, params);
          } else {
            (window as any).fbq('trackCustom', eventName, params);
          }
        }
    };
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-[1000] flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-gray-700">
        Utilizamos cookies para melhorar a sua experiência. Ao continuar a navegar, concorda com a nossa política de cookies.
      </p>
      <div className="flex gap-2">
        <button onClick={decline} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Recusar</button>
        <button onClick={accept} className="px-4 py-2 text-sm bg-clinic-purple text-white rounded-lg hover:bg-clinic-blue">Aceitar</button>
      </div>
    </div>
  );
};
