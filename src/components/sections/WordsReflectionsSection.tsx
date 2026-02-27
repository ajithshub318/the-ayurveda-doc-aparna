import { motion, Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import readingImage from '../../assets/DSC00630.jpg';
import waveImage from '../../assets/DSC00501.jpg';
import beachImage from '../../assets/DSC00453.jpg';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export function WordsReflectionsSection() {
  const articles = [
    {
      title: "Understanding Your Dosha",
      description: "Learn how your unique constitution shapes your health journey through dosha assessment",
      image: readingImage,
      alt: "Ayurvedic dosha assessment and body constitution guide",
      type: "Read"
    },
    {
      title: "Daily Rituals for Balance",
      description: "Simple Ayurvedic practices to align with nature's rhythms",
      image: beachImage,
      alt: "Daily Ayurvedic wellness rituals for holistic balance",
      type: "Watch"
    },
    {
      title: "Food as Medicine",
      description: "Discovering the healing power of mindful eating in Ayurveda",
      image: waveImage,
      alt: "Ayurvedic dietary guidance and food as medicine",
      type: "Read"
    }
  ];

  return (
    <section aria-label="Ayurvedic wellness insights and articles" className="py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-10 sm:mb-20"
        >
          <div className="divider-leaf justify-center text-forest mb-6 sm:mb-8">
            <span className="text-forest text-xs tracking-[0.2em] uppercase font-medium">Insights & Stories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl text-charcoal font-medium mb-6 sm:mb-8 leading-tight">
            Words & <span className="text-forest italic">Reflections</span>
          </h2>
          <p className="text-base sm:text-lg text-charcoal max-w-2xl mx-auto font-light leading-relaxed">
            I write to remind you that balance isn't a destination.<br className="hidden sm:block" />
            <span className="font-serif italic">It's a relationship — with yourself.</span>
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
        >
          {articles.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="relative h-52 sm:h-72 overflow-hidden rounded-[2rem_0.75rem_2rem_0.75rem] mb-4 sm:mb-6">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  width={600}
                  height={400}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 check-leaf bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 shadow-lg">
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-forest" />
                </div>
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                  <span className="bg-charcoal text-ivory text-[9px] sm:text-[10px] tracking-[0.15em] uppercase font-bold px-4 py-2 rounded-[1rem_0.25rem_1rem_0.25rem] inline-block shadow-md">{item.type}</span>
                </div>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal mb-2 sm:mb-3 group-hover:text-forest transition-colors font-medium">
                {item.title}
              </h3>
              <p className="text-charcoal leading-relaxed text-sm sm:text-[15px] font-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
