import React, { useState, useCallback } from 'react';
import { useI18n } from '@/lib/i18n';
import { useUsage } from '@/lib/useUsage';
import { redirectToStripeCheckout } from '@/lib/stripe';
import { useAuth } from '@/lib/AuthContext';
import DropZone from './DropZone';
import ProcessingView from './ProcessingView';
import DownloadButton from './DownloadButton';
import PrivacyNote from './PrivacyNote';
import ProTip from './ProTip';
import UpgradeModal from './UpgradeModal';
import { Zap } from 'lucide-react';

export default function ToolPageWrapper({
  headlineKey,
  accept = '.pdf',
  multiple = false,
  processingMessage,
  children,
  customUpload,
  promptKey,
  onProcess,
  outputFileName,
}) {
  const { t } = useI18n();
  const { canUse, consumeUse, remaining, isPro } = useUsage();
  const { isAuthenticated, openSignIn } = useAuth();
  const [state, setState] = useState('idle');
  const [files, setFiles] = useState([]);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [dismissedUpgrade, setDismissedUpgrade] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [originalSize, setOriginalSize] = useState(null);
  const [outputSize, setOutputSize] = useState(null);

  const handleFiles = useCallback((selectedFiles) => {
    if (!canUse) {
      setShowUpgrade(true);
      setDismissedUpgrade(false);
      return;
    }
    setFiles(selectedFiles);
    const totalBytes = selectedFiles.reduce((sum, f) => sum + f.size, 0);
    setOriginalSize(totalBytes);
    if (children) {
      setState('options');
    } else {
      runProcess(selectedFiles);
    }
  }, [canUse, children]);

  const runProcess = useCallback(async (selectedFiles, options = {}) => {
    if (!canUse) {
      setShowUpgrade(true);
      setDismissedUpgrade(false);
      return;
    }
    consumeUse();
    setState('processing');
    setProgress(0);
    setError(null);
    try {
      if (onProcess) {
        const url = await onProcess(selectedFiles, options, setProgress);
        setDownloadUrl(url);
      }
      setState('done');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Processing failed');
      setState('error');
    }
  }, [canUse, consumeUse, onProcess]);

  const handleProcess = useCallback((options = {}) => {
    runProcess(files, options);
  }, [files, runProcess]);

  const handleReset = useCallback(() => {
    setState('idle');
    setFiles([]);
    setDownloadUrl(null);
    setError(null);
    setShowUpgrade(false);
    setDismissedUpgrade(false);
  }, []);

  const handleCloseUpgrade = useCallback(() => {
    setShowUpgrade(false);
    setDismissedUpgrade(true);
  }, []);

  const handleGoPro = async () => {
    if (isAuthenticated) {
      await redirectToStripeCheckout();
    } else {
      openSignIn(`${window.location.origin}/checkout?type=direct`);
    }
  };

  const upgradeOpen = showUpgrade || (!canUse && state === 'idle' && !dismissedUpgrade);
  const outFileName = outputFileName || files[0]?.name || 'file.pdf';

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-6 tracking-tight">
        {t(headlineKey)}
      </h1>

      {state === 'idle' && (
        <>
          {customUpload || (
            <DropZone
              accept={accept}
              multiple={multiple}
              onFiles={handleFiles}
              promptKey={promptKey}
            />
          )}

          {/* Banner batch Pro — solo visible a usuarios free */}
          {!isPro && (
            <div className="mt-3 flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Pro:</span> Process up to 20 files at once
                </p>
              </div>
              <button
                onClick={handleGoPro}
                className="flex-shrink-0 text-xs font-semibold text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
              >
                Go Pro →
              </button>
            </div>
          )}

          <PrivacyNote />
        </>
      )}

      {state === 'options' && (
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-xl p-4">
            {files.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="font-medium truncate">{f.name}</span>
                <span className="text-muted-foreground font-mono text-xs">
                  {(f.size / 1048576).toFixed(1)} MB
                </span>
              </div>
            ))}
          </div>
          {typeof children === 'function' ? children({ files, onProcess: handleProcess }) : children}
        </div>
      )}

      {state === 'processing' && (
        <ProcessingView message={processingMessage || t('processing')} progress={progress} />
      )}

      {state === 'error' && (
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="text-destructive text-center">
            <p className="font-semibold mb-1">Something went wrong</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
          <button
            onClick={handleReset}
            className="text-sm text-primary hover:underline mt-2"
          >
            Try again →
          </button>
        </div>
      )}

      {state === 'done' && (
        <div className="flex flex-col items-center gap-4 py-4">
          {remaining > 0 && (
            <div className="text-xs text-muted-foreground text-center px-4 py-2 bg-muted/30 rounded-lg">
              {remaining === 1 ? t('useLeft') : t('usesLeft').replace('free uses left today', `${remaining} free uses left today`)}
            </div>
          )}
          <DownloadButton fileName={outFileName} downloadUrl={downloadUrl} />
          <ProTip />
          <button
            onClick={handleReset}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
          >
            ← Process another file
          </button>
        </div>
      )}

      <UpgradeModal open={upgradeOpen} onClose={handleCloseUpgrade} />
    </div>
  );
}