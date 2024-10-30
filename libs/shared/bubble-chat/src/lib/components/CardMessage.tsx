import { PropsWithChildren } from "react";
import styles from '../styles/CardMessage.module.css';

export default function CardMessage({children}: PropsWithChildren) {
  return (
    <div className={styles.card}>
      {children}
    </div>
  )
}
