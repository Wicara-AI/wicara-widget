import { useState, useRef } from 'react';
import styles from '../../styles/ChatForm.module.css';
import { useFilePreview } from '../../hooks/useFile';
import { FilePreview } from '../FilePreview';
import SmileIcon from '../../partials/icons/SmileIcon';
import PaperclipIcon from '../../partials/icons/PaperclipIcon';
import SendIcon from '../../partials/icons/SendIcon';
import { EmojiPicker } from '../EmojiPicker';
import { ALLOWED_FILE_TYPES, useSendMessage } from '../../hooks/useSendMessage';
import { useRootContext } from '../../context/RootContext';
import { OutboundMessageType } from '../../constants/outboundMessage';

export const ChatForm = () => {
  const [message, setMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { apiHeaders } = useRootContext();
  const { previews, addFiles, removeFile } = useFilePreview({ apiHeaders });
  const { sendMessage, sending, error } = useSendMessage({ apiHeaders });

  const determineMessageType = (files: typeof previews): OutboundMessageType => {
    if (files.length === 0) return 'text';

    const firstFileType = files[0].type;
    if (firstFileType.startsWith('image/')) return 'image';
    if (firstFileType.startsWith('video/')) return 'video';
    if (firstFileType.startsWith('audio/')) return 'audio';
    if (firstFileType.startsWith('application/')) return 'document';

    return 'unsupported';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() && previews.length === 0) return;

    try {
      const messageType = determineMessageType(previews);

      await sendMessage(
        message.trim(),
        messageType,
        {
          files: previews
        }
      );

      // Clear form after successful send
      setMessage('');
      previews.forEach(p => removeFile(p.id));

    } catch (error) {
      console.error('Failed to send message:', error);
      // You might want to show an error toast or notification here
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      // Filter files based on allowed types
      const validFiles = Array.from(files).filter(file =>
        ALLOWED_FILE_TYPES.includes(file.type)
      );

      if (validFiles.length !== files.length) {
        // You might want to show a warning about invalid file types
        console.warn('Some files were skipped due to unsupported file types');

        return;
      }

      addFiles(files);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const addEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {previews.length > 0 && (
          <div className={styles.previewContainer}>
            {previews.map(preview => (
              <FilePreview
                key={preview.id}
                preview={preview}
                onRemove={removeFile}
              />
            ))}
          </div>
        )}

        <div className={styles.inputWrapper}>
          <button
            type="button"
            onClick={() => setShowEmojis(!showEmojis)}
            className={styles.iconButton}
          >
            <SmileIcon className="w-5 h-5" />
          </button>

          <label className={styles.iconButton}>
            <PaperclipIcon className="w-5 h-5" />
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              className={styles.fileInput}
              accept={ALLOWED_FILE_TYPES.join(',')}
            />
          </label>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className={styles.textInput}
            disabled={sending}
          />

          <button
            type="submit"
            disabled={(!message.trim() && previews.length === 0) || sending}
            className={`${styles.sendButton} ${sending ? styles.sending : ''}`}
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>

        {showEmojis && <EmojiPicker onEmojiSelect={addEmoji} />}
      </form>
    </div>
  );
};

export default ChatForm;
