import React from 'react';
import { useI18n } from '@/lib/i18n';

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center bg-muted rounded-full p-0.5 text-xs">
      <button
        onClick={() => setLang('en')}
        className={`px-2 py-0.5 rounded-full font-medium transition-all duration-200 ${
          lang === 'en'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('es')}
        className={`px-2 py-0.5 rounded-full font-medium transition-all duration-200 ${
          lang === 'es'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        ES
      </button>
    </div>
  );
}