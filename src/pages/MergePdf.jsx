import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/SEOHead';
import ToolSEOContent from '@/components/tools/ToolSEOContent';
import { useUsage } from '@/lib/useUsage';
import DropZone from '@/components/tools/DropZone';
import ProcessingView from '@/components/tools/ProcessingView';
import DownloadButton from '@/components/tools/DownloadButton';
import PrivacyNote from '@/components/tools/PrivacyNote';
import ProTip from '@/components/tools/ProTip';
import UpgradeModal from '@/components/tools/UpgradeModal';
import { Button } from '@/components/ui/button';
import { GripVertical, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { runIlovepdf } from '@/lib/ilovepdf';

const FREE_LIMIT = 3;
const PRO_LIMIT = 20;

export default function MergePdf() {
  const { t } = useI18n();
  const { canUse, consumeUse, isPro } = useUsage();
  const limit = isPro ? PRO_LIMIT : FREE_LIMIT;
  const [limitWarning, setLimitWarning] = useState(false);
  const [files, setFiles] = useState([]);
  const [state, setState] = useState('idle');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFiles = (selectedFiles) => {
    setFiles((prev) => {
      const combined = [...prev, ...selectedFiles];
      if (combined.length > limit) {
        setLimitWarning(true);
        return combined.slice(0, limit);
      }
      setLimitWarning(false);
      return combined;
    });
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (!canUse) {
      setShowUpgrade(true);
      return;
    }
    consumeUse();
    setState('processing');
    setProgress(0);
    setError(null);
    try {
      const url = await runIlovepdf('merge', files, {}, setProgress);
      setDownloadUrl(url);
      setState('done');
    } catch (err) {
      setError(err.message || 'Processing failed');
      setState('error');
    }
  };

  const handleReset = () => {
    setState('idle');
    setFiles([]);
    setDownloadUrl(null);
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <SEOHead
        title="Merge PDF Files Online Free — Combine PDFs in Seconds | FileXone"
        description="Merge multiple PDF files into one online for free. Combine PDFs in seconds. No software needed."
        path="/merge-pdf"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "FileXone PDF Merger",
          "url": "https://filexone.com/merge-pdf",
          "description": "Free online PDF merger. Combine multiple PDFs into one file in seconds.",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1250" }
        }}
      />
      <h1 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-6 tracking-tight">
        {t('mergePdfHeadline')}
      </h1>

      {state === 'idle' && (
        <>
          <p className="text-xs text-center text-muted-foreground mb-3">
            Drop up to <span className="font-semibold text-primary">{FREE_LIMIT} PDFs (Free)</span> or{' '}
            <span className="font-semibold text-primary">{PRO_LIMIT} PDFs (Pro)</span>
          </p>
          {files.length > 0 && (
            <div className="space-y-2 mb-4">
              {files.map((file, i) => (
                <div key={i} className="flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-2">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                  <span className="text-sm font-medium flex-1 truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {(file.size / 1048576).toFixed(1)} MB
                  </span>
                  <button onClick={() => removeFile(i)}>
                    <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              ))}
              <p className="text-xs text-muted-foreground text-center">{t('dragToReorder')}</p>
            </div>
          )}
          <DropZone accept=".pdf" multiple onFiles={handleFiles} />
          {limitWarning && (
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start justify-between gap-3">
              <p className="text-sm text-amber-700 dark:text-amber-400">
                Free plan allows {FREE_LIMIT} files at once. Upgrade to Pro for up to {PRO_LIMIT} files.
              </p>
              <Link to="/pricing" className="flex-shrink-0">
                <Button size="sm" className="bg-primary text-primary-foreground rounded-lg h-7 text-xs px-3">Go Pro</Button>
              </Link>
            </div>
          )}
          {files.length >= 2 && (
            <Button
              onClick={handleMerge}
              className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11"
            >
              {t('mergePdf')} ({files.length} files)
            </Button>
          )}
          <PrivacyNote />
        </>
      )}

      {state === 'processing' && <ProcessingView progress={progress} />}

      {state === 'error' && (
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="text-destructive text-center">
            <p className="font-semibold mb-1">Something went wrong</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
          <button onClick={handleReset} className="text-sm text-primary hover:underline mt-2">Try again →</button>
        </div>
      )}

      {state === 'done' && (
        <div className="flex flex-col items-center gap-4 py-4">
          <DownloadButton fileName="merged.pdf" downloadUrl={downloadUrl} />
          <ProTip />
          <button onClick={handleReset} className="text-sm text-muted-foreground hover:text-foreground mt-2">
            ← {t('mergePdf')}
          </button>
        </div>
      )}

      <UpgradeModal open={showUpgrade} onClose={setShowUpgrade} />
      <ToolSEOContent toolKey="merge" />
    </div>
  );
}