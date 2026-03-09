
import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { ContentProvider } from './context/ContentContext';

// Lazy loading pages for performance
const Home = lazy(() => import('./pages/Home'));
const Team = lazy(() => import('./pages/Team'));
const Clinic = lazy(() => import('./pages/Clinic'));
const Contact = lazy(() => import('./pages/Contact'));
const Appointments = lazy(() => import('./pages/Appointments'));
const Campaigns = lazy(() => import('./pages/Campaigns'));
const Admin = lazy(() => import('./pages/Admin'));
const CookiesPolicy = lazy(() => import('./pages/CookiesPolicy'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const ThankYou = lazy(() => import('./pages/ThankYou'));

// Loading fallback
const PageLoader = () => null;

const PixelRouteTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // PageView automático em cada troca de rota para o Meta Pixel
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'PageView');
    }

    if (location.pathname.includes('marcacoes')) {
      if ((window as any).trackMeta) {
        // Usamos eventos estándar recomendados por Meta para citas
        (window as any).trackMeta('InitiateCheckout', { 
          content_name: 'Formulário de Marcação',
          content_category: 'Cita'
        }, true);
      }
    }
  }, [location]);

  useEffect(() => {
    let scrollTracked = false;
    const handleScroll = () => {
      if (!scrollTracked) {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight > 0) {
          const scrollPercent = (window.scrollY / scrollHeight) * 100;
          if (scrollPercent >= 75) {
            if ((window as any).trackEvent) {
              (window as any).trackEvent('scroll_depth_75', {
                'event_category': 'engagement',
                'event_label': 'Scroll 75%'
              });
            }
            scrollTracked = true;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    const timer = setTimeout(() => {
      if ((window as any).trackEvent) {
        (window as any).trackEvent('high_engagement_30s', {
          'event_category': 'engagement',
          'event_label': 'User stayed 30s'
        });
      }
    }, 30000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [location.pathname]);

  return null;
};

const App: React.FC = () => {
  useEffect(() => {
    // Forçar redirecionamento para o home ao carregar a aplicação
    if (window.location.hash !== '#/' && window.location.hash !== '') {
      window.location.hash = '#/';
    }
  }, []);

  return (
    <ContentProvider>
      <HashRouter>
        <ScrollToTop />
        <PixelRouteTracker />
        <Routes>
          <Route path="/admin" element={<Suspense fallback={<PageLoader />}><Admin /></Suspense>} />
          <Route path="/" element={<Layout><Suspense fallback={<PageLoader />}><Home /></Suspense></Layout>} />
          <Route path="/equipa" element={<Layout><Suspense fallback={<PageLoader />}><Team /></Suspense></Layout>} />
          <Route path="/clinica" element={<Layout><Suspense fallback={<PageLoader />}><Clinic /></Suspense></Layout>} />
          <Route path="/contactos" element={<Layout><Suspense fallback={<PageLoader />}><Contact /></Suspense></Layout>} />
          <Route path="/marcacoes" element={<Layout><Suspense fallback={<PageLoader />}><Appointments /></Suspense></Layout>} />
          <Route path="/campanhas" element={<Layout><Suspense fallback={<PageLoader />}><Campaigns /></Suspense></Layout>} />
          <Route path="/cookies" element={<Layout><Suspense fallback={<PageLoader />}><CookiesPolicy /></Suspense></Layout>} />
          <Route path="/privacidade" element={<Layout><Suspense fallback={<PageLoader />}><PrivacyPolicy /></Suspense></Layout>} />
          <Route path="/termos" element={<Layout><Suspense fallback={<PageLoader />}><TermsAndConditions /></Suspense></Layout>} />
          <Route path="/obrigado" element={<Layout><Suspense fallback={<PageLoader />}><ThankYou /></Suspense></Layout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </ContentProvider>
  );
};

export default App;
