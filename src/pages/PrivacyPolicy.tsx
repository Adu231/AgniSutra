import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Shield } from 'lucide-react';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold mb-4 text-foreground">{title}</h2>
    <div className="text-muted-foreground leading-relaxed space-y-3 text-sm">{children}</div>
  </div>
);

const PrivacyPolicy: React.FC = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>
      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 gradient-fire rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-muted-foreground">Last updated: July 2025</span>
          </div>
          <h1 className="text-4xl font-black mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Privacy Policy</h1>
          <p className="text-muted-foreground mb-10 leading-relaxed">AgniSutra Technologies Pvt. Ltd. ("AgniSutra", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our fire safety management platform.</p>

          <Section title="1. Information We Collect">
            <p><strong className="text-foreground">Account Information:</strong> When you register, we collect your name, email address, phone number, organization name, and role information.</p>
            <p><strong className="text-foreground">Facility & Equipment Data:</strong> Information about your facilities, fire safety equipment, inspection records, maintenance history, and compliance data that you input into the platform.</p>
            <p><strong className="text-foreground">Usage Data:</strong> Log files, IP addresses, browser type, device information, pages visited, and actions taken within the platform.</p>
            <p><strong className="text-foreground">IoT Device Data:</strong> Sensor readings, device status, alerts, and telemetry data from connected fire safety devices.</p>
            <p><strong className="text-foreground">Location Data:</strong> GPS coordinates for geo-tagged inspections and GIS mapping features (with your explicit permission).</p>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect to provide, maintain, and improve our fire safety management platform, process transactions, send transactional and promotional communications, ensure platform security and prevent fraud, comply with legal obligations, and conduct analytics to improve our services.</p>
          </Section>

          <Section title="3. Data Sharing and Disclosure">
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist in operating our platform (under strict data processing agreements), when required by law or legal process, with your explicit consent for specific purposes, or in connection with a business merger or acquisition.</p>
          </Section>

          <Section title="4. Data Security">
            <p>We implement industry-standard security measures including AES-256 encryption at rest, TLS 1.3 encryption in transit, multi-factor authentication, role-based access controls, regular security audits and penetration testing, and SOC 2 Type II compliance. Despite these measures, no internet transmission is completely secure.</p>
          </Section>

          <Section title="5. Data Retention">
            <p>We retain your data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time. Certain data may be retained for legal compliance purposes for up to 7 years.</p>
          </Section>

          <Section title="6. Your Rights">
            <p>Depending on your location, you may have rights to access, correct, or delete your personal data; object to or restrict processing; data portability; withdraw consent; and lodge complaints with supervisory authorities. To exercise these rights, contact us at privacy@agnisutra.com.</p>
          </Section>

          <Section title="7. Cookies and Tracking">
            <p>We use essential cookies for authentication and security, analytics cookies to understand usage patterns, and preference cookies to remember your settings. You can manage cookie preferences through your browser settings.</p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>Our platform is not intended for individuals under 18 years of age. We do not knowingly collect personal information from minors.</p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes via email or prominent notice on our platform. Continued use of our services after changes constitutes acceptance of the updated policy.</p>
          </Section>

          <Section title="10. Contact Us">
            <p>For privacy-related inquiries: <strong className="text-foreground">privacy@agnisutra.com</strong></p>
            <p>AgniSutra Technologies Pvt. Ltd., Mumbai, Maharashtra, India 400001</p>
            <p>Data Protection Officer: dpo@agnisutra.com</p>
          </Section>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
