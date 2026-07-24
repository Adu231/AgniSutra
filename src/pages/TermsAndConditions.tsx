import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FileText } from 'lucide-react';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <div className="text-muted-foreground leading-relaxed space-y-3 text-sm">{children}</div>
  </div>
);

const TermsAndConditions: React.FC = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>
      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 gradient-fire rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-muted-foreground">Last updated: July 2025</span>
          </div>
          <h1 className="text-4xl font-black mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Terms and Conditions</h1>
          <p className="text-muted-foreground mb-10 leading-relaxed">These Terms and Conditions ("Terms") govern your use of AgniSutra's fire safety management platform. By accessing or using our services, you agree to be bound by these Terms. Please read them carefully before using our platform.</p>

          <Section title="1. Acceptance of Terms">
            <p>By creating an account or using AgniSutra's services, you confirm that you are at least 18 years old, have the authority to bind your organization to these Terms, and agree to comply with all applicable laws and regulations.</p>
          </Section>

          <Section title="2. Description of Services">
            <p>AgniSutra provides a comprehensive fire safety management platform including equipment tracking, digital inspections, compliance management, risk assessment, emergency response coordination, IoT monitoring, training management, and analytics. We reserve the right to modify, suspend, or discontinue any service at any time with reasonable notice.</p>
          </Section>

          <Section title="3. Account Registration and Security">
            <p>You are responsible for maintaining the confidentiality of your account credentials, all activities that occur under your account, immediately notifying us of unauthorized access, and ensuring accurate account information. You may not share accounts or credentials between users without our written consent.</p>
          </Section>

          <Section title="4. Subscription Plans and Payment">
            <p>Subscription fees are charged at the beginning of each billing period (monthly or annual). Annual plans are billed upfront. Prices are subject to change with 30-day advance notice. Refunds for annual plans are provided on a pro-rated basis for unused months within the first 30 days. All fees are non-refundable after the first 30 days.</p>
          </Section>

          <Section title="5. Acceptable Use Policy">
            <p>You agree not to use the platform for any unlawful purpose, attempt to gain unauthorized access to any systems, transmit malware or harmful code, interfere with other users' access, reverse engineer or copy our proprietary technology, use the platform to infringe third-party intellectual property rights, or provide false information that could affect safety decisions.</p>
          </Section>

          <Section title="6. Data Ownership and License">
            <p>You retain ownership of all data you input into the platform. You grant AgniSutra a limited license to process your data solely to provide the contracted services. We will not use your operational data for purposes beyond service delivery without your consent.</p>
          </Section>

          <Section title="7. Intellectual Property">
            <p>AgniSutra retains all intellectual property rights to the platform, including software, algorithms, UI design, documentation, and branding. Your subscription grants you a limited, non-exclusive, non-transferable license to use the platform during your subscription period.</p>
          </Section>

          <Section title="8. Service Level Agreement">
            <p>We commit to 99.9% uptime for Enterprise plans, 99.5% for Professional plans, and 99% for Starter plans. Downtime for scheduled maintenance with advance notice is excluded from SLA calculations. Service credits apply for SLA breaches as outlined in your subscription agreement.</p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>AgniSutra's fire safety platform is a management and compliance tool. Users remain responsible for physical fire safety measures and decisions. AgniSutra shall not be liable for indirect, incidental, or consequential damages. Our total liability is limited to the fees paid in the 12 months preceding the claim.</p>
          </Section>

          <Section title="10. Termination">
            <p>Either party may terminate the agreement with 30-day written notice. We may terminate immediately for material breach, non-payment, or violation of these Terms. Upon termination, you will have 30 days to export your data before deletion.</p>
          </Section>

          <Section title="11. Governing Law">
            <p>These Terms are governed by the laws of India. Any disputes shall be resolved through arbitration in Mumbai, Maharashtra, under the Arbitration and Conciliation Act, 1996.</p>
          </Section>

          <Section title="12. Contact Information">
            <p>For legal inquiries: legal@agnisutra.com</p>
            <p>AgniSutra Technologies Pvt. Ltd., Mumbai, Maharashtra, India 400001</p>
          </Section>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default TermsAndConditions;
