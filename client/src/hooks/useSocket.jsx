import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';

const useSocket = (serverPath) => {
  const socket = useMemo(
    () =>
      io.connect(serverPath, {
        transports: ['websocket'],
      }),
    [serverPath]
  );

  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setIsOnline(false);
    });
  }, [socket]);

  return {
    socket,
    isOnline,
  };
};

export default useSocket;
