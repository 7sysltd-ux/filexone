import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { tools } from '@/lib/toolsConfig';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-muted/50 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Tools grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                to={tool.path}
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-200"
              >
                <Icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                <span>{t(tool.nameKey)}</span>
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">

            {/* Brand + Company info */}
            <div>
              <img
                src="/logo.png"
                alt="FileXone"
                className="h-9 w-auto"
              />
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Fast, secure PDF tools for everyone.<br />No software to install.
              </p>
              <div className="text-xs text-muted-foreground mt-3 leading-relaxed">
                <p className="font-semibold text-foreground">Northvanta LLC</p>
                <p>30 N Gould St Ste N</p>
                <p>Sheridan, WY 82801 USA</p>
                <p className="mt-1">
                  <a href="mailto:support@filexone.com" className="hover:text-primary transition-colors">
                    support@filexone.com
                  </a>
                </p>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Product</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><Link to="/pricing" className="hover:text-foreground transition-colors">{t('pricing')}</Link></li>
                <li><Link to="/vs-smallpdf" className="hover:text-foreground transition-colors">FileXone vs Smallpdf</Link></li>
                <li><Link to="/vs-adobe" className="hover:text-foreground transition-colors">FileXone vs Adobe Acrobat</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Legal</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><Link to="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookie-policy" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
                <li><Link to="/refund-policy" className="hover:text-foreground transition-colors">Refund Policy</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border pt-5 flex flex-col items-center gap-3">
            <p className="text-xs text-muted-foreground">&copy; 2026 Northvanta LLC &middot; FileXone. All rights reserved.</p>

            <p className="text-xs text-muted-foreground text-center">
              <Link to="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link>
              {' | '}
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms & Conditions</Link>
              {' | '}
              <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            </p>

            <p className="text-xs text-muted-foreground text-center">
              Secure file processing &middot; HTTPS encrypted &middot; Files deleted after processing
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
