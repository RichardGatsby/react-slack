import React, { useRef, useState } from "react";
import styled from "styled-components";

import Button from "../shared/Button";

interface MessagerProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function Messager({ onSend, disabled }: MessagerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [chatInput, setChatInput] = useState("");

  const handleSendMessage = () => {
    onSend(chatInput);
    setChatInput("");
    inputRef.current && inputRef?.current.focus();
  };

  return (
    <StyledContainer>
      <input
        value={chatInput}
        ref={inputRef}
        onChange={(e) => setChatInput(e.target.value)}
      />
      <Button
        text={"send >>"}
        onClick={handleSendMessage}
        disabled={disabled}
        type="button"
      ></Button>
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
`;
