import React from 'react';
import { useI18n } from '@/lib/i18n';
import ComparisonPage from '@/components/comparison/ComparisonPage';

export default function VsAdobe() {
  const { t } = useI18n();

  return (
    <ComparisonPage
      headlineKey="vsAdobeHeadline"
      competitor="Adobe Acrobat"
      competitorPrice="$23"
      ctaKey="getAllTools"
      rows={[
        { key: 'price', competitor: '$23/mo', filexone: '$7/mo' },
        { key: 'unlimitedTools', competitor: t('yes'), filexone: t('yes') },
        { key: 'eSignature', competitor: t('yes'), filexone: t('yes') },
        { key: 'fileCompression', competitor: t('yes'), filexone: t('yes') },
        { key: 'batchProcessing', competitor: t('yes'), filexone: t('yes') },
        { key: 'noAds', competitor: t('yes'), filexone: t('yes') },
      ]}
    />
  );
}