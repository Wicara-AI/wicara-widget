import { forwardRef, PropsWithChildren, Ref } from "react";
import styles from './register-button-submit.module.css';

export type RegisterButtonSubmitProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type RegisterButtonSubmitRef = HTMLButtonElement;

const RegisterButtonSubmit = forwardRef(({children, ...props}: PropsWithChildren<RegisterButtonSubmitProps>, ref: Ref<RegisterButtonSubmitRef>) => {
  return (
    <button ref={ref} {...props} className={styles['button']}>
      {children}
    </button>
  );
});

export default RegisterButtonSubmit;
