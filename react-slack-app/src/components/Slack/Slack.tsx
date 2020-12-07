import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { setSelectedChannelId } from "../../store/Channels/actionCreators";
import { selectSelectedChannelId } from "../../store/Channels/selectors";
import { selectUser } from "../../store/User/selectors";
import ChannelList from "./ChannelList";
import Chat from "./Chat";

export default function Slack() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const selectedChannelId = useSelector(selectSelectedChannelId);
  if (user === null) {
    history.push("/login");
  }
  return (
    <StyledContainer>
      <ChannelsContainer>
        <ChannelList
          selectedChannelId={selectedChannelId}
          onChannelClick={(id: number) => dispatch(setSelectedChannelId(id))}
        ></ChannelList>
      </ChannelsContainer>
      <ChatContainer>
        {selectedChannelId !== null && <Chat channelId={selectedChannelId} />}
      </ChatContainer>
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
