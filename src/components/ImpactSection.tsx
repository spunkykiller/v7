import { useEffect, useState, useRef } from 'react';
import sustainabilityImage from '@/assets/sustainability-bg.jpg';

const stats = [
  {
    value: 37,
    suffix: "M tones",
    label: "textile waste prevented"
  },
  {
    value: 4,
    suffix: " Trillion Liters",
    label: "of water saved"
  },
  {
    value: 100,
    suffix: " B MSME",
    label: "revenues unlocked"
  }
];

const AnimatedCounter = ({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCount(Math.min(Math.round(increment * currentStep), value));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold gradient-text inline-block" style={{ whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: '1.2' }}>
      {count}{suffix}
    </span>
  );
};

export const ImpactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden space-gradient-alt space-particles-dense">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${sustainabilityImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/80" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-poppins font-bold gradient-text mb-6">
            Sustainable Commerce. Scalable Commerce.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our impact goes beyond individual products to reshape entire industries
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center flex flex-col items-center justify-center px-4" style={{ minWidth: 0 }}>
              <div className="mb-4 w-full" style={{ minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AnimatedCounter 
                  value={stat.value} 
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </div>
              <p className="text-lg text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Visual elements */}
        <div className="mt-16 relative">
          <div className="absolute top-10 left-10 w-4 h-4 bg-accent rounded-full float-animation opacity-60" style={{ animationDelay: '1s' }} />
          <div className="absolute top-20 right-16 w-6 h-6 bg-secondary rounded-full float-animation opacity-40" style={{ animationDelay: '3s' }} />
          <div className="absolute bottom-10 left-20 w-2 h-2 bg-primary rounded-full float-animation opacity-80" style={{ animationDelay: '5s' }} />
        </div>
      </div>
    </section>
  );
};