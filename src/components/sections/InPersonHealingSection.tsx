export function InPersonHealingSection() {
  return (
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
  );
}
