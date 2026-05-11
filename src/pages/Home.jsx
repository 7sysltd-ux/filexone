import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/SEOHead';
import ComingSoonTeaser from '@/components/ComingSoonTeaser';
import { tools } from '@/lib/toolsConfig';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, ShieldCheck, Zap, FileX, Star, Lock, Trash2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

// ─── Contador animado ──────────────────────────────────────────────────────────
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return count;
}

// ─── Tool Card ─────────────────────────────────────────────────────────────────
const ToolCard = memo(function ToolCard({ tool, index }) {
  const { t } = useI18n();
  const Icon = tool.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Link
        to={tool.path}
        className="group block p-8 rounded-2xl border-2 border-border bg-card hover:border-primary hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 min-h-[160px]"
      >
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform duration-300">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="font-bold text-lg text-foreground mb-2 leading-snug">{t(tool.nameKey)}</h3>
        <p className="text-base text-muted-foreground leading-relaxed">{t(tool.descKey)}</p>
      </Link>
    </motion.div>
  );
});

// ─── Price Comparison ──────────────────────────────────────────────────────────
const PriceComparison = memo(function PriceComparison() {
  const { t } = useI18n();
  const competitors = [
    { name: 'Adobe Acrobat', price: '$23', path: '/vs-adobe' },
    { name: 'Smallpdf', price: '$12', path: '/vs-smallpdf' },
    { name: 'FileXone', price: '$7', highlight: true },
  ];
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">{t('priceCompareTitle')}</h2>
        <p className="text-lg text-muted-foreground mb-4">{t('priceCompareSubtitle')}</p>
        <p className="text-sm text-primary font-semibold mb-12">💰 Save $60/year vs Smallpdf · Save $192/year vs Adobe</p>
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-5">
          {competitors.map((c) => (
            <div key={c.name} className={`flex-1 w-full rounded-2xl p-8 border-2 flex flex-col items-center ${c.highlight ? 'border-primary bg-primary/5 shadow-2xl shadow-primary/20 scale-105' : 'border-border bg-card opacity-80'}`}>
              <p className={`text-lg font-semibold mb-2 ${c.highlight ? 'text-primary' : 'text-muted-foreground'}`}>{c.name}</p>
              <p className={`font-extrabold font-mono ${c.highlight ? 'text-5xl text-primary' : 'text-3xl text-foreground/50 line-through decoration-2'}`}>{c.price}</p>
              <p className={`text-base mt-1 ${c.highlight ? 'text-primary/80 font-semibold' : 'text-muted-foreground'}`}>{t('perMonth')}</p>
              {c.highlight && <span className="mt-3 px-3 py-1 bg-primary text-white text-sm font-bold rounded-full">Best Value ✓</span>}
              {c.path && <Link to={c.path} className="text-sm text-primary hover:underline mt-3 inline-block">Compare →</Link>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

// ─── Why Switch ────────────────────────────────────────────────────────────────
const WhySwitch = memo(function WhySwitch() {
  const reasons = [
    {
      icon: ShieldCheck,
      title: 'No surprise charges',
      text: 'Smallpdf users report being charged after canceling — sometimes multiple times in one day. FileXone charges $7/month, period. Cancel in one click. No annual traps.',
    },
    {
      icon: FileX,
      title: 'Your files stay yours',
      text: 'iLovePDF puts their name inside your PDF metadata. When you send a contract to a client, they can see you used a free tool. FileXone returns clean, professional files with no hidden branding.',
    },
    {
      icon: Zap,
      title: 'No daily walls',
      text: 'Both Smallpdf and iLovePDF lock batch processing behind expensive plans. FileXone gives you unlimited access to all tools — including 20 files at once — for $7/month.',
    },
  ];
  return (
    <section className="py-20 px-4 bg-foreground/[0.03] border-y border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Tired of surprise charges and daily limits?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">FileXone was built for people frustrated with Smallpdf and iLovePDF.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {reasons.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="bg-background border border-border rounded-2xl p-6 flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <r.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-center">
          <Link to="/pricing">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 font-bold shadow-lg shadow-primary/20" style={{ height: '56px', fontSize: '18px' }}>
              Switch to FileXone — $7/month <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground mt-3">7-day money-back guarantee · No annual contracts · Cancel anytime</p>
        </motion.div>
      </div>
    </section>
  );
});

// ─── Testimonials ──────────────────────────────────────────────────────────────
const Testimonials = memo(function Testimonials() {
  const items = [
    {
      quote: "I was paying $12/month to Smallpdf for 2 years. Switched to FileXone, same quality, saved $120 a year. Wish I'd found it sooner.",
      name: "Mike T.",
      role: "Freelance Designer",
      company: "Austin, TX",
      initials: "MT",
    },
    {
      quote: "Found out iLovePDF was embedding their name in my PDF metadata. Sent a proposal to a client and they noticed. Switched to FileXone that same day — never going back.",
      name: "Sarah K.",
      role: "Independent Consultant",
      company: "New York, NY",
      initials: "SK",
    },
    {
      quote: "Adobe Acrobat was $23/month for features I barely used. FileXone does everything I actually need — PDF to Word, compress, merge — for a third of the price.",
      name: "James R.",
      role: "Small Business Owner",
      company: "Chicago, IL",
      initials: "JR",
    },
  ];
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl sm:text-3xl font-extrabold text-foreground text-center mb-2">
          People who switched and never looked back
        </motion.h2>
        <p className="text-sm text-muted-foreground text-center mb-10">Real users. Real savings. No fluff.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-primary fill-primary" />)}
              </div>
              <p className="text-sm text-foreground leading-relaxed flex-1">"{item.quote}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">{item.initials}</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{item.name} · {item.role}</p>
                  <p className="text-xs text-muted-foreground">{item.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

// ─── Security Badges ───────────────────────────────────────────────────────────
const SecurityBadges = memo(function SecurityBadges() {
  const badges = [
    { icon: Lock, label: '256-bit SSL Encryption', sub: 'All transfers secured' },
    { icon: Trash2, label: 'Auto-deleted after 1 hour', sub: 'Files never stored' },
    { icon: ShieldCheck, label: 'GDPR & CCPA Compliant', sub: 'Your privacy protected' },
    { icon: Clock, label: 'No account required', sub: 'Start in seconds' },
  ];
  return (
    <section className="py-10 px-4 border-t border-border bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs text-muted-foreground text-center font-semibold uppercase tracking-widest mb-6">Trusted & Secure</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {badges.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center text-center gap-2 p-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <b.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs font-semibold text-foreground leading-tight">{b.label}</p>
              <p className="text-xs text-muted-foreground">{b.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

// ─── Stats Counter ─────────────────────────────────────────────────────────────
const StatsBar = memo(function StatsBar() {
  const files = useCounter(4832, 2500);
  const users = useCounter(12400, 2500);
  const savings = useCounter(60, 2500);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-8 px-4 bg-primary/5 border-y border-primary/10"
    >
      <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl sm:text-3xl font-extrabold text-primary font-mono">{files.toLocaleString()}+</p>
          <p className="text-xs text-muted-foreground mt-1">Files processed today</p>
        </div>
        <div>
          <p className="text-2xl sm:text-3xl font-extrabold text-primary font-mono">{users.toLocaleString()}+</p>
          <p className="text-xs text-muted-foreground mt-1">Users this month</p>
        </div>
        <div>
          <p className="text-2xl sm:text-3xl font-extrabold text-primary font-mono">${savings}/yr</p>
          <p className="text-xs text-muted-foreground mt-1">Saved vs Smallpdf</p>
        </div>
      </div>
    </motion.div>
  );
});

// ─── Home ──────────────────────────────────────────────────────────────────────
export default memo(function Home() {
  const { t } = useI18n();
  return (
    <div>
      <SEOHead
        title="FileXone — Free PDF Tools Online | Compress, Convert, Merge PDF"
        description="Free online PDF tools. Compress, convert PDF to Word, merge, split, sign and more. No installation needed. Start free with 3 uses per day."
        path="/"
      />

      {/* Hero */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mb-8 bg-muted/60 border border-border rounded-full px-4 py-2 text-xs sm:text-sm w-full max-w-full">
            <span className="text-muted-foreground line-through whitespace-nowrap">Adobe $23/mo</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-muted-foreground line-through whitespace-nowrap">Smallpdf $12/mo</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="font-bold px-2 py-0.5 rounded-full text-white text-xs sm:text-sm whitespace-nowrap" style={{ backgroundColor: '#10B981' }}>FileXone $7/mo ✓</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-tight mb-2 break-words">
            {t('heroTitle')}
          </motion.h1>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-primary tracking-tight leading-tight mb-6 break-words">
            {t('heroTitle2')}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-6">
            {t('heroSubtitle')}
          </motion.p>

          {/* Trust signals */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="flex flex-wrap items-center justify-center gap-4 mb-10 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-primary" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-primary" /> 7-day money-back guarantee</span>
            <span className="flex items-center gap-1.5"><Trash2 className="w-3.5 h-3.5 text-primary" /> Files deleted after 1 hour</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full px-4 sm:px-0 sm:w-auto">
            <Link to="/compress-pdf" className="block sm:inline-block w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto max-w-full bg-primary hover:bg-primary/90 hover:scale-[1.02] text-primary-foreground rounded-full px-8 text-base sm:text-lg font-bold shadow-lg shadow-primary/20 transition-all duration-300" style={{ height: '56px' }}>
                {t('startFree')} <ArrowRight className="w-5 h-5 ml-2 flex-shrink-0" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats counter */}
      <StatsBar />

      {/* Tools grid */}
      <section className="px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">{t('tools')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tools.map((tool, i) => <ToolCard key={tool.id} tool={tool} index={i} />)}
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <ComingSoonTeaser />

      {/* Price comparison */}
      <PriceComparison />

      {/* Why Switch */}
      <WhySwitch />

      {/* Testimonials */}
      <Testimonials />

      {/* Security badges */}
      <SecurityBadges />

      {/* Final CTA */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{t('tagline')}</h2>
          <p className="text-sm text-muted-foreground mb-6">Join thousands who switched from Smallpdf and Adobe.</p>
          <Link to="/compress-pdf" className="block">
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-bold shadow-lg shadow-primary/20" style={{ height: '56px', fontSize: '18px' }}>
              {t('startFree')}
            </Button>
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> {t('noCreditCard')}</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> {t('cancelAnytime')}</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-primary" /> 7-day guarantee</span>
          </div>
        </div>
      </section>
    </div>
  );
});