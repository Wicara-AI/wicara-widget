import { PropsWithChildren } from "react";
import styles from './chat-container.module.css';

export default function ChatContainer({children}: PropsWithChildren) {
  return (
    <div className={styles['chat-container']}>
      {children}
    </div>
  )
}
