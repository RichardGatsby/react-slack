import React from "react";
import styled from "styled-components";
import { Message } from "../../types";

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  return (
    <StyledContainer>
      <StyledUserCircle>{message.userName.charAt(0)}</StyledUserCircle>
      <StyledContentArea>
        <div style={{ width: "100%" }}>
          <span
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              paddingRight: 4,
            }}
          >
            {message.userName}
          </span>
          <span style={{ color: "gray", fontSize: "0.8rem" }}>
            {new Date(message.timeStamp as string).toLocaleTimeString(
              undefined,
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            )}
          </span>
        </div>
        {message.content}
      </StyledContentArea>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
  border-bottom: 1px solid #d3d3d3;
`;
const StyledUserCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  background-color: red;
  border-radius: 150px;
  margin-right: 8px;
`;
const StyledContentArea = styled.div`
`
