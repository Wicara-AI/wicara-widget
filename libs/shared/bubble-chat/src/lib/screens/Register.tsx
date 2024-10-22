/* eslint-disable @typescript-eslint/no-non-null-assertion */
import RegisterButtonSubmit from '../components/forms/RegisterButtonSubmit'
import TextInput from '../components/inputs/TextInput'
import styles from './register.module.css'
import { FormGroup, FormLabel } from '../components/inputs/FormGroup'
import { useForm } from '../hooks/useForm'
import { useEffect, useState } from 'react'
import { registerUser } from '../utilities/api'
import { useRootContext } from '../context/RootContext'
import { screen } from '../configs/screenConfig'

interface RegisterFormDto {
  email: string;
  name: string;
  phone: string;
}

export default function Register() {
  const form = useForm<RegisterFormDto>({
    initialValues: {
      email: '',
      name: '',
      phone: '',
    },
  });

  const rootContext = useRootContext();

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (data: RegisterFormDto) => {
    setIsSubmitting(true);
  }

  // request to register user using useEffect hook triggered by handleSubmit implement signal to prevent memory leak
  useEffect(() => {
    if (isSubmitting) {
      setIsSubmitting(false)
      const controller = new AbortController()
      const signal = controller.signal;
      const handleRegister = async () => {
        try {
          await registerUser(
            {
              email: form.values.email,
              name: form.values.name,
              session: rootContext!.apiHeaders.session,
              phone: form.values.phone,
            },
            rootContext!.apiHeaders,
            signal,
          );

          rootContext?.setActiveScreen(screen.CHAT);

        } catch (error: unknown) {
          console.error('register failed');
        }

      }

      handleRegister();
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
        <FormGroup>
          <FormLabel htmlFor="phone">Nomor Telpon</FormLabel>
          <TextInput
            id="phone"
            name="phone"
            type="text"
            onChange={(event) => form.setValue('phone', event.target.value)}
          />
        </FormGroup>
        <div>
          <RegisterButtonSubmit type="submit">Register</RegisterButtonSubmit>
        </div>
      </div>
    </form>
  )
}
