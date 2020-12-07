import React from "react";
import { useSelector } from "react-redux";
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
          <div
            style={{
              padding: 8,
              textDecoration:
                channel.id === selectedChannelId ? "underline" : "none",
              cursor: "pointer",
            }}
            key={channel.id}
            onClick={() => onChannelClick(channel.id)}
          >
            #{channel.name}
          </div>
        );
      })}
    </>
  );
}
