import React from 'react';

export default function CookiePolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-foreground mb-2 tracking-tight">Cookie Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: March 25, 2026</p>

      <div className="space-y-6 text-foreground">
        <section>
          <h2 className="text-lg font-bold mb-2">1. What Are Cookies?</h2>
          <p className="text-muted-foreground leading-relaxed">Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, keep you logged in, and understand how you use the service. We use both session cookies (deleted when you close your browser) and persistent cookies (remain until they expire or you delete them).</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">2. Cookies We Use</h2>
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-xl p-4">
              <h3 className="font-semibold mb-1">Essential Cookies</h3>
              <p className="text-sm text-muted-foreground">Required for the Service to function. These include authentication tokens to keep you logged in and security cookies to protect against CSRF attacks. You cannot opt out of these.</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4">
              <h3 className="font-semibold mb-1">Preference Cookies</h3>
              <p className="text-sm text-muted-foreground">Remember your settings such as language preference (English/Spanish) and daily usage counters stored in localStorage.</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4">
              <h3 className="font-semibold mb-1">Analytics Cookies</h3>
              <p className="text-sm text-muted-foreground">Help us understand how users interact with FileXone — which tools are most used, how long sessions last, and where users come from. This data is aggregated and anonymized.</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4">
              <h3 className="font-semibold mb-1">Stripe Cookies</h3>
              <p className="text-sm text-muted-foreground">Stripe (our payment processor) sets cookies during the checkout flow to prevent fraud and ensure secure payment processing. See <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Stripe's privacy policy</a> for details.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">3. Local Storage</h2>
          <p className="text-muted-foreground leading-relaxed">In addition to cookies, we use browser localStorage to store your daily usage count and language preference. This data stays on your device and is not transmitted to our servers.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">4. Managing Cookies</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">You can control cookies through your browser settings:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
            <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
            <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-2">Note: Disabling essential cookies may prevent FileXone from functioning properly.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">5. Third-Party Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">Stripe may set third-party cookies during checkout. We do not use third-party advertising cookies or sell your data to advertisers.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">6. Updates to This Policy</h2>
          <p className="text-muted-foreground leading-relaxed">We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated date.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">7. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">Questions? Contact us at:</p>
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