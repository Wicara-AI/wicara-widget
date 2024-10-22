import { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import { getMessages } from "../utilities/api";
import { Message } from "../types/message";
import { useRootContext } from "../context/RootContext";
import ChatMessage from "../components/ChatMessage";
import ChatForm from "../components/forms/ChatForm";

export default function Chat() {
  const rootContext = useRootContext();
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (message: string) => {
    console.log(message);
  };

  useEffect(() => {
    const handleGetMessages = async () => {
      const abortController = new AbortController();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const responseData = await getMessages({page: 1, limit: 10}, rootContext!.apiHeaders, abortController.signal);
      setMessages(responseData);
    }

    handleGetMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <ChatContainer>
      {
        messages.map((message, key) => (
          <ChatMessage key={key} type={message.type} data={message} />
        ))
      }
      <ChatForm  onSendMessage={handleSendMessage}
        placeholder="Type your message..."
        maxRows={5} />
    </ChatContainer>
  )
}
