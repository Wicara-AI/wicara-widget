import { useEffect, useState } from "react";
import BubbleButton from "./components/BubbleButton";
import { RootProvider } from "./context/RootContext";
import { Theme } from "./types/theme";
import { getThemeFromClient } from "./utils/api";

interface BubbleChatProps {
  appKey: string;
  clientId: string;
  clientSecret: string;
};

export default function BubbleChat({appKey, clientId, clientSecret}: BubbleChatProps) {

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
      <RootProvider  theme={theme} setTheme={setTheme}>
        <BubbleButton />
      </RootProvider>
    </div>
  );
}
