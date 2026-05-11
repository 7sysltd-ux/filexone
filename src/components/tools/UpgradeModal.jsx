import React from 'react';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Zap, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { redirectToStripeCheckout } from '@/lib/stripe';

export default function UpgradeModal({ open, onClose }) {
  const { t } = useI18n();
  const { isAuthenticated, openSignIn } = useAuth();

  const handleUpgrade = async () => {
    onClose(false);
    if (isAuthenticated) {
      await redirectToStripeCheckout();
    } else {
      openSignIn(`${window.location.origin}/checkout?type=direct`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-lg">{t('upgradeTitle')}</DialogTitle>
          <DialogDescription className="text-center text-sm">
            {t('upgradeBody')}
          </DialogDescription>
        </DialogHeader>

        {/* Precio */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-center my-2">
          <span className="text-2xl font-bold text-primary">$7</span>
          <span className="text-muted-foreground text-sm">/month</span>
          <p className="text-xs text-muted-foreground mt-1">Unlimited uses · All tools · 20 files at once</p>
        </div>

        {/* Pasos si no está logueado */}
        {!isAuthenticated && (
          <div className="bg-muted/40 rounded-xl px-4 py-3 space-y-2">
            <p className="font-semibold text-foreground text-sm">2 quick steps:</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0">1</span>
              <span>Sign in or create a free account with Google, Apple or email</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0">2</span>
              <span>Enter your payment details — done!</span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 mt-2">
          <Button
            onClick={handleUpgrade}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11 font-semibold"
          >
            {isAuthenticated ? 'Go Pro — $7/month' : 'Continue to Pro →'}
          </Button>
          <Button
            variant="ghost"
            onClick={() => onClose(false)}
            className="text-muted-foreground text-sm"
          >
            {t('maybeLater')}
          </Button>
        </div>

        {/* Garantía */}
        <div className="flex items-center gap-2 justify-center mt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <p className="text-xs text-muted-foreground text-center">
            7-day money-back guarantee. Not happy? Full refund, no questions.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}