import { motion, Variants } from 'framer-motion';
import aboutImage from '../../assets/DSC00414.jpg';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-sand/40">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="relative"
        >
          <div className="relative h-[350px] sm:h-[500px] lg:h-[700px]">
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-full h-full border-2 border-forest/15 rounded-[2rem_0.5rem_2rem_0.5rem]"></div>
            <div className="relative w-full h-full overflow-hidden rounded-[2rem_0.5rem_2rem_0.5rem]">
              <img
                src={aboutImage}
                alt="Dr. Aparna - Ayurvedic Doctor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="space-y-6 sm:space-y-8"
        >
          <div className="divider-leaf text-forest">
            <span className="text-forest text-xs tracking-[0.2em] uppercase font-medium">About</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-charcoal leading-tight font-medium">
            Dr. <span className="text-forest italic">Aparna</span>
          </h2>
          <p className="text-base sm:text-xl text-charcoal leading-relaxed font-light">
            I'm Dr. Aparna, an Ayurvedic doctor trained in genomic technologies. I work by understanding your unique body and mind, and bringing forward the authentic Kerala Ayurveda I grew up around — in a way that fits into real, busy lives.
          </p>
          <p className="text-base sm:text-xl text-charcoal leading-relaxed font-light">
            I prefer gentle, plant-based medicines over stronger mineral preparations, and I focus on lifestyle, diet, and classical Ayurvedic treatment that supports your body without overwhelming it.
          </p>
          <div className="border-l-[3px] border-forest pl-5 sm:pl-6">
            <p className="text-base sm:text-xl text-charcoal leading-relaxed font-serif italic">
              Real change begins when your body is given time and the right guidance.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
