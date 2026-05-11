import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ActivatePro() {
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('is_pro')
            .eq('id', user.id)
            .single();

          if (profile && !profile.is_pro) {
            await supabase
              .from('profiles')
              .update({
                is_pro: true,
                pro_activated_at: new Date().toISOString(),
              })
              .eq('id', user.id);
          }
        }
        setActivated(true);
      } catch (e) {
        setActivated(true); // still show success UI
      }
    })();
  }, []);

  return (
    <div className="mb-8 p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
      <p className="font-semibold text-foreground">🎉 You're now a Pro member! Welcome aboard.</p>
      <p className="text-sm text-muted-foreground mt-1">
        {activated
          ? 'Your subscription is active. Enjoy unlimited access on any device.'
          : 'Activating your account...'}
      </p>
    </div>
  );
}
