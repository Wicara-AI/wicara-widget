import {
  OutboundInteractiveType,
  OutboundMessageType,
} from '../constants/outboundMessage'
import { ParticipantModel } from './participant'

export type OutboundMessageSender = {
  id: string
  model: ParticipantModel
}

export type OutboundMessageReceiver = {
  id: string
  model: ParticipantModel
}

export type OutboundMediaObject = {
  caption: string | undefined
} & (
  | {
      link: string
    }
  | {
      id: string
    }
)

export type InitOutboundMessage = {
  context?: {
    messageId: string
  }
  type: OutboundMessageType
}

export type OutboundMessage = InitOutboundMessage &
  (
    | OutboundTextMessage
    | OutboundImageMessage
    | OutboundVideoMessage
    | OutboundAudioMessage
    | OutboundDocumentMessage
    | OutboundInteractiveListMessage
    | OutboundUnsupportedMessage
    | OutboundInteractiveQuickReplyMessage
  )

export type OutboundTextMessage = InitOutboundMessage & {
  type: Extract<OutboundMessageType, 'text'>
  text: {
    body: string
    previewUrl: boolean
  }
}

export type OutboundImageMessage = InitOutboundMessage & {
  type: Extract<OutboundMessageType, 'image'>
  image: OutboundMediaObject
}

export type OutboundAudioMessage = InitOutboundMessage & {
  type: Extract<OutboundMessageType, 'audio'>
  audio: OutboundMediaObject
}

export type OutboundDocumentMessage = InitOutboundMessage & {
  type: Extract<OutboundMessageType, 'document'>
  document: OutboundMediaObject
}

export type OutboundVideoMessage = InitOutboundMessage & {
  type: Extract<OutboundMessageType, 'video'>
  video: OutboundMediaObject
}

export type InitOutboundInteractiveMessage<T> = InitOutboundMessage & {
  type: Extract<OutboundMessageType, 'interactive'>
  interactive: T
}

export type OutboundInteractiveListMessage = InitOutboundMessage &
  InitOutboundInteractiveMessage<{
    type: Extract<OutboundInteractiveType, 'list'>
    list: {
      type: 'reply'
      text: string
    }[]
  }>

export type OutboundUnsupportedMessage = InitOutboundMessage &
  InitOutboundInteractiveMessage<{
    type: Extract<OutboundMessageType, 'unsupported'>
    unsupported: {
      text: string
    }
  }>

export type OutboundInteractiveQuickReplyMessage = InitOutboundMessage &
  InitOutboundInteractiveMessage<{
    type: Extract<OutboundInteractiveType, 'quick_reply'>
    buttons: {
      type: 'reply'
      text: string
    }[]
  }>
