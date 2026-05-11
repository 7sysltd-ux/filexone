import { supabase } from './supabaseClient';

/**
 * Call a Supabase Edge Function.
 * Replaces base44.functions.invoke(name, payload).
 * Returns { data } to keep the same interface the pages expect.
 */
export async function invokeFunction(functionName, payload) {
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData?.session?.access_token;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const res = await fetch(`${supabaseUrl}/functions/v1/${functionName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      ...(token ? { 'X-User-Token': token } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `Function ${functionName} failed: ${res.status}`);
  }

  const data = await res.json();
  return { data };
}
