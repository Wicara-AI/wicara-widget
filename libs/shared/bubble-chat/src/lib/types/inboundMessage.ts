import { InboundInteractiveType, InboundMessageType } from "../constants/inboundMessage";

export const SenderModel = {
  Customer: 'customer',
  User: 'user',
  Bot: 'bot',
  System: 'system',
} as const;

export type SenderModel =
  (typeof SenderModel)[keyof typeof SenderModel];

export type InboundInitMessage = {
  id: string;
  from: string;
  model: SenderModel;
  replyId: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  type: InboundMessageType;
};

export type InboundMessage = InboundInitMessage & (
  | InboundTextMessage
  | InboundImageMessage
  | InboundAudioMessage
  | InboundDocumentMessage
  | InboundVideoMessage
  | InboundInteractiveListMessage

);

export type InboundMediaObject = {
  caption: string | undefined;
} & (
  | {
      link: string;
    }
  | {
      id: string;
    }
);

export type InboundTextMessage = InboundInitMessage & {
  type: Extract<InboundMessageType, 'text'>;
  text: {
    body: string;
    previewUrl: boolean;
  };
};

export type InboundImageMessage = InboundInitMessage & {
  type: Extract<InboundMessageType, 'image'>;
  image: InboundMediaObject;
};

export type InboundAudioMessage = InboundInitMessage & {
  type: Extract<InboundMessageType, 'audio'>;
  audio: InboundMediaObject;
};

export type InboundDocumentMessage = InboundInitMessage & {
  type: Extract<InboundMessageType, 'document'>;
  document: InboundMediaObject;
};

export type InboundVideoMessage = InboundInitMessage & {
  type: Extract<InboundMessageType, 'video'>;
  video: InboundMediaObject;
};

export type InboundInitInteractiveMessage<T> = {
  type: Extract<InboundMessageType, 'interactive'>;
  interactive: T;
};

export type InboundInteractiveListMessage = InboundInitMessage & InboundInitInteractiveMessage<{
  type: Extract<InboundInteractiveType, 'list'>;
  list: {
    type: 'reply';
    text: string;
  }[];
}>;

export type InboundUnsupportedMessage = InboundInitMessage & InboundInitInteractiveMessage<{
  type: Extract<InboundMessageType, 'unsupported'>;
  unsupported: {
    text: string;
  };
}>;

export type InboundInteractiveButtonMessage =  InboundInitMessage & InboundInitInteractiveMessage<{
  type: Extract<InboundInteractiveType, 'button'>;
  buttons: {
    type: 'list-button';
    button: string;
  }[];
}>;

export type InboundInteractiveCarouselMessage = InboundInitMessage & InboundInitInteractiveMessage<{
  type: Extract<InboundInteractiveType, 'carousel'>;
  carousel: {
    imageUrl: string;
    title: string;
    description: string;
  }[];
}>;
