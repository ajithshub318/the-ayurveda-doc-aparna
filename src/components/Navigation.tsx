import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import logoImage from '../assets/logo.png';

interface NavigationProps {
  onBookingClick: () => void;
}

export function Navigation({ onBookingClick }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ivory/90 backdrop-blur-xl border-b border-charcoal/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          <div className="flex-shrink-0">
            <img
              src={logoImage}
              alt="The Ayurveda Doc"
              className="h-14 sm:h-20 lg:h-24 w-auto"
            />
          </div>

          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {["Home", "Services", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
                className="relative text-charcoal hover:text-forest transition-colors text-sm tracking-[0.12em] uppercase font-medium group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-forest group-hover:w-full transition-all duration-500 ease-out"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBookingClick}
              className="hidden sm:flex btn-leaf btn-glow group px-6 lg:px-9 py-2.5 lg:py-3.5 bg-charcoal text-ivory text-xs sm:text-sm tracking-[0.08em] font-medium shadow-lg shadow-charcoal/10 hover:shadow-xl hover:shadow-charcoal/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Book Consultation
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </span>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-charcoal"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-ivory/95 backdrop-blur-xl border-t border-charcoal/5 px-4 py-6 space-y-4">
          {["Home", "Services", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="block text-charcoal hover:text-forest transition-colors text-sm tracking-[0.12em] uppercase font-medium py-2"
            >
              {item}
            </a>
          ))}
          <button
            onClick={() => { onBookingClick(); setMobileOpen(false); }}
            className="sm:hidden btn-leaf w-full py-3 bg-charcoal text-ivory text-sm tracking-[0.08em] font-medium text-center"
          >
            Book Consultation
          </button>
        </div>
      )}
    </nav>
  );
}
