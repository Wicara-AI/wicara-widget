import { MessageProps } from "../../configs/messageConfig";
import { TextMessage as TextMessageType } from "../../types/message";

export default function TextMessage({data}: MessageProps<TextMessageType>) {
  return (
    <div>
      <p>{data.text.body}</p>
    </div>
  )
}
