import { useState, useEffect, lazy, Suspense } from 'react';
import { Modal } from './components/Modal';
import { ContactForm } from './components/ContactForm';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HeroSection } from './components/sections/HeroSection';

// Lazy load below-the-fold sections for better initial load performance
const WhatIDoSection = lazy(() => import('./components/sections/WhatIDoSection').then(m => ({ default: m.WhatIDoSection })));
const HowIWorkSection = lazy(() => import('./components/sections/HowIWorkSection').then(m => ({ default: m.HowIWorkSection })));
const HealingNeedsSpaceSection = lazy(() => import('./components/sections/HealingNeedsSpaceSection').then(m => ({ default: m.HealingNeedsSpaceSection })));
const PricingPlansSection = lazy(() => import('./components/sections/PricingPlansSection').then(m => ({ default: m.PricingPlansSection })));
const InPersonHealingSection = lazy(() => import('./components/sections/InPersonHealingSection').then(m => ({ default: m.InPersonHealingSection })));
const AboutSection = lazy(() => import('./components/sections/AboutSection').then(m => ({ default: m.AboutSection })));
const WordsReflectionsSection = lazy(() => import('./components/sections/WordsReflectionsSection').then(m => ({ default: m.WordsReflectionsSection })));
const TestimonialsSection = lazy(() => import('./components/sections/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const FinalInvitationSection = lazy(() => import('./components/sections/FinalInvitationSection').then(m => ({ default: m.FinalInvitationSection })));

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleContactSuccess = () => {
    setIsContactOpen(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const WHATSAPP_URL = 'https://wa.me/917012399593';

  const handleWhatsAppClick = () => {
    window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation onBookingClick={() => handleWhatsAppClick()} />

      <main>
        <HeroSection
          onBookingClick={() => handleWhatsAppClick()}
          onContactClick={() => setIsContactOpen(true)}
        />

        <Suspense fallback={<div className="min-h-[200px]" />}>
          <WhatIDoSection />

          <HowIWorkSection />

          <PricingPlansSection onBookingClick={() => handleWhatsAppClick()} />

          <HealingNeedsSpaceSection onBookingClick={() => handleWhatsAppClick()} />

          <InPersonHealingSection />

          <AboutSection />

          <WordsReflectionsSection />

          <TestimonialsSection />

          <FinalInvitationSection
            onBookingClick={() => handleWhatsAppClick()}
          />
        </Suspense>
      </main>

      <Footer
        onContactClick={() => setIsContactOpen(true)}
        onBookingClick={() => handleWhatsAppClick()}
      />

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed bottom-8 right-8 z-[110] bg-sage text-ivory px-8 py-4 rounded-full shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="font-medium">Thank you! We'll get back to you soon.</p>
        </div>
      )}

      {/* Contact Modal */}
      <Modal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} title="Get in Touch">
        <ContactForm onSuccess={handleContactSuccess} />
      </Modal>
    </div>
  );
}

export default App;
