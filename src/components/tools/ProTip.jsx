import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { Sparkles } from 'lucide-react';

export default function ProTip() {
  const { t } = useI18n();

  return (
    <div className="flex items-center justify-center gap-2 mt-4 py-3 px-4 bg-primary/5 rounded-xl">
      <Sparkles className="w-4 h-4 text-primary" />
      <span className="text-sm text-muted-foreground">{t('unlimitedFor7')}</span>
      <Link to="/pricing" className="text-sm font-medium text-primary hover:underline">
        {t('startTrial')}
      </Link>
    </div>
  );
}