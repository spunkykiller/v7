import { Layers } from 'lucide-react';

export const ArchitectureSection = () => {
  const layers = [
    {
      number: "1",
      title: "Input Layer",
      description: "UI + Voice interfaces for natural interaction"
    },
    {
      number: "2",
      title: "AI Layer",
      description: "LLM + Vision models + Fine-tuned design generation"
    },
    {
      number: "3",
      title: "Commerce Layer",
      description: "Catalog management + ONDC API integration"
    },
    {
      number: "4",
      title: "Fulfillment Layer",
      description: "Qikink, Printful, and ONDC vendor network"
    },
    {
      number: "5",
      title: "Analytics & Personalization",
      description: "User behavior tracking and AI-powered recommendations"
    }
  ];

  return (
    <section className="py-24 px-4 bg-secondary/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-poppins font-bold gradient-text mb-6">
            Built for Scale & Openness
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            TOBE's architecture combines proprietary AI fine-tuning with open-source backbones, creating a scalable platform that connects consumers, creators, and vendors seamlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {layers.map((layer, index) => (
            <div
              key={index}
              className="card-gradient rounded-3xl p-6 border border-border/50 hover:border-secondary/30 transition-all duration-300 hover-scale"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 text-secondary font-poppins font-bold text-xl mb-4">
                {layer.number}
              </div>
              <h3 className="text-lg font-poppins font-bold text-foreground mb-3">
                {layer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {layer.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
