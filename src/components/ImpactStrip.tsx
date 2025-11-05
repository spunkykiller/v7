import { useEffect, useState, useRef } from 'react';

const impactData = [
  {
    title: "Cut Carbon, Not Style",
    description: "Fast fashion emits 10% of global CO₂ — more than aviation and shipping combined. TOBE cuts this by ending overproduction."
  },
  {
    title: "50 Billion Bottles in Our Seas",
    description: "Washing synthetics releases 500,000 tonnes of microplastics yearly — equal to 50B plastic bottles. TOBE's local, on-demand model reduces this leakage."
  },
  {
    title: "Save Water, Wear Smarter",
    description: "One T-shirt = 2,700L water. TOBE's zero-inventory model saves trillions globally."
  }
];

export const ImpactStrip = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState(impactData.map(() => false));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stagger the animation of each card
          impactData.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedCards(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4 border-t border-border/50 space-gradient space-particles relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold gradient-text">
            Innovating for a Greener Planet
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {impactData.map((impact, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                animatedCards[index] 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="card-gradient rounded-2xl p-6 border border-border/50 h-full">
                <h3 className="text-xl font-poppins font-bold gradient-text mb-4">
                  {impact.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {impact.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};