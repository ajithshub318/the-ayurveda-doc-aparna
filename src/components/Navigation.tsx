import logoImage from '../assets/logo.png';

interface NavigationProps {
  onBookingClick: () => void;
}

export function Navigation({ onBookingClick }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-sm border-b border-charcoal/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={logoImage}
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
              onClick={onBookingClick}
              className="px-6 lg:px-8 py-3 lg:py-3.5 bg-gradient-to-r from-sage to-sage/90 text-white rounded-full hover:shadow-lg hover:shadow-sage/30 transition-all duration-300 font-medium text-sm lg:text-base transform hover:scale-105"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
