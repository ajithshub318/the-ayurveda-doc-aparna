import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ctaBgImage from '../../assets/DSC00481.jpg';

interface FinalInvitationSectionProps {
  onBookingClick: () => void;
}

export function FinalInvitationSection({ onBookingClick }: FinalInvitationSectionProps) {
  return (
    <section aria-label="Book an Ayurvedic consultation with Dr. Aparna Albert" className="relative py-20 sm:py-32 lg:py-40 px-4 sm:px-6 text-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={ctaBgImage}
          alt="Book an Ayurvedic consultation with Dr. Aparna Albert"
          className="w-full h-full object-cover"
          width={1400}
          height={600}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-charcoal/75"></div>
      </div>

      <div className="max-w-3xl mx-auto space-y-8 sm:space-y-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 sm:space-y-8"
        >
          <div className="divider-leaf justify-center text-forest">
            <span className="text-forest text-xs tracking-[0.2em] uppercase font-medium">Let's Begin</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory leading-tight font-medium px-2">
            If something here feels like what you've been searching for, <span className="italic">let's talk.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-2 sm:pt-4"
        >
          <button
            onClick={onBookingClick}
            aria-label="Book Ayurvedic consultation on WhatsApp"
            className="btn-leaf btn-glow group px-8 sm:px-12 py-4 sm:py-5 bg-ivory text-charcoal text-sm tracking-[0.08em] font-medium shadow-xl hover:shadow-2xl flex items-center gap-3"
          >
            <span className="relative z-10 flex items-center gap-3">
              Book a Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
          <a
            href="https://wa.me/917012399593"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Write to Dr. Aparna Albert on WhatsApp"
            className="btn-leaf group px-8 sm:px-12 py-4 sm:py-5 border-2 border-white/30 text-white text-sm tracking-[0.08em] font-medium hover:bg-white/10 hover:border-white/60 hover:shadow-lg flex items-center gap-3"
          >
            Write to me
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
