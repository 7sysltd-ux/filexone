import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Mail, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function AuthModal({ open, onClose, returnUrl }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const redirectTo = returnUrl || window.location.href;

  const handleGoogle = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
  };

  const handleApple = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: { redirectTo },
    });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    setLoading(false);
    if (!error) {
      setEmailSent(true);
    }
  };

  if (emailSent) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-sm rounded-2xl p-0 overflow-hidden border-0 shadow-2xl">
          <div className="p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Check your email</h2>
            <p className="text-sm text-muted-foreground">
              We sent a magic link to <strong>{email}</strong>. Click the link in the email to sign in.
            </p>
            <Button
              variant="ghost"
              onClick={() => { setEmailSent(false); setEmail(''); }}
              className="mt-4 text-sm text-muted-foreground"
            >
              Use a different email
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

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
            Sign in to continue
          </h2>

          {/* Social buttons */}
          <div className="flex flex-col gap-3 mb-5">
            <Button
              variant="outline"
              onClick={handleGoogle}
              disabled={loading}
              className="w-full h-12 rounded-xl border-border text-foreground font-medium text-base justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>

            <Button
              variant="outline"
              onClick={handleApple}
              disabled={loading}
              className="w-full h-12 rounded-xl border-border text-foreground font-medium text-base justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Continue with Apple
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
            <div className="text-sm font-medium text-foreground mb-1">Email</div>
            <div className="relative">
              <Input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl pr-10 text-base"
              />
              <Mail className="w-5 h-5 text-primary absolute right-3 top-3.5" />
            </div>
            <Button
              type="submit"
              disabled={loading || !email}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base"
            >
              {loading ? 'Sending...' : 'Continue with email'}
            </Button>
          </form>

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
