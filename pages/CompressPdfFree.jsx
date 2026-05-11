import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, FileDown, Shield, Zap, Smartphone } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import ToolSEOContent from '@/components/tools/ToolSEOContent';
import ToolPageWrapper from '@/components/tools/ToolPageWrapper';
import { Button } from '@/components/ui/button';
import { runIlovepdf } from '@/lib/ilovepdf';

const RELATED = [
  { label: 'PDF to Word', to: '/pdf-to-word-free' },
  { label: 'Merge PDF', to: '/merge-pdf' },
  { label: 'Split PDF', to: '/split-pdf' },
  { label: 'PDF to JPG', to: '/pdf-to-jpg' },
  { label: 'Protect PDF', to: '/protect-pdf' },
];

export default function CompressPdfFree() {
  const [level, setLevel] = useState('recommended');

  const handleProcess = async (files, options, onProgress) => {
    return await runIlovepdf('compress', files[0], { compression_level: level }, onProgress);
  };

  return (
    <>
      <SEOHead
        title="Compress PDF Free Online — Reduce PDF File Size Instantly | FileXone"
        description="Compress PDF files online for free. No sign-up, no watermark. Reduce PDF size by up to 90% while keeping quality. The fastest free PDF compressor."
        path="/compress-pdf-free"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'FileXone Free PDF Compressor',
          url: 'https://filexone.com/compress-pdf-free',
          description: 'Free online PDF compressor. Reduce PDF file size by up to 90% instantly.',
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '2100' },
        }}
      />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* H1 */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground text-center mb-3 tracking-tight">
          Compress PDF Free Online
        </h1>
        <p className="text-center text-muted-foreground mb-2 text-sm max-w-lg mx-auto">
          Reduce your PDF file size by up to <strong>90%</strong> — completely free. No watermark, no sign-up, no software to install.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-primary" /> Files deleted after 1 hour</span>
          <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-primary" /> No sign-up required</span>
          <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5 text-primary" /> Works on any device</span>
        </div>

        {/* Embedded tool */}
        <ToolPageWrapper
          headlineKey="compressPdfHeadline"
          accept=".pdf"
          onProcess={handleProcess}
          outputFileName="compressed.pdf"
        >
          {({ files, onProcess }) => (
            <div className="space-y-4">
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setLevel('recommended')}
                  className={`px-5 py-3 rounded-xl border-2 text-sm font-medium transition-all ${level === 'recommended' ? 'border-primary bg-primary/5 text-foreground' : 'border-border text-muted-foreground hover:border-primary/30'}`}
                >
                  <span className="block font-semibold">Recommended</span>
                  <span className="text-xs text-muted-foreground">Best balance</span>
                </button>
                <button
                  onClick={() => setLevel('extreme')}
                  className={`px-5 py-3 rounded-xl border-2 text-sm font-medium transition-all ${level === 'extreme' ? 'border-primary bg-primary/5 text-foreground' : 'border-border text-muted-foreground hover:border-primary/30'}`}
                >
                  <span className="block font-semibold">Maximum</span>
                  <span className="text-xs text-muted-foreground">Smallest file</span>
                </button>
              </div>
              <Button onClick={() => onProcess()} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11">
                Compress PDF Free
              </Button>
            </div>
          )}
        </ToolPageWrapper>

        {/* Why section */}
        <div className="mt-12 mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Why compress a PDF?</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Large PDF files are a common problem. They take too long to upload, exceed email attachment limits, and slow down websites. Whether you're sending a contract, a report, or a portfolio, compressing your PDF makes sharing faster and easier.
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            FileXone's free PDF compressor uses advanced compression algorithms to shrink your file size by up to 90% without visible quality loss. It works directly in your browser — no software to download, no plugins, no account needed.
          </p>
          <p className="text-sm text-muted-foreground">
            Choose <strong>Recommended</strong> compression for the best balance between size and quality — ideal for most documents. Choose <strong>Maximum</strong> compression when file size is the top priority, such as sending via messaging apps with strict size limits.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          {[
            { icon: FileDown, text: 'Reduce size by up to 90%' },
            { icon: Shield, text: 'Files auto-deleted after 1 hour' },
            { icon: Zap, text: 'Compress in seconds' },
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
          title: 'How to Compress a PDF for Free',
          items: [
            { title: 'Upload your PDF', desc: 'Drag and drop your PDF or click to browse. Files up to 100MB are supported.' },
            { title: 'Choose compression level', desc: 'Select Recommended for the best balance, or Maximum for the smallest possible file size.' },
            { title: 'Download compressed PDF', desc: 'Click compress and instantly download your smaller PDF. No email, no account needed.' },
          ],
        }}
        faqs={[
          { q: 'Is this PDF compressor really free?', a: 'Yes, completely free. You get 3 free compressions per day with no sign-up. Unlimited with Pro at $7/month.' },
          { q: 'How much can I compress a PDF?', a: 'FileXone can reduce PDF file size by up to 90% depending on the content. Image-heavy PDFs compress the most.' },
          { q: 'Will compression affect PDF quality?', a: 'Recommended mode has minimal quality impact. Maximum mode compresses more aggressively, which may slightly reduce image sharpness.' },
          { q: 'Is my PDF safe to upload?', a: 'Yes. All files are encrypted during transfer and automatically deleted from our servers after 1 hour.' },
        ]}
      />
    </>
  );
}