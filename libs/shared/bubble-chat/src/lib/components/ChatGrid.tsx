import { PropsWithChildren } from 'react'
import styles from '../styles/ChatGrid.module.css'

export function ChatGridContainer({ children }: PropsWithChildren) {
  return <div className={styles.gridContainer}>{children}</div>
}

type ChatGridItemProps = {
  position?: 'left' | 'right'
}

export function ChatGridItem({
  children,
  position = 'left',
}: PropsWithChildren<ChatGridItemProps>) {
  return (
    <div
      className={
        position === 'left' ? styles.gridItemLeft : styles.gridItemRight
      }
    >
      {children}
    </div>
  )
}
