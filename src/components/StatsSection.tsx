import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export const StatsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  const stats = [
    {
      value: "100+",
      label: "AI-Created Designs",
      description: "Production-ready designs generated in beta testing"
    },
    {
      value: "40%",
      label: "Waste Reduction",
      description: "Estimated reduction through post-purchase manufacturing"
    },
    {
      value: "2",
      label: "Partner Integrations",
      description: "Qikink & Printful fulfillment networks"
    }
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-24 px-4 space-gradient space-particles relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold gradient-text mb-6 pb-2" style={{ lineHeight: '1.1', overflow: 'visible' }}>
            Transforming Commerce with AI
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`card-gradient rounded-3xl p-8 text-center border border-border/50 hover:border-primary/30 transition-all duration-700 hover-scale ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="text-5xl md:text-6xl font-poppins font-bold gradient-text mb-4">
                {stat.value}
              </div>
              <h3 className="text-xl font-poppins font-bold text-foreground mb-2">
                {stat.label}
              </h3>
              <p className="text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <p className="text-lg text-muted-foreground">
            TOBE is a DPIIT-Recognized Startup registered in Andhra Pradesh, pioneering the future of generative commerce with AI-powered design and sustainable fulfillment models.
          </p>
        </div>
      </div>
    </section>
  );
};
