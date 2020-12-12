import React, { useState, useRef, useEffect, useCallback } from "react";
import { Message } from "../../types";

export default function useWebSocket(url: string) {
  const [lastMessage, setlastMessage] = useState<string | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const ws = useRef<WebSocket>();
  useEffect(() => {
    if (!(ws && ws.current && ws.current.readyState === 1)) {
      ws.current = new WebSocket(url);
      ws.current.onopen = () => {
        setConnected(true);
      };
      ws.current.onmessage = (evt) => {
        setlastMessage(evt.data);
      };
      ws.current.onclose = () => {
        setConnected(false);
      };
    }
  }, []);

  const sendMessage = useCallback((message: Message) => {
    if (ws.current && ws.current.readyState === 1) {
      ws.current.send(JSON.stringify(message));
    }
  }, []);
  const close = useCallback(() => {
    if (ws && ws.current) ws.current.close();
  }, []);
  return { connected, lastMessage, sendMessage, close };
}
