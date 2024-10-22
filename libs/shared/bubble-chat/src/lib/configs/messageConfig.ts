import { FunctionComponent } from "react"
import TextMessage from "../components/messages/TextMessage";
import { MessageType } from "../constants/message";
import { Message } from "../types/message";


type MessageConfig = {
  type: MessageType;
  Component: FunctionComponent<MessageProps<Message>>;
};

export type MessageProps<T> = {
  type: MessageType;
  data: T
};

export const messageConfig: MessageConfig[] = [
  {
    type: MessageType.TEXT,
    Component: TextMessage,
  }
];
