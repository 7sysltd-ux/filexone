import React from 'react';
import { Lock } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function PrivacyNote() {
  const { t } = useI18n();

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center mt-4">
      <Lock className="w-3 h-3" />
      <span>{t('privacy')}</span>
    </div>
  );
}