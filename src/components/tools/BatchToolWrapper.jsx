import React, { useState, useCallback } from 'react';
import JSZip from 'jszip';
import { X, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUsage } from '@/lib/useUsage';
import DropZone from './DropZone';
import PrivacyNote from './PrivacyNote';
import ProTip from './ProTip';
import UpgradeModal from './UpgradeModal';
import { Button } from '@/components/ui/button';

const FREE_LIMIT = 3;
const PRO_LIMIT = 20;

function FileRow({ file, progress, status }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium truncate">{file.name}</span>
          <span className="text-xs text-muted-foreground font-mono ml-2 flex-shrink-0">
            {(file.size / 1048576).toFixed(1)} MB
          </span>
        </div>
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <span className="text-xs text-muted-foreground w-14 text-right flex-shrink-0">
        {status === 'done' ? '✓ Done' : status === 'processing' ? `${Math.round(progress)}%` : '—'}
      </span>
    </div>
  );
}

export default function BatchToolWrapper({
  headlineKey,
  accept = '.pdf',
  processFile,
  optionsRenderer,
  defaultOptions = {},
  zipName = 'filexone-batch.zip',
  singleOutputName,
}) {
  const { canUse, consumeUse, isPro } = useUsage();
  const limit = isPro ? PRO_LIMIT : FREE_LIMIT;

  const [files, setFiles] = useState([]);
  const [fileStatuses, setFileStatuses] = useState({});
  const [state, setState] = useState('idle');
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [downloadName, setDownloadName] = useState(zipName);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState(defaultOptions);
  const [limitWarning, setLimitWarning] = useState(false);
  const [error, setError] = useState(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleFiles = useCallback((selected) => {
    // Show upgrade modal if no uses left when trying to add files
    if (!canUse) {
      setShowUpgrade(true);
      return;
    }
    const combined = [...files, ...selected];
    if (combined.length > limit) {
      setLimitWarning(true);
      setFiles(combined.slice(0, limit));
    } else {
      setLimitWarning(false);
      setFiles(combined);
    }
  }, [files, limit, canUse]);

  const removeFile = (i) => {
    setFiles(prev => prev.filter((_, idx) => idx !== i));
    setLimitWarning(false);
  };

  const handleProcess = async () => {
    if (!canUse) {
      setShowUpgrade(true);
      return;
    }
    consumeUse();
    setState('processing');
    setError(null);
    setCurrentIndex(0);

    const statuses = {};
    files.forEach((_, i) => { statuses[i] = { progress: 0, status: 'pending' }; });
    setFileStatuses({ ...statuses });

    const results = [];

    for (let i = 0; i < files.length; i++) {
      setCurrentIndex(i);
      setFileStatuses(prev => ({ ...prev, [i]: { progress: 0, status: 'processing' } }));

      const onProgress = (p) => {
        setFileStatuses(prev => ({ ...prev, [i]: { progress: p, status: 'processing' } }));
      };

      const result = await processFile(files[i], onProgress, options);
      results.push(result);
      setFileStatuses(prev => ({ ...prev, [i]: { progress: 100, status: 'done' } }));
    }

    if (results.length === 1 && singleOutputName) {
      const { blob, filename } = results[0];
      setDownloadUrl(URL.createObjectURL(blob));
      setDownloadName(filename || singleOutputName);
    } else {
      const zip = new JSZip();
      results.forEach(({ blob, filename }) => {
        zip.file(filename, blob);
      });
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      setDownloadUrl(URL.createObjectURL(zipBlob));
      setDownloadName(zipName);
    }

    setState('done');
  };

  const handleReset = () => {
    setState('idle');
    setFiles([]);
    setFileStatuses({});
    setDownloadUrl(null);
    setLimitWarning(false);
    setError(null);
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (state === 'processing') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <p className="text-center text-sm text-muted-foreground mb-4 font-medium">
          Processing {currentIndex + 1} of {files.length} files…
        </p>
        <div className="bg-muted/30 rounded-2xl divide-y divide-border px-4">
          {files.map((file, i) => (
            <FileRow
              key={i}
              file={file}
              progress={fileStatuses[i]?.progress || 0}
              status={fileStatuses[i]?.status || 'pending'}
            />
          ))}
        </div>
      </div>
    );
  }

  if (state === 'done') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col items-center gap-4">
        <div className="w-full bg-muted/30 rounded-2xl divide-y divide-border px-4 mb-2">
          {files.map((file, i) => (
            <FileRow key={i} file={file} progress={100} status="done" />
          ))}
        </div>
        <Button
          onClick={handleDownload}
          size="lg"
          className="w-full max-w-sm h-14 text-base font-semibold rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
        >
          <Download className="w-5 h-5 mr-2" />
          Download All {files.length > 1 ? '(ZIP)' : ''}
        </Button>
        <ProTip />
        <button onClick={handleReset} className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-1">
          ← Process another file
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <p className="text-xs text-center text-muted-foreground mb-3">
        Drop up to <span className="font-semibold text-primary">{FREE_LIMIT} PDFs (Free)</span> or{' '}
        <span className="font-semibold text-primary">{PRO_LIMIT} PDFs (Pro)</span>
      </p>

      <DropZone accept={accept} multiple onFiles={handleFiles} />

      {limitWarning && (
        <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start justify-between gap-3">
          <p className="text-sm text-amber-700 dark:text-amber-400">
            Free plan allows {FREE_LIMIT} files at once. Upgrade to Pro for up to {PRO_LIMIT} files.
          </p>
          <Link to="/pricing" className="flex-shrink-0">
            <Button size="sm" className="bg-primary text-primary-foreground rounded-lg h-7 text-xs px-3">
              Go Pro
            </Button>
          </Link>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4 bg-muted/30 rounded-2xl divide-y divide-border px-4">
          {files.map((file, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5">
              <span className="text-sm font-medium flex-1 truncate">{file.name}</span>
              <span className="text-xs text-muted-foreground font-mono">
                {(file.size / 1048576).toFixed(1)} MB
              </span>
              <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && optionsRenderer && (
        <div className="mt-4">
          {optionsRenderer(options, setOptions)}
        </div>
      )}

      {files.length > 0 && (
        <Button
          onClick={handleProcess}
          className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11 font-semibold"
        >
          Process {files.length} file{files.length > 1 ? 's' : ''}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}

      <PrivacyNote />

      {/* Upgrade modal — shown when free uses are exhausted */}
      <UpgradeModal open={showUpgrade || (!canUse && files.length > 0)} onClose={() => setShowUpgrade(false)} />
    </div>
  );
}