// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BubbleChat } from '@wicara/shared/bubble-chat';
import NxWelcome from './nx-welcome';

const apiKey = import.meta.env.VITE_APP_API_KEY;
const appId = import.meta.env.VITE_APP_APP_ID;
const apiSecret = import.meta.env.VITE_APP_API_SECRET;

console.log(apiSecret);

export function App() {
  return (
    <div>
      <NxWelcome title="example-bubble-chat" />
      <BubbleChat appKey={apiKey} clientId={appId} clientSecret={apiSecret}  />
    </div>
  );
}

export default App;
