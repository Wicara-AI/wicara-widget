import {
  OutboundMessage,
  OutboundMessageReceiver,
  OutboundMessageSender,
  OutboundTextMessage,
  OutboundImageMessage,
  OutboundVideoMessage,
  OutboundAudioMessage,
  OutboundDocumentMessage,
  OutboundInteractiveListMessage,
  OutboundUnsupportedMessage,
  OutboundInteractiveQuickReplyMessage,
  OutboundMediaObject,
} from "../types/outboundMessage";

interface RequiredMessageFields {
  context?: {
    messageId: string;
  };
  type: OutboundMessage['type'];
}

export class OutboundMessageBuilder {
  private message: Partial<RequiredMessageFields> = {};

  // Context setter
  setContext(messageId: string): OutboundMessageBuilder {
    this.message.context = { messageId };
    return this;
  }

  // Media object helper
  private createMediaObject(mediaContent: string, caption?: string): OutboundMediaObject {
    if (mediaContent.startsWith('http://') || mediaContent.startsWith('https://')) {
      return { link: mediaContent, caption };
    }
    return { id: mediaContent, caption };
  }

  // Message type setters
  setTextMessage(body: string, previewUrl = false): OutboundMessageBuilder {
    this.message = {
      ...this.message,
      type: 'text',
      text: {
        body,
        previewUrl
      }
    } as OutboundTextMessage;
    return this;
  }

  setImageMessage(imageContent: string, caption?: string): OutboundMessageBuilder {
    this.message = {
      ...this.message,
      type: 'image',
      image: this.createMediaObject(imageContent, caption)
    } as OutboundImageMessage;
    return this;
  }

  setVideoMessage(videoContent: string, caption?: string): OutboundMessageBuilder {
    this.message = {
      ...this.message,
      type: 'video',
      video: this.createMediaObject(videoContent, caption)
    } as OutboundVideoMessage;
    return this;
  }

  setAudioMessage(audioContent: string, caption?: string): OutboundMessageBuilder {
    this.message = {
      ...this.message,
      type: 'audio',
      audio: this.createMediaObject(audioContent, caption)
    } as OutboundAudioMessage;
    return this;
  }

  setDocumentMessage(documentContent: string, caption?: string): OutboundMessageBuilder {
    this.message = {
      ...this.message,
      type: 'document',
      document: this.createMediaObject(documentContent, caption)
    } as OutboundDocumentMessage;
    return this;
  }

  setInteractiveListMessage(items: { text: string }[]): OutboundMessageBuilder {
    this.message = {
      ...this.message,
      type: 'interactive',
      interactive: {
        type: 'list',
        list: items.map(item => ({
          type: 'reply',
          text: item.text
        }))
      }
    } as OutboundInteractiveListMessage;
    return this;
  }

  setUnsupportedMessage(text: string): OutboundMessageBuilder {
    this.message = {
      ...this.message,
      type: 'interactive',
      interactive: {
        type: 'unsupported',
        unsupported: {
          text
        }
      }
    } as OutboundUnsupportedMessage;
    return this;
  }

  setInteractiveQuickReplyMessage(buttons: { text: string }[]): OutboundMessageBuilder {
    this.message = {
      ...this.message,
      type: 'interactive',
      interactive: {
        type: 'quick_reply',
        buttons: buttons.map(button => ({
          type: 'reply',
          text: button.text
        }))
      }
    } as OutboundInteractiveQuickReplyMessage;
    return this;
  }

  private validateRequiredFields(): void {
    const requiredFields: (keyof RequiredMessageFields)[] = [
      'type',
    ];

    const missingFields = requiredFields.filter(
      field => !this.message[field]
    );

    if (missingFields.length > 0) {
      throw new Error(
        `Missing required fields: ${missingFields.join(', ')}`
      );
    }
  }

  build(): OutboundMessage {
    this.validateRequiredFields();
    return this.message as OutboundMessage;
  }
}
