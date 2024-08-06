import { forwardRef, ForwardRefExoticComponent, HtmlHTMLAttributes, PropsWithChildren, Ref, RefAttributes } from "react";
import styles from "./bubble-dialog.module.css";


export const BubbleDialogContent = forwardRef(({children, ...props}: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>, ref: Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} {...props} className={styles.dialogContent}>
      {children}
    </div>
  );
});

export const BubbleDialogHeader = forwardRef(({children, ...props}: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>, ref: Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} {...props} className={styles.dialogHeader}>
      {children}
    </div>
  );
});

export const BubbleDialogFooter = forwardRef(({children, ...props}: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>, ref: Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} {...props} className={styles.dialogFooter}>
      {children}
    </div>
  );
});

export const BubbleDialogButtonClose = forwardRef(({children, ...props}: PropsWithChildren<HtmlHTMLAttributes<HTMLButtonElement>>, ref: Ref<HTMLButtonElement>) => {
  return (
    <button ref={ref} {...props} className={styles.dialogClose}>
      {children}
    </button>
  );
});

interface BubbleDialogComponent extends ForwardRefExoticComponent<HtmlHTMLAttributes<HTMLDialogElement> & RefAttributes<HTMLDialogElement>> {
  Footer: typeof BubbleDialogFooter;
  Header: typeof BubbleDialogHeader;
  Content: typeof BubbleDialogContent;
  ButtonClose: typeof BubbleDialogButtonClose;
}

const BubbleDialog = forwardRef(({children, ...props}: PropsWithChildren<HtmlHTMLAttributes<HTMLDialogElement>>, ref: Ref<HTMLDialogElement>) => {
  return (
    <dialog ref={ref} {...props} className={styles.dialog}>
      <div className={styles.dialogContainer}>
        {children}
      </div>
    </dialog>
  );
}) as BubbleDialogComponent;

BubbleDialog.Footer = BubbleDialogFooter;
BubbleDialog.Header = BubbleDialogHeader;
BubbleDialog.Content = BubbleDialogContent;
BubbleDialog.ButtonClose = BubbleDialogButtonClose;

export default BubbleDialog;
