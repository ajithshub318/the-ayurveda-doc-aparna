import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import healingImage from '../../assets/DSC00451.jpg';

interface HealingNeedsSpaceSectionProps {
  onBookingClick: () => void;
}

export function HealingNeedsSpaceSection({ onBookingClick }: HealingNeedsSpaceSectionProps) {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-ivory">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem_0.75rem_2rem_0.75rem] sm:rounded-[2.5rem_1rem_2.5rem_1rem]"
        >
          <div className="relative min-h-[500px] sm:h-[550px] lg:h-[600px]">
            <img
              src={healingImage}
              alt="Footprints on the beach - the journey of healing"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-deep/90 via-deep/70 to-deep/30"></div>

            <div className="relative flex items-center h-full">
              <div className="max-w-xl px-6 sm:px-10 lg:px-16 py-10 sm:py-0 space-y-4 sm:space-y-6">
                <div className="divider-leaf text-terra">
                  <span className="text-terra text-xs tracking-[0.2em] uppercase font-medium">Retreats & Treatment</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight font-medium">
                  Healing Needs <span className="italic">Space</span>
                </h2>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
                  Some things don't improve with quick fixes. They need attention, clarity, and the right environment to heal.
                </p>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
                  Food and lifestyle help a lot, but not always enough. Certain conditions need structured treatment or the comfort of an in-patient setting to truly improve.
                </p>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light hidden sm:block">
                  During a consultation, I understand what your body is going through — the symptoms, the patterns, the stress behind them. From there, I guide you toward the treatment plan, the number of days you may need, and the ideal place that fits your health goals and budget.
                </p>
                <p className="text-white font-serif text-lg sm:text-xl italic">
                  Healing feels different when it's tailored for you.
                </p>
                <button
                  onClick={onBookingClick}
                  className="btn-leaf btn-glow group mt-2 px-8 sm:px-10 py-4 sm:py-5 bg-ivory text-charcoal text-sm tracking-[0.08em] font-medium shadow-lg hover:shadow-xl flex items-center gap-3"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Book an Appointment
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
