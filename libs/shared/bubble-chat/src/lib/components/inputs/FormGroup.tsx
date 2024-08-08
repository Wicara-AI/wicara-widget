import { forwardRef, Ref } from 'react'
import styles from './form-group.module.css'

export type FormGroupProps = React.HTMLAttributes<HTMLDivElement>

export type FormGroupRef = HTMLDivElement

export const FormGroup = forwardRef(
  ({ children, ...props }: FormGroupProps, ref: Ref<FormGroupRef>) => {
    return (
      <div ref={ref} {...props} className={styles['form-group']}>
        {children}
      </div>
    )
  },
)

FormGroup.displayName = 'FormGroup'

export type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export type FormLabelRef = HTMLLabelElement

export const FormLabel = forwardRef(
  ({ children, ...props }: FormLabelProps, ref: Ref<FormLabelRef>) => {
    return (
      <label ref={ref} {...props} className={styles['form-group-label']}>
        {children}
      </label>
    )
  },
)

FormLabel.displayName = 'FormLabel'
