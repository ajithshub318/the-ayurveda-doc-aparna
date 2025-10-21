interface HealingNeedsSpaceSectionProps {
  onContactClick: () => void;
}

export function HealingNeedsSpaceSection({ onContactClick }: HealingNeedsSpaceSectionProps) {
  return (
    <section className="py-32 px-6 bg-sage/10">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="font-serif text-4xl lg:text-5xl text-charcoal leading-tight font-light">
          Healing Needs Space
        </h2>
        <p className="text-xl text-charcoal/80 leading-relaxed font-light">
          Some things need more than a routine — they need space, attention, and a place to truly rest.
        </p>
        <p className="text-xl text-charcoal/80 leading-relaxed font-light">
          I personally guide you to retreats that stay true to classical Ayurveda, care deeply for their guests, and create room for real healing. Each recommendation is based on your body, goals, and current phase of life.
        </p>
        <button
          onClick={onContactClick}
          className="mt-8 px-12 py-4 bg-mutedBrown text-ivory rounded-full hover:bg-earthBrown transition-all duration-300 font-medium text-base tracking-wide shadow-lg hover:shadow-xl"
        >
          Explore Recommended Retreats
        </button>
      </div>
    </section>
  );
}
