import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { FAQ_ITEMS } from '@/constants';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FAQ: React.FC = () => {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(FAQ_ITEMS.map(f => f.category)))];

  const filtered = FAQ_ITEMS.filter(item => {
    const matchSearch = item.question.toLowerCase().includes(search.toLowerCase()) || item.answer.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                <HelpCircle className="w-4 h-4" />
                Help Center
              </div>
              <h1 className="section-title mb-4">Frequently Asked <span className="gradient-fire-text">Questions</span></h1>
              <p className="section-subtitle">Everything you need to know about AgniSutra's fire safety platform.</p>
            </div>

            {/* Search */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                className="input-field pl-12 text-base"
                placeholder="Search questions..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'gradient-fire text-white' : 'bg-card border border-border hover:bg-muted'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="space-y-3">
              {filtered.map(item => (
                <div key={item.id} className="bg-card border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium pr-4">{item.question}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${openId === item.id ? 'rotate-180 text-red-500' : ''}`} />
                  </button>
                  {openId === item.id && (
                    <div className="px-6 pb-5">
                      <div className="h-px bg-border mb-4" />
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                      <span className="inline-block mt-3 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{item.category}</span>
                    </div>
                  )}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>No questions found. Try a different search term.</p>
                </div>
              )}
            </div>

            {/* Contact CTA */}
            <div className="mt-12 text-center p-8 bg-card border border-border rounded-2xl">
              <h3 className="text-xl font-bold mb-2">Still Have Questions?</h3>
              <p className="text-muted-foreground mb-6">Our support team is available 24/7 to help you with any questions about AgniSutra.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="gradient-fire text-white border-0" onClick={() => navigate('/contact')}>Contact Support</Button>
                <Button variant="outline" onClick={() => navigate('/register')}>Start Free Trial</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
