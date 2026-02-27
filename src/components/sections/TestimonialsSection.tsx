import { motion, Variants } from 'framer-motion';
import { Quote } from 'lucide-react';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Her consultation felt like therapy and science in one.",
      author: "Meera S.",
      detail: "Hormonal Health"
    },
    {
      quote: "I finally understood what my body was trying to tell me.",
      author: "Priya K.",
      detail: "Gut Health"
    },
    {
      quote: "Dr. Aparna's approach is gentle yet incredibly effective. My digestion issues resolved within weeks.",
      author: "Anjali R.",
      detail: "Digestive Wellness"
    },
    {
      quote: "She doesn't just treat symptoms — she listens deeply and finds the root cause.",
      author: "Sneha M.",
      detail: "Lifestyle Guidance"
    },
    {
      quote: "The personalised meal plan changed everything for me. I feel lighter and more energetic.",
      author: "Divya T.",
      detail: "Nutrition Plan"
    },
    {
      quote: "I was skeptical at first, but the results spoke for themselves. Truly life-changing.",
      author: "Lakshmi P.",
      detail: "Detox Program"
    }
  ];

  return (
    <section id="testimonials" aria-label="Client testimonials for Ayurvedic consultation" className="py-16 sm:py-24 lg:py-32 bg-ivory relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="divider-leaf justify-center text-forest mb-6 sm:mb-8">
            <span className="text-forest text-xs tracking-[0.2em] uppercase font-medium">Testimonials</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-medium mb-4 leading-tight">
            What Our Clients <span className="italic text-forest">Say</span>
          </h2>
          <p className="text-base sm:text-lg text-charcoal max-w-2xl mx-auto font-light leading-relaxed">
            Real stories from people who transformed their health with Ayurveda
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white rounded-[1.5rem_0.5rem_1.5rem_0.5rem] p-5 sm:p-6 relative group hover:shadow-lg hover:shadow-forest/5 transition-all duration-500 border border-sand"
            >
              <Quote className="w-5 h-5 text-forest/20 mb-3" />
              <p className="font-serif text-base sm:text-lg text-charcoal leading-relaxed font-light mb-4">
                {testimonial.quote}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-charcoal text-sm font-medium">{testimonial.author}</p>
                  <p className="text-walnut text-xs font-light">{testimonial.detail}</p>
                </div>
                <div className="w-8 h-[1.5px] bg-forest/30 rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
