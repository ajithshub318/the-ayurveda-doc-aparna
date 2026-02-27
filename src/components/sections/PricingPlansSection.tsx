import { ArrowRight, Leaf } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

interface PricingPlansSectionProps {
  onBookingClick: () => void;
}

export function PricingPlansSection({ onBookingClick }: PricingPlansSectionProps) {
  return (
    <section id="plans" className="py-16 sm:py-24 lg:py-32 bg-sand/30 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="divider-leaf justify-center text-forest mb-6 sm:mb-8">
            <span className="text-forest text-xs tracking-[0.2em] uppercase font-medium">Healing Plans</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl text-charcoal font-medium mb-4 sm:mb-6 leading-tight">
            Choose Your <span className="italic text-forest">Healing</span> Plan
          </h2>
          <p className="text-base sm:text-lg text-charcoal max-w-2xl mx-auto font-light leading-relaxed">
            Flexible plans designed to support your wellness journey
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
          className="grid sm:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto mb-8 sm:mb-12"
        >
          {/* Essential Plan */}
          <div className="bg-white rounded-[2rem_0.75rem_2rem_0.75rem] p-6 sm:p-8 lg:p-10 group hover:shadow-xl hover:shadow-forest/5 transition-all duration-700 shadow-md shadow-charcoal/5 border border-sand relative">
            <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-[2px] bg-gradient-to-r from-transparent via-ocean/40 to-transparent rounded-full"></div>
            <div className="mb-6 sm:mb-8">
              <div className="w-10 h-10 check-leaf bg-ocean/10 flex items-center justify-center mb-4">
                <Leaf className="w-4 h-4 text-ocean" />
              </div>
              <span className="text-ocean text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium">Foundation</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal mt-2 font-medium">Essential Plan</h3>
            </div>
            <ul className="space-y-3 sm:space-y-4 mb-8">
              {["Two online consultations per month", "Personalized Ayurvedic plan", "WhatsApp / Email support", "Monthly review"].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-ocean/10 flex items-center justify-center mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-ocean"></div>
                  </div>
                  <span className="text-charcoal font-light text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={onBookingClick}
              className="btn-leaf group/btn w-full py-3 sm:py-3.5 border-2 border-charcoal/15 text-charcoal text-sm tracking-[0.08em] font-medium hover:bg-charcoal hover:text-ivory hover:border-charcoal flex items-center justify-center gap-3 transition-colors duration-500"
            >
              <span className="relative z-10 flex items-center gap-3">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Focused Plan */}
          <div className="bg-white rounded-[0.75rem_2rem_0.75rem_2rem] p-6 sm:p-8 lg:p-10 group hover:shadow-xl hover:shadow-terra/8 transition-all duration-700 shadow-lg shadow-terra/5 border border-terra/15 relative">
            <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-[2px] bg-gradient-to-r from-transparent via-terra to-transparent rounded-full"></div>
            <div className="absolute -top-3 right-6 sm:right-8">
              <span className="bg-forest text-white text-[9px] sm:text-[10px] tracking-[0.15em] uppercase font-bold px-4 py-1.5 rounded-[1rem_0.25rem_1rem_0.25rem] inline-block shadow-md shadow-forest/20">Popular</span>
            </div>
            <div className="mb-6 sm:mb-8">
              <div className="w-10 h-10 check-leaf bg-terra/10 flex items-center justify-center mb-4">
                <Leaf className="w-4 h-4 text-terra" />
              </div>
              <span className="text-terra text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium">Intensive</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal mt-2 font-medium">Focused Plan</h3>
            </div>
            <ul className="space-y-3 sm:space-y-4 mb-8">
              {["Weekly consultations", "Tailored guidance on diet & lifestyle", "Unlimited text support", "Weekly tracking"].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-terra/10 flex items-center justify-center mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-terra"></div>
                  </div>
                  <span className="text-charcoal font-light text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={onBookingClick}
              className="btn-leaf btn-glow group/btn w-full py-3 sm:py-3.5 bg-charcoal text-ivory text-sm tracking-[0.08em] font-medium hover:shadow-lg hover:shadow-charcoal/20 flex items-center justify-center gap-3"
            >
              <span className="relative z-10 flex items-center gap-3">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-forest/5 rounded-[1.5rem_0.5rem_1.5rem_0.5rem] border border-forest/10 p-5 sm:p-6 text-center"
        >
          <p className="text-charcoal font-light text-sm sm:text-base">
            <span className="font-medium text-forest">Add-ons:</span> Herbal medicines shipped · Customized meal plans · Meditation & breathwork recordings
          </p>
        </motion.div>
      </div>
    </section>
  );
}
