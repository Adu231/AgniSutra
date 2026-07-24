import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Mail, Phone, MapPin, Twitter, Linkedin, Youtube, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Platform',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'About Us', href: '/about' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Commercial Buildings', href: '/features' },
        { label: 'Manufacturing Plants', href: '/features' },
        { label: 'Healthcare Facilities', href: '/features' },
        { label: 'Educational Institutes', href: '/features' },
        { label: 'Fire Departments', href: '/features' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Contact Support', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-fire flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <span className="gradient-fire-text">Agni</span>
                <span>Sutra</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Next-generation AI-powered fire safety and emergency management platform. Making every building, workplace, and community safer through intelligent technology.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500" />
                <a href="mailto:hello@agnisutra.com" className="hover:text-foreground transition-colors">hello@agnisutra.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500" />
                <a href="tel:+918000000000" className="hover:text-foreground transition-colors">+91 800 000 0000</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-sm text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} AgniSutra Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
