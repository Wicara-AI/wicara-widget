import { BubbleChat } from '@wicara/shared/bubble-chat';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

declare global {
  interface Window {
    BubbleChat: typeof BubbleChat;
    renderBubbleChat: (elementId: string, config: RenderBubbleChatConfig) => void;
  }
}

window.BubbleChat = BubbleChat;

// Function to render the component in a specific DOM element with a specified color
export interface RenderBubbleChatConfig {
  clientId: string;
  clientSecret: string;
  appKey: string;
}

window.renderBubbleChat = (elementId: string, config: RenderBubbleChatConfig) => {
  const container = document.getElementById(elementId);
  if (!container) {
    console.error(`Element with id ${elementId} not found`);
    return;
  }
  const root = createRoot(container);
  root.render(createElement(BubbleChat, { appKey: config.appKey, clientId: config.clientId, clientSecret: config.clientSecret }));
};
