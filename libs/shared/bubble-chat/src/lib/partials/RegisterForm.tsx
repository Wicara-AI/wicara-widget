import { useState } from "react";
import RegisterButtonSubmit from "../components/forms/RegisterButtonSubmit";
import TextInput from "../components/inputs/TextInput";

interface RegisterFormDto {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const [inputState, setInputState] = useState<RegisterFormDto>({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = () => {
    console.log(inputState);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput name="email" type="text" />
        <RegisterButtonSubmit type="submit">Register</RegisterButtonSubmit>
    </form>
  );
}
