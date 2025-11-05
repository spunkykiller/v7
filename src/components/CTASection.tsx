import { Button } from '@/components/ui/button';
import { ArrowRight, Users } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-24 px-4 space-gradient-light space-particles-dense relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <div className={`card-gradient rounded-3xl p-12 border border-primary/20 glow-primary transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          
          <div className="space-y-8">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.2s' }}>
              <h2 className="text-4xl md:text-5xl font-poppins font-bold gradient-text mb-6">
                Ready to Create Your First Product?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of creators who are already bringing their ideas to life with TOBE
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.4s' }}>
              <Button 
                size="lg" 
                variant="hero"
                className="group hover:scale-105 transition-transform duration-300"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'cta_try_tobe_click', {
                      event_label: 'wne3.com'
                    });
                  }
                  window.open('https://www.wne3.com/', '_blank', 'noopener,noreferrer');
                }}
              >
                Try TOBE Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="heroSecondary"
                className="group hover:scale-105 transition-transform duration-300"
              >
                <Users className="mr-2 h-5 w-5" />
                Join Our Community
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center space-y-6 pt-8 border-t border-border/50">
              <div className="text-center max-w-2xl">
                <div className="text-lg font-poppins font-bold text-primary mb-2">
                  Secured $100K+ in cloud credits from Google Cloud, Microsoft and NVIDIA Inception.
                </div>
                <div className="text-sm text-muted-foreground">
                  Supported by E-Cell IIT Patna, T-Hub, APIS, IIT Madras
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};