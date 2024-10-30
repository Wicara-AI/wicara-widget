export const setAuthToken = (jwtToken: string) => {
  localStorage.setItem('wicara-token', jwtToken)
}

export const getAuthToken = () => {
  return localStorage.getItem('wicara-token')
}
