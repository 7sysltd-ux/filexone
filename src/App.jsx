import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import AuthModal from '@/components/AuthModal';
import { I18nProvider } from '@/lib/i18n';

import AppLayout from '@/components/layout/AppLayout';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import CompressPdf from '@/pages/CompressPdf';
import PdfToWord from '@/pages/PdfToWord';
import MergePdf from '@/pages/MergePdf';
import SplitPdf from '@/pages/SplitPdf';
import PdfToJpg from '@/pages/PdfToJpg';
import WordToPdf from '@/pages/WordToPdf';
import SignPdf from '@/pages/SignPdf';
import OrganizePdf from '@/pages/OrganizePdf';
import Pricing from '@/pages/Pricing';
import VsSmallpdf from '@/pages/VsSmallpdf';
import VsAdobe from '@/pages/VsAdobe';
import PdfToExcel from '@/pages/PdfToExcel';
import ProtectPdf from '@/pages/ProtectPdf';
import PrivacyPolicy from '@/pages/legal/PrivacyPolicy';
import TermsOfService from '@/pages/legal/TermsOfService';
import CookiePolicy from '@/pages/legal/CookiePolicy';
import RefundPolicy from '@/pages/legal/RefundPolicy';
import Success from '@/pages/Success';
import Checkout from '@/pages/Checkout';
import PdfToPowerpoint from '@/pages/PdfToPowerpoint';
import WebToPdf from '@/pages/WebToPdf';
import VsIlovepdf from '@/pages/VsIlovepdf';
import CompressPdfFree from '@/pages/CompressPdfFree';
import PdfToWordFree from '@/pages/PdfToWordFree';

// ─── Disclaimer (inline — no requiere archivo separado) ───────────────────────
function Disclaimer() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-foreground mb-2 tracking-tight">Disclaimer</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: April 13, 2026</p>
      <div className="prose prose-sm max-w-none space-y-6 text-foreground">
        <section>
          <h2 className="text-lg font-bold mb-2">1. General Information Only</h2>
          <p className="text-muted-foreground leading-relaxed">The information and tools provided by FileXone ("filexone.com"), a service operated by Northvanta LLC, are for general use only. FileXone is a file processing service that allows users to convert, compress, merge, split, and otherwise manipulate PDF and document files. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the service.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold mb-2">2. No Responsibility for File Content</h2>
          <p className="text-muted-foreground leading-relaxed">FileXone does not review, monitor, or take responsibility for the content of files uploaded, processed, or downloaded through our platform. Users are solely responsible for ensuring that any files they upload comply with applicable laws and do not infringe on the intellectual property rights of third parties. By using our service, you confirm that you have the legal right to process the files you upload.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold mb-2">3. Conversion Quality</h2>
          <p className="text-muted-foreground leading-relaxed">While we strive to provide high-quality file conversions, the output quality may vary depending on the complexity and formatting of the original file. FileXone does not guarantee that converted files will be identical in layout, formatting, or content to the original. We recommend always reviewing converted files before use in any professional or legal context.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold mb-2">4. Third-Party Services</h2>
          <p className="text-muted-foreground leading-relaxed">FileXone uses third-party services including iLovePDF and CloudConvert to process files. While we select reputable providers, we are not responsible for any issues, errors, data loss, or service interruptions caused by these third-party services. Their own terms of service and privacy policies apply to the processing performed on their servers.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold mb-2">5. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">To the fullest extent permitted by law, FileXone shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of — or inability to use — the service. This includes but is not limited to loss of data, loss of profits, or any other damages resulting from the use or misuse of files processed through our platform.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold mb-2">6. No Legal or Professional Advice</h2>
          <p className="text-muted-foreground leading-relaxed">Nothing on this website constitutes legal, financial, or professional advice of any kind. If you are processing documents that have legal or financial significance, we recommend consulting a qualified professional before relying on any converted or processed output from our service.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold mb-2">7. Changes to This Disclaimer</h2>
          <p className="text-muted-foreground leading-relaxed">FileXone reserves the right to update or modify this Disclaimer at any time without prior notice. Continued use of the service after any changes constitutes your acceptance of the updated Disclaimer.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold mb-2">8. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">If you have any questions about this Disclaimer, please contact us at:</p>
          <div className="text-muted-foreground leading-relaxed mt-2">
            <p className="font-semibold text-foreground">Northvanta LLC</p>
            <p>30 N Gould St Ste N, Sheridan, WY 82801 USA</p>
            <p>Email: <a href="mailto:support@filexone.com" className="text-primary hover:underline">support@filexone.com</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}

// ─── Cookie Banner GDPR (inline — solo visible en países UE) ──────────────────
function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('filexone_cookie_consent')) return;
    const euTimezones = [
      'Europe/Madrid','Europe/Paris','Europe/Berlin','Europe/Rome','Europe/Amsterdam',
      'Europe/Brussels','Europe/Vienna','Europe/Warsaw','Europe/Prague','Europe/Budapest',
      'Europe/Bucharest','Europe/Sofia','Europe/Athens','Europe/Helsinki','Europe/Stockholm',
      'Europe/Oslo','Europe/Copenhagen','Europe/Dublin','Europe/Lisbon','Europe/Riga',
      'Europe/Tallinn','Europe/Vilnius','Europe/Ljubljana','Europe/Bratislava','Europe/Zagreb',
      'Europe/Nicosia','Europe/Luxembourg','Europe/Malta','Atlantic/Reykjavik','Europe/Vaduz'
    ];
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (euTimezones.includes(tz)) {
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);

  const accept = (all) => {
    localStorage.setItem('filexone_cookie_consent', JSON.stringify({
      analytics: all, marketing: all, necessary: true, date: new Date().toISOString()
    }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-3xl mx-auto bg-background border border-border rounded-2xl shadow-2xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-lg">🍪</span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-foreground mb-1">We use cookies</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              We use essential cookies to make FileXone work, and optional analytics cookies to understand how you use our tools so we can improve them. We never sell your data.{' '}
              <Link to="/cookie-policy" className="text-primary hover:underline font-medium">Learn more</Link>
            </p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => accept(true)} className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold rounded-lg transition-colors">
                Accept all
              </button>
              <button onClick={() => accept(false)} className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold rounded-lg border border-border transition-colors">
                Necessary only
              </button>
            </div>
          </div>
          <button onClick={() => accept(false)} className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
            <span className="text-lg">×</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
const AuthenticatedApp = () => {
  const { isLoadingAuth, authModalOpen, authReturnUrl, closeAuthModal } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/compress-pdf" element={<CompressPdf />} />
          <Route path="/pdf-to-word" element={<PdfToWord />} />
          <Route path="/merge-pdf" element={<MergePdf />} />
          <Route path="/split-pdf" element={<SplitPdf />} />
          <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
          <Route path="/word-to-pdf" element={<WordToPdf />} />
          <Route path="/sign-pdf" element={<SignPdf />} />
          <Route path="/organize-pdf" element={<OrganizePdf />} />
          <Route path="/pdf-to-excel" element={<PdfToExcel />} />
          <Route path="/protect-pdf" element={<ProtectPdf />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/vs-smallpdf" element={<VsSmallpdf />} />
          <Route path="/vs-adobe" element={<VsAdobe />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/success" element={<Success />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pdf-to-powerpoint" element={<PdfToPowerpoint />} />
          <Route path="/web-to-pdf" element={<WebToPdf />} />
          <Route path="/vs-ilovepdf" element={<VsIlovepdf />} />
          <Route path="/compress-pdf-free" element={<CompressPdfFree />} />
          <Route path="/pdf-to-word-free" element={<PdfToWordFree />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <CookieBanner />
      <AuthModal open={authModalOpen} onClose={closeAuthModal} returnUrl={authReturnUrl} />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <I18nProvider>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </I18nProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;