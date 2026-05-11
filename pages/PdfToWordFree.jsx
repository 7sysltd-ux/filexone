import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Smartphone, FileText } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import ToolSEOContent from '@/components/tools/ToolSEOContent';
import ToolPageWrapper from '@/components/tools/ToolPageWrapper';
import { invokeFunction } from '@/lib/api';

const RELATED = [
  { label: 'Compress PDF Free', to: '/compress-pdf-free' },
  { label: 'PDF to Excel', to: '/pdf-to-excel' },
  { label: 'PDF to PowerPoint', to: '/pdf-to-powerpoint' },
  { label: 'Merge PDF', to: '/merge-pdf' },
  { label: 'Protect PDF', to: '/protect-pdf' },
];

export default function PdfToWordFree() {
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
    onProgress?.(90);
    const { base64, filename } = response.data;
    const cleanBase64 = base64.replace(/\s/g, '');
    const byteCharacters = atob(cleanBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    return URL.createObjectURL(blob);
  };

  return (
    <>
      <SEOHead
        title="PDF to Word Free — Convert PDF to Editable Word Document Online | FileXone"
        description="Convert PDF to Word for free online. No sign-up, no watermark. Get fully editable DOCX files in seconds. The best free PDF to Word converter."
        path="/pdf-to-word-free"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'FileXone Free PDF to Word Converter',
          url: 'https://filexone.com/pdf-to-word-free',
          description: 'Free online PDF to Word converter. Get editable DOCX files with formatting preserved.',
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '3400' },
        }}
      />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* H1 */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground text-center mb-3 tracking-tight">
          PDF to Word Free — Convert PDF to Editable DOCX
        </h1>
        <p className="text-center text-muted-foreground mb-2 text-sm max-w-lg mx-auto">
          Convert any PDF to a fully editable Word document — <strong>completely free</strong>. Formatting, tables and images preserved.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-primary" /> Files deleted after 1 hour</span>
          <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-primary" /> No sign-up required</span>
          <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5 text-primary" /> Works on any device</span>
        </div>

        {/* Embedded tool */}
        <ToolPageWrapper
          headlineKey="pdfToWordHeadline"
          accept=".pdf"
          onProcess={handleProcess}
          outputFileName="converted.docx"
        />

        {/* Why section */}
        <div className="mt-12 mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Why convert PDF to Word?</h2>
          <p className="text-sm text-muted-foreground mb-4">
            PDFs are great for sharing documents, but they're not easy to edit. When you need to update a contract, extract text from a report, or reuse content from a scanned document, converting your PDF to Word is the fastest solution.
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            FileXone's free PDF to Word converter accurately extracts text, tables, images, and formatting from your PDF and places them into a fully editable DOCX file that opens in Microsoft Word, Google Docs, LibreOffice, and any other word processor.
          </p>
          <p className="text-sm text-muted-foreground">
            Unlike many free tools that strip formatting or add watermarks, FileXone gives you a clean, professional Word document with no hidden limits — and your file is automatically deleted after 1 hour for complete privacy.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          {[
            { icon: FileText, text: 'Tables & images preserved' },
            { icon: Shield, text: 'Files auto-deleted after 1 hour' },
            { icon: Zap, text: 'Conversion in seconds' },
            { icon: Smartphone, text: 'Works on mobile & desktop' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 bg-muted/40 rounded-xl px-3 py-2.5">
              <Icon className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-xs text-muted-foreground">{text}</span>
            </div>
          ))}
        </div>

        {/* Related tools */}
        <div className="border-t border-border pt-6">
          <p className="text-sm font-semibold text-foreground mb-3">Other free PDF tools:</p>
          <div className="flex flex-wrap gap-2">
            {RELATED.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm text-primary hover:underline bg-primary/5 px-3 py-1.5 rounded-lg">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <ToolSEOContent
        steps={{
          title: 'How to Convert PDF to Word for Free',
          items: [
            { title: 'Upload your PDF', desc: 'Drag and drop your PDF or click to browse. Supports files up to 100MB.' },
            { title: 'Convert automatically', desc: 'FileXone extracts text, tables and images from your PDF into a DOCX file.' },
            { title: 'Download your Word file', desc: 'Download your editable Word document instantly. No watermark, no sign-up.' },
          ],
        }}
        faqs={[
          { q: 'Is PDF to Word conversion really free?', a: 'Yes. You get 3 free conversions per day with no account needed. Unlimited conversions with Pro at $7/month.' },
          { q: 'Will my formatting be preserved?', a: 'Yes. FileXone preserves text formatting, tables, columns, and images as closely as possible in the output DOCX file.' },
          { q: 'Can I edit the Word document after conversion?', a: 'Yes. The output is a standard .docx file that opens and edits in Microsoft Word, Google Docs, LibreOffice, and other word processors.' },
          { q: 'Is my PDF file safe?', a: 'Yes. All uploaded files are automatically deleted from our servers within 1 hour of processing.' },
        ]}
      />
    </>
  );
}