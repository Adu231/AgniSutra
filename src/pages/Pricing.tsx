import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Zap, HelpCircle } from 'lucide-react';
import { PRICING_PLANS } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const comparison = [
  { feature: 'Facilities', starter: '1', professional: '10', enterprise: 'Unlimited' },
  { feature: 'Equipment Items', starter: '25', professional: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Digital Inspection Checklists', starter: 'Basic', professional: 'Advanced + AI', enterprise: 'Custom + AI' },
  { feature: 'AI Risk Assessment', starter: '✗', professional: '✓', enterprise: '✓ Advanced' },
  { feature: 'IoT Device Integration', starter: '✗', professional: '50 devices', enterprise: 'Unlimited' },
  { feature: 'GIS Emergency Mapping', starter: '✗', professional: '✓', enterprise: '✓ Advanced' },
  { feature: 'Mobile App (iOS & Android)', starter: '✓', professional: '✓', enterprise: '✓' },
  { feature: 'Analytics & Reporting', starter: 'Basic', professional: 'Advanced', enterprise: 'Executive + Custom' },
  { feature: 'Emergency Response Console', starter: '✗', professional: '✓', enterprise: '✓' },
  { feature: 'Training & Certification', starter: 'Basic (5 courses)', professional: 'Full Library', enterprise: 'Custom Programs' },
  { feature: 'API Access', starter: '✗', professional: '✗', enterprise: '✓' },
  { feature: 'Dedicated Account Manager', starter: '✗', professional: '✗', enterprise: '✓' },
  { feature: 'SLA Guarantee', starter: '99%', professional: '99.5%', enterprise: '99.9%' },
  { feature: 'Support', starter: 'Community', professional: 'Priority Email', enterprise: '24/7 Dedicated' },
];

const Pricing: React.FC = () => {
  const [annual, setAnnual] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSelectPlan = (planId: string) => {
    if (isAuthenticated) {
      toast.success(`Redirecting to upgrade checkout for ${planId.toUpperCase()} plan...`);
      navigate(`/dashboard/admin/subscriptions/payment?org=DLF%20Commercial%20Properties&plan=${planId}`);
    } else {
      toast.info('Please register to select a plan.');
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Simple Pricing
            </div>
            <h1 className="section-title mb-6">
              Choose the Right Plan
              <span className="gradient-fire-text"> for Your Organization</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Start free. Scale as you grow. Cancel anytime. No hidden fees.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-card border border-border rounded-full p-1 mb-12">
              <button
                onClick={() => setAnnual(false)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!annual ? 'bg-red-600 text-white' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${annual ? 'bg-red-600 text-white' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Annual Billing
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">Save 20%</span>
              </button>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {PRICING_PLANS.map((plan) => {
                const price = annual ? plan.price.annual : plan.price.monthly;
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl ${
                      plan.highlighted
                        ? 'bg-gradient-to-b from-red-600 to-red-700 text-white shadow-2xl shadow-red-500/20 scale-105'
                        : 'bg-card border border-border'
                    }`}
                  >
                    {plan.badge && (
                      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${plan.highlighted ? 'bg-white/20 text-white' : 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'}`}>
                        {plan.badge}
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : ''}`}>{plan.name}</h3>
                      <p className={`text-sm mb-6 ${plan.highlighted ? 'text-white/80' : 'text-muted-foreground'}`}>{plan.description}</p>
                      <div className="mb-8">
                        <div className="flex items-end gap-1">
                          <span className={`text-5xl font-black ${plan.highlighted ? 'text-white' : ''}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            {price === 0 ? 'Free' : `$${price}`}
                          </span>
                          {price > 0 && <span className={`text-sm pb-2 ${plan.highlighted ? 'text-white/70' : 'text-muted-foreground'}`}>/mo</span>}
                        </div>
                        {annual && price > 0 && <p className={`text-xs mt-1 ${plan.highlighted ? 'text-white/70' : 'text-muted-foreground'}`}>Billed ${plan.price.annual * 12}/year</p>}
                      </div>
                      <Button
                        className={`w-full mb-8 ${plan.highlighted ? 'bg-white text-red-600 hover:bg-white/90 font-semibold' : 'gradient-fire text-white border-0 hover:opacity-90 font-semibold'}`}
                        onClick={() => handleSelectPlan(plan.id)}
                      >
                        {plan.id === 'free' ? 'Start Free' : 'Start Free Trial'} <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                      <ul className="space-y-3">
                        {plan.features.map((f) => (
                          <li key={f} className={`flex items-start gap-2.5 text-sm ${plan.highlighted ? 'text-white/90' : ''}`}>
                            <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-white' : 'text-green-500'}`} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-10">Full Feature Comparison</h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-6 py-4 font-semibold">Feature</th>
                    {PRICING_PLANS.map(p => <th key={p.id} className={`text-center px-6 py-4 font-semibold ${p.highlighted ? 'text-red-600 dark:text-red-400' : ''}`}>{p.name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.feature} className={`border-t border-border ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
                      <td className="px-6 py-3 font-medium">{row.feature}</td>
                      <td className="px-6 py-3 text-center text-muted-foreground">{row.starter}</td>
                      <td className="px-6 py-3 text-center font-medium text-red-600 dark:text-red-400">{row.professional}</td>
                      <td className="px-6 py-3 text-center">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <HelpCircle className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Questions about pricing?</h2>
            <p className="text-muted-foreground mb-6">Our team is happy to help you choose the right plan for your organization's needs.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="gradient-fire text-white border-0" onClick={() => navigate('/contact')}>Talk to Sales</Button>
              <Button variant="outline" onClick={() => navigate('/faq')}>View FAQ</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
