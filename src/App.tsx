import { useState, useEffect } from 'react';
import { Modal } from './components/Modal';
import { ContactForm } from './components/ContactForm';
import { BookingForm } from './components/BookingForm';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { WhatIDoSection } from './components/sections/WhatIDoSection';
import { HowIWorkSection } from './components/sections/HowIWorkSection';
import { HealingNeedsSpaceSection } from './components/sections/HealingNeedsSpaceSection';
import { PricingPlansSection } from './components/sections/PricingPlansSection';
import { InPersonHealingSection } from './components/sections/InPersonHealingSection';
import { AboutSection } from './components/sections/AboutSection';
import { WordsReflectionsSection } from './components/sections/WordsReflectionsSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { FinalInvitationSection } from './components/sections/FinalInvitationSection';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleContactSuccess = () => {
    setIsContactOpen(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  const handleBookingSuccess = () => {
    setIsBookingOpen(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation onBookingClick={() => setIsBookingOpen(true)} />

      <HeroSection
        onBookingClick={() => setIsBookingOpen(true)}
        onContactClick={() => setIsContactOpen(true)}
      />

      <WhatIDoSection />

      <HowIWorkSection />

      <HealingNeedsSpaceSection onContactClick={() => setIsContactOpen(true)} />

      <PricingPlansSection onBookingClick={() => setIsBookingOpen(true)} />

      <InPersonHealingSection />

      <AboutSection />

      <WordsReflectionsSection />

      <TestimonialsSection />

      <FinalInvitationSection
        onBookingClick={() => setIsBookingOpen(true)}
        onContactClick={() => setIsContactOpen(true)}
      />

      <Footer
        onContactClick={() => setIsContactOpen(true)}
        onBookingClick={() => setIsBookingOpen(true)}
      />

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed bottom-8 right-8 z-[110] bg-sage text-ivory px-8 py-4 rounded-full shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="font-medium">Thank you! We'll get back to you soon.</p>
        </div>
      )}

      {/* Modals */}
      <Modal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} title="Get in Touch">
        <ContactForm onSuccess={handleContactSuccess} />
      </Modal>

      <Modal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} title="Book Appointment">
        <BookingForm onSuccess={handleBookingSuccess} />
      </Modal>
    </div>
  );
}

export default App;
