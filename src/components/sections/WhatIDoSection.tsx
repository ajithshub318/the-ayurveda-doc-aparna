import { Heart, Calendar, MessageCircle, Phone } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export function WhatIDoSection() {
  const features = [
    {
      icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6" />,
      number: "01",
      title: "1:1 Online Consultations",
      description: "Personalised sessions where we explore your body's unique constitution and create a tailored treatment plan that works for you"
    },
    {
      icon: <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />,
      number: "02",
      title: "Nutrition & Lifestyle Guidance",
      description: "Simple, practical adjustments to your daily routines and personalised dietary recommendations"
    },
    {
      icon: <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      number: "03",
      title: "Women's Health Support",
      description: "Compassionate care for women with special attention to hormonal imbalances"
    },
    {
      icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6" />,
      number: "04",
      title: "Detox & Rejuvenation Plans",
      description: "Gentle gut cleansing programs for general wellness as a reset to the modern life"
    }
  ];

  return (
    <section id="services" aria-label="Ayurvedic consultation and wellness services" className="py-16 sm:py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12 sm:mb-20"
        >
          <div className="divider-leaf justify-center text-forest mb-6 sm:mb-8">
            <span className="text-forest text-xs tracking-[0.2em] uppercase font-medium">What I Do</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl text-charcoal font-medium mb-6 sm:mb-8 leading-tight">
            Personalized Ayurvedic Wellness That<br className="hidden sm:block" /> Fits Your <span className="text-forest italic">Busy Life</span>
          </h2>
          <p className="text-base sm:text-lg text-charcoal max-w-2xl mx-auto font-light leading-relaxed">
            I work with classical Ayurvedic principles, but always in a way that fits your busy life and your body. Together, we look at what your body truly needs, and create simple, effective steps to bring balance back.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="group p-6 sm:p-8 lg:p-10 bg-sand/40 rounded-[2rem_0.75rem_2rem_0.75rem] hover:bg-charcoal cursor-default relative transition-colors duration-700 shadow-sm hover:shadow-xl hover:shadow-charcoal/10"
            >
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 check-leaf bg-forest/10 group-hover:bg-white/15 flex items-center justify-center transition-all duration-700">
                  <div className="text-forest group-hover:text-white transition-colors duration-700">
                    {feature.icon}
                  </div>
                </div>
                <span className="font-serif text-2xl sm:text-3xl text-charcoal/10 group-hover:text-white/20 transition-colors duration-700">{feature.number}</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-charcoal mb-3 sm:mb-4 group-hover:text-white transition-colors duration-700 font-medium">{feature.title}</h3>
              <p className="text-charcoal/80 leading-relaxed font-light text-sm sm:text-[15px] group-hover:text-white/90 transition-colors duration-700">{feature.description}</p>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-terra group-hover:w-full transition-all duration-700 rounded-full"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
