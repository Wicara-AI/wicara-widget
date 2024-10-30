
// components/FilePreview.tsx
import { FilePreview as FilePreviewType } from '../types/chat';
import styles from '../styles/FilePreview.module.css';
import XIcon from '../partials/icons/XIcon';

interface FilePreviewProps {
  preview: FilePreviewType;
  onRemove: (id: string) => void;
}

export const FilePreview = ({ preview, onRemove }: FilePreviewProps) => {
  const isImage = preview.type.startsWith('image/');

  return (
    <div className={styles.previewWrapper}>
      <div className={styles.previewCard}>
        {isImage ? (
          <img
            src={preview.previewUrl}
            alt={preview.name}
            className={styles.previewImage}
          />
        ) : (
          <div className={styles.genericPreview}>
            <span className={styles.fileExtension}>
              {preview.name.split('.').pop()?.toUpperCase()}
            </span>
          </div>
        )}
        <button
          onClick={() => onRemove(preview.id)}
          className={styles.removeButton}
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>
      <p className={styles.fileName}>{preview.name}</p>
    </div>
  );
};
