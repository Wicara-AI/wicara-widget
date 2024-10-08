import { createContext, useContext } from "react";
import { Theme } from "../types/theme";
import { ApiHeaders } from "../utilities/baseApi";

export type RootContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  apiHeaders: ApiHeaders;
};

export const RootContext = createContext<RootContextType | undefined>(undefined);

interface RootProviderProps {
  children: React.ReactNode;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  apiHeaders: ApiHeaders;
}

export const RootProvider = ({ children, theme, setTheme, apiHeaders }: RootProviderProps) => {

  return <RootContext.Provider value={{ theme, setTheme, apiHeaders }}>{children}</RootContext.Provider>;
}

export const useRootContext = () => {
  return useContext<RootContextType | undefined>(RootContext);
}
