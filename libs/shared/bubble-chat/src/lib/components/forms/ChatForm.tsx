// ChatForm.tsx
import React, { useState, useRef, ChangeEvent, KeyboardEvent, FormEvent } from 'react';
import { ReactComponent as Send } from '../../assets/svgs/send.svg';
import { ReactComponent as Paperclip } from '../../assets/svgs/paperclip.svg';
import { ReactComponent as Smile } from '../../assets/svgs/smile.svg';

import styles from './ChatForm.module.css';

interface ChatFormProps {
  onSendMessage?: (message: string) => void;
  maxRows?: number;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

interface TextAreaRef extends HTMLTextAreaElement {
  rows: number;
}

const ChatForm: React.FC<ChatFormProps> = ({
  onSendMessage,
  maxRows = 5,
  placeholder = "Type a message...",
  disabled = false,
  className = ''
}) => {
  const [message, setMessage] = useState<string>('');
  const [rows, setRows] = useState<number>(1);
  const textAreaRef = useRef<TextAreaRef>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage?.(message.trim());
      setMessage('');
      setRows(1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
      }
    }
  };

  const calculateRows = (scrollHeight: number, lineHeight = 24): number => {
    return Math.min(Math.floor(scrollHeight / lineHeight), maxRows);
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const textarea = textAreaRef.current;
    if (!textarea) return;

    setMessage(e.target.value);
    textarea.rows = 1;

    const newRows = calculateRows(textarea.scrollHeight);
    setRows(newRows);
  };

  const handlePaperclipClick = (): void => {
    // Implement file attachment logic
    console.log('Attach file clicked');
  };

  const handleEmojiClick = (): void => {
    // Implement emoji picker logic
    console.log('Emoji picker clicked');
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={handlePaperclipClick}
            disabled={disabled}
          >
            <Paperclip className={styles.icon} />
          </button>

          <textarea
            ref={textAreaRef}
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            rows={rows}
            placeholder={placeholder}
            className={styles.textarea}
            disabled={disabled}
            aria-label="Message input"
          />

          <button
            type="button"
            className={styles.iconButton}
            onClick={handleEmojiClick}
            disabled={disabled}
          >
            <Smile className={styles.icon} />
          </button>

          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className={`${styles.sendButton} ${(!message.trim() || disabled) ? styles.disabled : ''}`}
            aria-label="Send message"
          >
            <Send className={styles.sendIcon} />
          </button>
        </div>
      </form>
    </div>
  );
};

// Optional: Export type definitions if they'll be used elsewhere
export type { ChatFormProps };
export default ChatForm;
