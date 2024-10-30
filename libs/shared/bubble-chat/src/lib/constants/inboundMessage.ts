export const InboundMessageType = {
  INTERACTIVE: 'interactive',
  TEMPLATE: 'template',
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  DOCUMENT: 'document',
  UNSUPPORTED: 'unsupported',
} as const;

export type InboundMessageType =
  (typeof InboundMessageType)[keyof typeof InboundMessageType];

export const InboundInteractiveType = {
  BUTTON: 'button',
  CAROUSEL: 'carousel',
  LIST: 'list',
} as const;

export type InboundInteractiveType =
  (typeof InboundInteractiveType)[keyof typeof InboundInteractiveType];

  export const InboundMessageStatus = {
    PENDING: 'pending',
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
  } as const;

  export type InboundMessageStatus =
    (typeof InboundMessageStatus)[keyof typeof InboundMessageStatus];
