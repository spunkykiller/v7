import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, Loader2, X, Image as ImageIcon } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';
import { generateImage, debounce, type ImageGenerationResponse } from '@/services/imageGeneration';

const typingTexts = [
  "Fix my AC before 5 pm",
  "Best Biryani in city",
  "Abstract Phone case",
  "Batman hoodie",
  "Floral T shirt"
];

const slidingTexts = [
  { prefix: "TOBE is unlocking choices for:", text: "Guitar lessons near me" },
  { prefix: "TOBE is creating options for:", text: "custom hoodie with my startup logo" },
  { prefix: "TOBE is curating results for:", text: "Best Biryani in city" },
  { prefix: "TOBE is connecting you to:", text: "a yoga trainer near me tomorrow morning" },
  { prefix: "TOBE is finding solutions for:", text: "Fix my AC before 5" }
];

export const HeroSection = () => {
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [slidingIndex, setSlidingIndex] = useState(0);
  const [slidingVisible, setSlidingVisible] = useState(true);
  
  // Image generation states
  const [userInput, setUserInput] = useState('');
  const [generatedImage, setGeneratedImage] = useState<ImageGenerationResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const current = typingTexts[textIndex];
      
      if (!isDeleting) {
        if (charIndex < current.length) {
          setCurrentText(current.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setCurrentText(current.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % typingTexts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex]);

  useEffect(() => {
    const slidingTimer = setInterval(() => {
      setSlidingVisible(false);
      setTimeout(() => {
        setSlidingIndex((prev) => (prev + 1) % slidingTexts.length);
        setSlidingVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(slidingTimer);
  }, []);

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Image generation function
  const performImageGeneration = useCallback(async (prompt: string) => {
    if (!prompt || prompt.trim().length === 0) {
      setGeneratedImage(null);
      setIsGenerating(false);
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      console.log('Starting image generation for prompt:', prompt);
      
      // Auto-select the best available provider
      // Priority: Replicate > Stability AI > Hugging Face (free) > Placeholder
      const provider = import.meta.env.VITE_REPLICATE_API_KEY 
        ? 'replicate' 
        : import.meta.env.VITE_STABILITY_API_KEY 
        ? 'stability' 
        : 'huggingface'; // Uses your actual prompt text with Hugging Face API
      
      console.log('Using provider:', provider);
      console.log('HF API Key present:', !!import.meta.env.VITE_HUGGINGFACE_API_KEY);
      
      const result = await generateImage(prompt.trim(), provider as 'replicate' | 'stability' | 'huggingface' | 'placeholder');
      
      console.log('Image generated successfully:', result);
      setGeneratedImage(result);
      setError(null); // Clear any previous errors
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate image';
      console.error('Image generation error:', err);
      setError(errorMessage);
      setGeneratedImage(null);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  // Debounced image generation function
  const generateImageDebounced = useCallback(
    debounce(performImageGeneration, 1000),
    [performImageGeneration]
  );

  // Handle user input change
  const handleInputChange = (value: string) => {
    setUserInput(value);
    generateImageDebounced(value);
  };

  // Handle Enter key - generate immediately
  const handleEnterKey = async () => {
    if (!userInput.trim() || isGenerating) return;
    // Clear debounce and generate immediately
    await performImageGeneration(userInput.trim());
  };

  // Clear generated image
  const clearImage = () => {
    setGeneratedImage(null);
    setUserInput('');
    setError(null);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center space-gradient space-particles overflow-hidden pt-20">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-20 blur-sm"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-pulse" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-10 sm:space-y-12">
          {/* Main Headlines */}
          <div className="space-y-6 fade-in-up">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-poppins font-bold gradient-text-animated leading-tight tracking-tight pb-2" style={{ lineHeight: '1.1', overflow: 'visible' }}>
              The One Bazaar for Everything
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed">
              Meet TOBE: your desires, instantly shoppable in natural language.
            </p>
          </div>

          {/* Interactive search with real-time image generation */}
          <div className="max-w-2xl mx-auto fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <div className="relative group">
              <Input
                placeholder={userInput ? "Type to generate images..." : `Ask "${currentText}"`}
                className="h-16 sm:h-20 text-base sm:text-lg pl-6 pr-20 bg-card/60 border-primary/30 backdrop-blur-md text-foreground placeholder:text-muted-foreground rounded-2xl shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300"
                value={userInput}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={async (e) => {
                  if (e.key === 'Enter' && userInput.trim() && !isGenerating) {
                    e.preventDefault();
                    await handleEnterKey();
                  }
                }}
              />
              <div className="absolute right-2 top-2 flex gap-2">
                {isGenerating && (
                  <div className="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-xl bg-primary/20">
                    <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary animate-spin" />
                  </div>
                )}
                {!isGenerating && userInput && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={clearImage}
                    className="h-12 w-12 sm:h-14 sm:w-14 p-0 rounded-xl hover:bg-destructive/20 hover:text-destructive transition-all"
                    aria-label="Clear"
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                )}
                <Button 
                  size="sm" 
                  variant="hero"
                  className="h-12 w-12 sm:h-14 sm:w-14 p-0 rounded-xl pulse-glow hover:scale-110 transition-transform shadow-lg hover:shadow-xl"
                  onClick={async () => {
                    if (userInput.trim() && !isGenerating) {
                      await handleEnterKey();
                    }
                  }}
                  disabled={isGenerating}
                >
                  <Search className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </div>
            </div>
            
            {/* Error message with helpful info */}
            {error && (
              <div className="mt-4 mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30 animate-in fade-in slide-in-from-top-2">
                <p className="text-sm text-destructive font-medium mb-2">
                  {error.includes('403') || error.includes('permission') 
                    ? 'API Permission Issue' 
                    : 'Generation Failed'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {error.includes('403') || error.includes('permission') ? (
                    <>
                      Your Hugging Face token may not have the right permissions. 
                      Try creating a new token at{' '}
                      <a 
                        href="https://huggingface.co/settings/tokens" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        huggingface.co/settings/tokens
                      </a>
                      {' '}with "Read" access for Inference API. The app will try alternative methods.
                    </>
                  ) : (
                    error
                  )}
                </p>
              </div>
            )}

            {/* Loading state with creative animation */}
            {isGenerating && (
              <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="card-gradient rounded-2xl p-6 border border-primary/30 overflow-hidden shadow-xl">
                  <div className="aspect-video w-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg overflow-hidden relative flex items-center justify-center">
                    {/* Animated grid pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="grid grid-cols-8 gap-1 h-full w-full">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div
                            key={i}
                            className="bg-primary rounded-sm animate-pulse"
                            style={{
                              animationDelay: `${i * 0.05}s`,
                              animationDuration: '2s',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    {/* Spinning loader with gradient */}
                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
                        <div className="w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin absolute top-0 left-0"></div>
                        <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary animate-pulse" />
                      </div>
                      <p className="text-sm text-muted-foreground font-medium animate-pulse">
                        Creating your vision...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Generated image display with enhanced animations */}
            {generatedImage && !isGenerating && (
              <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-700">
                <div className="relative group/image">
                  {/* Glow effect behind image */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl opacity-20 blur-xl group-hover/image:opacity-40 transition-opacity duration-500"></div>
                  
                  <div className="relative card-gradient rounded-2xl p-4 border border-primary/30 overflow-hidden shadow-2xl shadow-primary/20">
                    <div className="aspect-video w-full bg-card/50 rounded-lg overflow-hidden relative">
                      {/* Image with shimmer effect on load */}
                      <img
                        src={generatedImage.imageUrl}
                        alt={`Generated: ${generatedImage.prompt}`}
                        className="w-full h-full object-cover transition-all duration-700 group-hover/image:scale-110 group-hover/image:brightness-110"
                        onLoad={(e) => {
                          // Add shimmer animation on load
                          const target = e.target as HTMLImageElement;
                          target.classList.add('animate-in', 'zoom-in-95');
                        }}
                        onError={(e) => {
                          console.error('Image load error:', generatedImage.imageUrl);
                          const target = e.target as HTMLImageElement;
                          setError('Failed to load generated image. Please try again.');
                          target.style.display = 'none';
                        }}
                      />
                      
                      {/* Overlay gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                    
                    {/* Prompt display with animation */}
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                          <ImageIcon className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground mb-1">Generated from:</p>
                          <p className="text-sm font-medium text-foreground truncate">
                            "{generatedImage.prompt}"
                          </p>
                        </div>
                      </div>
                      
                      {/* Download/Share button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-shrink-0 hover:bg-primary/10 hover:text-primary transition-all"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = generatedImage.imageUrl;
                          link.download = `tobe-generated-${Date.now()}.png`;
                          link.click();
                        }}
                      >
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Helper text */}
            {!userInput && (
              <p className={`text-sm sm:text-base text-muted-foreground mt-4 transition-all duration-500 ${slidingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                <Sparkles className="inline h-4 w-4 mr-2 text-primary animate-pulse" />
                {slidingTexts[slidingIndex].prefix} <span className="text-primary font-semibold">{slidingTexts[slidingIndex].text}</span>
              </p>
            )}
            {userInput && !generatedImage && !isGenerating && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm sm:text-base text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span>Press <kbd className="px-2 py-1 bg-card border border-border/50 rounded text-xs font-mono">Enter</kbd> or wait 1 second to generate</span>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center fade-in-up transition-all duration-300 ${error || isGenerating || generatedImage ? 'mt-8' : ''}`} style={{ animationDelay: '0.4s', opacity: 0 }}>
            <Button 
              size="lg" 
              variant="hero"
              className="glow-primary hover:glow-intense px-8 py-6 text-base sm:text-lg rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              onClick={() => {
                // Track outbound click event
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
            <Button 
              size="lg" 
              variant="heroSecondary"
              className="px-8 py-6 text-base sm:text-lg rounded-xl font-semibold backdrop-blur-md hover:scale-105 transition-all duration-300"
              onClick={() => window.open('https://yourstory.com/companies/wne3', '_blank', 'noopener,noreferrer')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};