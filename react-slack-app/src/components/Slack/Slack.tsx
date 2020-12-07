import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setSelectedChannelId } from "../../store/Channels/actionCreators";
import {
  selectSelectedChannelId,
} from "../../store/Channels/selectors";
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
    <div style={{ display: "flex"}}>
      <div style={{ width: "10%", background: "#3F0E40", color:"#BCABBC" }}>
        <ChannelList
          selectedChannelId={selectedChannelId}
          onChannelClick={(id: number) => dispatch(setSelectedChannelId(id))}
        ></ChannelList>
      </div>
      <div style={{ width: "90%" }}>
        {selectedChannelId !== null && <Chat channelId={selectedChannelId} />}
      </div>
    </div>
  );
}
