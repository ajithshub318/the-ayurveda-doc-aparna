import { Mail, Phone, MessageCircle } from 'lucide-react';
import logoImage from '../assets/logo.png';

interface FooterProps {
  onContactClick: () => void;
  onBookingClick: () => void;
}

export function Footer({ onContactClick, onBookingClick }: FooterProps) {
  return (
    <footer id="contact" className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <img
              src={logoImage}
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
              <li><button onClick={onBookingClick} className="text-white/70 hover:text-sage transition-colors">Book Now</button></li>
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
                <button onClick={onContactClick} className="text-white/70 hover:text-sage transition-colors text-left">
                  Contact via Email
                </button>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 text-sage flex-shrink-0" />
                <button onClick={onContactClick} className="text-white/70 hover:text-sage transition-colors text-left">
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
  );
}
