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
import RegisterForm from './partials/RegisterForm'
import { useSession } from './hooks/useSession'
import { getThemeFromClient } from './utilities/api'

export interface BubbleChatProps {
  appKey: string
  clientId: string
  clientSecret: string
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

  const closeDialog = () => {
    setIsOpenDialogChat(false)
  }

  console.log(appKey, clientId, clientSecret, sessionId)

  // i want to get theme from api and handle it using useeffect with signal to prevent memory leak
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    ;(async () => {
      setTheme(
        await getThemeFromClient({
          apiKey: appKey,
          appId: clientId,
          apiSecret: clientSecret,
          session: sessionId,
        }, signal),
      )
    })()

    return () => {
      controller.abort()
      setTheme({
        primaryColor: '#000000',
        secondaryColor: '#ffffff',
        button: {
          variant: 'icon',
        },
        modal: {
          variant: 'basic',
        },
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appKey, clientId, clientSecret])

  useEffect(() => {
    session.generateSessionIfNotAvailable()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <RootProvider theme={theme} setTheme={setTheme} apiHeaders={{
        apiKey: appKey,
        apiSecret: clientSecret,
        appId: clientId,
        session: sessionId,
      }}>
        <BubbleButton ref={buttonChatRef} onClick={showDialog}>
          <span>Chat</span>
        </BubbleButton>
        <BubbleDialog ref={dialogChatRef} open={isOpenDialogChat}>
          <BubbleDialogHeader>
            <BubbleDialogTitle>Hubungi Kami</BubbleDialogTitle>
          </BubbleDialogHeader>
          <BubbleDialogContent>
            <RegisterForm />
          </BubbleDialogContent>
        </BubbleDialog>
      </RootProvider>
    </div>
  )
}
