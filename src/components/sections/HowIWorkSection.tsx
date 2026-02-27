import { motion, Variants } from 'framer-motion';
import { Leaf } from 'lucide-react';
import howIWorkImage from '../../assets/DSC00603.jpg';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export function HowIWorkSection() {
  const benefits = [
    "Understanding your body's unique patterns",
    "Creating simple, sustainable daily practices",
    "Personalised dietary guidelines",
    "Gentle support through life's transitions"
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-sand/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="relative order-2 lg:order-1"
          >
            <div className="relative h-[300px] sm:h-[450px] lg:h-[650px]">
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-full h-full border-2 border-ocean/20 rounded-[0.5rem_2rem_0.5rem_2rem]"></div>
              <div className="relative w-full h-full overflow-hidden rounded-[0.5rem_2rem_0.5rem_2rem]">
                <img
                  src={howIWorkImage}
                  alt="Dr. Aparna by the Kerala backwaters"
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
            className="space-y-6 sm:space-y-8 order-1 lg:order-2"
          >
            <div className="divider-leaf text-forest">
              <span className="text-forest text-xs tracking-[0.2em] uppercase font-medium">My Approach</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl text-charcoal font-medium leading-tight">
              How I <span className="text-forest italic">Work</span>
            </h2>
            <p className="text-base sm:text-lg text-charcoal leading-relaxed font-light">
              I look closely at your symptoms, history, and blood work to understand the deeper cause of your condition. Then I create an Ayurvedic treatment plan tailored to your body's current state.
            </p>

            <div className="space-y-4 sm:space-y-5 pt-2 sm:pt-4">
              {benefits.map((item, index) => (
                <div key={index} className="flex items-center gap-3 sm:gap-4 group">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 check-leaf bg-forest flex items-center justify-center group-hover:bg-terra transition-colors duration-500 shadow-sm shadow-forest/20">
                    <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-charcoal font-light text-sm sm:text-[15px] group-hover:text-forest transition-colors duration-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
