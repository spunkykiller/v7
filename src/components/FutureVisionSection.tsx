import { Smartphone, ShoppingBag, Zap, Globe } from 'lucide-react';
import tobeAppImage from '@/assets/tobe-super-app.png';

const appFeatures = [
  {
    icon: ShoppingBag,
    title: "Commerce",
    description: "AI-powered product creation"
  },
  {
    icon: Zap,
    title: "Services",
    description: "On-demand local services"
  },
  {
    icon: Globe,
    title: "Utilities",
    description: "Essential daily needs"
  }
];

export const FutureVisionSection = () => {
  return (
    <section className="py-24 px-4 space-gradient space-particles relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-poppins font-bold gradient-text mb-6">
                One Platform. Infinite Possibilities.
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                TOBE is just the beginning. We're building the ultimate commerce super app powered by ONDC.
              </p>
            </div>

            <div className="space-y-6">
              {appFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-2xl card-gradient border border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-lg text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile App Mockup */}
          <div className="relative">
            <div className="relative max-w-lg mx-auto">
              <img 
                src={tobeAppImage} 
                alt="TOBE Super App interface showing Creations, Marketplace, Everything Store, History, Community, Payments, ONDC, Utilities, and Settings features"
                className="w-full h-auto rounded-3xl shadow-2xl shadow-primary/20 glow-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};