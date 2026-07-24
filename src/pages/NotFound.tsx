import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Flame, Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    console.error('404 Error: Route not found:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="w-10 h-10 rounded-xl gradient-fire flex items-center justify-center">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <span className="gradient-fire-text">Agni</span><span>Sutra</span>
          </span>
        </div>

        {/* 404 */}
        <div className="text-9xl font-black gradient-fire-text mb-4 leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          404
        </div>

        <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-2">
          The page <code className="text-sm bg-muted px-2 py-0.5 rounded text-red-500">{location.pathname}</code> doesn't exist.
        </p>
        <p className="text-muted-foreground mb-10">
          It may have been moved, deleted, or the URL might be incorrect.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            className="gradient-fire text-white border-0 group"
            onClick={() => navigate('/')}
          >
            <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Back to Home
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Maybe you were looking for:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Features', href: '/features' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Contact', href: '/contact' },
              { label: 'FAQ', href: '/faq' },
            ].map(link => (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm hover:bg-muted transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
