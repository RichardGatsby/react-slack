import React from "react";
import { MouseEventHandler } from "react";
import styled from "styled-components";

interface ButtonProps {
  text?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button";
  disabled?: boolean;
}

export default function Button({ text, onClick, disabled, type }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} disabled={disabled} type={type}>
      {text}
    </StyledButton>
  );
}
const StyledButton = styled.button`
  margin: 8px;
  padding: 8px 16px;
  border-radius: 4px;
  background: blue;
  color: white;
  cursor: pointer;
`;
