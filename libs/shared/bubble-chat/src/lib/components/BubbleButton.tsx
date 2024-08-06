import { forwardRef, HtmlHTMLAttributes, PropsWithChildren, Ref } from 'react';
import styles from './bubble-button.module.css';

const BubbleButton = forwardRef(({children,...props}: PropsWithChildren<HtmlHTMLAttributes<HTMLButtonElement>>, ref: Ref<HTMLButtonElement>) => {
  return (
    <button ref={ref} {...props} className={styles['button']}>
      {children}
    </button>
  );
});

export default BubbleButton;
