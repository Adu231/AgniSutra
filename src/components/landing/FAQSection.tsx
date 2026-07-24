import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '@/constants';

const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('1');
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

  const displayFAQs = FAQ_ITEMS.slice(0, 6);

  return (
    <section ref={sectionRef as any} id="faq" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h2 className="section-title mb-4">
            Got Questions?
            <span className="gradient-fire-text"> We've Got Answers</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about AgniSutra's fire safety platform.
          </p>
        </div>

        <div className="space-y-3">
          {displayFAQs.map((item) => (
            <div
              key={item.id}
              className="scroll-reveal stagger-child bg-card border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-sm sm:text-base pr-4">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                    openId === item.id ? 'rotate-180 text-red-500' : ''
                  }`}
                />
              </button>
              {openId === item.id && (
                <div className="px-6 pb-5">
                  <div className="h-px bg-border mb-4" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10 scroll-reveal">
          <p className="text-muted-foreground text-sm mb-4">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/faq" className="text-sm text-red-600 dark:text-red-400 hover:underline font-medium">
              View all FAQs →
            </a>
            <span className="hidden sm:block text-muted-foreground">·</span>
            <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact our support team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
