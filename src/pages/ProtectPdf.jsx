import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/SEOHead';
import ToolSEOContent from '@/components/tools/ToolSEOContent';
import ToolPageWrapper from '@/components/tools/ToolPageWrapper';
import { Button } from '@/components/ui/button';
import { runIlovepdf } from '@/lib/ilovepdf';
import { Eye, EyeOff } from 'lucide-react';

export default function ProtectPdf() {
  const { t } = useI18n();
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const handleProcess = async (files, options, onProgress) => {
    return await runIlovepdf('protect', files[0], { password }, onProgress);
  };

  return (
    <>
      <SEOHead
        title="Protect PDF with Password Free Online | FileXone"
        description="Add a password to your PDF online for free. Secure your documents instantly. No software needed."
        path="/protect-pdf"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "FileXone PDF Password Protector",
          "url": "https://filexone.com/protect-pdf",
          "description": "Free online PDF password protection. Secure your PDF documents instantly.",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1250" }
        }}
      />
      <ToolPageWrapper
        headlineKey="protectPdfHeadline"
      accept=".pdf"
      onProcess={handleProcess}
        outputFileName="protected.pdf"
      >
        {({ files, onProcess }) => (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">{t('protectPdfDesc')}</p>
          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('enterPassword')}
              className="w-full h-11 px-4 pr-10 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <Button
            onClick={() => onProcess()}
            disabled={!password}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11"
          >
            {t('protectPdf')}
          </Button>
        </div>
      )}
      </ToolPageWrapper>
      <ToolSEOContent toolKey="protectPdf" />
    </>
  );
}