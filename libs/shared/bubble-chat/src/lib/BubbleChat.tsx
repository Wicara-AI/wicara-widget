import { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import { RootProvider } from "./context/RootContext";
import { Theme } from "./types/theme";
import { getThemeFromClient } from "./utils/api";
import BubbleButton from "./components/BubbleButton";
import BubbleDialog, { BubbleDialogButtonClose, BubbleDialogContent, BubbleDialogHeader } from "./components/BubbleDialog";

export interface BubbleChatProps {
  appKey: string;
  clientId: string;
  clientSecret: string;
};

export function BubbleChat({appKey, clientId, clientSecret}: BubbleChatProps) {
  const sessionId = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, "$1");
  const bubbleDialogRef = useRef<HTMLDialogElement>(null);
  const bubbleButtonRef = useRef<HTMLButtonElement>(null);

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
    if (bubbleDialogRef.current && bubbleButtonRef.current) {
      const buttonRect = bubbleButtonRef.current.getBoundingClientRect();
      bubbleDialogRef.current.style.top = `${buttonRect.top + bubbleDialogRef.current.offsetHeight - 160}px`;
      bubbleDialogRef.current.style.left = `${buttonRect.left - bubbleDialogRef.current.offsetWidth - 120}px`;
      bubbleDialogRef.current.showModal();
    }
  };

  const closeDialog = () => {
    if (bubbleDialogRef.current) bubbleDialogRef.current.close();
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

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (bubbleDialogRef.current && !bubbleDialogRef.current.contains(event.target) && event.target !== bubbleButtonRef.current) {
        event.stopPropagation();
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div>
      <RootProvider theme={theme} setTheme={setTheme}>
        <BubbleButton ref={bubbleButtonRef} onClick={showDialog}>
          <span>Chat</span>
        </BubbleButton>
        <BubbleDialog ref={bubbleDialogRef}>
          <BubbleDialog.Header>
            <span>Chat</span>
          </BubbleDialog.Header>
          <BubbleDialog.Content>
            <span>Chat Content</span>
            <BubbleDialogButtonClose onClick={closeDialog}>
              Close
            </BubbleDialogButtonClose>
          </BubbleDialog.Content>
        </BubbleDialog>
      </RootProvider>
    </div>
  );
}
