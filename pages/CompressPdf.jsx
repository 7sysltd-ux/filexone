import React from 'react';
import SEOHead from '@/components/SEOHead';
import ToolSEOContent from '@/components/tools/ToolSEOContent';
import BatchToolWrapper from '@/components/tools/BatchToolWrapper';
import { runIlovepdf } from '@/lib/ilovepdf';

async function compressFile(file, onProgress, options) {
  const url = await runIlovepdf('compress', file, { compression_level: options.level }, onProgress);
  const res = await fetch(url);
  const blob = await res.blob();
  const filename = file.name.replace('.pdf', '-compressed.pdf');
  return { blob, filename };
}

export default function CompressPdf() {
  return (
    <>
      <SEOHead
        title="Compress PDF Online Free — Reduce PDF Size Without Losing Quality | FileXone"
        description="Compress PDF files online for free. Reduce PDF size without losing quality. No installation needed."
        path="/compress-pdf"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "FileXone PDF Compressor",
          "url": "https://filexone.com/compress-pdf",
          "description": "Free online PDF compressor. Reduce PDF file size without losing quality.",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1250" }
        }}
      />
      <h1 className="text-xl sm:text-2xl font-bold text-foreground text-center mt-6 mb-2 tracking-tight px-4">
        Compress PDF Online Free
      </h1>
      <BatchToolWrapper
        accept=".pdf"
        processFile={compressFile}
        defaultOptions={{ level: 'recommended' }}
        zipName="compressed-pdfs.zip"
        singleOutputName="compressed.pdf"
        optionsRenderer={(options, setOptions) => (
          <div className="flex gap-3 justify-center">
            {[
              { value: 'recommended', label: 'Recommended', desc: 'Best balance' },
              { value: 'extreme', label: 'Maximum', desc: 'Smallest file' },
            ].map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setOptions(o => ({ ...o, level: value }))}
                className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  options.level === value
                    ? 'border-primary bg-primary/5 text-foreground'
                    : 'border-border text-muted-foreground hover:border-primary/30'
                }`}
              >
                <span className="block font-semibold">{label}</span>
                <span className="text-xs text-muted-foreground">{desc}</span>
              </button>
            ))}
          </div>
        )}
      />
      <ToolSEOContent toolKey="compress" />
    </>
  );
}