import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/constants';

const categories = ['All', 'Technology', 'IoT', 'Compliance', 'Emergency', 'Risk Management', 'Case Studies'];

const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = BLOG_POSTS.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-sm font-medium mb-4">
                <Tag className="w-4 h-4" />
                Fire Safety Insights
              </div>
              <h1 className="section-title mb-4">AgniSutra <span className="gradient-fire-text">Blog</span></h1>
              <p className="section-subtitle">Expert insights on fire safety, compliance, IoT monitoring, and emergency management.</p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-3xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  className="input-field pl-10"
                  placeholder="Search articles..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === cat ? 'gradient-fire text-white' : 'bg-card border border-border hover:bg-muted'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Featured Post */}
            {filtered.length > 0 && (
              <div
                className="bg-card border border-border rounded-2xl overflow-hidden mb-8 hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => navigate(`/blog/${filtered[0].id}`)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-64 md:h-auto overflow-hidden">
                    <img src={filtered[0].imageUrl} alt={filtered[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-full mb-4">{filtered[0].category}</span>
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{filtered[0].title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{filtered[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{filtered[0].author}</span>
                      <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{filtered[0].publishedAt}</div>
                      <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{filtered[0].readTime}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Post Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.slice(1).map(post => (
                <div
                  key={post.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1"
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <div className="h-48 overflow-hidden">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-full mb-3">{post.category}</span>
                    <h3 className="font-bold mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{post.author}</span>
                      <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>No articles found matching your search.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
