import React, { useState, memo } from 'react';
import { Download } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

function DownloadButton({ fileName = 'file.pdf', downloadUrl }) {
  const { t } = useI18n();
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 300);

    if (downloadUrl) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className={`
        w-full max-w-sm h-14 text-base font-semibold rounded-2xl
        bg-primary hover:bg-primary/90 text-primary-foreground
        transition-all duration-200
        ${pressed ? 'shadow-inner scale-[0.98]' : 'shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30'}
      `}
      aria-label={`${t('downloadFile')} - ${fileName}`}
    >
      <Download className="w-5 h-5 mr-2" />
      {t('downloadFile')}
    </Button>
  );
}

export default memo(DownloadButton);