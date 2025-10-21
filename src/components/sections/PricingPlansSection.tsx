import { Heart, Calendar } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  }
};

interface PricingPlansSectionProps {
  onBookingClick: () => void;
}

export function PricingPlansSection({ onBookingClick }: PricingPlansSectionProps) {
  return (
    <section id="plans" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 bg-sage/10 rounded-full mb-6">
            <span className="text-sage font-medium text-sm tracking-wide">Pricing Plans</span>
          </div>
          <h2 className="font-serif text-4xl lg:text-6xl text-charcoal font-bold mb-6 leading-tight">
            Choose Your Healing Plan
          </h2>
          <p className="text-lg text-charcoal/60 max-w-2xl mx-auto font-light leading-relaxed">
            Flexible plans designed to support your wellness journey
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16 max-w-5xl mx-auto"
        >
          {/* Essential Plan */}
          <motion.div
            variants={scaleIn}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl hover:shadow-sage/10 transition-all duration-500 border border-sage/10 group"
          >
            <div className="mb-8">
              <div className="inline-flex p-4 bg-gradient-to-br from-sage/20 to-sage/10 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                <Heart className="w-10 h-10 text-sage" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-3xl text-charcoal mb-4 font-bold">Essential Plan</h3>
            </div>
            <ul className="space-y-4 text-charcoal/70 font-light text-[15px] mb-8">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage text-xs">✓</span>
                </div>
                <span>Two online consultations per month</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage text-xs">✓</span>
                </div>
                <span>Personalized Ayurvedic plan</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage text-xs">✓</span>
                </div>
                <span>WhatsApp / Email support</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage text-xs">✓</span>
                </div>
                <span>Monthly review</span>
              </li>
            </ul>
            <button
              onClick={onBookingClick}
              className="mt-auto w-full px-8 py-4 bg-white text-charcoal border-2 border-sage/30 rounded-full hover:bg-sage hover:text-white hover:border-sage transition-all duration-300 font-medium text-base tracking-wide"
            >
              Learn More
            </button>
          </motion.div>

          {/* Focused Plan */}
          <motion.div
            variants={scaleIn}
            whileHover={{ y: -10, scale: 1.05 }}
            className="bg-gradient-to-br from-sage/5 via-white to-sage/10 rounded-3xl p-8 lg:p-10 shadow-2xl border-2 border-sage relative overflow-hidden transform md:scale-105 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 bg-gradient-to-r from-sage to-earthBrown text-white px-6 py-2.5 rounded-bl-2xl text-sm font-semibold tracking-wide shadow-lg">
              ⭐ Most Popular
            </div>
            <div className="mb-8 mt-6">
              <div className="inline-flex p-4 bg-gradient-to-br from-sage/30 to-sage/20 rounded-2xl mb-6 shadow-md">
                <Calendar className="w-10 h-10 text-sage" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-3xl text-charcoal mb-4 font-bold">Focused Plan</h3>
            </div>
            <ul className="space-y-4 text-charcoal/70 font-light text-[15px] mb-8">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sage/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage text-xs font-bold">✓</span>
                </div>
                <span>Weekly consultations</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sage/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage text-xs font-bold">✓</span>
                </div>
                <span>Tailored guidance on diet & lifestyle</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sage/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage text-xs font-bold">✓</span>
                </div>
                <span>Unlimited text support</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sage/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage text-xs font-bold">✓</span>
                </div>
                <span>Weekly tracking</span>
              </li>
            </ul>
            <button
              onClick={onBookingClick}
              className="mt-auto w-full px-8 py-4 bg-gradient-to-r from-sage to-earthBrown text-white rounded-full hover:shadow-xl hover:shadow-sage/40 transition-all duration-300 font-semibold text-base tracking-wide"
            >
              Learn More
            </button>
          </motion.div>
        </motion.div>

        <div className="bg-beige rounded-2xl p-8 text-center">
          <p className="text-charcoal/80 font-light text-lg">
            <span className="font-medium">Add-ons:</span> Herbal medicines shipped · Customized meal plans · Meditation & breathwork recordings
          </p>
        </div>
      </div>
    </section>
  );
}
