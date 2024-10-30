import { InboundMessageType } from "./inboundMessage";

export const OutboundMessageType = InboundMessageType;

export type OutboundMessageType =
  (typeof OutboundMessageType)[keyof typeof OutboundMessageType];

export const OutboundInteractiveType = {
  QUICK_REPLY: 'quick_reply',
} as const;

export type OutboundInteractiveType =
  (typeof OutboundInteractiveType)[keyof typeof OutboundInteractiveType];
