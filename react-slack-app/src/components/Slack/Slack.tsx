import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  fetchChannels,
  setSelectedChannelId,
} from "../../store/Channels/actions";
import {
  selectChannels,
  selectSelectedChannelId,
} from "../../store/Channels/selectors";
import { selectUser } from "../../store/User/selectors";
import ChannelList from "./ChannelList";
import Chat from "./Chat";

export default function Slack() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const channels = useSelector(selectChannels);
  const selectedChannelId = useSelector(selectSelectedChannelId);
  const channel = channels.find((row) => row.id === selectedChannelId);
  if (user === null) {
    history.push("/login");
  }
  useEffect(() => {
    if (user) {
      dispatch(fetchChannels);
    }
  }, []);
  return (
    <StyledContainer>
      <ChannelsContainer>
        <ChannelList
          channels={channels}
          selectedChannelId={selectedChannelId}
          onChannelClick={(id: number) => dispatch(setSelectedChannelId(id))}
        ></ChannelList>
      </ChannelsContainer>
      <ChatContainer>{channel && <Chat channel={channel} />}</ChatContainer>
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  display: flex;
`;
const ChannelsContainer = styled.div`
  width: 10%;
  background-color: #3f0e40;
  color: #bcabbc;
`;
const ChatContainer = styled.div`
  width: 90%;
`;
