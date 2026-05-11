import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/SEOHead';
import ToolSEOContent from '@/components/tools/ToolSEOContent';
import { useUsage } from '@/lib/useUsage';
import { invokeFunction } from '@/lib/api';
import { Button } from '@/components/ui/button';
import ProcessingView from '@/components/tools/ProcessingView';
import DownloadButton from '@/components/tools/DownloadButton';
import PrivacyNote from '@/components/tools/PrivacyNote';
import ProTip from '@/components/tools/ProTip';
import UpgradeModal from '@/components/tools/UpgradeModal';
import { Globe, AlertCircle } from 'lucide-react';

export default function WebToPdf() {
  const { t } = useI18n();
  const { canUse, consumeUse } = useUsage();
  const [url, setUrl] = useState('');
  const [state, setState] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [dismissedUpgrade, setDismissedUpgrade] = useState(false);

  const isValidUrl = (str) => {
    try {
      const full = str.startsWith('http') ? str : `https://${str}`;
      new URL(full);
      return true;
    } catch {
      return false;
    }
  };

  const handleConvert = async () => {
    if (!url.trim() || !isValidUrl(url)) return;
    if (!canUse) {
      setShowUpgrade(true);
      setDismissedUpgrade(false);
      return;
    }

    consumeUse();
    setState('processing');
    setProgress(10);
    setError(null);

    const fullUrl = url.startsWith('http') ? url : `https://${url}`;

    try {
      setProgress(30);
      const response = await invokeFunction('web-to-pdf', { sourceUrl: fullUrl });
      setProgress(80);

      if (!response?.data?.base64) {
        throw new Error('No output received from conversion service.');
      }

      const { base64, filename } = response.data;
      const cleanBase64 = base64.replace(/\s/g, '');
      const byteCharacters = atob(cleanBase64);
      const byteArray = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      setDownloadUrl(URL.createObjectURL(blob));
      setProgress(100);
      setState('done');
    } catch (err) {
      console.error('WebToPdf error:', err);
      setError(
        err.message?.includes('timeout')
          ? 'The page took too long to load. Try a simpler URL.'
          : err.message || 'Could not convert this URL. Make sure it is publicly accessible.'
      );
      setState('error');
    }
  };

  const handleReset = () => {
    setState('idle');
    setUrl('');
    setDownloadUrl(null);
    setError(null);
    setDismissedUpgrade(false);
  };

  const handleCloseUpgrade = () => {
    setShowUpgrade(false);
    setDismissedUpgrade(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <SEOHead
        title="Convert Webpage to PDF Free Online — Any URL Instantly | FileXone"
        description="Convert any website or webpage to PDF online for free. Just enter a URL and download your PDF."
        path="/web-to-pdf"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "FileXone Web to PDF Converter",
          "url": "https://filexone.com/web-to-pdf",
          "description": "Free online web to PDF converter. Convert any webpage URL to a PDF document.",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1250" }
        }}
      />
      <h1 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-6 tracking-tight">
        {t('webToPdfHeadline')}
      </h1>

      {state === 'idle' && (
        <>
          <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center gap-4 bg-muted/30">
            <Globe className="w-10 h-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground text-center">
              Enter any website URL to convert it to PDF
            </p>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConvert()}
              placeholder="https://example.com"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button
              onClick={handleConvert}
              disabled={!url.trim() || !isValidUrl(url)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11 font-semibold"
            >
              Convert to PDF
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Works with any public webpage — articles, docs, landing pages
          </p>
          <PrivacyNote />
        </>
      )}

      {state === 'processing' && (
        <ProcessingView message="Converting webpage to PDF..." progress={progress} />
      )}

      {state === 'error' && (
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-destructive" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground mb-1">Something went wrong</p>
            <p className="text-sm text-muted-foreground max-w-sm">{error}</p>
          </div>
          <button
            onClick={handleReset}
            className="text-sm text-primary hover:underline mt-2"
          >
            Try again →
          </button>
        </div>
      )}

      {state === 'done' && (
        <div className="flex flex-col items-center gap-4 py-4">
          <DownloadButton fileName="webpage.pdf" downloadUrl={downloadUrl} />
          <ProTip />
          <button
            onClick={handleReset}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
          >
            ← Convert another URL
          </button>
        </div>
      )}

      <UpgradeModal
        open={showUpgrade || (!canUse && state === 'idle' && !dismissedUpgrade)}
        onClose={handleCloseUpgrade}
      />
      <ToolSEOContent toolKey="webToPdf" />
    </div>
  );
}