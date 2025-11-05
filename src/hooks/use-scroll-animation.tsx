import { useEffect, useRef, useState, useMemo } from 'react';

export const useScrollAnimation = (options?: IntersectionObserverInit) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  
  const observerOptions = useMemo(() => ({
    threshold: 0.1,
    ...options,
  }), [options?.threshold, options?.root, options?.rootMargin]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optionally disconnect after first animation
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      observerOptions
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [observerOptions]);

  return { ref, isVisible };
};
