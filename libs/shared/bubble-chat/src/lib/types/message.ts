import { InteractiveType, MessageType } from "../constants/message";

export const SenderModel = {
  Customer: 'customer',
  User: 'user',
  Bot: 'bot',
  System: 'system',
} as const;

export type SenderModel =
  (typeof SenderModel)[keyof typeof SenderModel];

export type Message = {
  id: string;
  from: string;
  model: SenderModel;
  replyId: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  type: MessageType;
} & (
  | TextMessage
  | ImageMessage
  | AudioMessage
  | DocumentMessage
  | VideoMessage
  | InteractiveMessage
);

export type MediaObject = {
  caption: string | undefined;
} & (
  | {
      link: string;
    }
  | {
      id: string;
    }
);

export type TextMessage = {
  type: Extract<MessageType, 'text'>;
  text: {
    body: string;
    previewUrl: boolean;
  };
};

export type ImageMessage = {
  type: Extract<MessageType, 'image'>;
  image: MediaObject;
};

export type AudioMessage = {
  type: Extract<MessageType, 'audio'>;
  audio: MediaObject;
};

export type DocumentMessage = {
  type: Extract<MessageType, 'document'>;
  document: MediaObject;
};

export type VideoMessage = {
  type: Extract<MessageType, 'video'>;
  video: MediaObject;
};

export type InteractiveMessage = {
  type: Extract<MessageType, 'interactive'>;
  interactive:
    | InteractiveListMessage
    | InteractiveButtonMessage
    | InteractiveCarouselMessage;
};

export type InteractiveListMessage = {
  type: Extract<InteractiveType, 'list'>;
  list: {
    type: 'reply';
    text: string;
  }[];
};

export type UnsupportedMessage = {
  type: Extract<MessageType, 'unsupported'>;
  unsupported: {
    text: string;
  };
};

export type InteractiveButtonMessage = {
  type: Extract<InteractiveType, 'button'>;
  buttons: {
    type: 'list-button';
    button: string;
  }[];
};

export type InteractiveCarouselMessage = {
  type: Extract<InteractiveType, 'carousel'>;
  carousel: {
    imageUrl: string;
    title: string;
    description: string;
  }[];
};
