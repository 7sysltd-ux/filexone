import React from 'react';
import { useI18n } from '@/lib/i18n';

export default function UsageDots({ remaining }) {
  const { t } = useI18n();
  const total = 3;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i < remaining
                ? 'bg-primary'
                : 'bg-border'
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {remaining} {remaining === 1 ? t('useLeft') : t('usesLeft')}
      </span>
    </div>
  );
}