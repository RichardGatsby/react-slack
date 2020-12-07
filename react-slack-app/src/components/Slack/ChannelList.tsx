import React from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { selectChannels } from "../../store/Channels/selectors";

interface ChannelListProps {
  // list: Channel[];
  selectedChannelId: number | null;
  onChannelClick: (id: number) => void;
}

export default function ChannelList({
  // list,
  selectedChannelId,
  onChannelClick,
}: ChannelListProps) {
  const channels = useSelector(selectChannels);
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
