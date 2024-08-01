interface BubbleChatProps {
  container: HTMLElement;
  appKey: string;
  clientId: string;
  clientSecret: string;
};

export function bubbleChat({container}: BubbleChatProps) {
  // get session id from cookie via window object
  const sessionId = document.cookie ? document.cookie.split('; ').find(row => row.startsWith('sessionId'))?.split('=')[1] : '';

  
}
