import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { useUsage } from '@/lib/useUsage';
import { useAuth } from '@/lib/AuthContext';
import UsageDots from './UsageDots';
import LanguageToggle from './LanguageToggle';
import { Button } from '@/components/ui/button';
import { redirectToStripeCheckout } from '@/lib/stripe';
import { LogIn, LogOut } from 'lucide-react';

function Header() {
  const { t } = useI18n();
  const { remaining, isPro } = useUsage();
  const { isAuthenticated, user, logout, openSignIn } = useAuth();

  const handleSignIn = () => {
    openSignIn(window.location.href);
  };

  const handleGoPro = async () => {
    if (isAuthenticated) {
      await redirectToStripeCheckout();
    } else {
      openSignIn(`${window.location.origin}/checkout?type=direct`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4">
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="/logo.png"
            alt="FileXone"
            className="h-9 w-auto"
          />
        </Link>

        <div className="hidden sm:flex items-center gap-1">
          <UsageDots remaining={remaining} />
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-sm text-muted-foreground font-mono">
            {t('taglineShort')}
          </span>
          <LanguageToggle />

          {!isAuthenticated && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleSignIn}
              className="h-10 text-sm px-4 rounded-full font-semibold flex items-center gap-1.5"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Button>
          )}

          {isAuthenticated && (
            <button
              onClick={() => logout?.()}
              title={`Signed in as ${user?.email || 'User'}`}
              className="h-10 flex items-center gap-1.5 px-3 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline truncate max-w-[100px]">{user?.full_name || user?.email}</span>
            </button>
          )}

          {!isPro && (
            <Button
              size="sm"
              onClick={handleGoPro}
              className="h-10 text-sm px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold"
            >
              {t('goPro')}
            </Button>
          )}

          {isPro && (
            <span className="h-10 flex items-center px-4 text-sm font-semibold text-primary bg-primary/10 rounded-full">
              ✓ Pro
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
