import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import aparnaImage from '../../assets/aparna.png';

interface HeroSectionProps {
  onBookingClick: () => void;
  onContactClick: () => void;
}

export function HeroSection({ onBookingClick, onContactClick }: HeroSectionProps) {
  return (
    <section className="relative pt-20 lg:pt-24 bg-gradient-to-br from-sage/5 via-ivory to-beige/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sage/10 to-sage/5 rounded-full border border-sage/20">
              <div className="w-2 h-2 bg-sage rounded-full animate-pulse"></div>
              <span className="text-sage font-medium text-sm tracking-wide">Certified Ayurvedic Practitioner</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-charcoal leading-[1.15] font-bold tracking-tight">
              Your body always knows what it needs.
              <span className="block text-sage mt-3 bg-gradient-to-r from-sage to-sage/80 bg-clip-text text-transparent">I help you notice it, make sense of it, and take steps that actually help.</span>
            </h1>

            <p className="text-lg lg:text-xl text-charcoal/70 leading-relaxed max-w-xl font-light">
              From fatigue and digestive discomfort to hormonal shifts or emotional unrest, your body is sending signals. I help you understand them — gently, clearly, and practically.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={onBookingClick}
                className="group px-8 py-4 bg-gradient-to-r from-sage to-sage/90 text-white rounded-full hover:shadow-xl hover:shadow-sage/30 transition-all duration-300 font-medium text-base transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Consult with me
              </button>
              <button
                onClick={onContactClick}
                className="px-8 py-4 bg-white text-charcoal border-2 border-sage/30 rounded-full hover:bg-sage/5 hover:border-sage transition-all duration-300 font-medium text-base"
              >
                Learn more
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-sage/20">
              <div className="text-center sm:text-left">
                <div className="text-4xl font-bold bg-gradient-to-r from-sage to-earthBrown bg-clip-text text-transparent mb-1">500+</div>
                <div className="text-sm text-charcoal/60 font-medium">Happy Clients</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-4xl font-bold bg-gradient-to-r from-sage to-earthBrown bg-clip-text text-transparent mb-1">10+</div>
                <div className="text-sm text-charcoal/60 font-medium">Years Experience</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-4xl font-bold bg-gradient-to-r from-sage to-earthBrown bg-clip-text text-transparent mb-1">4.9</div>
                <div className="text-sm text-charcoal/60 font-medium">Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[500px] lg:h-[600px]">
              <img
                src={aparnaImage}
                alt="Dr. Aparna - Ayurvedic Doctor"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
