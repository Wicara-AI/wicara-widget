import { FunctionComponent } from "react";
import Register from "../screens/Register";
import Chat from "../screens/Chat";

export type ScreenConfig = {
  id: string;
  screen: FunctionComponent;
  root?: boolean;
  mustAuth: boolean;
}

export const screen = {
  REGISTER: 'register',
  CHAT: 'chat',
} as const;

export const screenConfig: ScreenConfig[] = [
  {
    id: screen.REGISTER,
    root: true,
    mustAuth: false,
    screen: Register,
  },
  {
    id: screen.CHAT,
    mustAuth: true,
    screen: Chat,
  },
]
