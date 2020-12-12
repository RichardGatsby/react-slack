import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addMessage } from "../../store/Channels/actions";
import { selectMessages } from "../../store/Channels/selectors";
import { selectUser } from "../../store/User/selectors";
import { Channel, Message } from "../../types";
import useWebSocket from "../../utils/hooks/useWebSocket";
import MessageItem from "./MessageItem";
import Messager from "./Messager";

interface ChatProps {
  channel: Channel;
}

export default function Chat({ channel }: ChatProps) {
  const { connected, lastMessage, sendMessage, close } = useWebSocket(
    "ws://localhost:8999/"
  );
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages).filter(
    (row) => row.channelId === channel.id
  );
  const user = useSelector(selectUser);
  const messageListRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (msg: string) => {
    if (user) {
      const message: Message = {
        content: msg,
        channelId: channel.id,
        userName: user.userName,
        timeStamp: new Date().toISOString(),
      };
      dispatch(addMessage(message));
      sendMessage(message);
    }
  };

  useEffect(() => {
    //Cleanup
    return () => {
      close();
    };
    //
  }, []);

  useEffect(() => {
    if (lastMessage) {
      const message: Message = JSON.parse(lastMessage);
      if (message.content) {
        dispatch(addMessage(message));
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (messageListRef && messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <StyledContainer>
      <StyledChatHeader>Chatting on channel #{channel.name}</StyledChatHeader>
      <StyledChat ref={messageListRef}>
        {messages.map((message) => {
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
