import { Heart, Calendar, MessageCircle, Phone } from 'lucide-react';
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

export function WhatIDoSection() {
  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "1:1 Consultations",
      description: "Personalized sessions where we explore your body's needs and create a tailored approach that works for you"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Nutrition & Lifestyle Guidance",
      description: "Simple, practical adjustments to your daily routines and diet that align with your body's natural rhythms"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Postnatal & Women's Health Support",
      description: "Compassionate care for women through all life phases, with special attention to postnatal recovery and hormonal balance"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Detox & Rejuvenation Plans",
      description: "Gentle cleansing programs designed to reset your system and restore vitality without extremes"
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 bg-sage/10 rounded-full mb-6">
            <span className="text-sage font-medium text-sm tracking-wide">What I Do</span>
          </div>
          <h2 className="font-serif text-4xl lg:text-6xl text-charcoal font-bold mb-6 leading-tight">
            Personalized Ayurveda That Fits Your Life
          </h2>
          <p className="text-lg text-charcoal/60 max-w-2xl mx-auto font-light leading-relaxed">
            I work with classical Ayurvedic principles, but always in a way that fits your life and your body. Together, we look at what your body truly needs, and create simple, effective steps to bring balance back.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-gradient-to-br from-white to-sage/5 rounded-3xl p-8 text-center hover:shadow-2xl hover:shadow-sage/10 transition-all duration-500 border border-sage/10"
            >
              <div className="inline-flex p-5 bg-gradient-to-br from-sage/20 to-sage/10 rounded-2xl mb-6 text-sage group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-xl text-charcoal mb-3 group-hover:text-sage transition-colors">{feature.title}</h3>
              <p className="text-charcoal/60 leading-relaxed font-light text-[15px]">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
