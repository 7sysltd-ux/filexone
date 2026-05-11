import React from 'react';
import { useI18n } from '@/lib/i18n';
import ComparisonPage from '@/components/comparison/ComparisonPage';

export default function VsSmallpdf() {
  const { t } = useI18n();

  return (
    <ComparisonPage
      headlineKey="vsSmallpdfHeadline"
      competitor="Smallpdf"
      competitorPrice="$12"
      ctaKey="switchToFileXone"
      rows={[
        { key: 'price', competitor: '$12/mo', filexone: '$7/mo' },
        { key: 'unlimitedTools', competitor: t('yes'), filexone: t('yes') },
        { key: 'eSignature', competitor: t('yes'), filexone: t('yes') },
        { key: 'fileCompression', competitor: t('yes'), filexone: t('yes') },
        { key: 'batchProcessing', competitor: t('limited'), filexone: t('yes') },
        { key: 'noAds', competitor: t('no'), filexone: t('yes') },
      ]}
    />
  );
}