import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BLOG_POSTS } from '@/constants';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Twitter, Linkedin, Check } from 'lucide-react';
import { toast } from 'sonner';

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const related = BLOG_POSTS.filter(p => p.id !== id).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button variant="ghost" className="mb-8 -ml-2" onClick={() => navigate('/blog')}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
            </Button>
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-full mb-4">{post.category}</span>
              <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{post.title}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">{post.excerpt}</p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full gradient-fire flex items-center justify-center text-white text-sm font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm">{post.author}</p>
                  <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.publishedAt}</div>
                <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</div>
                <button onClick={handleShare} className="flex items-center gap-1 hover:text-red-500 transition-colors">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>
            </div>
            <div className="h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>

            {/* Article Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Fire safety management has undergone a dramatic transformation over the past decade. As technology evolves, organizations are moving away from paper-based inspections and reactive approaches toward intelligent, data-driven safety ecosystems. AgniSutra sits at the forefront of this revolution.
              </p>
              <h2 className="text-2xl font-bold mb-4">The Challenge with Traditional Fire Safety</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Traditional fire safety management relies heavily on manual inspections, paper records, and reactive maintenance. This creates significant gaps in compliance, delayed incident response, and difficulty tracking equipment health across multiple facilities.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Safety officers spend hours compiling inspection reports, maintenance records are lost or incomplete, and compliance gaps go undetected until a regulatory audit. The result? Organizations face compliance violations, financial penalties, and most critically — increased safety risks.
              </p>
              <h2 className="text-2xl font-bold mb-4">How AI is Changing the Game</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Artificial intelligence brings three transformative capabilities to fire safety: predictive risk assessment, automated compliance monitoring, and intelligent inspection assistance. By analyzing historical data, equipment sensor readings, and inspection records, AI can identify potential hazards before they become incidents.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                AgniSutra's AI Risk Assessment module continuously analyzes your facility's fire risk profile, identifying critical zones that need attention and prioritizing maintenance actions based on risk impact. Organizations using our platform have reported 85% reduction in fire safety violations.
              </p>
              <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
              <ul className="list-none space-y-3 mb-6">
                {['Digital transformation of fire safety delivers measurable ROI within 3 months', 'AI-powered risk assessment identifies 40% more hazards than manual audits', 'Real-time IoT monitoring reduces equipment downtime by 60%', 'Automated compliance reporting saves 15+ hours per inspector per month'].map(point => (
                  <li key={point} className="flex items-start gap-2 text-muted-foreground">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> {point}
                  </li>
                ))}
              </ul>
            </article>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
              {post.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                  <Tag className="w-3 h-3" />{tag}
                </span>
              ))}
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-sm text-muted-foreground">Share:</span>
              <button className="w-8 h-8 bg-[#1DA1F2]/10 text-[#1DA1F2] rounded-lg flex items-center justify-center hover:bg-[#1DA1F2]/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 bg-[#0A66C2]/10 text-[#0A66C2] rounded-lg flex items-center justify-center hover:bg-[#0A66C2]/20 transition-colors">
                <Linkedin className="w-4 h-4" />
              </button>
              <button onClick={handleShare} className="w-8 h-8 bg-muted text-muted-foreground rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(p => (
                <div key={p.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group" onClick={() => navigate(`/blog/${p.id}`)}>
                  <div className="h-40 overflow-hidden">
                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-red-500 font-semibold">{p.category}</span>
                    <h3 className="font-bold mt-1 mb-2 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{p.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />{p.readTime}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
