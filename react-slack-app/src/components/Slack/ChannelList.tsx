import React from "react";
import styled, { css } from "styled-components";

import { Channel } from "../../types";

interface ChannelListProps {
  channels: Channel[];
  selectedChannelId: number | null;
  onChannelClick: (id: number) => void;
}

export default function ChannelList({
  channels,
  selectedChannelId,
  onChannelClick,
}: ChannelListProps) {
  console.log("ChannelList render");
  return (
    <>
      {channels.map((channel) => {
        return (
          <StyledChannelItem
            isSelected={channel.id === selectedChannelId}
            key={channel.id}
            onClick={() => onChannelClick(channel.id)}
          >
            #{channel.name}
          </StyledChannelItem>
        );
      })}
    </>
  );
}
const StyledChannelItem = styled.div<{ isSelected: boolean }>`
  padding: 8px;
  cursor: pointer;
  ${(props) => {
    return css`
      text-decoration: ${props.isSelected ? "underline" : "none"};
    `;
  }}
`;
