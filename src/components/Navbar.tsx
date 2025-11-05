import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Features', id: 'features' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Impact', id: 'impact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <h2 className="text-2xl font-poppins font-bold gradient-text">
              TOBE
            </h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 font-inter font-medium text-sm"
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="hero"
              size="sm"
              className="ml-4"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'cta_start_creating_click', {
                    event_label: 'wne3.com'
                  });
                }
                window.open('https://www.wne3.com/', '_blank', 'noopener,noreferrer');
              }}
            >
              Start Creating
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 border-t border-border/50 mt-4 pt-6 animate-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-foreground/80 hover:text-primary transition-all duration-300 font-inter font-medium py-2 hover:translate-x-2"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {link.label}
                </button>
              ))}
              <Button
                variant="hero"
                size="sm"
                className="w-full mt-4"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'cta_start_creating_click', {
                      event_label: 'wne3.com'
                    });
                  }
                  window.open('https://www.wne3.com/', '_blank', 'noopener,noreferrer');
                }}
              >
                Start Creating
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
