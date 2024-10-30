import { MessageProps } from '../../configs/messageConfig'
import { InboundTextMessage } from '../../types/inboundMessage'

export default function TextMessage({
  data,
}: MessageProps<InboundTextMessage>) {
  return (
    <div>
      <p>{data.text.body}</p>
    </div>
  )
}
