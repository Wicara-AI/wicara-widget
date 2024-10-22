import { useEffect, useRef, useState } from 'react'
import { RootProvider } from './context/RootContext'
import { Theme } from './types/theme'
import BubbleButton, { BubbleButtonRef } from './components/BubbleButton'
import BubbleDialog, {
  BubbleDialogButtonClose,
  BubbleDialogContent,
  BubbleDialogHeader,
  BubbleDialogRef,
  BubbleDialogTitle,
} from './components/BubbleDialog'
import { useSession } from './hooks/useSession'
import { getThemeFromClient } from './utilities/api'
import { AuthProvider } from './context/AuthContext'
import { screenConfig } from './configs/screenConfig'
import MustAuthenticatedProvider from './providers/MustAuthenticatedProvider'
import useScreen from './hooks/useScreen'

export interface BubbleChatProps {
  appKey: string;
  clientId: string;
  clientSecret: string;
}

export function BubbleChat({
  appKey,
  clientId,
  clientSecret,
}: BubbleChatProps) {
  const [isOpenDialogChat, setIsOpenDialogChat] = useState(false)
  const dialogChatRef = useRef<BubbleDialogRef>(null)
  const buttonChatRef = useRef<BubbleButtonRef>(null)
  const session = useSession();
  const sessionId = session.getSessionFromCookie();
  const storageScreen = useScreen();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [activeScreen, setActiveScreen] = useState<string>(screenConfig.find((item) => item.root)!.id);

  const [theme, setTheme] = useState<Theme>({
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    button: {
      variant: 'icon',
    },
    modal: {
      variant: 'basic',
    },
  })

  const showDialog = () => {
    setIsOpenDialogChat((open) => !open)
  }

  // set activeScreen when first render if storageLastScreen exists
  // to stay on last seen screen.
  useEffect(() => {
    const storageLastScreen = storageScreen.getActiveScreen();
    if (storageLastScreen !== null && storageLastScreen !== undefined && storageLastScreen !== activeScreen) {
      setActiveScreen(storageLastScreen);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // updating last active screen on localstorage
  useEffect(() => {
    if (activeScreen) {
      storageScreen.setActiveScreen(activeScreen);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[activeScreen]);

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal;
    const getTheme = async () => {
      const theme = await getThemeFromClient({
        apiKey: appKey,
        appId: clientId,
        apiSecret: clientSecret,
        session: sessionId,
      }, signal);

      setTheme(theme);
    }

    getTheme();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appKey, clientId, clientSecret])

  useEffect(() => {
    session.generateSessionIfNotAvailable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <RootProvider theme={theme} setTheme={setTheme} apiHeaders={{
        apiKey: appKey,
        apiSecret: clientSecret,
        appId: clientId,
        session: sessionId,
      }}
      activeScreen={activeScreen}
      setActiveScreen={setActiveScreen}
      >
        <AuthProvider>
          <BubbleButton ref={buttonChatRef} onClick={showDialog}>
            <span>Chat</span>
          </BubbleButton>
          <BubbleDialog ref={dialogChatRef} open={isOpenDialogChat}>
            <BubbleDialogHeader>
              <BubbleDialogTitle>Hubungi Kami</BubbleDialogTitle>
            </BubbleDialogHeader>
            <BubbleDialogContent>
              {
                screenConfig.filter((item) => item.id === activeScreen).map(({screen: Screen, mustAuth}, key: number) => (
                  <div key={key}>
                    {
                      mustAuth ? (
                        <MustAuthenticatedProvider>
                          <Screen />
                        </MustAuthenticatedProvider>
                      ) : (
                        <Screen />
                      )
                    }
                  </div>
                ))
              }
            </BubbleDialogContent>
          </BubbleDialog>
        </AuthProvider>
      </RootProvider>
    </div>
  )
}
