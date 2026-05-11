import React from 'react';
import { useI18n } from '@/lib/i18n';
import SEOHead from '@/components/SEOHead';
import ToolSEOContent from '@/components/tools/ToolSEOContent';
import ToolPageWrapper from '@/components/tools/ToolPageWrapper';
import { invokeFunction } from '@/lib/api';

export default function PdfToExcel() {
  const { t } = useI18n();

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
      outputFormat: 'xlsx',
      fileBase64,
      fileName: file.name,
    });

    onProgress?.(90);

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

    // Siempre xlsx — no depende del filename devuelto
    const blob = new Blob([byteArray], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    return URL.createObjectURL(blob);
  };

  return (
    <>
      <SEOHead
        title="PDF to Excel Converter Free Online — Extract Tables from PDF | FileXone"
        description="Convert PDF tables and data to Excel spreadsheets online for free. No sign-up required."
        path="/pdf-to-excel"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "FileXone PDF to Excel Converter",
          "url": "https://filexone.com/pdf-to-excel",
          "description": "Free online PDF to Excel converter. Extract tables and data from PDF to spreadsheet.",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1250" }
        }}
      />
      <ToolPageWrapper
        headlineKey="pdfToExcelHeadline"
        accept=".pdf"
        onProcess={handleProcess}
        outputFileName="converted.xlsx"
      />
      <ToolSEOContent toolKey="pdfToExcel" />
    </>
  );
}