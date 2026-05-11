import React from 'react';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/SEOHead';
import ToolSEOContent from '@/components/tools/ToolSEOContent';
import ToolPageWrapper from '@/components/tools/ToolPageWrapper';
import { invokeFunction } from '@/lib/api';

export default function PdfToWord() {
  const { t } = useI18n();

  const handleProcess = async (files, options, onProgress) => {
    onProgress?.(10);
    const file = files[0];
    const fileBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    onProgress?.(20);
    const response = await invokeFunction('cloud-convert', {
      outputFormat: 'docx',
      fileBase64,
      fileName: file.name,
    });
    console.log('CloudConvert response:', JSON.stringify(response));
    onProgress?.(90);
    const { base64, filename } = response.data;
    const cleanBase64 = base64.replace(/\s/g, '');
    const byteCharacters = atob(cleanBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const mimeType = filename.endsWith('.docx')
      ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const blob = new Blob([byteArray], { type: mimeType });
    return URL.createObjectURL(blob);
  };

  return (
    <>
      <SEOHead
        title="PDF to Word Converter — Convert PDF to Editable DOCX Free | FileXone"
        description="Convert PDF to Word online for free. Get editable DOCX files in seconds. No sign-up required."
        path="/pdf-to-word"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "FileXone PDF to Word Converter",
          "url": "https://filexone.com/pdf-to-word",
          "description": "Free online PDF to Word converter. Get editable DOCX files in seconds.",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1250" }
        }}
      />
      <ToolPageWrapper
        headlineKey="pdfToWordHeadline"
        accept=".pdf"
        onProcess={handleProcess}
        outputFileName="converted.docx"
      />
      <ToolSEOContent toolKey="pdfToWord" />
    </>
  );
}