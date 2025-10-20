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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
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
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-charcoal hover:text-sage transition-colors font-medium">About</a>
              <a href="#services" className="text-charcoal hover:text-sage transition-colors font-medium">Services</a>
              <a href="#plans" className="text-charcoal hover:text-sage transition-colors font-medium">Plans</a>
              <a href="#testimonials" className="text-charcoal hover:text-sage transition-colors font-medium">Testimonials</a>
              <a href="#contact" className="text-charcoal hover:text-sage transition-colors font-medium">Contact</a>
            </div>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-6 lg:px-8 py-3 lg:py-3.5 bg-sage text-white rounded-lg hover:bg-sage/90 transition-all duration-300 font-semibold text-sm lg:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
              <div className="inline-block px-4 py-2 bg-sage/10 rounded-full">
                <span className="text-sage font-semibold text-sm">✓ Certified Ayurvedic Practitioner</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-charcoal leading-tight font-bold">
                Healing Through
                <span className="block text-sage mt-2">Ancient Wisdom</span>
              </h1>

              <p className="text-lg lg:text-xl text-charcoal/70 leading-relaxed max-w-xl">
                Experience personalized Ayurvedic care with Dr. Aparna Albert. Combining traditional healing practices with modern understanding for holistic wellness.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="px-8 py-4 bg-sage text-white rounded-lg hover:bg-sage/90 transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Book Consultation
                </button>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-8 py-4 bg-white text-charcoal border-2 border-sage rounded-lg hover:bg-sage/5 transition-all duration-300 font-semibold text-base"
                >
                  Learn More
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-charcoal/10">
                <div>
                  <div className="text-3xl font-bold text-sage">500+</div>
                  <div className="text-sm text-charcoal/60">Happy Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-sage">10+</div>
                  <div className="text-sm text-charcoal/60">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-sage">4.9</div>
                  <div className="text-sm text-charcoal/60">Rating</div>
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
              <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/4506105/pexels-photo-4506105.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Ayurvedic Healing"
                  className="w-full h-full object-cover"
                />
                {/* Floating Card */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-sage/10 rounded-lg">
                      <Heart className="w-6 h-6 text-sage" />
                    </div>
                    <div>
                      <div className="font-semibold text-charcoal">Personalized Care</div>
                      <div className="text-sm text-charcoal/60">Tailored treatment plans for you</div>
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
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl lg:text-5xl text-charcoal font-bold mb-4">
              Why Choose Our Ayurvedic Care
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Experience authentic Ayurvedic healing combined with modern healthcare standards
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
                whileHover={{ y: -5 }}
                className="bg-sage/5 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex p-4 bg-sage/10 rounded-xl mb-4 text-sage">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-xl text-charcoal mb-3">{feature.title}</h3>
                <p className="text-charcoal/70 leading-relaxed">{feature.description}</p>
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
                Understanding Ayurveda
              </h2>
              <p className="text-lg text-charcoal/70 leading-relaxed">
                Every concern — from sleep to skin, digestion to hormones — has a cause that the body is trying to express.
              </p>
              <p className="text-lg text-charcoal/70 leading-relaxed">
                I help you read those signs through Ayurveda, so treatment feels simple, personal, and effective.
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
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl lg:text-5xl text-charcoal font-bold mb-4">
              Choose Your Healing Plan
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Flexible plans designed to support your wellness journey
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16"
          >
            {/* Essential Plan */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-charcoal/5 hover:border-sage/30 group"
            >
              <div className="mb-6">
                <div className="inline-block p-3 bg-sage/10 rounded-2xl mb-4 group-hover:bg-sage/20 transition-colors">
                  <Heart className="w-10 h-10 text-sage group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-3xl text-charcoal mb-3">Essential Plan</h3>
                <p className="text-5xl font-serif text-earthBrown mb-1">₹4,000</p>
                <p className="text-base text-charcoal/60 font-body">per month</p>
              </div>
              <ul className="space-y-4 text-charcoal/80 font-light text-base">
                <li className="flex items-start gap-3">
                  <span className="text-sage mt-1 text-xl">✓</span>
                  <span>Two online consultations per month</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sage mt-1 text-xl">✓</span>
                  <span>Personalized Ayurvedic plan</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sage mt-1 text-xl">✓</span>
                  <span>WhatsApp / Email support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sage mt-1 text-xl">✓</span>
                  <span>Monthly review</span>
                </li>
              </ul>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="mt-8 w-full px-8 py-4 bg-beige text-charcoal rounded-full hover:bg-sage hover:text-ivory transition-all duration-300 font-medium text-base tracking-wide"
              >
                Choose Plan
              </button>
            </motion.div>

            {/* Focused Plan */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -10, scale: 1.08 }}
              className="bg-gradient-to-br from-white to-sage/5 rounded-3xl p-8 lg:p-10 shadow-2xl border-2 border-sage/40 relative overflow-hidden transform md:scale-105 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 bg-sage text-ivory px-6 py-2 rounded-bl-2xl text-sm font-medium tracking-wide shadow-lg">
                Most Popular
              </div>
              <div className="mb-6 mt-4">
                <div className="inline-block p-3 bg-sage/20 rounded-2xl mb-4">
                  <Calendar className="w-10 h-10 text-sage" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-3xl text-charcoal mb-3">Focused Plan</h3>
                <p className="text-5xl font-serif text-earthBrown mb-1">₹6,000</p>
                <p className="text-base text-charcoal/60 font-body">per month</p>
              </div>
              <ul className="space-y-4 text-charcoal/80 font-light text-base">
                <li className="flex items-start gap-3">
                  <span className="text-sage mt-1 text-xl">✓</span>
                  <span>Weekly consultations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sage mt-1 text-xl">✓</span>
                  <span>Tailored guidance on diet & lifestyle</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sage mt-1 text-xl">✓</span>
                  <span>Unlimited text support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sage mt-1 text-xl">✓</span>
                  <span>Weekly tracking</span>
                </li>
              </ul>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="mt-8 w-full px-8 py-4 bg-sage text-ivory rounded-full hover:bg-earthBrown transition-all duration-300 font-medium text-base tracking-wide shadow-lg hover:shadow-xl"
              >
                Choose Plan
              </button>
            </motion.div>

            {/* Intensive Plan */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-charcoal/5 hover:border-sage/30 group"
            >
              <div className="mb-6">
                <div className="inline-block p-3 bg-sage/10 rounded-2xl mb-4 group-hover:bg-sage/20 transition-colors">
                  <MessageCircle className="w-10 h-10 text-sage group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-3xl text-charcoal mb-3">Intensive Plan</h3>
                <p className="text-5xl font-serif text-earthBrown mb-1">₹15,000</p>
                <p className="text-base text-charcoal/60 font-body">per month</p>
              </div>
              <ul className="space-y-4 text-charcoal/80 font-light text-base">
                <li className="flex items-start gap-3">
                  <span className="text-sage mt-1 text-xl">✓</span>
                  <span>Daily 10–15 min sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sage mt-1 text-xl">✓</span>
                  <span>Meal-by-meal guidance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sage mt-1 text-xl">✓</span>
                  <span>Priority response for queries</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sage mt-1 text-xl">✓</span>
                  <span>Weekly progress review</span>
                </li>
              </ul>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="mt-8 w-full px-8 py-4 bg-beige text-charcoal rounded-full hover:bg-sage hover:text-ivory transition-all duration-300 font-medium text-base tracking-wide"
              >
                Choose Plan
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
              About Dr. Aparna
            </h2>
            <p className="text-xl text-charcoal/80 leading-relaxed font-light">
              I'm an Ayurvedic doctor who believes healing begins with listening.
            </p>
            <p className="text-xl text-charcoal/80 leading-relaxed font-light">
              My approach blends classical Ayurvedic wisdom with modern clinical understanding — so your treatment feels compassionate, precise, and truly personal.
            </p>
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
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl lg:text-5xl text-charcoal font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Real stories from people who transformed their health with Ayurveda
            </p>
          </motion.div>
          <div className="space-y-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleIn}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="text-sage text-7xl font-serif mb-4 leading-none">"</div>
              <p className="font-serif text-2xl lg:text-3xl text-charcoal leading-relaxed font-light mb-6">
                Her consultation felt like therapy and science in one.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-sage/30"></div>
                <p className="text-charcoal/60 font-light">— Patient Review</p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleIn}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="text-sage text-7xl font-serif mb-4 leading-none">"</div>
              <p className="font-serif text-2xl lg:text-3xl text-charcoal leading-relaxed font-light mb-6">
                I finally understood what my body was trying to tell me.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-sage/30"></div>
                <p className="text-charcoal/60 font-light">— Patient Review</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Invitation Section */}
      <section className="py-32 px-6 bg-mutedBrown text-center">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="font-serif text-5xl lg:text-6xl text-ivory leading-tight font-light">
            Health begins with understanding your body — not fighting it.
          </h2>
          <p className="text-xl text-ivory/90 font-light">
            Let's start your Ayurvedic journey together.
          </p>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="px-12 py-4 bg-ivory text-charcoal rounded-full hover:bg-white transition-all duration-300 font-medium text-base tracking-wide shadow-xl hover:shadow-2xl"
          >
            Begin Your Plan
          </button>
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
                © 2025 The Ayurveda Doc. All rights reserved.
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
