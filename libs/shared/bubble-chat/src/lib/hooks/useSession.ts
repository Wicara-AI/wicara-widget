export const useSession = () => {
  const setSessionToCookie = (session: string) => {
    document.cookie = `session=${session}; path=/`
  }

  const getSessionFromCookie = () => {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)session\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    )
  }

  const generateSession = () => {
    return crypto.randomUUID();
  }

  const generateSessionIfNotAvailable = () => {
    const session = getSessionFromCookie()
    if (!session) {
      const newSession = generateSession()
      setSessionToCookie(newSession)
      return newSession
    }
  }

  return {
    setSessionToCookie,
    getSessionFromCookie,
    generateSession,
    generateSessionIfNotAvailable,
  }
}
