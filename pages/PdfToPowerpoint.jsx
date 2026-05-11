import React from 'react';
import SEOHead from '@/components/SEOHead';
import ToolPageWrapper from '@/components/tools/ToolPageWrapper';
import ToolSEOContent from '@/components/tools/ToolSEOContent';
import { invokeFunction } from '@/lib/api';

export default function PdfToPowerpoint() {
  const handleProcess = async (files, options, onProgress) => {
    onProgress?.(10);
    const file = files[0];

    // Leer archivo como base64
    const fileBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    onProgress?.(20);

    const response = await invokeFunction('cloud-convert', {
      outputFormat: 'pptx',
      fileBase64,
      fileName: file.name,
    });

    onProgress?.(90);

    if (!response?.data?.base64) {
      throw new Error('No output received from conversion service.');
    }

    const { base64 } = response.data;
    const cleanBase64 = base64.replace(/\s/g, '');
    const byteCharacters = atob(cleanBase64);
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }

    // Siempre pptx
    const blob = new Blob([byteArray], {
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    });

    return URL.createObjectURL(blob);
  };

  return (
    <>
      <SEOHead
        title="PDF to PowerPoint Free Online — Convert PDF to Editable PPTX | FileXone"
        description="Convert PDF to PowerPoint slides online for free. Get editable PPTX files in seconds."
        path="/pdf-to-powerpoint"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "FileXone PDF to PowerPoint Converter",
          "url": "https://filexone.com/pdf-to-powerpoint",
          "description": "Free online PDF to PowerPoint converter. Get editable PPTX slides in seconds.",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1250" }
        }}
      />
      <ToolPageWrapper
        headlineKey="pdfToPowerpointHeadline"
        accept=".pdf"
        onProcess={handleProcess}
        outputFileName="converted.pptx"
      />
      <ToolSEOContent toolKey="pdfToPowerpoint" />
    </>
  );
}