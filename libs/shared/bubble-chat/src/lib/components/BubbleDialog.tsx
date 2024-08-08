import { forwardRef, HtmlHTMLAttributes, PropsWithChildren, PropsWithRef, Ref } from "react";
import styles from "./bubble-dialog.module.css";

export const BubbleDialogContent = forwardRef(({children, ...props}: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>, ref: Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} {...props} className={styles['dialog-content']}>
      {children}
    </div>
  );
});

export const BubbleDialogHeader = forwardRef(({children, ...props}: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>, ref: Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} {...props} className={styles['dialog-header-container']}>
      <div className={styles['dialog-header']}>
        {children}
      </div>
    </div>
  );
});

export const BubbleDialogFooter = forwardRef(({children, ...props}: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>, ref: Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} {...props} className={styles['dialog-footer']}>
      {children}
    </div>
  );
});

export const BubbleDialogButtonClose = forwardRef(({children, ...props}: PropsWithChildren<HtmlHTMLAttributes<HTMLButtonElement>>, ref: Ref<HTMLButtonElement>) => {
  return (
    <button ref={ref} {...props} className={styles['dialog-close']}>
      {children}
    </button>
  );
});

export const BubbleDialogTitle = forwardRef(({children, ...props}: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>, ref: Ref<HTMLDivElement>) => {
  return (
    <h4 ref={ref} {...props} className={styles['dialog-title']}>
      {children}
    </h4>
  );
});

export type BubbleDialogProps = PropsWithRef<HtmlHTMLAttributes<HTMLDivElement>> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export type BubbleDialogRef = HTMLDivElement;

const BubbleDialog = forwardRef(({children, open = false, onOpenChange, ...props}: PropsWithChildren<BubbleDialogProps>, ref: Ref<BubbleDialogRef>) => {
  console.log('open', open);
  return (
    <div ref={ref} {...props} className={styles['dialog']} style={{display: open ? 'block' : 'none'}}>
      <div className={styles['dialogContainer']}>
        {children}
      </div>
    </div>
  );
});

export default BubbleDialog;
