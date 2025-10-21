import { motion, Variants } from 'framer-motion';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
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

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Her consultation felt like therapy and science in one.",
      author: "Patient Review"
    },
    {
      quote: "I finally understood what my body was trying to tell me.",
      author: "Patient Review"
    }
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-gradient-to-br from-beige/20 to-sage/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 bg-sage/10 rounded-full mb-6">
            <span className="text-sage font-medium text-sm tracking-wide">Testimonials</span>
          </div>
          <h2 className="font-serif text-4xl lg:text-6xl text-charcoal font-bold mb-6 leading-tight">
            What Our Clients Say
          </h2>
          <p className="text-lg text-charcoal/60 max-w-2xl mx-auto font-light leading-relaxed">
            Real stories from people who transformed their health with Ayurveda
          </p>
        </motion.div>
        <div className="space-y-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleIn}
              whileHover={{ y: -5, scale: 1.01 }}
              className="bg-white rounded-3xl p-10 lg:p-16 shadow-2xl hover:shadow-sage/10 transition-all duration-500 border border-sage/10 relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-40 h-40 ${index === 0 ? 'bg-sage/5' : 'bg-earthBrown/5'} rounded-full blur-3xl`}></div>
              <div className="relative">
                <div className="text-sage text-8xl font-serif mb-6 leading-none opacity-30">"</div>
                <p className="font-serif text-2xl lg:text-4xl text-charcoal leading-relaxed font-light mb-8">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-px bg-gradient-to-r from-sage to-transparent"></div>
                  <p className="text-charcoal/60 font-light text-base">— {testimonial.author}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
