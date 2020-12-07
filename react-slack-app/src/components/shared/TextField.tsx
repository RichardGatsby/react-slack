import React from "react";

export interface TextFieldProps {
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
  type?: string;
  id?: string;
  name?: string;
  ref?: any;
}
export default function TextField({
  id,
  name,
  type = "text",
  onChange,
  value,
  disabled,
  ref,
}: TextFieldProps) {
  return (
    <>
      {name && <label htmlFor={id}>{name}:</label>}
      <input
        ref={ref}
        id={id}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        value={value}
      />
    </>
  );
}
