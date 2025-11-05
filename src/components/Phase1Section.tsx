import { Clock, Palette, Leaf } from 'lucide-react';
import mockup1 from '@/assets/modern abstract phone case.jpeg';
import customMainImage from '@/assets/custom-main-image.png';
import mockup3 from '@/assets/vintage astronaut hoodie_3.jpeg';
import bdsmImage from '@/assets/bdsm-image.png';

export const Phase1Section = () => {
  const features = [
    {
      icon: Clock,
      title: "Real-Time Generation",
      description: "Designs created in seconds, not days"
    },
    {
      icon: Palette,
      title: "Infinite Variations",
      description: "No template limits, endless SKU possibilities"
    },
    {
      icon: Leaf,
      title: "Low Waste Model",
      description: "Post-purchase manufacturing reduces inventory waste"
    }
  ];

  return (
    <section className="py-24 px-4 space-gradient space-particles relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-primary font-semibold">Phase 1 — Generative Commerce</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-poppins font-bold gradient-text mb-6">
            From Search to Design
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Type what you imagine and TOBE instantly generates production-ready designs and purchase flows. Our AI transforms natural language into tangible products in seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-gradient rounded-3xl p-8 text-center border border-border/50 hover:border-primary/30 transition-all duration-300 hover-scale"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary mb-6">
                <feature.icon className="h-10 w-10 text-primary-foreground" />
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

        <div className="card-gradient rounded-3xl p-8 md:p-12 border border-border/50">
          <h3 className="text-2xl md:text-3xl font-poppins font-bold text-foreground mb-6 text-center">
            See TOBE in Action
          </h3>
          <p className="text-lg text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
            Experience the power of generative commerce. Type a prompt and watch as TOBE instantly creates production-ready designs with color variants and fulfillment options.
          </p>
          
          {/* Product Mockups Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover-scale">
              <img src={mockup1} alt="Modern abstract phone case design" className="w-full h-auto" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover-scale">
              <img src={customMainImage} alt="Custom main image showcasing TOBE's capabilities" className="w-full h-auto" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover-scale">
              <img src={mockup3} alt="Vintage astronaut hoodie design" className="w-full h-auto" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover-scale">
              <img src={bdsmImage} alt="BDSM image showcasing TOBE's product range" className="w-full h-auto" />
            </div>
          </div>
          
          <p className="text-center text-primary font-medium">
            <strong>Try it:</strong> Ask for custom tshirts, modern abstract phone case, anything — see how TOBE transforms your imagination into purchasable products with real-time design generation.
          </p>
        </div>
      </div>
    </section>
  );
};
