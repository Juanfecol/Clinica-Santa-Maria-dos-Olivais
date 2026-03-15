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
    // Meta Pixel
    (function(f: any, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function(...args: any[]) {
        n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode!.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    (window as any).fbq('init', '1754959305395666');
    (window as any).fbq('track', 'PageView');

    // Google Tag
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=AW-434250599";
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'AW-434250599');
    gtag('config', 'AW-1135006626');

    (window as any).trackEvent = function(eventName: string, eventParams: object = {}) {
        gtag('event', eventName, { ...eventParams, 'send_to': ['AW-434250599', 'AW-1135006626'] });
    };
    
    (window as any).trackMeta = function(eventName: string, params: object = {}, isStandard: boolean = false) {
        if ((window as any).fbq && isStandard) {
          (window as any).fbq('track', eventName, params);
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
