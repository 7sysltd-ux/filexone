import React from 'react';
import SEOHead from '@/components/SEOHead';
import ToolSEOContent from '@/components/tools/ToolSEOContent';
import BatchToolWrapper from '@/components/tools/BatchToolWrapper';
import { runIlovepdf } from '@/lib/ilovepdf';

async function convertFile(file, onProgress, options) {
  const dpi = options.quality === 'high' ? 300 : 150;
  const url = await runIlovepdf('pdftojpg', file, { pdftojpg_dpi: dpi }, onProgress);
  const res = await fetch(url);
  const blob = await res.blob();
  const filename = file.name.replace('.pdf', '-images.zip');
  return { blob, filename };
}

export default function PdfToJpg() {
  return (
    <>
      <SEOHead
        title="PDF to JPG Converter Free Online — Convert PDF Pages to Images | FileXone"
        description="Convert PDF pages to JPG images online for free. High quality output. No installation needed."
        path="/pdf-to-jpg"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "FileXone PDF to JPG Converter",
          "url": "https://filexone.com/pdf-to-jpg",
          "description": "Free online PDF to JPG converter. Convert PDF pages to high quality images.",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1250" }
        }}
      />
      <h1 className="text-xl sm:text-2xl font-bold text-foreground text-center mt-6 mb-2 tracking-tight px-4">
        PDF to JPG Converter Free
      </h1>
      <BatchToolWrapper
        accept=".pdf"
        processFile={convertFile}
        defaultOptions={{ quality: 'standard' }}
        zipName="pdf-to-jpg.zip"
        optionsRenderer={(options, setOptions) => (
          <div className="flex gap-3 justify-center">
            {[
              { value: 'standard', label: 'Standard', desc: '150 DPI' },
              { value: 'high', label: 'High Quality', desc: '300 DPI' },
            ].map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setOptions(o => ({ ...o, quality: value }))}
                className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  options.quality === value
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
      <ToolSEOContent toolKey="pdfToJpg" />
    </>
  );
}