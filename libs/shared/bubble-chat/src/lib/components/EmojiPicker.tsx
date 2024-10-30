import styles from '../styles/EmojiPicker.module.css'

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
}

export const EmojiPicker = ({ onEmojiSelect }: EmojiPickerProps) => {
  const commonEmojis = ['😊', '😂', '❤️', '👍', '🙌', '🎉', '🤔', '😅']

  return (
    <div className={styles.container}>
      <div className={styles.emojiGrid}>
        {commonEmojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onEmojiSelect(emoji)}
            className={styles.emojiButton}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  )
}
