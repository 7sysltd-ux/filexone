import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';
import ToolSEOContent from '@/components/tools/ToolSEOContent';

const ROWS = [
  { feature: 'Price', ilovepdf: '$8/mo', filexone: '$7/mo' },
  { feature: 'Compress PDF', ilovepdf: true, filexone: true },
  { feature: 'PDF to Word', ilovepdf: true, filexone: true },
  { feature: 'PDF to Excel', ilovepdf: true, filexone: true },
  { feature: 'PDF to PowerPoint', ilovepdf: false, filexone: true },
  { feature: 'Web to PDF', ilovepdf: false, filexone: true },
  { feature: 'No ads', ilovepdf: false, filexone: true },
  { feature: 'Batch processing', ilovepdf: 'Limited', filexone: 'Yes' },
];

const INTERNAL_LINKS = [
  { label: 'Compress PDF', to: '/compress-pdf' },
  { label: 'PDF to Word', to: '/pdf-to-word' },
  { label: 'Merge PDF', to: '/merge-pdf' },
  { label: 'Split PDF', to: '/split-pdf' },
  { label: 'PDF to Excel', to: '/pdf-to-excel' },
  { label: 'PDF to PowerPoint', to: '/pdf-to-powerpoint' },
];

export default function VsIlovepdf() {
  return (
    <>
      <SEOHead
        title="FileXone vs iLovePDF — Best iLovePDF Alternative in 2025 | FileXone"
        description="Looking for an iLovePDF alternative? FileXone offers more tools, no ads, and costs less. Compare features and pricing side by side."
        path="/vs-ilovepdf"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'FileXone vs iLovePDF',
          url: 'https://filexone.com/vs-ilovepdf',
          description: 'Detailed comparison between FileXone and iLovePDF. See why FileXone is the best iLovePDF alternative.',
        }}
      />

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-extrabold text-foreground text-center mb-4 tracking-tight"
        >
          FileXone vs iLovePDF — The Best iLovePDF Alternative
        </motion.h1>

        <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
          If you're searching for a reliable <strong>iLovePDF alternative</strong>, FileXone offers more tools, zero ads, and a lower price. Here's how they compare.
        </p>

        {/* Price banner */}
        <div className="flex justify-center gap-10 mb-10">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">iLovePDF</p>
            <p className="text-3xl font-bold font-mono text-foreground/40 line-through">$8/mo</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-primary font-semibold mb-1">FileXone</p>
            <p className="text-4xl font-extrabold font-mono text-primary">$7/mo</p>
          </div>
        </div>

        {/* Comparison table */}
        <div className="rounded-2xl border border-border overflow-hidden mb-10">
          <div className="grid grid-cols-3 bg-muted/50 text-xs font-medium text-muted-foreground py-3 px-4">
            <span>Feature</span>
            <span className="text-center">iLovePDF</span>
            <span className="text-center text-primary">FileXone</span>
          </div>
          {ROWS.map((row, i) => (
            <div key={row.feature} className={`grid grid-cols-3 py-3 px-4 text-sm items-center ${i % 2 === 0 ? 'bg-card' : 'bg-muted/20'}`}>
              <span className="font-medium">{row.feature}</span>
              <span className="text-center text-muted-foreground">
                {row.ilovepdf === true ? <Check className="w-4 h-4 text-muted-foreground mx-auto" /> :
                 row.ilovepdf === false ? <X className="w-4 h-4 text-muted-foreground/40 mx-auto" /> :
                 <span className="font-mono">{row.ilovepdf}</span>}
              </span>
              <span className="text-center">
                {row.filexone === true ? <Check className="w-4 h-4 text-primary mx-auto" /> :
                 row.filexone === false ? <X className="w-4 h-4 text-muted-foreground/40 mx-auto" /> :
                 <span className="font-mono font-bold text-primary">{row.filexone}</span>}
              </span>
            </div>
          ))}
        </div>

        {/* Why switch */}
        <div className="bg-primary/5 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-foreground mb-3">Why switch from iLovePDF to FileXone?</h2>
          <p className="text-sm text-muted-foreground mb-4">
            iLovePDF is a popular PDF tool, but it comes with limitations that frustrate everyday users. FileXone was built to fix exactly those problems.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /><span><strong>More tools:</strong> FileXone includes Web to PDF and PDF to PowerPoint — tools iLovePDF doesn't offer.</span></li>
            <li className="flex gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /><span><strong>No ads:</strong> iLovePDF's free tier is covered in ads. FileXone is clean and distraction-free.</span></li>
            <li className="flex gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /><span><strong>Lower price:</strong> FileXone Pro costs $7/month — less than iLovePDF's $8/month plan.</span></li>
            <li className="flex gap-2"><Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /><span><strong>Privacy first:</strong> All files are deleted automatically from our servers after 1 hour.</span></li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center mb-12">
          <Link to="/pricing">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
              Try FileXone Free — No Sign Up <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Internal links */}
        <div className="border-t border-border pt-8">
          <p className="text-sm font-semibold text-foreground mb-4">Explore FileXone tools:</p>
          <div className="flex flex-wrap gap-2">
            {INTERNAL_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm text-primary hover:underline bg-primary/5 px-3 py-1.5 rounded-lg">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <ToolSEOContent
        steps={{
          title: 'How to switch from iLovePDF to FileXone',
          items: [
            { title: 'Visit FileXone.com', desc: 'Go to filexone.com — no account required for your first 3 free conversions.' },
            { title: 'Choose your tool', desc: 'Select from 12+ PDF tools including compress, convert, merge, split, and more.' },
            { title: 'Go Pro for $7/month', desc: 'Upgrade to FileXone Pro for unlimited conversions — cheaper than iLovePDF.' },
          ],
        }}
        faqs={[
          { q: 'Is FileXone a good iLovePDF alternative?', a: 'Yes. FileXone offers more tools (including Web to PDF and PDF to PowerPoint), no ads, and costs $7/month vs iLovePDF\'s $8/month.' },
          { q: 'Does FileXone have a free plan?', a: 'Yes, FileXone offers 3 free conversions per day with no sign-up required.' },
          { q: 'Is FileXone safe to use?', a: 'Yes. All uploaded files are automatically deleted from our servers after 1 hour.' },
          { q: 'Which tools does FileXone have that iLovePDF doesn\'t?', a: 'FileXone includes Web to PDF (convert any URL to PDF) and PDF to PowerPoint — tools not available on iLovePDF\'s standard plans.' },
        ]}
      />
    </>
  );
}