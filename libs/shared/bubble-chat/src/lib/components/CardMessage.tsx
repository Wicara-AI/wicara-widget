import { PropsWithChildren } from "react";

export default function CardMessage({children}: PropsWithChildren) {
  return (
    <div>
      {children}
    </div>
  )
}
