import React from 'react';

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-foreground mb-2 tracking-tight">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: March 25, 2026</p>

      <div className="space-y-6 text-foreground">
        <section>
          <h2 className="text-lg font-bold mb-2">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">By accessing or using FileXone ("Service"), operated by Northvanta LLC, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, do not use our Service. These terms apply to all visitors, users, and others who access or use the Service.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">2. Description of Service</h2>
          <p className="text-muted-foreground leading-relaxed">FileXone provides online PDF tools including compression, conversion, merging, splitting, and other document processing features. The Service is offered on a freemium model: a limited free tier and a paid Pro subscription at $7/month.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">3. User Accounts</h2>
          <p className="text-muted-foreground leading-relaxed">You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. Notify us immediately at support@filexone.com of any unauthorized use.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">4. Subscriptions and Billing</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">The Pro plan is billed at <strong>$7.00 USD per month</strong> via Stripe. By subscribing:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>You authorize us to charge your payment method monthly until you cancel</li>
            <li>Subscriptions auto-renew unless canceled at least 24 hours before the renewal date</li>
            <li>You can cancel at any time from your account settings or by contacting support</li>
            <li>No partial-month refunds are provided unless required by law</li>
            <li>Prices may change with 30 days' notice via email</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">5. Free Tier Limitations</h2>
          <p className="text-muted-foreground leading-relaxed">Free users are limited to a set number of file operations per day. We reserve the right to modify free tier limits at any time. Exceeding limits will prompt an upgrade to the Pro plan.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">6. Acceptable Use</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">You agree not to use the Service to:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Upload files containing malware, illegal content, or content that violates third-party rights</li>
            <li>Attempt to reverse-engineer, scrape, or abuse our APIs</li>
            <li>Circumvent usage limits or access controls</li>
            <li>Upload content that is defamatory, obscene, or violates applicable laws</li>
            <li>Use the Service for any unlawful purpose</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">7. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">You retain all ownership rights to files you upload. By uploading files, you grant FileXone a limited, temporary license solely to process your files as directed. The FileXone name, logo, and platform code are our intellectual property and may not be copied or used without permission.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">8. Disclaimer of Warranties</h2>
          <p className="text-muted-foreground leading-relaxed">THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">9. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">TO THE MAXIMUM EXTENT PERMITTED BY LAW, FILEXONE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR DATA, ARISING OUT OF YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID IN THE 12 MONTHS PRECEDING THE CLAIM.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">10. Termination</h2>
          <p className="text-muted-foreground leading-relaxed">We may suspend or terminate your account at any time for violation of these Terms. You may delete your account by contacting support@filexone.com. Upon termination, your right to use the Service ceases immediately.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">11. Governing Law</h2>
          <p className="text-muted-foreground leading-relaxed">These Terms are governed by the laws of the State of Wyoming, USA, without regard to conflict of law provisions. Any disputes shall be resolved in the courts of Wyoming.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">12. Changes to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">We reserve the right to update these Terms at any time. We will provide at least 14 days' notice of material changes via email or in-app notification. Continued use after changes constitutes acceptance.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">13. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">Questions about these Terms? Contact us at:</p>
          <div className="text-muted-foreground leading-relaxed mt-2">
            <p className="font-semibold text-foreground">Northvanta LLC</p>
            <p>30 N Gould St Ste N, Sheridan, WY 82801 USA</p>
            <p>Email: <a href="mailto:support@filexone.com" className="text-primary hover:underline">support@filexone.com</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}