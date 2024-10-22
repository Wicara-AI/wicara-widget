import { messageConfig, MessageProps } from "../configs/messageConfig";
import { Message } from "../types/message";
import CardMessage from "./CardMessage";
import MessageProfile from "./MessageProfile";


export default function ChatMessage({data}: MessageProps<Message>) {
  return (
    <CardMessage>
      <MessageProfile />
      {messageConfig.filter((item) => item.type === data.type).map(({Component, type}) => (
        <Component type={type} data={data} />
      ))}
    </CardMessage>
  )
}
