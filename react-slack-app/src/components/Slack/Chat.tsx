import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store/Channels/actionCreators";
import { selectChannel, selectChannels } from "../../store/Channels/selectors";
import { selectUser } from "../../store/User/selectors";
import { Message } from "../../types";
import MessageItem from "./MessageItem";
import Messager from "./Messager";

interface ChatProps {
  channelId: number;
}
//TODO: Make app configuratin and get it from there
const ENDPOINT = "ws://localhost:8999/";

export default function Chat({ channelId }: ChatProps) {
  const ws = useRef<WebSocket>();

  const dispatch = useDispatch();
  const channels = useSelector(selectChannels);
  const user = useSelector(selectUser);
  const messageListRef = useRef<HTMLDivElement>(null);
  const [connected, setConnected] = useState(false);

  const channel = channels.find((row) => row.id === channelId);

  const handleSendMessage = (msg: string) => {
    if (channel && user) {
      const message: Message = {
        content: msg,
        channelId: channel.id,
        userName: user.userName,
        timeStamp: new Date().toISOString()
      };
      dispatch(addMessage(message));

      if (ws && ws.current) ws.current.send(JSON.stringify(message));
    }
  };

  //TODO: refactor the WS connection as a Redux store middleware
  // or use a ContextProvider that handles it to whole APP
  useEffect(() => {
    if (!(ws && ws.current && ws.current.readyState === 1)) {
      ws.current = new WebSocket(ENDPOINT);

      ws.current.onopen = () => {
        alert("Connected to ChatHub");
        setConnected(true);
      };

      ws.current.onmessage = (evt) => {
        console.log("message received: ", evt.data);
        const message: Message = JSON.parse(evt.data);
        if (message.content) {
          dispatch(addMessage(message));
        }
      };

      ws.current.onclose = () => {
        setConnected(false);
        alert("Disconnected from ChatHub");
      };
    }
    //Cleanup
    return () => {
      if (ws && ws.current) ws.current.close();
    };
    //
  }, []);

  useEffect(() => {
    if (messageListRef && messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [channel?.messages.length]);

  if (!channel) {
    return <div>Could not find the channel</div>;
  }
  console.log("render chat");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "90vh" }}>
      <div
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          padding: 8,
          borderBottom: "1px solid #d3d3d3",
        }}
      >
        Chatting on channel #{channel.name}
      </div>
      <div
        ref={messageListRef}
        style={{
          height: "90%",
          border: "1px solid  #d3d3d3",
          overflowY: "scroll",
          background: "white",
        }}
      >
        {channel.messages.map((message) => {
          return <MessageItem key={message.timeStamp} message={message} />;
        })}
      </div>
      <Messager
        onSend={(value) => handleSendMessage(value)}
        disabled={!connected}
      ></Messager>
    </div>
  );
}
