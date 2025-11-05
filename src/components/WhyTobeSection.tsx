import { Lightbulb, Leaf, CheckCircle } from 'lucide-react';

export const WhyTobeSection = () => {
  const benefits = [
    {
      title: "Zero inventory waste",
      icon: CheckCircle
    },
    {
      title: "On-demand fulfillment",
      icon: CheckCircle
    },
    {
      title: "Reduced carbon footprint",
      icon: CheckCircle
    },
    {
      title: "Sustainable commerce future",
      icon: CheckCircle
    }
  ];

  return (
    <section className="py-24 px-4 space-gradient-alt space-particles-dense relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-poppins font-bold gradient-text mb-6">
            Why TOBE Matters
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card-gradient rounded-3xl p-8 md:p-10 border border-border/50 hover:border-primary/30 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-6">
              <Lightbulb className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl md:text-3xl font-poppins font-bold text-foreground mb-4">
              From Idea to Object
            </h3>
            <p className="text-muted-foreground mb-4">
              Priya imagined a band tee for her favorite artist and launched a limited drop in minutes. No inventory risk, no upfront costs — just pure creative expression powered by AI.
            </p>
            <p className="text-muted-foreground">
              Consumer demand for personalization is at an all-time high. TOBE makes custom products accessible to everyone, democratizing design and manufacturing.
            </p>
          </div>

          <div className="card-gradient rounded-3xl p-8 md:p-10 border border-border/50 hover:border-primary/30 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-6">
              <Leaf className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl md:text-3xl font-poppins font-bold text-foreground mb-4">
              Sustainable by Design
            </h3>
            <p className="text-muted-foreground mb-6">
              Post-purchase printing reduces unsold inventory by up to 40%, eliminating waste from traditional mass production models.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <benefit.icon className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{benefit.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
