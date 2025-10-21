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

export function WordsReflectionsSection() {
  const articles = [
    {
      title: "Understanding Your Dosha",
      description: "Learn how your unique constitution shapes your health journey",
      image: "https://images.pexels.com/photos/1194218/pexels-photo-1194218.jpeg?auto=compress&cs=tinysrgb&w=800",
      type: "Read"
    },
    {
      title: "Daily Rituals for Balance",
      description: "Simple practices to align with nature's rhythms",
      image: "https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=800",
      type: "Watch"
    },
    {
      title: "Food as Medicine",
      description: "Discovering the healing power of mindful eating",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
      type: "Read"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 bg-sage/10 rounded-full mb-6">
            <span className="text-sage font-medium text-sm tracking-wide">Insights & Stories</span>
          </div>
          <h2 className="font-serif text-4xl lg:text-6xl text-charcoal font-bold mb-6 leading-tight">
            Words & Reflections
          </h2>
          <p className="text-lg text-charcoal/60 max-w-2xl mx-auto font-light leading-relaxed">
            I write to remind you that balance isn't a destination.<br/>
            <span className="italic">It's a relationship — with yourself.</span>
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {articles.map((item, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-sage/10 transition-all duration-500 group cursor-pointer border border-sage/10"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 right-4 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-sm font-medium text-sage shadow-lg">
                  {item.type}
                </div>
              </div>
              <div className="p-7">
                <h3 className="font-serif text-2xl text-charcoal mb-3 group-hover:text-sage transition-colors font-bold">
                  {item.title}
                </h3>
                <p className="text-charcoal/60 leading-relaxed text-[15px] font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
