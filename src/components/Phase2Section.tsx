import { MessageCircle, Network, ShoppingCart, Sparkles } from 'lucide-react';

export const Phase2Section = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Natural Language Search",
      description: "Type or speak what you want — AI understands intent and context across all commerce categories"
    },
    {
      icon: Network,
      title: "Vendor-Agnostic Network",
      description: "Access the entire ONDC ecosystem through one unified interface"
    },
    {
      icon: ShoppingCart,
      title: "Unified Checkout",
      description: "Cross-domain flows and seamless transactions across products and services"
    },
    {
      icon: Sparkles,
      title: "Personalized Discovery",
      description: "AI-powered recommendations tailored to your preferences and behavior"
    }
  ];

  return (
    <section className="py-24 px-4 space-gradient-light space-particles relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-secondary/10 rounded-full mb-6">
            <span className="text-secondary font-semibold">Phase 2 — The Super App for Open Commerce</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-poppins font-bold gradient-text mb-6">
            One Platform for Everything
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            TOBE evolves into the consumer interface for ONDC — one app for products, services, and bookings, powered by semantic AI. Access vendor-agnostic listings across all categories with natural language search.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-gradient rounded-3xl p-8 border border-border/50 hover:border-secondary/30 transition-all duration-300 hover-scale"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/10 mb-6">
                <feature.icon className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-poppins font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
