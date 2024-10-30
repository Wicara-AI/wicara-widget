import { useCallback, useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import { getMessages } from "../utilities/api";
import { InboundMessage } from "../types/inboundMessage";
import { useRootContext } from "../context/RootContext";
import ChatMessage from "../components/ChatMessage";
import ChatForm from "../components/forms/ChatForm";
import { useMessages } from "../hooks/useMessage";
import { getRoom } from "../utilities/room";
import { ChatGridContainer, ChatGridItem } from "../components/ChatGrid";
import {useAuth} from '../context/AuthContext';

export default function Chat() {
  const {apiHeaders} = useRootContext();
  const {user} = useAuth()
  // Initialize messages with both API and socket updates
  const { messages, isLoading, error, refetchMessages } = useMessages({
    apiHeaders,
    room: getRoom() as string,
  });

  return (
    <ChatContainer>
      <ChatGridContainer>
        {
          messages.map((message, key) => (
            <ChatGridItem key={key} position={message.from === user!.id ? "right" : 'left'}>
              {console.log('message', message.from === user.id)}
              <ChatMessage data={message} />
            </ChatGridItem>
          ))
        }
      </ChatGridContainer>
      <ChatForm />
    </ChatContainer>
  )
}
