import {
  Context,
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
} from 'react'
import { Theme } from '../types/theme'
import { ApiHeaders } from '../utilities/baseApi'

export type RootContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  apiHeaders: ApiHeaders
  activeScreen: string
  setActiveScreen: Dispatch<string>
}

export const RootContext = createContext<RootContextType | undefined>(undefined)

type RootProviderProps = RootContextType

export const RootProvider = ({
  children,
  theme,
  setTheme,
  apiHeaders,
  activeScreen,
  setActiveScreen,
}: PropsWithChildren<RootProviderProps>) => {
  return (
    <RootContext.Provider
      value={{ theme, setTheme, apiHeaders, activeScreen, setActiveScreen }}
    >
      {children}
    </RootContext.Provider>
  )
}

export const useRootContext = () => {
  return useContext<RootContextType>(RootContext as Context<RootContextType>)
}
