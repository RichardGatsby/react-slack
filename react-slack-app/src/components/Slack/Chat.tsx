import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addMessage } from "../../store/Channels/actionCreators";
import { selectChannels } from "../../store/Channels/selectors";
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
        timeStamp: new Date().toISOString(),
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

  return (
    <StyledContainer>
      <StyledChatHeader>Chatting on channel #{channel.name}</StyledChatHeader>
      <StyledChat ref={messageListRef}>
        {channel.messages.map((message) => {
          return <MessageItem key={message.timeStamp} message={message} />;
        })}
      </StyledChat>
      <Messager
        onSend={(value) => handleSendMessage(value)}
        disabled={!connected}
      ></Messager>
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
`;
const StyledChatHeader = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #d3d3d3;
`;
const StyledChat = styled.div`
  height: 90%;
  border: 1px solid #d3d3d3;
  overflow-y: scroll;
`;
