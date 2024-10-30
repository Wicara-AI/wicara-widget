import { useEffect, useCallback, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { getAuthToken } from '../utilities/authToken';

interface SocketOptions {
  url: string;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
  autoConnect?: boolean;
  query?: Record<string, string>;
}

interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  error: string | null;
  emit: <T>(eventName: string, data: T) => void;
  connect: () => void;
  disconnect: () => void;
}

export const useSocket = ({
  url,
  reconnectionAttempts = 5,
  reconnectionDelay = 1000,
  autoConnect = true,
  query = {},
}: SocketOptions): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socketInstance: Socket = io(url, {
      reconnection: true,
      withCredentials: true,
      reconnectionAttempts,
      reconnectionDelay,
      autoConnect,
      query: {
        authToken: getAuthToken(),
        ...query,
      },
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
      setError(null);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    socketInstance.on('connect_error', (err: Error) => {
      setError(err.message);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, reconnectionAttempts, reconnectionDelay, autoConnect]);

  const emit = useCallback(<T>(eventName: string, data: T): void => {
    if (socket) {
      socket.emit(eventName, data);
    }
  }, [socket]);

  const connect = useCallback((): void => {
    if (socket && !isConnected) {
      socket.connect();
    }
  }, [socket, isConnected]);

  const disconnect = useCallback((): void => {
    if (socket) {
      socket.disconnect();
    }
  }, [socket]);

  return { socket, isConnected, error, emit, connect, disconnect };
};
