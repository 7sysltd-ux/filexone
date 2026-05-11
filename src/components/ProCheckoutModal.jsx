import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { redirectToStripeCheckout } from '@/lib/stripe';

export default function ProCheckoutModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, openSignIn } = useAuth();

  const handleContinue = async () => {
    if (isAuthenticated) {
      setLoading(true);
      onClose(false);
      await redirectToStripeCheckout();
    } else {
      onClose(false);
      openSignIn(`${window.location.origin}/checkout?type=direct`);
    }
  };

  const handleSkip = async () => {
    setLoading(true);
    onClose(false);
    await redirectToStripeCheckout();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm rounded-2xl p-0 overflow-hidden border-0 shadow-2xl">
        <button
          onClick={() => onClose(false)}
          className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-6">
            Upgrade to Pro
          </h2>

          <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-center mb-6">
            <span className="text-2xl font-bold text-primary">$7</span>
            <span className="text-muted-foreground text-sm">/month</span>
            <p className="text-xs text-muted-foreground mt-1">Unlimited uses · All tools · 20 files at once</p>
          </div>

          <Button
            onClick={handleContinue}
            disabled={loading}
            className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base mb-3"
          >
            {isAuthenticated ? 'Go to checkout' : 'Sign in & upgrade'}
          </Button>

          <button
            onClick={handleSkip}
            className="w-full text-center text-xs text-muted-foreground hover:text-foreground mt-1 transition-colors"
          >
            Skip and pay directly →
          </button>

          <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
            By continuing, you agree to the{' '}
            <a href="/terms" className="underline">Terms of Service</a>,{' '}
            <a href="/privacy-policy" className="underline">Privacy Policy</a>, and{' '}
            <a href="/cookie-policy" className="underline">Cookie Policy</a>.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
