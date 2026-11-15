export interface AttributionData {
  gclid: string;
  wbraid: string;
  gbraid: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  landing_page: string;
}

const ATTR_STORAGE_KEY = 'smo_lead_attribution_v1';

const PARAM_KEYS: (keyof Omit<AttributionData, 'landing_page'>)[] = [
  'gclid',
  'wbraid',
  'gbraid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
];

export function captureAttributionOnLoad(): AttributionData {
  if (typeof window === 'undefined') {
    return {
      gclid: '',
      wbraid: '',
      gbraid: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      landing_page: '',
    };
  }

  let stored: Partial<AttributionData> = {};
  try {
    const raw = localStorage.getItem(ATTR_STORAGE_KEY) || sessionStorage.getItem(ATTR_STORAGE_KEY);
    if (raw) stored = JSON.parse(raw);
  } catch (_) {}

  const params = new URLSearchParams(window.location.search);
  let updated = false;

  for (const key of PARAM_KEYS) {
    const val = params.get(key);
    if (val && val.trim()) {
      stored[key] = val.trim();
      updated = true;
    }
  }

  if (!stored.landing_page || updated) {
    stored.landing_page = window.location.href;
    updated = true;
  }

  const finalData: AttributionData = {
    gclid: stored.gclid || '',
    wbraid: stored.wbraid || '',
    gbraid: stored.gbraid || '',
    utm_source: stored.utm_source || '',
    utm_medium: stored.utm_medium || '',
    utm_campaign: stored.utm_campaign || '',
    utm_term: stored.utm_term || '',
    landing_page: stored.landing_page || window.location.href,
  };

  if (updated) {
    try {
      const serialized = JSON.stringify(finalData);
      localStorage.setItem(ATTR_STORAGE_KEY, serialized);
      sessionStorage.setItem(ATTR_STORAGE_KEY, serialized);
    } catch (_) {}
  }

  return finalData;
}

export function getAttributionPayload(): AttributionData {
  return captureAttributionOnLoad();
}

export function fireCleanGoogleAdsConversion(userData?: { email?: string; phone?: string; name?: string }) {
  if (typeof window === 'undefined') return;
  const w = window as any;

  // Deduplicate within 15 seconds so form submit -> /obrigado redirect never double-counts
  const now = Date.now();
  if (w.__lastSmoGadsConvTs && now - w.__lastSmoGadsConvTs < 15000) {
    return;
  }
  w.__lastSmoGadsConvTs = now;
  const txId = `smo_${now}_${Math.random().toString(36).slice(2, 8)}`;

  if (typeof w.gtag === 'function') {
    const hasConsent = (() => {
      try {
        return localStorage.getItem('cookie-consent') === 'granted';
      } catch (_) {
        return false;
      }
    })();

    if (hasConsent && userData) {
      const enhanced: Record<string, any> = {};
      const cleanEmail = (userData.email || '').trim().toLowerCase();
      if (cleanEmail && cleanEmail.includes('@')) {
        enhanced.email = cleanEmail;
      }
      const digits = (userData.phone || '').replace(/\D/g, '');
      if (digits.length >= 9) {
        enhanced.phone_number = digits.startsWith('351') || digits.length > 9 ? `+${digits}` : `+351${digits}`;
      }
      if (Object.keys(enhanced).length > 0) {
        w.gtag('set', 'user_data', enhanced);
      }
    }

    // Strict EU Healthcare Privacy: ONLY conversion label, monetary value (20 EUR), currency, and transaction_id
    w.gtag('event', 'conversion', {
      send_to: 'AW-434250599/koh5CPOs1uobEOfGiM8B',
      value: 20.0,
      currency: 'EUR',
      transaction_id: txId,
    });
  }
}
