import { createContext, useState } from "react";
import { Theme } from "../types/theme";

export type RootContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const RootContext = createContext<RootContextType | undefined>(undefined);

interface RootProviderProps {
  children: React.ReactNode;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const RootProvider = ({ children, theme, setTheme }: RootProviderProps) => {

  return <RootContext.Provider value={{ theme, setTheme }}>{children}</RootContext.Provider>;
}
