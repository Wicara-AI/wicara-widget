import { useState } from "react";

export const useSession = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
};
