import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useUsage } from '@/lib/useUsage';
import { redirectToStripeCheckout } from '@/lib/stripe';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Checkout() {
  const { isAuthenticated, user, isLoadingAuth, openSignIn } = useAuth();
  const { isPro } = useUsage();
  const [error, setError] = useState(null);

  const checkoutType = new URLSearchParams(window.location.search).get('type') || 'trial';

  useEffect(() => {
    if (isLoadingAuth) return;

    if (!isAuthenticated) {
      // Not logged in — open sign-in modal
      openSignIn(`${window.location.origin}/checkout?type=${checkoutType}`);
      return;
    }

    // Already Pro — don't send to Stripe
    if (isPro) return;

    // Logged in + not Pro — fire Stripe checkout
    redirectToStripeCheckout().catch((err) => {
      setError(err.message || 'Could not start checkout. Please try again.');
    });
  }, [isAuthenticated, isLoadingAuth, isPro, user]);

  // Already Pro — show friendly message
  if (isAuthenticated && isPro) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-extrabold text-foreground mb-2">You're already Pro! ✓</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Your account already has unlimited access to all FileXone tools. No need to pay again.
          </p>
          <Link to="/">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold">
              Go to FileXone →
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-destructive font-semibold mb-2">Something went wrong</p>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <a href="/pricing" className="text-sm text-primary hover:underline">← Back to Pricing</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground text-sm">Redirecting to secure checkout…</p>
      </div>
    </div>
  );
}