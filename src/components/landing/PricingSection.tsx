import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Zap, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRICING_PLANS } from '@/constants';

const PricingSection: React.FC = () => {
  const [annual, setAnnual] = useState(true);
  const navigate = useNavigate();
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

  return (
    <section ref={sectionRef as any} id="pricing" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Simple, Transparent Pricing
          </div>
          <h2 className="section-title mb-4">
            Choose Your
            <span className="gradient-fire-text"> Safety Plan</span>
          </h2>
          <p className="section-subtitle mb-8">
            Start free, scale as you grow. All plans include a 14-day free trial with no credit card required.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center bg-card border border-border rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!annual ? 'bg-red-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${annual ? 'bg-red-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Annual
              <span className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = annual ? plan.price.annual : plan.price.monthly;
            return (
              <div
                key={plan.id}
                className={`scroll-reveal stagger-child relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-red-600 to-red-700 text-white shadow-2xl shadow-red-500/20 scale-105'
                    : 'bg-card border border-border'
                }`}
              >
                {plan.badge && (
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                    plan.highlighted ? 'bg-white/20 text-white' : 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'
                  }`}>
                    {plan.badge}
                  </div>
                )}

                <div className="p-8 flex-1">
                  <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : ''}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-6 ${plan.highlighted ? 'text-white/80' : 'text-muted-foreground'}`}>
                    {plan.description}
                  </p>

                  <div className="mb-8">
                    <div className="flex items-end gap-1">
                      <span className={`text-4xl font-black ${plan.highlighted ? 'text-white' : ''}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {price === 0 ? 'Free' : `$${price}`}
                      </span>
                      {price > 0 && (
                        <span className={`text-sm pb-1 ${plan.highlighted ? 'text-white/70' : 'text-muted-foreground'}`}>
                          /month
                        </span>
                      )}
                    </div>
                    {annual && price > 0 && (
                      <p className={`text-xs mt-1 ${plan.highlighted ? 'text-white/70' : 'text-muted-foreground'}`}>
                        Billed annually · ${plan.price.annual * 12}/year
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-white' : 'text-green-500'}`} />
                        <span className={`text-sm ${plan.highlighted ? 'text-white/90' : 'text-foreground/80'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 pt-0">
                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? 'bg-white text-red-600 hover:bg-white/90'
                        : plan.id === 'enterprise'
                        ? 'gradient-fire text-white border-0 hover:opacity-90'
                        : 'border-2 border-red-600 text-red-600 dark:text-red-400 dark:border-red-400 hover:bg-red-600 hover:text-white'
                    }`}
                    variant={plan.highlighted ? 'secondary' : 'outline'}
                    onClick={() => navigate('/register')}
                  >
                    {plan.id === 'free' ? 'Start Free' : 'Start Free Trial'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10 scroll-reveal">
          <p className="text-sm text-muted-foreground">
            All plans include 14-day free trial · No credit card required · Cancel anytime
          </p>
          <button onClick={() => navigate('/pricing')} className="text-sm text-red-600 dark:text-red-400 hover:underline mt-2 block mx-auto">
            See full feature comparison →
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
