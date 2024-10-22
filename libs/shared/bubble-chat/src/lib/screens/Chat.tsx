import { useAuth } from "../context/AuthContext"

export default function Chat() {
  const { user } = useAuth();

  console.log(user);
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum assumenda ab inventore excepturi ullam rerum magni ipsam. Quidem voluptates vitae provident ut debitis laudantium, ipsam perspiciatis similique ratione velit minima.
    </div>
  )
}
