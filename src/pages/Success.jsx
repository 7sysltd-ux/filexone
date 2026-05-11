import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Monitor, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/lib/AuthContext';

export default function Success() {
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          await supabase.from('profiles').update({
            is_pro: true,
            pro_activated_at: new Date().toISOString(),
          }).eq('id', authUser.id);
        }
      } catch (e) {}
    })();
  }, []);

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        {/* Check animado */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </motion.div>

        <h1 className="text-3xl font-extrabold text-foreground mb-2">
          You're now Pro! 🎉
        </h1>

        {user?.email && (
          <p className="text-muted-foreground text-sm mb-1">
            Logged in as <span className="font-semibold text-foreground">{user.email}</span>
          </p>
        )}

        <p className="text-muted-foreground text-base mb-8">
          Unlimited access is active on all your devices.
        </p>

        {/* CTA principal */}
        <Link to="/">
          <Button className="w-full h-13 text-base font-bold rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 py-4 mb-6">
            <Zap className="w-5 h-5 mr-2" />
            Start using FileXone Pro →
          </Button>
        </Link>

        {/* Info dispositivos */}
        <div className="bg-muted/40 border border-border rounded-2xl p-4 text-left mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Monitor className="w-4 h-4 text-muted-foreground" />
            <Smartphone className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">Access from any device</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Go to <span className="font-semibold text-foreground">filexone.com</span> on any device and click <span className="font-semibold text-foreground">Sign In</span> with the same account you just used. Your Pro access will be there instantly.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <a href="mailto:support@filexone.com" className="hover:text-foreground transition-colors">
            support@filexone.com
          </a>
        </div>
      </motion.div>
    </div>
  );
}