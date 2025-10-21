import { motion, Variants } from 'framer-motion';
import aparna2Image from '../../assets/aparna2.jpg';

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export function AboutSection() {
  return (
    <section className="py-32 px-6 bg-beige/40">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scaleIn}
          className="relative h-[500px] lg:h-[700px]"
        >
          <img
            src={aparna2Image}
            alt="Dr. Aparna - Ayurvedic Doctor"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="space-y-8"
        >
          <h2 className="font-serif text-5xl lg:text-6xl text-charcoal leading-tight font-light">
            About
          </h2>
          <p className="text-xl text-charcoal/80 leading-relaxed font-light">
            I'm Dr. Aparna, an Ayurvedic doctor passionate about helping people reconnect with their body's wisdom. I combine classical Ayurveda, practical routines, and personalized care to guide you to balance, energy, and clarity.
          </p>
          <p className="text-xl text-charcoal/70 leading-relaxed font-light italic">
            Healing begins when you stop rushing yourself.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
