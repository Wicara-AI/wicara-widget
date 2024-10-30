export const setRoom = (conversationId: string, channelAccountId: string) => {
  localStorage.setItem('wicara-room', `conversation-${conversationId}-${channelAccountId}`);
}

export const getRoom = () => {
  return localStorage.getItem('wicara-room');
}
