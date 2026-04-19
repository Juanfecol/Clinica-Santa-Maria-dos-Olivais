
import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { ContentProvider } from './context/ContentContext';
import { CookieConsent } from './components/CookieConsent';

// Direct imports for primary pages to ensure immediate loading
import Home from './pages/Home';
import Appointments from './pages/Appointments';

// Lazy loading secondary pages for performance
const Team = lazy(() => import('./pages/Team'));
const Clinic = lazy(() => import('./pages/Clinic'));
const Contact = lazy(() => import('./pages/Contact'));
const Campaigns = lazy(() => import('./pages/Campaigns'));
const Admin = lazy(() => import('./pages/Admin'));
const CookiesPolicy = lazy(() => import('./pages/CookiesPolicy'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const Blog = lazy(() => import('./pages/Blog'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const QuoteCalculator = lazy(() => import('./pages/QuoteCalculator'));
import { ServiceTemplate } from './pages/ServiceTemplate';
import { FAQ } from './pages/FAQ';

// Loading fallback
const PageLoader = () => <div className="flex justify-center items-center h-screen text-clinic-blue font-bold">Carregando...</div>;

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
  return (
    <ContentProvider>
      <BrowserRouter>
        <CookieConsent />
        <Layout>
          <ScrollToTop />
          <PixelRouteTracker />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Suspense fallback={<PageLoader />}><Admin /></Suspense>} />
            <Route path="/equipa" element={<Suspense fallback={<PageLoader />}><Team /></Suspense>} />
            <Route path="/clinica" element={<Suspense fallback={<PageLoader />}><Clinic /></Suspense>} />
            <Route path="/contactos" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
            <Route path="/marcacoes" element={<Appointments />} />
            <Route path="/campanhas" element={<Suspense fallback={<PageLoader />}><Campaigns /></Suspense>} />
            <Route path="/cookies" element={<Suspense fallback={<PageLoader />}><CookiesPolicy /></Suspense>} />
            <Route path="/privacidade" element={<Suspense fallback={<PageLoader />}><PrivacyPolicy /></Suspense>} />
            <Route path="/termos" element={<Suspense fallback={<PageLoader />}><TermsAndConditions /></Suspense>} />
            <Route path="/obrigado" element={<Suspense fallback={<PageLoader />}><ThankYou /></Suspense>} />
            <Route path="/blog" element={<Suspense fallback={<PageLoader />}><Blog /></Suspense>} />
            <Route path="/casos-clinicos" element={<Suspense fallback={<PageLoader />}><CaseStudies /></Suspense>} />
            <Route path="/cotizador" element={<Suspense fallback={<PageLoader />}><QuoteCalculator /></Suspense>} />
            <Route path="/faq" element={<Suspense fallback={<PageLoader />}><FAQ /></Suspense>} />
            <Route path="/servicos/:slug" element={<ServiceTemplate />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ContentProvider>
  );
};

export default App;
