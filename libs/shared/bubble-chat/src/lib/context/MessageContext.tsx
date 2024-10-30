import { createContext, PropsWithChildren, useContext } from "react";

type MessageContext = {
  refetchMessages: () => Promise<void>;
}

const MessageContext = createContext<MessageContext>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refetchMessages: async () => {}
});

type MessageProviderProps = {
  refetchMessages: () => Promise<void>;
}

export function MessageProvider({children, refetchMessages}: PropsWithChildren<MessageProviderProps>) {
  return (
    <MessageContext.Provider value={{refetchMessages}}>
      {children}
    </MessageContext.Provider>
  )
}

export const useMessageContext = () => {
  return useContext<MessageContext>(MessageContext);
}

export default MessageContext;

