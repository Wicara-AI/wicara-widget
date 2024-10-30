import { PropsWithChildren } from 'react'
import styles from '../styles/ChatContainer.module.css'

export default function ChatContainer({ children }: PropsWithChildren) {
  return <div className={styles.container}>{children}</div>
}
