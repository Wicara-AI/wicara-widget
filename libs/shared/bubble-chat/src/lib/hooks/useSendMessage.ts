import { useState, useCallback } from 'react'
import { OutboundMessageBuilder } from '../builders/OutboundMessageBuilder'
import {
  OutboundMessage,
  OutboundMessageReceiver,
  OutboundMessageSender,
  OutboundMediaObject,
} from '../types/outboundMessage'
import { ApiError, ApiHeaders } from '../utilities/baseApi'
import {
  sendMessage as apiSendMessage,
  UploadFileRequest,
} from '../utilities/api'
import { useRootContext } from '../context/RootContext'
import { OutboundMessageType } from '../constants/outboundMessage'
import { FilePreview } from '../types/chat'

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

interface SendMessageOptions {
  replyId?: string
  files?: FilePreview[]
}

interface SendInteractiveOptions extends SendMessageOptions {
  items: { text: string }[]
}

type UseSendMessage = {
  apiHeaders: ApiHeaders
}

export const useSendMessage = ({ apiHeaders }: UseSendMessage) => {
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createMessageBuilder = (
    options: SendMessageOptions,
    replyId?: string,
  ) => {
    const builder = new OutboundMessageBuilder()

    if (replyId) {
      builder.setContext(replyId)
    }

    return builder
  }

  const sendSingleMessage = async (
    messageBuilder: OutboundMessageBuilder,
    apiHeaders: Record<string, string>,
    abortController: AbortController,
  ) => {
    const outboundMessage = messageBuilder.build()
    await apiSendMessage(
      outboundMessage,
      apiHeaders as any,
      abortController.signal,
    )
  }

  const sendMessage = useCallback(
    async (
      content: string,
      type: OutboundMessageType,
      options: SendMessageOptions,
    ) => {
      setSending(true)
      setError(null)

      try {
        const abortController = new AbortController()

        // Handle text messages
        if (type === 'text') {
          const messageBuilder = createMessageBuilder(
            options,
            options.replyId,
          ).setTextMessage(content)
          await sendSingleMessage(messageBuilder, apiHeaders, abortController)
          return
        }

        // Handle media messages
        if (!options.files?.length) {
          throw new Error('No files provided')
        }

        // Send messages sequentially for all files
        for (let i = 0; i < options.files.length; i++) {
          const file = options.files[i]
          const messageBuilder = createMessageBuilder(options, options.replyId)
          const caption = i === 0 ? content : undefined // Only add caption to the first file

          switch (type) {
            case 'image':
              messageBuilder.setImageMessage(file.id, caption)
              break

            case 'video':
              messageBuilder.setVideoMessage(file.id, caption)
              break

            case 'audio':
              messageBuilder.setAudioMessage(file.id, caption)
              break

            case 'document':
              messageBuilder.setDocumentMessage(file.id, caption)
              break

            default:
              throw new Error(`Unsupported message type: ${type}`)
          }

          await sendSingleMessage(messageBuilder, apiHeaders, abortController)
        }
      } catch (err: unknown) {
        let errorMessage = 'Failed to send message'
        if (err instanceof ApiError) {
          errorMessage = err.message
        } else if (err instanceof Error) {
          errorMessage = err.message
        }
        setError(errorMessage)
        throw err
      } finally {
        setSending(false)
      }
    },
    [apiHeaders],
  )

  const sendInteractiveMessage = useCallback(
    async (type: 'list' | 'quick_reply', options: SendInteractiveOptions) => {
      setSending(true)
      setError(null)

      try {
        const messageBuilder = createMessageBuilder(options, options.replyId)

        switch (type) {
          case 'list':
            messageBuilder.setInteractiveListMessage(options.items)
            break

          case 'quick_reply':
            messageBuilder.setInteractiveQuickReplyMessage(options.items)
            break

          default:
            throw new Error(`Unsupported interactive message type: ${type}`)
        }

        const abortController = new AbortController()
        await sendSingleMessage(messageBuilder, apiHeaders, abortController)
      } catch (err: unknown) {
        let errorMessage = 'Failed to send interactive message'
        if (err instanceof ApiError) {
          errorMessage = err.message
        } else if (err instanceof Error) {
          errorMessage = err.message
        }
        setError(errorMessage)
        throw err
      } finally {
        setSending(false)
      }
    },
    [apiHeaders],
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    sending,
    error,
    sendMessage,
    sendInteractiveMessage,
    clearError,
  }
}
