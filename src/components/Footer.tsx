import { Mail, Phone, MessageCircle } from 'lucide-react';
import logoImage from '../assets/logo.png';

interface FooterProps {
  onContactClick: () => void;
  onBookingClick: () => void;
}

export function Footer({ onContactClick, onBookingClick }: FooterProps) {
  return (
    <footer id="contact" className="bg-deep text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-16">
          <div className="space-y-5 sm:space-y-6">
            <img
              src={logoImage}
              alt="The Ayurveda Doc"
              className="h-12 sm:h-16 w-auto brightness-200"
            />
            <p className="text-white/80 leading-relaxed font-light text-sm sm:text-base">
              Bringing ancient Ayurvedic wisdom to modern wellness through personalized, compassionate care.
            </p>
            <div className="flex gap-3">
              {[
                { href: "https://www.facebook.com/share/1BsoBKrYds/", label: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                { href: "https://www.instagram.com/theayurvedadoc", label: "Instagram", path: "M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" },
                { href: "https://youtube.com/@draparnaalbert", label: "YouTube", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }
              ].map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 check-leaf border border-white/20 hover:bg-forest hover:border-forest flex items-center justify-center transition-all duration-500">
                  <span className="sr-only">{social.label}</span>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24"><path d={social.path}/></svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase font-medium mb-5 sm:mb-8 text-forest">Quick Links</h3>
            <ul className="space-y-3 sm:space-y-4">
              {[
                { label: "Home", href: "#" },
                { label: "Services", href: "#services" },
                { label: "About", href: "#about" },
                { label: "Testimonials", href: "#testimonials" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/80 hover:text-forest transition-colors font-light text-sm group flex items-center gap-2">
                    <span className="w-0 h-[1px] bg-forest group-hover:w-3 transition-all duration-300"></span>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button onClick={onBookingClick} className="text-white/80 hover:text-forest transition-colors font-light text-sm group flex items-center gap-2">
                  <span className="w-0 h-[1px] bg-forest group-hover:w-3 transition-all duration-300"></span>
                  Book Now
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase font-medium mb-5 sm:mb-8 text-forest">Our Services</h3>
            <ul className="space-y-3 sm:space-y-4">
              {["Online Consultations", "Personalized Treatment Plans", "Dietary Counseling", "Lifestyle Guidance", "Ayurveda Medicines", "Retreat Suggestions"].map((service) => (
                <li key={service} className="text-white/80 font-light text-sm">{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase font-medium mb-5 sm:mb-8 text-forest">Get In Touch</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-forest flex-shrink-0" />
                <button onClick={onContactClick} className="text-white/80 hover:text-forest transition-colors text-left font-light text-sm">
                  Contact via Email
                </button>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-forest flex-shrink-0" />
                <button onClick={onContactClick} className="text-white/80 hover:text-forest transition-colors text-left font-light text-sm">
                  Request a Call
                </button>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 mt-0.5 text-forest flex-shrink-0" />
                <a href="https://wa.me/917012399593" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-forest transition-colors font-light text-sm">
                  Write to me on WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-forest flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span className="text-white/80 font-light text-sm">Trivandrum, Kerala</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-xs sm:text-sm font-light">
              &copy; 2025 The Ayurveda Doc. All rights reserved.
            </p>
            <div className="flex gap-6 sm:gap-8 text-xs sm:text-sm">
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <a key={item} href="#" className="text-white/50 hover:text-forest transition-colors font-light">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
