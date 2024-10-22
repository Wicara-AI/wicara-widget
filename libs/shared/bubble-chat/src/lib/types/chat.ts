export interface AttachmentFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

export interface EmojiData {
  id: string;
  native: string;
  unified: string;
  shortName: string;
  category: string;
}
