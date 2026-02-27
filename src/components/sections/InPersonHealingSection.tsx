import { motion } from 'framer-motion';
import inPersonImage from '../../assets/DSC00493.jpg';

export function InPersonHealingSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-[350px] sm:h-[450px] lg:h-[600px] overflow-hidden rounded-[0.75rem_2rem_0.75rem_2rem] sm:rounded-[1rem_2.5rem_1rem_2.5rem]">
          <motion.img
            initial={{ scale: 1.05 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            src={inPersonImage}
            alt="Dr. Aparna at the beach - In-person healing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/30 to-transparent flex items-end">
            <div className="p-6 sm:p-10 lg:p-16 max-w-2xl">
              <div className="divider-leaf text-terra mb-4 sm:mb-6">
                <span className="text-terra text-xs tracking-[0.2em] uppercase font-medium">Kerala, India</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-white mb-3 sm:mb-6 font-medium leading-tight">
                In-Person <span className="italic">Healing</span>
              </h2>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light mb-2 sm:mb-4">
                For those needing immersive treatment, I help you find verified Ayurvedic centers across Kerala — chosen carefully based on your health condition, duration, and budget.
              </p>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light hidden sm:block">
                After your stay, you'll receive a free one-month online follow-up program to continue healing at home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
