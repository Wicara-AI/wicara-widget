// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BubbleChat } from '@wicara/shared/bubble-chat';
import styles from './app.module.css';

import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div>
      <NxWelcome title="example-bubble-chat" />
      <BubbleChat appKey='12312312' clientId='123123' clientSecret='123812739'  />
    </div>
  );
}

export default App;
