import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, TrendingUp, AlertOctagon, CheckSquare, Thermometer, Droplets, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dashboardImg from '@/assets/dashboard-preview.jpg';

const DashboardPreview: React.FC = () => {
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

  const metrics = [
    { icon: CheckSquare, label: 'Compliance Score', value: '94%', change: '+6%', color: 'text-green-400' },
    { icon: AlertOctagon, label: 'Open Incidents', value: '3', change: '-2', color: 'text-red-400' },
    { icon: Thermometer, label: 'IoT Alerts', value: '7', change: 'Live', color: 'text-orange-400' },
    { icon: Droplets, label: 'Equipment OK', value: '98%', change: 'Healthy', color: 'text-blue-400' },
  ];

  return (
    <section ref={sectionRef as any} className="py-24 bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <Monitor className="w-4 h-4" />
              Command Center Dashboard
            </div>
            <h2 className="section-title mb-6">
              Your Complete Safety
              <span className="gradient-fire-text"> Command Center</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              A unified real-time view of your entire fire safety ecosystem — from equipment health and compliance scores to live IoT alerts and incident tracking.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.label} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-4 h-4 ${metric.color}`} />
                      <span className="text-xs text-muted-foreground">{metric.change}</span>
                    </div>
                    <div className={`text-2xl font-black ${metric.color} mb-1`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {metric.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="gradient-fire text-white border-0 group"
                onClick={() => navigate('/register')}
              >
                Access Dashboard Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" onClick={() => navigate('/login')}>
                Sign In to Demo
              </Button>
            </div>
          </div>

          {/* Dashboard Image */}
          <div className="scroll-reveal relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
              <img
                src={dashboardImg}
                alt="AgniSutra Dashboard Preview"
                className="w-full h-auto"
              />
              {/* Overlay with live indicators */}
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-400 animate-ping" />
                </div>
                <span className="text-white text-xs font-medium">Live Monitoring</span>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -left-6 bottom-16 hidden xl:block bg-card border border-border rounded-xl p-4 shadow-xl animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <AlertOctagon className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Critical Alert</p>
                  <p className="text-xs text-muted-foreground">Smoke detector offline — B2 Floor</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 top-20 hidden xl:block bg-card border border-border rounded-xl p-4 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Compliance Up</p>
                  <p className="text-xs text-muted-foreground">94% this quarter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
