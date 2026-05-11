import React from 'react';
import SEOHead from '@/components/SEOHead';
import ToolSEOContent from '@/components/tools/ToolSEOContent';
import ToolPageWrapper from '@/components/tools/ToolPageWrapper';
import { runIlovepdf } from '@/lib/ilovepdf';

export default function WordToPdf() {
  const handleProcess = async (files, options, onProgress) => {
    return await runIlovepdf('officepdf', files[0], {}, onProgress);
  };

  return (
    <>
      <SEOHead
        title="Word to PDF Converter Free — Convert DOCX to PDF Online | FileXone"
        description="Convert Word, PowerPoint and Excel files to PDF online for free. Perfect formatting, no software needed."
        path="/word-to-pdf"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "FileXone Word to PDF Converter",
          "url": "https://filexone.com/word-to-pdf",
          "description": "Free online Word to PDF converter. Convert DOCX, PPTX, and XLSX to PDF.",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1250" }
        }}
      />
      <ToolPageWrapper
        headlineKey="wordToPdfHeadline"
        accept=".docx,.doc,.pptx,.xlsx"
        promptKey="uploadPromptAny"
        onProcess={handleProcess}
        outputFileName="converted.pdf"
      />
      <ToolSEOContent toolKey="wordToPdf" />
    </>
  );
}