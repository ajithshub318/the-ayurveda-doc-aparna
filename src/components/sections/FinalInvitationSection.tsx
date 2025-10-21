import { motion } from 'framer-motion';

interface FinalInvitationSectionProps {
  onBookingClick: () => void;
  onContactClick: () => void;
}

export function FinalInvitationSection({ onBookingClick, onContactClick }: FinalInvitationSectionProps) {
  return (
    <section className="relative py-32 px-6 bg-gradient-to-br from-mutedBrown via-earthBrown to-mutedBrown text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,184,156,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(123,94,87,0.1),transparent_50%)]"></div>
      <div className="max-w-3xl mx-auto space-y-12 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-tight font-light"
        >
          If something here feels like what you've been searching for, let's talk.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6"
        >
          <button
            onClick={onBookingClick}
            className="group px-12 py-5 bg-ivory text-charcoal rounded-full hover:bg-white transition-all duration-300 font-semibold text-base tracking-wide shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            <span className="flex items-center gap-2">
              Book a Consultation
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>
          <button
            onClick={onContactClick}
            className="px-12 py-5 bg-transparent text-ivory border-2 border-ivory rounded-full hover:bg-ivory/10 hover:border-white transition-all duration-300 font-medium text-base tracking-wide backdrop-blur-sm"
          >
            Write to me
          </button>
        </motion.div>
      </div>
    </section>
  );
}
