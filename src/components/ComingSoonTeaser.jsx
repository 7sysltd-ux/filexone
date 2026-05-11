import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const MYSTERY_CARDS = [
  { delay: 0 },
  { delay: 200 },
  { delay: 400 },
  { delay: 600 },
];

function NotifyModal({ open, onClose }) {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground text-base">{t('notifyModalTitle')}</h3>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary text-lg">✓</span>
                </div>
                <p className="font-semibold text-foreground text-sm mb-1">{t('notifyOnList')}</p>
                <p className="text-muted-foreground text-xs">{t('notifyOnListSub')}</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('notifyBody')}
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-10 text-sm font-semibold">
                    {t('notifyBtn')}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MysteryCard({ delay, badge }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000 + 0.2, duration: 0.4 }}
      className="relative rounded-2xl border-2 border-primary/20 bg-card min-h-[160px] overflow-hidden p-8 flex flex-col"
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.08) 50%, transparent 100%)',
            animationDelay: `${delay}ms`,
          }}
        />
      </div>

      {/* Semi-transparent green overlay */}
      <div className="absolute inset-0 bg-primary/5 rounded-2xl" />

      {/* Pulsing border glow */}
      <div
        className="absolute inset-0 rounded-2xl border-2 border-primary/30 animate-pulse"
        style={{ animationDelay: `${delay}ms` }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 animate-pulse" style={{ animationDelay: `${delay}ms` }}>
          <Lock className="w-7 h-7 text-primary/60" />
        </div>
        <div className="h-4 w-28 bg-primary/10 rounded-lg mb-2 animate-pulse" style={{ animationDelay: `${delay}ms` }} />
        <div className="h-3 w-36 bg-muted/60 rounded-lg animate-pulse" style={{ animationDelay: `${delay}ms` }} />
        <div className="mt-auto">
          <span className="text-xs font-semibold text-primary/70 tracking-widest uppercase">{badge}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ComingSoonTeaser() {
  const { t } = useI18n();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="flex items-center gap-2 mb-3">
              {/* Green ripple dot */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
              </span>
              <span className="text-xs font-bold text-primary tracking-widest uppercase">{t('comingSoonBadge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {t('comingSoonTitle')}
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-md">
              {t('comingSoonSubtitle')}
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="text-sm text-primary hover:underline mt-3 flex items-center gap-1 transition-opacity hover:opacity-80"
            >
              {t('comingSoonNotify')}
            </button>
          </div>

          {/* Mystery cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {MYSTERY_CARDS.map((card, i) => (
              <MysteryCard key={i} delay={card.delay} badge={t('comingSoonBadge')} />
            ))}
          </div>
        </div>
      </section>

      <NotifyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}