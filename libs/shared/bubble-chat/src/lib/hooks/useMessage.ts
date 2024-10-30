import { useCallback, useEffect, useState } from 'react'
import { InboundMessage } from '../types/inboundMessage'
import { GetMessageRequest, getMessages } from '../utilities/api'
import { ApiHeaders } from '../utilities/baseApi'
import { useSocket } from './useSocket'

interface UseMessagesProps {
  apiHeaders: ApiHeaders
  room: string
}

interface UseMessagesReturn {
  messages: InboundMessage[]
  isLoading: boolean
  error: Error | null
  clearMessages: () => void
  refetchMessages: () => Promise<void>
}

type NewMessageProps = {
  room: string
  message: InboundMessage & { timestamp: Date }
}

const sortMessagesByDate = (
  messages: (InboundMessage & { timestamp: Date })[],
) => {
  return messages.sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)
    return dateA.getTime() - dateB.getTime()
  })
}

export const useMessages = ({
  apiHeaders,
  room,
}: UseMessagesProps): UseMessagesReturn => {
  // Initialize socket connection
  const { socket, isConnected, emit, connect, disconnect } = useSocket({
    url: 'ws://localhost:3000',
    query: {
      room,
    },
  })

  const eventName = 'newMessage'

  const [messages, setMessages] = useState<
    (InboundMessage & { timestamp: Date })[]
  >([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const params: GetMessageRequest = {
    page: 1,
    limit: 10,
  }

  // Initial fetch of messages
  const loadMessages = useCallback(async () => {
    try {
      const signal = new AbortController().signal
      setIsLoading(true)
      setError(null)
      const historicalMessages = await getMessages(params, apiHeaders, signal)

      // Convert string dates to Date objects if needed
      const formattedMessages = historicalMessages.map((msg) => ({
        ...msg,
        timestamp: new Date(msg.createdAt),
      }))

      setMessages(sortMessagesByDate(formattedMessages))
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to fetch messages'),
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Load initial messages
  useEffect(() => {
    loadMessages()
  }, [loadMessages])

  // Socket message handler
  useEffect(() => {
    if (!socket) return

    const handleNewMessage = (newMessage: NewMessageProps) => {
      console.log('newMessage', newMessage)
      console.log('messages', messages)

      setMessages((prevMessages) => {
        // Check if message already exists to prevent duplicates
        const messageExists = prevMessages.some(
          (msg) => msg.id === newMessage.message.id,
        )
        if (messageExists) return prevMessages

        // Ensure timestamp is a Date object
        const formattedMessage = {
          ...newMessage.message,
          timestamp: new Date(newMessage.message.createdAt),
        }

        return sortMessagesByDate([...prevMessages, formattedMessage])
      })
    }

    socket.on(eventName, handleNewMessage)

    return () => {
      socket.off(eventName, handleNewMessage)
    }
  }, [socket, eventName])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  const refetchMessages = useCallback(async () => {
    await loadMessages()
  }, [loadMessages])

  return {
    messages,
    isLoading,
    error,
    clearMessages,
    refetchMessages,
  }
}
