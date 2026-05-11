import React from 'react';
import { Link } from 'react-router-dom';

export default function RefundPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-foreground mb-2 tracking-tight">Refund Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: March 25, 2026</p>

      <div className="space-y-6 text-foreground">
        <section>
          <h2 className="text-lg font-bold mb-2">1. Overview</h2>
          <p className="text-muted-foreground leading-relaxed">FileXone offers a subscription-based Pro plan at $7.00 USD/month. We want you to be satisfied with our service. This policy explains when and how refunds are issued.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">2. 7-Day Money-Back Guarantee</h2>
          <p className="text-muted-foreground leading-relaxed">If you subscribe to the Pro plan and are not satisfied, you may request a full refund within <strong>7 days of your initial purchase</strong>. This guarantee applies to first-time subscriptions only. To request a refund, email <a href="mailto:support@filexone.com" className="text-primary hover:underline">support@filexone.com</a> with your account email and order details.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">3. Renewal Charges</h2>
          <p className="text-muted-foreground leading-relaxed">After the initial period, your subscription renews automatically each month. Refunds for renewal charges are issued only if:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground mt-2">
            <li>You contact us within 48 hours of the renewal charge AND</li>
            <li>You have not used the Pro plan features since the renewal date</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">4. Service Outages</h2>
          <p className="text-muted-foreground leading-relaxed">If FileXone experiences a significant outage (more than 24 continuous hours) that prevents you from accessing Pro features, you may be eligible for a prorated credit applied to your next billing cycle. Credits are issued at our discretion.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">5. Non-Refundable Cases</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">Refunds will not be issued in the following cases:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Account suspended or terminated for violation of our <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link></li>
            <li>Refund requests made after the 7-day initial period (unless due to service outage)</li>
            <li>Requests for partial months beyond the 48-hour renewal window</li>
            <li>Change of mind after the 7-day period</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">6. How Refunds Are Processed</h2>
          <p className="text-muted-foreground leading-relaxed">Approved refunds are processed via Stripe to your original payment method. Refunds typically appear on your statement within 5–10 business days, depending on your bank or card issuer.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">7. Cancellation</h2>
          <p className="text-muted-foreground leading-relaxed">You can cancel your Pro subscription at any time by contacting <a href="mailto:support@filexone.com" className="text-primary hover:underline">support@filexone.com</a>. Upon cancellation, you retain Pro access until the end of the current billing period. No further charges will be made.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">8. Consumer Rights</h2>
          <p className="text-muted-foreground leading-relaxed">Nothing in this policy affects your statutory rights. EU/UK consumers may have additional rights under consumer protection regulations. Please contact us if you have questions about your rights in your jurisdiction.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">9. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">For refund requests or questions, contact us at:</p>
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