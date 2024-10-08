import { useEffect, useRef, useState } from 'react'
import { RootProvider } from './context/RootContext'
import { Theme } from './types/theme'
import { getThemeFromClient } from './utils/api'
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
  const sessionId = document.cookie.replace(
    /(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  )
  const [isOpenDialogChat, setIsOpenDialogChat] = useState(false)
  const dialogChatRef = useRef<BubbleDialogRef>(null)
  const buttonChatRef = useRef<BubbleButtonRef>(null)
  const session = useSession()

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

  // i want to get theme from api and handle it using useeffect with signal to prevent memory leak
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    ;(async () => {
      setTheme(
        await getThemeFromClient({
          apiKey: appKey,
          clientId,
          clientSecret,
          sessionId: '',
          signal,
        }),
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
  }, [appKey, clientId, clientSecret])

  useEffect(() => {
    session.generateSessionIfNotAvailable()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <RootProvider theme={theme} setTheme={setTheme}>
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
