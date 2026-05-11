import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';

const MAX_FREE_USES = 3;
const STORAGE_KEY = 'filexone-usage';

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getUsageData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: getToday(), count: 0 };
    const data = JSON.parse(raw);
    if (data.date !== getToday()) {
      return { date: getToday(), count: 0 };
    }
    return data;
  } catch (e) {
    console.error('getUsageData error:', e);
    return { date: getToday(), count: 0 };
  }
}

function saveUsageData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('saveUsageData error:', e);
  }
}

export function useUsage() {
  const [usage, setUsage] = useState(() => getUsageData());
  const { user } = useAuth();

  const isPro = user?.is_pro || false;

  useEffect(() => {
    try {
      const handleStorageChange = () => {
        setUsage(getUsageData());
      };
      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('usage-updated', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('usage-updated', handleStorageChange);
      };
    } catch (e) {
      console.error('useUsage storage listener error:', e);
    }
  }, []);

  const remaining = isPro ? Infinity : Math.max(0, MAX_FREE_USES - usage.count);
  const canUse = isPro || remaining > 0;

  const consumeUse = useCallback(() => {
    try {
      if (isPro) return true;
      const current = getUsageData();
      const updated = { date: getToday(), count: current.count + 1 };
      saveUsageData(updated);
      setUsage(updated);
      window.dispatchEvent(new CustomEvent('usage-updated', { detail: updated }));
      return updated.count <= MAX_FREE_USES;
    } catch (e) {
      console.error('consumeUse error:', e);
      return false;
    }
  }, [isPro]);

  return { remaining, canUse, consumeUse, used: usage.count, isPro };
}
