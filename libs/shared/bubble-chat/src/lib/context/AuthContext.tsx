/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, Dispatch, PropsWithChildren, useContext, useState } from "react"

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type Auth = {
  user?: User | null;
  setUser: Dispatch<User>;
}

const authContext = createContext<Auth>({
  user: null,
  setUser: () => {},
});

export function AuthProvider({children}: PropsWithChildren) {
  const [user, setUser] = useState<User | null>();

  return (
   <authContext.Provider value={{user, setUser}}>
    {children}
   </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext<Auth>(authContext);
}

