import { BubbleChat as SharedBubbleChat } from '@wicara/shared/bubble-chat';

export interface BubbleChatProps {
    appKey: string;
    clientId: string;
    clientSecret: string;
}

export function BubbleChat({appKey, clientId, clientSecret}: BubbleChatProps) {
  return <SharedBubbleChat  appKey={appKey} clientId={clientId} clientSecret={clientSecret} />;
}
