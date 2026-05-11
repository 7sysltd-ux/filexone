import React from 'react';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/SEOHead';
import ToolSEOContent from '@/components/tools/ToolSEOContent';
import BatchToolWrapper from '@/components/tools/BatchToolWrapper';
import { Input } from '@/components/ui/input';
import { runIlovepdf } from '@/lib/ilovepdf';

async function splitFile(file, onProgress, options) {
  const extraParams = options.mode === 'extract'
    ? { split_mode: 'ranges', ranges: options.pages || '1' }
    : { split_mode: 'fixed_range', fixed_range: 1 };
  const url = await runIlovepdf('split', file, extraParams, onProgress);
  const res = await fetch(url);
  const blob = await res.blob();
  const filename = file.name.replace('.pdf', '-split.zip');
  return { blob, filename };
}

export default function SplitPdf() {
  const { t } = useI18n();

  return (
    <>
      <SEOHead
        title="Split PDF Online Free — Extract Pages from PDF | FileXone"
        description="Split PDF files online for free. Extract specific pages or split into individual pages instantly."
        path="/split-pdf"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "FileXone PDF Splitter",
          "url": "https://filexone.com/split-pdf",
          "description": "Free online PDF splitter. Extract pages or split PDF into individual files.",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1250" }
        }}
      />
      <h1 className="text-xl sm:text-2xl font-bold text-foreground text-center mt-6 mb-2 tracking-tight px-4">
        Split PDF Online Free
      </h1>
      <BatchToolWrapper
        accept=".pdf"
        processFile={splitFile}
        defaultOptions={{ mode: 'extract', pages: '' }}
        zipName="split-pdfs.zip"
        optionsRenderer={(options, setOptions) => (
          <div className="space-y-3">
            <div className="flex gap-3 justify-center">
              {[
                { value: 'extract', label: t('extractPages') },
                { value: 'split', label: t('splitAll') },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setOptions(o => ({ ...o, mode: value }))}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm transition-all ${
                    options.mode === value
                      ? 'border-primary bg-primary/5 text-foreground font-medium'
                      : 'border-border text-muted-foreground hover:border-primary/30'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {options.mode === 'extract' && (
              <Input
                placeholder="e.g. 1, 3-5, 8"
                value={options.pages}
                onChange={(e) => setOptions(o => ({ ...o, pages: e.target.value }))}
                className="text-center font-mono"
              />
            )}
          </div>
        )}
      />
      <ToolSEOContent toolKey="split" />
    </>
  );
}