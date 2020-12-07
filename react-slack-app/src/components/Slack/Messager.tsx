import React, { useRef, useState } from "react";

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
    <div style={{ display: "flex", flexDirection: "row", alignItems:"center", padding: 8 }}>
      <input
        value={chatInput}
        ref={inputRef}
        onChange={(e) => setChatInput(e.target.value)}
      />
      <Button
        text={"send >>"}
        onClick={handleSendMessage}
        disabled={disabled}
      ></Button>
    </div>
  );
}
