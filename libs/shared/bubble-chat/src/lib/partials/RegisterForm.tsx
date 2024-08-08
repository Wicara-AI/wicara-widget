import RegisterButtonSubmit from '../components/forms/RegisterButtonSubmit'
import TextInput from '../components/inputs/TextInput'
import styles from './register-form.module.css'
import { FormGroup, FormLabel } from '../components/inputs/FormGroup'
import { useForm } from '../hooks/useForm'

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

  const handleSubmit = (data: RegisterFormDto) => {
    console.log(data)
  }

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
