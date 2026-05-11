import React, { useState, useRef, useCallback, memo } from 'react';
import { Upload, FileIcon } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';

function DropZone({ accept = '.pdf', multiple = false, onFiles, promptKey = 'uploadPrompt' }) {
  const { t } = useI18n();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      const selected = multiple ? droppedFiles : [droppedFiles[0]];
      setFiles(selected);
      onFiles?.(selected);
    }
  }, [multiple, onFiles]);

  const handleChange = useCallback((e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
      onFiles?.(selectedFiles);
    }
    e.target.value = ''; // reset so same files can be re-selected
  }, [onFiles]);

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <div
      onDragOver={handleDrag}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`
        relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300
        min-h-[200px] flex flex-col items-center justify-center gap-3 p-8
        ${isDragging
          ? 'border-primary bg-primary/5 scale-[1.01] shadow-lg shadow-primary/10'
          : 'border-border hover:border-primary/40 hover:bg-muted/50'
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {files.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
              isDragging ? 'bg-primary/10' : 'bg-muted'
            }`}>
              <Upload className={`w-6 h-6 transition-colors duration-300 ${
                isDragging ? 'text-primary' : 'text-muted-foreground'
              }`} />
            </div>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              {t(promptKey)}
            </p>
            <p className="text-xs text-muted-foreground/60 font-mono">
              {accept.toUpperCase().replace(/\./g, '').replace(/,/g, ', ')}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="files"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-2"
          >
            {files.map((file, i) => (
              <div key={i} className="flex items-center gap-3 bg-muted/80 rounded-xl px-4 py-2">
                <FileIcon className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{formatSize(file.size)}</p>
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground mt-1">
              {t(promptKey)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(DropZone);