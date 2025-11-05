import { MessageSquare, Sparkles, Settings, ShoppingBag } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const steps = [
  {
    icon: MessageSquare,
    title: "Tell TOBE What You Want",
    description: "Type or use voice to describe your product or service need"
  },
  {
    icon: Sparkles,
    title: "AI Generates Options",
    description: "Our AI creates designs and matches vendors from the ONDC network"
  },
  {
    icon: Settings,
    title: "Customize & Compare",
    description: "Adjust designs, compare prices, delivery times, and vendor ratings"
  },
  {
    icon: ShoppingBag,
    title: "Buy or Book",
    description: "Complete purchase with on-demand fulfillment and tracking"
  }
];

export const HowItWorksSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="how-it-works" ref={ref as React.RefObject<HTMLElement>} className="py-24 px-4 space-gradient space-particles relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-6xl font-poppins font-bold gradient-text mb-6">
            How TOBE Works
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative group hover-scale transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="card-gradient rounded-3xl p-8 text-center h-full border border-border/50 hover:border-primary/30 transition-all duration-300">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary text-primary-foreground font-poppins font-bold text-xl mb-6">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
                  <step.icon className="h-10 w-10 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-poppins font-bold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary transform -translate-y-1/2 z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};