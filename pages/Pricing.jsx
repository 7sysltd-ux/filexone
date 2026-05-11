import React, { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import { redirectToStripeCheckout } from '@/lib/stripe';

export default function Pricing() {
  const { t } = useI18n();
  const { isAuthenticated, openSignIn } = useAuth();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('canceled') === '1') setNotice('canceled');
  }, []);

  const handleCheckout = async () => {
    if (isAuthenticated) {
      await redirectToStripeCheckout();
    } else {
      openSignIn(`${window.location.origin}/checkout?type=direct`);
    }
  };

  const plans = [
    {
      name: t('free'),
      price: '$0',
      period: '',
      features: [t('freeFeature1'), t('freeFeature2'), t('freeFeature3'), t('freeFeature4')],
      highlight: false,
    },
    {
      name: t('pro'),
      price: '$7',
      period: t('perMonth'),
      features: [t('proFeature1'), t('proFeature2'), t('proFeature3'), t('proFeature4'), t('proFeature5')],
      highlight: true,
    },
  ];

  const testimonials = [
    {
      quote: "I was paying $12/month to Smallpdf for 2 years. Switched to FileXone, same quality, saved $120 a year.",
      name: "Mike T.",
      role: "Freelance Designer, Austin TX"
    },
    {
      quote: "Found out iLovePDF was putting their name in my PDF metadata. Sent a contract to a client and they noticed. Never again.",
      name: "Sarah K.",
      role: "Independent Consultant, New York"
    },
    {
      quote: "Adobe was overkill for what I needed. FileXone does everything I need for a third of the price.",
      name: "James R.",
      role: "Small Business Owner, Chicago"
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground text-center mb-2 tracking-tight">
        {t('pricing')}
      </h1>
      <p className="text-muted-foreground text-center mb-4">{t('tagline')}</p>

      {/* Savings callout */}
      <div className="flex items-center justify-center mb-10">
        <span className="bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full">
          💰 Save $60/year vs Smallpdf · Save $192/year vs Adobe
        </span>
      </div>

      {notice === 'canceled' && (
        <div className="mb-8 p-4 rounded-xl bg-muted border border-border text-center">
          <p className="text-sm text-muted-foreground">Payment was canceled. You can upgrade anytime.</p>
        </div>
      )}

      {/* Plans */}
      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl p-6 border-2 transition-all ${
              plan.highlight
                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                : 'border-border bg-card'
            }`}
          >
            <h2 className="text-lg font-bold text-foreground mb-1">{plan.name}</h2>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold font-mono text-foreground">{plan.price}</span>
              {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            {plan.highlight ? (
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleCheckout}
                  className="w-full rounded-xl h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  Start 3-Day Free Trial
                </Button>
                <Button
                  onClick={handleCheckout}
                  variant="outline"
                  className="w-full rounded-xl h-11 border-primary text-primary hover:bg-primary/5 font-semibold"
                >
                  Get Pro Now — No Trial
                </Button>
              </div>
            ) : (
              <Link to="/compress-pdf" className="block w-full">
                <Button className="w-full rounded-xl h-11 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm font-semibold">
                  Start Free
                </Button>
              </Link>
            )}
          </motion.div>
        ))}
      </div>

      {/* 7-day guarantee */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-start gap-4 bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-10 max-w-2xl mx-auto"
      >
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground mb-1">7-Day Money-Back Guarantee</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Not happy with FileXone Pro? Email us within 7 days of your purchase and we'll refund you in full. No questions asked, no hoops to jump through. We're confident you'll love it — but if you don't, you pay nothing.
          </p>
        </div>
      </motion.div>

      {/* Why cheaper */}
      <div className="bg-muted/40 border border-border rounded-2xl p-5 mb-10 max-w-2xl mx-auto">
        <p className="text-sm font-bold text-foreground mb-2">Why is FileXone cheaper than Smallpdf?</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Smallpdf raised millions in VC funding and has a large team with high overhead. FileXone is independently built and operated — no investors, no bloat, no massive marketing budget. We pass those savings directly to you. Same quality tools, honest pricing.
        </p>
      </div>

      {/* Testimonials */}
      <div className="max-w-2xl mx-auto mb-8">
        <h3 className="text-lg font-bold text-foreground text-center mb-6">What people say after switching</h3>
        <div className="space-y-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-background border border-border rounded-xl p-4"
            >
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground italic mb-2">"{t.quote}"</p>
              <p className="text-xs text-muted-foreground font-semibold">{t.name} — {t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">{t('pricingNote')}</p>
    </div>
  );
}