import RegisterButtonSubmit from '../components/forms/RegisterButtonSubmit'
import TextInput from '../components/inputs/TextInput'
import styles from './register-form.module.css'
import { FormGroup, FormLabel } from '../components/inputs/FormGroup'
import { useForm } from '../hooks/useForm'
import { useEffect, useState } from 'react'
import { registerUser } from '../utilities/api'
import { useSession } from '../hooks/useSession'

interface RegisterFormDto {
  email: string
  name: string
}

export default function RegisterForm() {
  const form = useForm<RegisterFormDto>({
    initialValues: {
      email: '',
      name: '',
    },
  })

  const session = useSession()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (data: RegisterFormDto) => {
    setIsSubmitting(true)
  }

  // request to register user using useEffect hook triggered by handleSubmit implement signal to prevent memory leak
  useEffect(() => {
    if (isSubmitting) {
      setIsSubmitting(false)
      const controller = new AbortController()
      const signal = controller.signal
      ;(async () => {
        const data = await registerUser(
          {
            email: form.values.email,
            name: form.values.name,
          },
          signal,
        )
      })()

      return () => {
        controller.abort()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting])

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className={styles['form-container']}>
        <FormGroup>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextInput
            id="email"
            name="email"
            type="email"
            onChange={(event) => form.setValue('email', event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="name">Nama Lengkap</FormLabel>
          <TextInput
            id="name"
            name="name"
            type="text"
            onChange={(event) => form.setValue('name', event.target.value)}
          />
        </FormGroup>
        <div>
          <RegisterButtonSubmit type="submit">Register</RegisterButtonSubmit>
        </div>
      </div>
    </form>
  )
}
