import { useState, createContext } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormValues = Record<string, any>

type Name<T> = T extends string ? T : keyof T
type Value<T> = T[keyof T]

export type SetValue<T> = (name: Name<T>, value: Value<T>) => void

export type HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => void

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HandleSubmit= (callback: (values: any) => void) => (e: React.FormEvent) => void

export type Reset = () => void

export type UseForm<T> = {
  values: T;
  handleChange: HandleChange;
  setValue: SetValue<T>;
  handleSubmit: HandleSubmit;
  reset: Reset;
}

export type UseFormOptions<T> = {
  initialValues: T
}

export function useForm<T extends FormValues>({
  initialValues,
}: UseFormOptions<T>): UseForm<T> {
  const [values, setValues] = useState<T>(initialValues)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const setValue = (name: Name<T>, value: Value<T>) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (callback: (values: T) => void) => (e: React.FormEvent) => {
    e.preventDefault()
    callback(values)
  }

  const reset = () => {
    setValues(initialValues)
  }

  return {
    values,
    handleChange,
    setValue,
    handleSubmit,
    reset,
  }
}

export const useFormContext = <T extends FormValues>() => {
  return {} as UseForm<T>
}

export const formContext = createContext({
  values: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleChange: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setValue: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleSubmit: () => () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  reset: () => {},
})

export const FormProvider = formContext.Provider
