import { motion, Variants } from 'framer-motion';

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

export function HowIWorkSection() {
  const benefits = [
    "Understanding your body's unique patterns",
    "Creating simple, sustainable daily practices",
    "Personalized nutrition that feels nourishing",
    "Gentle support through life's transitions"
  ];

  return (
    <section id="services" className="py-20 lg:py-28 bg-gradient-to-br from-beige/30 to-sage/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1"
          >
            <img
              src="https://images.pexels.com/photos/6000065/pexels-photo-6000065.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Ayurvedic herbal tea"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="space-y-6 order-1 lg:order-2"
          >
            <h2 className="font-serif text-4xl lg:text-5xl text-charcoal font-bold leading-tight">
              How I Work
            </h2>
            <p className="text-lg text-charcoal/70 leading-relaxed">
              I guide you through understanding your body's signals, creating practical steps and rituals that restore balance, energy, and clarity.
            </p>

            <div className="space-y-4 pt-4">
              {benefits.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-sage/20 flex items-center justify-center">
                    <span className="text-sage text-sm">✓</span>
                  </div>
                  <span className="text-charcoal/80">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
