import { useState, useEffect } from 'react';
import { Heart, Calendar, MessageCircle, Mail, Phone } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { Modal } from './components/Modal';
import { ContactForm } from './components/ContactForm';
import { BookingForm } from './components/BookingForm';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  const handleContactSuccess = () => {
    setIsContactOpen(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  const handleBookingSuccess = () => {
    setIsBookingOpen(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Modern Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-sm border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src="/src/assets/Logo___2_-removebg-preview.png"
                alt="The Ayurveda Doc"
                className="h-20 lg:h-24 w-auto transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              <a href="#about" className="text-charcoal/80 hover:text-sage transition-colors font-medium text-[15px]">About</a>
              <a href="#services" className="text-charcoal/80 hover:text-sage transition-colors font-medium text-[15px]">Services</a>
              <a href="#plans" className="text-charcoal/80 hover:text-sage transition-colors font-medium text-[15px]">Plans</a>
              <a href="#testimonials" className="text-charcoal/80 hover:text-sage transition-colors font-medium text-[15px]">Testimonials</a>
              <a href="#contact" className="text-charcoal/80 hover:text-sage transition-colors font-medium text-[15px]">Contact</a>
            </div>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-6 lg:px-8 py-3 lg:py-3.5 bg-gradient-to-r from-sage to-sage/90 text-white rounded-full hover:shadow-lg hover:shadow-sage/30 transition-all duration-300 font-medium text-sm lg:text-base transform hover:scale-105"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Split Design */}
      <section className="relative pt-20 lg:pt-24 bg-gradient-to-br from-sage/5 via-ivory to-beige/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sage/10 to-sage/5 rounded-full border border-sage/20">
                <div className="w-2 h-2 bg-sage rounded-full animate-pulse"></div>
                <span className="text-sage font-medium text-sm tracking-wide">Certified Ayurvedic Practitioner</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-charcoal leading-[1.15] font-bold tracking-tight">
                Your body has been speaking.
                <span className="block text-sage mt-3 bg-gradient-to-r from-sage to-sage/80 bg-clip-text text-transparent">I help you understand what it's trying to say.</span>
              </h1>

              <p className="text-lg lg:text-xl text-charcoal/70 leading-relaxed max-w-xl font-light">
                <span className="italic">"Ayurveda, practiced with empathy."</span>
                <span className="block mt-3 text-charcoal/60 font-normal">— Dr. Aparna</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="group px-8 py-4 bg-gradient-to-r from-sage to-sage/90 text-white rounded-full hover:shadow-xl hover:shadow-sage/30 transition-all duration-300 font-medium text-base transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Consult with me
                </button>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-8 py-4 bg-white text-charcoal border-2 border-sage/30 rounded-full hover:bg-sage/5 hover:border-sage transition-all duration-300 font-medium text-base"
                >
                  Learn more
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-8 pt-10 border-t border-sage/20">
                <div className="text-center sm:text-left">
                  <div className="text-4xl font-bold bg-gradient-to-r from-sage to-earthBrown bg-clip-text text-transparent mb-1">500+</div>
                  <div className="text-sm text-charcoal/60 font-medium">Happy Clients</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-4xl font-bold bg-gradient-to-r from-sage to-earthBrown bg-clip-text text-transparent mb-1">10+</div>
                  <div className="text-sm text-charcoal/60 font-medium">Years Experience</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-4xl font-bold bg-gradient-to-r from-sage to-earthBrown bg-clip-text text-transparent mb-1">4.9</div>
                  <div className="text-sm text-charcoal/60 font-medium">Rating</div>
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.pexels.com/photos/4506105/pexels-photo-4506105.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Ayurvedic Healing"
                  className="w-full h-full object-cover"
                />
                {/* Decorative Elements */}
                <div className="absolute top-6 right-6 w-20 h-20 bg-sage/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 left-6 w-32 h-32 bg-earthBrown/20 rounded-full blur-3xl"></div>

                {/* Floating Card */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/98 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-sage/10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-sage/20 to-sage/10 rounded-xl">
                      <Heart className="w-6 h-6 text-sage" />
                    </div>
                    <div>
                      <div className="font-semibold text-charcoal text-base">Personalized Care</div>
                      <div className="text-sm text-charcoal/60 font-light">Tailored treatment plans for you</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
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
              <span className="text-sage font-medium text-sm tracking-wide">Why Choose Us</span>
            </div>
            <h2 className="font-serif text-4xl lg:text-6xl text-charcoal font-bold mb-6 leading-tight">
              Authentic Ayurvedic Care
            </h2>
            <p className="text-lg text-charcoal/60 max-w-2xl mx-auto font-light leading-relaxed">
              Experience traditional healing combined with modern healthcare standards
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Personalized Approach",
                description: "Every treatment plan is customized to your unique body constitution and health needs"
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Flexible Scheduling",
                description: "Online consultations that fit your busy lifestyle with easy booking"
              },
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "Ongoing Support",
                description: "Continuous guidance through WhatsApp and email throughout your healing journey"
              },
              {
                icon: <Phone className="w-8 h-8" />,
                title: "Expert Guidance",
                description: "Certified practitioner with years of experience in traditional Ayurveda"
              }
            ].map((feature, index) => (
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

      {/* Services Section */}
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
                My Work
              </h2>
              <p className="text-lg text-charcoal/70 leading-relaxed">
                I help people reconnect with their health through mindful conversations, Ayurvedic practice, and daily choices.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  "Holistic health assessment",
                  "Personalized diet & lifestyle plans",
                  "Natural herbal remedies",
                  "Mind-body wellness practices"
                ].map((item, index) => (
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

      {/* Modern Living Section */}
      <section className="py-32 px-6 bg-sage/10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-serif text-4xl lg:text-5xl text-charcoal leading-tight font-light">
            Modern Living Meets Ayurveda
          </h2>
          <p className="text-xl text-charcoal/80 leading-relaxed font-light">
            Modern routines often leave the body overworked and unheard.
          </p>
          <p className="text-xl text-charcoal/80 leading-relaxed font-light">
            Ayurveda helps you restore alignment between your habits, food, and emotions — without extremes or restrictions.
          </p>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="mt-8 px-12 py-4 bg-mutedBrown text-ivory rounded-full hover:bg-earthBrown transition-all duration-300 font-medium text-base tracking-wide shadow-lg hover:shadow-xl"
          >
            Book a Consultation
          </button>
        </div>
      </section>

      {/* Healing Plans Section */}
      <section id="plans" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <div className="inline-block px-4 py-2 bg-sage/10 rounded-full mb-6">
              <span className="text-sage font-medium text-sm tracking-wide">Pricing Plans</span>
            </div>
            <h2 className="font-serif text-4xl lg:text-6xl text-charcoal font-bold mb-6 leading-tight">
              Choose Your Healing Plan
            </h2>
            <p className="text-lg text-charcoal/60 max-w-2xl mx-auto font-light leading-relaxed">
              Flexible plans designed to support your wellness journey
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16 max-w-5xl mx-auto"
          >
            {/* Essential Plan */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl hover:shadow-sage/10 transition-all duration-500 border border-sage/10 group"
            >
              <div className="mb-8">
                <div className="inline-flex p-4 bg-gradient-to-br from-sage/20 to-sage/10 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <Heart className="w-10 h-10 text-sage" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-3xl text-charcoal mb-4 font-bold">Essential Plan</h3>
              </div>
              <ul className="space-y-4 text-charcoal/70 font-light text-[15px] mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sage text-xs">✓</span>
                  </div>
                  <span>Two online consultations per month</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sage text-xs">✓</span>
                  </div>
                  <span>Personalized Ayurvedic plan</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sage text-xs">✓</span>
                  </div>
                  <span>WhatsApp / Email support</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sage text-xs">✓</span>
                  </div>
                  <span>Monthly review</span>
                </li>
              </ul>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="mt-auto w-full px-8 py-4 bg-white text-charcoal border-2 border-sage/30 rounded-full hover:bg-sage hover:text-white hover:border-sage transition-all duration-300 font-medium text-base tracking-wide"
              >
                Learn More
              </button>
            </motion.div>

            {/* Focused Plan */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-gradient-to-br from-sage/5 via-white to-sage/10 rounded-3xl p-8 lg:p-10 shadow-2xl border-2 border-sage relative overflow-hidden transform md:scale-105 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 bg-gradient-to-r from-sage to-earthBrown text-white px-6 py-2.5 rounded-bl-2xl text-sm font-semibold tracking-wide shadow-lg">
                ⭐ Most Popular
              </div>
              <div className="mb-8 mt-6">
                <div className="inline-flex p-4 bg-gradient-to-br from-sage/30 to-sage/20 rounded-2xl mb-6 shadow-md">
                  <Calendar className="w-10 h-10 text-sage" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-3xl text-charcoal mb-4 font-bold">Focused Plan</h3>
              </div>
              <ul className="space-y-4 text-charcoal/70 font-light text-[15px] mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-sage/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sage text-xs font-bold">✓</span>
                  </div>
                  <span>Weekly consultations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-sage/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sage text-xs font-bold">✓</span>
                  </div>
                  <span>Tailored guidance on diet & lifestyle</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-sage/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sage text-xs font-bold">✓</span>
                  </div>
                  <span>Unlimited text support</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-sage/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sage text-xs font-bold">✓</span>
                  </div>
                  <span>Weekly tracking</span>
                </li>
              </ul>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="mt-auto w-full px-8 py-4 bg-gradient-to-r from-sage to-earthBrown text-white rounded-full hover:shadow-xl hover:shadow-sage/40 transition-all duration-300 font-semibold text-base tracking-wide"
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>

          <div className="bg-beige rounded-2xl p-8 text-center">
            <p className="text-charcoal/80 font-light text-lg">
              <span className="font-medium">Add-ons:</span> Herbal medicines shipped · Customized meal plans · Meditation & breathwork recordings
            </p>
          </div>
        </div>
      </section>

      {/* In-Person Healing Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/7187974/pexels-photo-7187974.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Kerala Ayurveda center"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent flex items-end">
              <div className="p-12 lg:p-16 max-w-2xl">
                <h2 className="font-serif text-4xl lg:text-5xl text-white mb-6 font-light leading-tight">
                  In-Person Healing
                </h2>
                <p className="text-lg text-white/90 leading-relaxed font-light mb-4">
                  For those needing immersive treatment, I help you find verified Ayurvedic centers across Kerala — chosen carefully based on your health condition, duration, and budget.
                </p>
                <p className="text-lg text-white/90 leading-relaxed font-light">
                  After your stay, you'll receive a free one-month online follow-up program to continue healing at home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Dr. Aparna Section */}
      <section className="py-32 px-6 bg-beige/40">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
            className="relative h-[500px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src="/src/assets/WhatsApp Image 2025-10-07 at 15.01.22_3b09755b.jpg"
              alt="Dr. Aparna Albert"
              className="w-full h-full object-cover"
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
              I'm Dr. Aparna — an Ayurvedic doctor from Kerala.
              I've seen how often we treat symptoms and overlook stories.
              My work is to help you listen — to your body, your patterns, your pauses.
            </p>
            <p className="text-xl text-charcoal/70 leading-relaxed font-light italic">
              Healing begins when you stop rushing yourself.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Words & Reflections Section */}
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
            {[
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
            ].map((item, index) => (
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

      {/* Testimonials Section */}
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
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleIn}
              whileHover={{ y: -5, scale: 1.01 }}
              className="bg-white rounded-3xl p-10 lg:p-16 shadow-2xl hover:shadow-sage/10 transition-all duration-500 border border-sage/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-sage/5 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="text-sage text-8xl font-serif mb-6 leading-none opacity-30">"</div>
                <p className="font-serif text-2xl lg:text-4xl text-charcoal leading-relaxed font-light mb-8">
                  Her consultation felt like therapy and science in one.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-px bg-gradient-to-r from-sage to-transparent"></div>
                  <p className="text-charcoal/60 font-light text-base">— Patient Review</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleIn}
              whileHover={{ y: -5, scale: 1.01 }}
              className="bg-white rounded-3xl p-10 lg:p-16 shadow-2xl hover:shadow-sage/10 transition-all duration-500 border border-sage/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-earthBrown/5 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="text-sage text-8xl font-serif mb-6 leading-none opacity-30">"</div>
                <p className="font-serif text-2xl lg:text-4xl text-charcoal leading-relaxed font-light mb-8">
                  I finally understood what my body was trying to tell me.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-px bg-gradient-to-r from-sage to-transparent"></div>
                  <p className="text-charcoal/60 font-light text-base">— Patient Review</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Invitation Section */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-mutedBrown via-earthBrown to-mutedBrown text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,184,156,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(123,94,87,0.1),transparent_50%)]"></div>
        <div className="max-w-3xl mx-auto space-y-12 relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-tight font-light"
          >
            If something here feels like what you've been searching for, let's talk.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6"
          >
            <button
              onClick={() => setIsBookingOpen(true)}
              className="group px-12 py-5 bg-ivory text-charcoal rounded-full hover:bg-white transition-all duration-300 font-semibold text-base tracking-wide shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Book a Consultation
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </button>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-12 py-5 bg-transparent text-ivory border-2 border-ivory rounded-full hover:bg-ivory/10 hover:border-white transition-all duration-300 font-medium text-base tracking-wide backdrop-blur-sm"
            >
              Write to me
            </button>
          </motion.div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer id="contact" className="bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="space-y-6">
              <img
                src="/src/assets/Logo___2_-removebg-preview.png"
                alt="The Ayurveda Doc"
                className="h-16 w-auto"
              />
              <p className="text-white/70 leading-relaxed">
                Bringing ancient Ayurvedic wisdom to modern wellness through personalized, compassionate care.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-sage rounded-full flex items-center justify-center transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-sage rounded-full flex items-center justify-center transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-sage rounded-full flex items-center justify-center transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><a href="#about" className="text-white/70 hover:text-sage transition-colors">About Us</a></li>
                <li><a href="#services" className="text-white/70 hover:text-sage transition-colors">Services</a></li>
                <li><a href="#plans" className="text-white/70 hover:text-sage transition-colors">Pricing Plans</a></li>
                <li><a href="#testimonials" className="text-white/70 hover:text-sage transition-colors">Testimonials</a></li>
                <li><button onClick={() => setIsBookingOpen(true)} className="text-white/70 hover:text-sage transition-colors">Book Now</button></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Our Services</h3>
              <ul className="space-y-4">
                <li className="text-white/70">Online Consultations</li>
                <li className="text-white/70">Personalized Treatment Plans</li>
                <li className="text-white/70">Dietary Counseling</li>
                <li className="text-white/70">Lifestyle Guidance</li>
                <li className="text-white/70">Herbal Remedies</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Get In Touch</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-0.5 text-sage flex-shrink-0" />
                  <button onClick={() => setIsContactOpen(true)} className="text-white/70 hover:text-sage transition-colors text-left">
                    Contact via Email
                  </button>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 mt-0.5 text-sage flex-shrink-0" />
                  <button onClick={() => setIsContactOpen(true)} className="text-white/70 hover:text-sage transition-colors text-left">
                    Request a Call
                  </button>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 mt-0.5 text-sage flex-shrink-0" />
                  <span className="text-white/70">
                    WhatsApp Support Available
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 text-sage flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <span className="text-white/70">
                    Trivandrum, Kerala
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/60 text-sm">
                © 2025 The Ayurveda Doc. All rights reserved. Made with care in Kerala.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-white/60 hover:text-sage transition-colors">Privacy Policy</a>
                <a href="#" className="text-white/60 hover:text-sage transition-colors">Terms of Service</a>
                <a href="#" className="text-white/60 hover:text-sage transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed bottom-8 right-8 z-[110] bg-sage text-ivory px-8 py-4 rounded-full shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="font-medium">Thank you! We'll get back to you soon.</p>
        </div>
      )}

      {/* Modals */}
      <Modal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} title="Get in Touch">
        <ContactForm onSuccess={handleContactSuccess} />
      </Modal>

      <Modal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} title="Book Appointment">
        <BookingForm onSuccess={handleBookingSuccess} />
      </Modal>
    </div>
  );
}

export default App;
