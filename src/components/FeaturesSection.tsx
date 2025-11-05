import { Network } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import generativeDesignIcon from '@/assets/generative-design-icon.svg';
import semanticSearchIcon from '@/assets/semantic-search-icon.svg';
import creatorStorefrontsIcon from '@/assets/creator-storefronts-icon.svg';
import sustainabilityIcon from '@/assets/sustainability-icon.svg';

const features = [
  {
    iconType: 'image' as const,
    iconSrc: generativeDesignIcon,
    title: "Generative Design Engine",
    description: "Fine-tuned AI models specifically trained for apparel and merchandise design, creating production-ready assets instantly."
  },
  {
    iconType: 'image' as const,
    iconSrc: semanticSearchIcon,
    title: "Semantic Search",
    description: "Intent-aware queries that understand context across all product and service categories, delivering relevant results."
  },
  {
    iconType: 'image' as const,
    iconSrc: creatorStorefrontsIcon,
    title: "Creator Storefronts",
    description: "Launch micro-shops instantly with zero setup costs. Creators can monetize their ideas without inventory risk."
  },
  {
    iconType: 'lucide' as const,
    icon: Network,
    title: "ONDC Integration",
    description: "Vendor-agnostic network access connecting consumers to India's open commerce ecosystem seamlessly."
  },
  {
    iconType: 'image' as const,
    iconSrc: sustainabilityIcon,
    title: "Sustainability Engine",
    description: "Post-purchase fulfillment model with analytics tracking waste reduction and environmental impact."
  }
];

export const FeaturesSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 space-gradient-light space-particles-dense relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 sm:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-bold gradient-text-animated mb-6">
            Product Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful capabilities that transform how you create, discover, and shop
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group card-hover cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="card-gradient rounded-3xl p-8 sm:p-10 h-full border border-border/50 hover:border-primary/40 transition-all duration-500 relative overflow-hidden">
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer pointer-events-none" />
                
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl gradient-primary mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  {feature.iconType === 'image' ? (
                    <img src={feature.iconSrc} alt={feature.title} className="h-8 w-8 sm:h-10 sm:w-10" />
                  ) : (
                    <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground" />
                  )}
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-poppins font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};