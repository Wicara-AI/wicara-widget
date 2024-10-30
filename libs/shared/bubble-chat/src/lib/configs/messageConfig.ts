import { FunctionComponent } from 'react'
import TextMessage from '../components/messages/TextMessage'
import { InboundMessage } from '../types/inboundMessage'
import { InboundMessageType } from '../constants/inboundMessage'

type MessageConfig = {
  type: InboundMessageType
  Component: FunctionComponent<MessageProps<InboundMessage>>
}

export type MessageProps<T> = {
  type: InboundMessageType
  data: T
}

export const messageConfig: MessageConfig[] = [
  {
    type: InboundMessageType.TEXT,
    Component: TextMessage as FunctionComponent<MessageProps<InboundMessage>>,
  },
]
