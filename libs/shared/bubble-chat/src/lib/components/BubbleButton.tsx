import { forwardRef, HtmlHTMLAttributes, PropsWithChildren, PropsWithRef, Ref } from 'react';
import styles from './bubble-button.module.css';

export type BubbleButtonProps = PropsWithRef<HtmlHTMLAttributes<HTMLButtonElement>>;
export type BubbleButtonRef = HTMLButtonElement;

const BubbleButton = forwardRef(({children,...props}: PropsWithChildren<BubbleButtonProps>, ref: Ref<BubbleButtonRef>) => {
  return (
    <button ref={ref} {...props} className={styles['button']}>
      {children}
    </button>
  );
});

export default BubbleButton;
