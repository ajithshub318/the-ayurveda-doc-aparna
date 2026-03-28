import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '../../assets/DSC00414.jpg';

interface HeroSectionProps {
  onBookingClick: () => void;
  onContactClick: () => void;
}

export function HeroSection({ onBookingClick, onContactClick }: HeroSectionProps) {
  return (
    <>
    {/* 21-Day Challenge Banner */}
    <a
      href="/my21"
      className="block w-full bg-gradient-to-r from-[#E07A5F] to-[#C45B4A] text-white text-center py-3 px-4 relative overflow-hidden group mt-16 sm:mt-20 lg:mt-24"
      style={{ zIndex: 40 }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none text-2xl flex items-center justify-center gap-6">
        <span>🍬</span><span>🍭</span><span>🍩</span><span>🍰</span><span>🍦</span>
      </div>
      <div className="relative flex items-center justify-center gap-3 flex-wrap">
        <span className="bg-white/20 text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full uppercase">Live Now</span>
        <span className="font-medium text-sm sm:text-base">
          Join me for the <strong className="font-bold">21-Day Sugar Cut Challenge</strong>
        </span>
        <span className="text-white/80 text-sm group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </a>
    <section aria-label="Dr. Aparna Albert - Ayurveda Doctor in Trivandrum, Kerala" className="relative min-h-screen flex items-center bg-ivory overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #4A4340 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 w-full relative">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 sm:space-y-8 lg:space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 check-leaf bg-forest/10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-forest"></div>
              </div>
              <span className="text-forest font-medium text-[10px] sm:text-xs tracking-[0.15em] uppercase">Certified Ayurvedic Practitioner</span>
            </motion.div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl xl:text-8xl text-charcoal leading-[1.05] font-medium tracking-tight">
              Dr. Aparna Albert — Your body already knows how to
              <span className="text-forest italic"> heal.</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-charcoal leading-relaxed max-w-lg font-light">
              Most metabolic issues begin quietly — often in your early twenties. Tiredness after meals, bloating, acne, irregular sleep, stubborn belly fat — they're not random. They're your body asking for attention. When you start listening early, healing becomes simple and natural. As an Ayurveda doctor in Trivandrum, I help you do that through <span className="font-semibold text-forest">personalized Ayurvedic treatment</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 sm:pt-4">
              <button
                onClick={onBookingClick}
                aria-label="Book Ayurvedic consultation on WhatsApp"
                className="btn-leaf btn-glow group px-8 sm:px-10 py-4 sm:py-5 bg-charcoal text-ivory font-medium text-sm tracking-[0.08em] shadow-lg shadow-charcoal/10 hover:shadow-xl hover:shadow-charcoal/20 flex items-center justify-center gap-3"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Consult with me
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
              <button
                onClick={onContactClick}
                aria-label="Learn more about Ayurvedic consultation"
                className="btn-leaf group px-8 sm:px-10 py-4 sm:py-5 bg-transparent text-charcoal border-2 border-charcoal/15 font-medium text-sm tracking-[0.08em] hover:border-ocean hover:text-ocean flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-ocean/10"
              >
                Learn more
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            <div className="flex items-center gap-6 sm:gap-10 pt-4 sm:pt-8 border-t border-charcoal/10">
              {[
                { value: "250+", label: "Happy Clients" },
                { value: "4+", label: "Years Experience" },
                { value: "4.9", label: "Rating" }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-6 sm:gap-10">
                  <div>
                    <div className="text-2xl sm:text-4xl font-serif font-semibold text-forest mb-1">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs text-charcoal tracking-[0.12em] uppercase font-medium">{stat.label}</div>
                  </div>
                  {i < 2 && <div className="w-px h-8 sm:h-12 bg-charcoal/10"></div>}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative h-[350px] sm:h-[450px] lg:h-[700px]">
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-full h-full border-2 border-ocean/25 rounded-[2rem_0.5rem_2rem_0.5rem]"></div>
              <div className="relative w-full h-full overflow-hidden rounded-[2rem_0.5rem_2rem_0.5rem]">
                <img
                  src={heroImage}
                  alt="Dr. Aparna Albert - Ayurveda Doctor in Trivandrum, Kerala"
                  className="w-full h-full object-cover"
                  width={800}
                  height={1000}
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/10 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 bg-terra text-white px-5 sm:px-8 py-3 sm:py-5 rounded-[1.5rem_0.5rem_1.5rem_0.5rem] shadow-lg shadow-terra/20">
                <p className="font-serif text-sm sm:text-lg italic">Kerala, India</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
}
