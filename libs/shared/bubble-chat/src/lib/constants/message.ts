export const MessageType = {
  INTERACTIVE: 'interactive',
  TEMPLATE: 'template',
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  DOCUMENT: 'document',
  UNSUPPORTED: 'unsupported',
} as const;

export type MessageType =
  (typeof MessageType)[keyof typeof MessageType];

export const InteractiveType = {
  BUTTON: 'button',
  CAROUSEL: 'carousel',
  LIST: 'list',
} as const;

export type InteractiveType =
  (typeof InteractiveType)[keyof typeof InteractiveType];
