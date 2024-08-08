import { useEffect, useRef, useState } from "react";
import { RootProvider } from "./context/RootContext";
import { Theme } from "./types/theme";
import { getThemeFromClient } from "./utils/api";
import BubbleButton, { BubbleButtonRef } from "./components/BubbleButton";
import BubbleDialog, { BubbleDialogButtonClose, BubbleDialogContent, BubbleDialogHeader, BubbleDialogRef, BubbleDialogTitle } from "./components/BubbleDialog";
import RegisterForm from "./partials/RegisterForm";

export interface BubbleChatProps {
  appKey: string;
  clientId: string;
  clientSecret: string;
};

export function BubbleChat({appKey, clientId, clientSecret}: BubbleChatProps) {
  const sessionId = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, "$1");
  const [isOpenDialogChat, setIsOpenDialogChat] = useState(false);
  const dialogChatRef  = useRef<BubbleDialogRef>(null);
  const buttonChatRef = useRef<BubbleButtonRef>(null);

  const [theme, setTheme] = useState<Theme>({
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    button: {
      variant: 'icon',
    },
    modal: {
      variant: 'basic',
    },
  });

  const showDialog = () => {
    if (dialogChatRef?.current && buttonChatRef?.current) {
      console.log('kesini 2');
      const buttonRect = buttonChatRef.current.getBoundingClientRect();
      // the dialog will be placed on the top right of the button and still visible on the screen
      dialogChatRef.current.style.top = `${buttonRect.top - 200}px`;
      dialogChatRef.current.style.left = `${buttonRect.right - 310}px`;
      console.log('kesini');
      setIsOpenDialogChat((open) => !open);
    }
  };

  const closeDialog = () => {
    setIsOpenDialogChat(false);
  };

  // i want to get theme from api and handle it using useeffect with signal to prevent memory leak
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      setTheme(await getThemeFromClient({apiKey: appKey, clientId, clientSecret, sessionId: '', signal}));
    })();

    return () => {
      controller.abort();
      setTheme({
        primaryColor: '#000000',
        secondaryColor: '#ffffff',
        button: {
          variant: 'icon',
        },
        modal: {
          variant: 'basic',
        },
      });
    };
  }, [appKey, clientId, clientSecret]);

  return (
    <div>
      <RootProvider theme={theme} setTheme={setTheme}>
        <BubbleButton ref={buttonChatRef} onClick={showDialog}>
          <span>Chat</span>
        </BubbleButton>
        <BubbleDialog ref={dialogChatRef} open={isOpenDialogChat}>
          <BubbleDialogHeader>
            <BubbleDialogTitle>Wicara</BubbleDialogTitle>
          </BubbleDialogHeader>
          <BubbleDialogContent>
            <RegisterForm />
            <BubbleDialogButtonClose onClick={closeDialog}>
              Close
            </BubbleDialogButtonClose>
          </BubbleDialogContent>
        </BubbleDialog>
      </RootProvider>
    </div>
  );
}
