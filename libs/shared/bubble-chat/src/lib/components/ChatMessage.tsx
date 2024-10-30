import { messageConfig } from '../configs/messageConfig'
import { InboundMessage } from '../types/inboundMessage'
import CardMessage from './CardMessage'
import MessageProfile from './MessageProfile'

type ChatMessageProps = {
  data: InboundMessage
}

export default function ChatMessage({ data }: ChatMessageProps) {
  return (
    <CardMessage>
      <MessageProfile />
      {messageConfig
        .filter((item) => item.type === data.type)
        .map(({ Component, type }, key) => (
          <Component type={type} data={data} key={key} />
        ))}
    </CardMessage>
  )
}
