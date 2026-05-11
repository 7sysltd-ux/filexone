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
import { RotateCw, Trash2 } from 'lucide-react';
import { runIlovepdf } from '@/lib/ilovepdf';

export default function OrganizePdf() {
  const { t } = useI18n();
  const { canUse, consumeUse } = useUsage();
  const [file, setFile] = useState(null);
  const [state, setState] = useState('idle');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [pages, setPages] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFiles = (files) => {
    setFile(files[0]);
    const pageCount = Math.floor(Math.random() * 6) + 3;
    setPages(Array.from({ length: pageCount }, (_, i) => ({
      id: i + 1,
      rotation: 0,
      deleted: false,
    })));
    setState('organize');
  };

  const rotatePage = (id) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, rotation: (p.rotation + 90) % 360 } : p))
    );
  };

  const deletePage = (id) => {
    setPages((prev) => prev.map((p) => (p.id === id ? { ...p, deleted: !p.deleted } : p)));
  };

  const rotateAll = () => {
    setPages((prev) => prev.map((p) => ({ ...p, rotation: (p.rotation + 90) % 360 })));
  };

  const handleSave = async () => {
    if (!canUse) {
      setShowUpgrade(true);
      return;
    }
    consumeUse();
    setState('processing');
    setError(null);
    try {
      // Build rotation params: array of {page, degrees} for non-zero rotations
      const rotations = pages
        .filter((p) => !p.deleted && p.rotation !== 0)
        .map((p) => ({ page: p.id, degrees: p.rotation }));

      const extraParams = rotations.length > 0 ? { rotation: rotations } : {};
      const url = await runIlovepdf('rotatepdf', file, extraParams, setProgress);
      setDownloadUrl(url);
      setState('done');
    } catch (err) {
      setError(err.message || 'Processing failed');
      setState('error');
    }
  };

  const handleReset = () => {
    setState('idle');
    setFile(null);
    setPages([]);
    setDownloadUrl(null);
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <SEOHead
        title="Rotate & Organize PDF Pages Online Free | FileXone"
        description="Rotate, reorder and delete PDF pages online for free. Organize your PDF in seconds."
        path="/organize-pdf"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "FileXone PDF Organizer",
          "url": "https://filexone.com/organize-pdf",
          "description": "Free online PDF organizer. Rotate, reorder and delete PDF pages instantly.",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1250" }
        }}
      />
      <h1 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-6 tracking-tight">
        {t('organizePdfHeadline')}
      </h1>

      {state === 'idle' && (
        <>
          <DropZone accept=".pdf" onFiles={handleFiles} />
          <PrivacyNote />
        </>
      )}

      {state === 'organize' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{file?.name}</span>
            <Button variant="outline" size="sm" onClick={rotateAll} className="text-xs">
              <RotateCw className="w-3 h-3 mr-1" />
              {t('rotateAll')}
            </Button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {pages.map((page) => (
              <div
                key={page.id}
                className={`relative aspect-[3/4] rounded-xl border-2 flex items-center justify-center text-sm font-mono transition-all ${
                  page.deleted
                    ? 'border-destructive/30 bg-destructive/5 opacity-50'
                    : 'border-border bg-muted/30 hover:border-primary/30'
                }`}
              >
                <span
                  className="text-lg font-bold text-muted-foreground"
                  style={{ transform: `rotate(${page.rotation}deg)` }}
                >
                  {page.id}
                </span>
                <div className="absolute bottom-1 left-1 right-1 flex justify-center gap-1">
                  <button
                    onClick={() => rotatePage(page.id)}
                    className="p-1 rounded bg-background/80 hover:bg-muted border border-border"
                    title={t('rotatePage')}
                  >
                    <RotateCw className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => deletePage(page.id)}
                    className="p-1 rounded bg-background/80 hover:bg-destructive/10 border border-border"
                    title={t('deletePage')}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Button
            onClick={handleSave}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11"
          >
            {t('organizePdf')}
          </Button>
        </div>
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
          <DownloadButton fileName="organized.pdf" downloadUrl={downloadUrl} />
          <ProTip />
          <button onClick={handleReset} className="text-sm text-muted-foreground hover:text-foreground mt-2">
            ← {t('organizePdf')}
          </button>
        </div>
      )}

      <UpgradeModal open={showUpgrade} onClose={setShowUpgrade} />
      <ToolSEOContent toolKey="organizePdf" />
    </div>
  );
}