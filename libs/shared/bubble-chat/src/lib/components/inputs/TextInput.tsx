import { forwardRef, Ref } from 'react'
import styles from './text-input.module.css'

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>

export type TextInputRef = HTMLInputElement

const TextInput = forwardRef(
  (props: TextInputProps, ref: Ref<TextInputRef>) => {
    return <input ref={ref} {...props} className={styles['input']} />
  },
)

TextInput.displayName = 'TextInput'

export default TextInput
