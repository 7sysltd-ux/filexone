import React from 'react';
import { useI18n } from '@/lib/i18n';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, X, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ComparisonPage({ headlineKey, competitor, competitorPrice, ctaKey, rows }) {
  const { t } = useI18n();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl font-extrabold text-foreground text-center mb-10 tracking-tight"
      >
        {t(headlineKey)}
      </motion.h1>

      {/* Price comparison header */}
      <div className="flex justify-center gap-6 mb-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">{competitor}</p>
          <p className="text-2xl font-bold font-mono text-foreground/50 line-through">{competitorPrice}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-primary font-medium mb-1">FileXone</p>
          <p className="text-4xl font-extrabold font-mono text-primary">$7</p>
        </div>
      </div>

      {/* Comparison table */}
      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="grid grid-cols-3 bg-muted/50 text-xs font-medium text-muted-foreground py-3 px-4">
          <span>{t('feature')}</span>
          <span className="text-center">{competitor}</span>
          <span className="text-center text-primary">FileXone</span>
        </div>

        {rows.map((row, i) => (
          <div
            key={row.key}
            className={`grid grid-cols-3 py-3 px-4 text-sm items-center ${
              i % 2 === 0 ? 'bg-card' : 'bg-muted/20'
            }`}
          >
            <span className="font-medium">{t(row.key)}</span>
            <span className="text-center text-muted-foreground">
              {row.competitor === t('yes') ? (
                <Check className="w-4 h-4 text-muted-foreground mx-auto" />
              ) : row.competitor === t('no') ? (
                <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
              ) : (
                <span className="font-mono">{row.competitor}</span>
              )}
            </span>
            <span className="text-center">
              {row.filexone === t('yes') ? (
                <Check className="w-4 h-4 text-primary mx-auto" />
              ) : (
                <span className="font-mono font-bold text-primary">{row.filexone}</span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/pricing">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8"
          >
            {t(ctaKey)}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}