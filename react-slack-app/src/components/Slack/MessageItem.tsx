import React from "react";
import { Message } from "../../types";

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 16,
        borderBottom: "1px solid #d3d3d3",
      }}
    >
      <div
        style={{
          height: "40px",
          width: "40px",
          backgroundColor: "red",
          borderRadius: "150px",
          marginRight: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {message.userName.charAt(0)}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "90%",
          wordBreak: "break-all"
        }}
      >
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
      </div>
    </div>
  );
}
