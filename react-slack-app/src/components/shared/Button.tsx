import React from "react";
import { MouseEventHandler } from "react";

interface ButtonProps {
  text?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button";
  disabled?: boolean;
}

export default function Button({ text, onClick, disabled, type }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        margin: 8,
        padding: "8px 16px",
        borderRadius: 4,
        background: "blue",
        color: "white",
        cursor: "pointer",
      }}
      type={type}
    >
      {text}
    </button>
  );
}
