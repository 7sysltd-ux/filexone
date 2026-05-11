import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-foreground mb-2 tracking-tight">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: March 25, 2026</p>

      <div className="prose prose-sm max-w-none space-y-6 text-foreground">
        <section>
          <h2 className="text-lg font-bold mb-2">1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            FileXone ("we," "us," or "our"), operated by Northvanta LLC, operates the FileXone PDF tools platform at filexone.com. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our services. By using FileXone, you agree to the practices described in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">2. Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed mb-2"><strong>Account Information:</strong> When you register, we collect your email address and any profile information you provide.</p>
          <p className="text-muted-foreground leading-relaxed mb-2"><strong>Payment Information:</strong> Payments are processed by Stripe. We do not store your credit card number, CVV, or full payment details. We store only your Stripe customer ID and subscription status.</p>
          <p className="text-muted-foreground leading-relaxed mb-2"><strong>Files You Upload:</strong> Files uploaded for processing (PDFs, Word documents, etc.) are transmitted to iLovePDF's servers solely to perform the requested conversion or processing. We do not store, read, or retain your uploaded files after processing is complete. Files are automatically deleted from processing servers within 2 hours.</p>
          <p className="text-muted-foreground leading-relaxed"><strong>Usage Data:</strong> We may collect anonymized usage data such as which tools are used, browser type, device type, and general geographic location (country level) to improve our services.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">3. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>To provide, operate, and maintain our PDF tools service</li>
            <li>To process payments and manage your subscription</li>
            <li>To send you service-related emails (receipts, account updates)</li>
            <li>To respond to customer support inquiries</li>
            <li>To detect and prevent fraud or abuse</li>
            <li>To analyze usage patterns and improve the platform</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">4. Data Sharing and Third Parties</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">We do not sell your personal data. We share data only with trusted service providers:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li><strong>Stripe:</strong> Payment processing and subscription management</li>
            <li><strong>iLovePDF:</strong> PDF processing tasks (files are processed and deleted automatically)</li>
            <li><strong>Base44:</strong> Application infrastructure and hosting</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-2">We may disclose your information if required by law or to protect the rights, property, or safety of FileXone, our users, or others.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">5. Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">We use cookies and similar technologies to keep you logged in, remember your preferences, and analyze traffic. See our <a href="/cookie-policy" className="text-primary hover:underline">Cookie Policy</a> for details.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">6. Data Retention</h2>
          <p className="text-muted-foreground leading-relaxed">We retain your account data for as long as your account is active. Uploaded files are deleted from processing servers within 2 hours. You may request deletion of your account and associated data at any time by emailing <a href="mailto:support@filexone.com" className="text-primary hover:underline">support@filexone.com</a>.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">7. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">Depending on your jurisdiction, you may have the right to:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Access, correct, or delete your personal data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
            <li>Lodge a complaint with a supervisory authority (EU/UK users)</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-2">To exercise these rights, contact us at <a href="mailto:support@filexone.com" className="text-primary hover:underline">support@filexone.com</a>.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">8. Security</h2>
          <p className="text-muted-foreground leading-relaxed">We use industry-standard security measures including HTTPS/TLS encryption for all data in transit. While we strive to protect your data, no method of transmission over the Internet is 100% secure.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">9. Children's Privacy</h2>
          <p className="text-muted-foreground leading-relaxed">FileXone is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">10. Changes to This Policy</h2>
          <p className="text-muted-foreground leading-relaxed">We may update this Privacy Policy periodically. We will notify you of significant changes by email or by posting a prominent notice on our website. Continued use of FileXone after changes constitutes acceptance of the updated policy.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">11. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">If you have questions about this Privacy Policy, contact us at:</p>
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