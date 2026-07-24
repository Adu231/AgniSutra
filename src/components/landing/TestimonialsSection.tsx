import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/constants';

const TestimonialsSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const elements = section.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 150);
  };

  const prev = () => goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => goTo((current + 1) % TESTIMONIALS.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const visibleItems = [
    TESTIMONIALS[current],
    TESTIMONIALS[(current + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(current + 2) % TESTIMONIALS.length],
  ];

  return (
    <section ref={sectionRef as any} className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-500 text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-current" />
            Customer Stories
          </div>
          <h2 className="section-title mb-4">
            Trusted by Fire Safety
            <span className="gradient-fire-text"> Leaders Nationwide</span>
          </h2>
          <p className="section-subtitle">
            Hear from safety officers, facility managers, and fire inspectors who transformed their operations with AgniSutra.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 scroll-reveal">
          {visibleItems.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-card border border-border rounded-2xl p-6 transition-all duration-500 ${
                index === 0 ? 'shadow-lg border-red-200 dark:border-red-900/40 scale-105' : 'opacity-80'
              }`}
            >
              <Quote className="w-8 h-8 text-red-500/30 mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full bg-muted"
                  />
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-red-500">{testimonial.organization}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Single */}
        <div className="md:hidden scroll-reveal">
          <div
            className={`bg-card border border-border rounded-2xl p-6 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
          >
            <Quote className="w-8 h-8 text-red-500/30 mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">
              "{TESTIMONIALS[current].content}"
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={TESTIMONIALS[current].avatar} alt={TESTIMONIALS[current].name} className="w-10 h-10 rounded-full bg-muted" />
                <div>
                  <p className="text-sm font-semibold">{TESTIMONIALS[current].name}</p>
                  <p className="text-xs text-muted-foreground">{TESTIMONIALS[current].role}</p>
                  <p className="text-xs text-red-500">{TESTIMONIALS[current].organization}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8 scroll-reveal">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${i === current ? 'w-6 h-2 bg-red-500' : 'w-2 h-2 bg-border hover:bg-muted-foreground'}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
