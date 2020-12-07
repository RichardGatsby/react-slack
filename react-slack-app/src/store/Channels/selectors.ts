import { createSelector } from "reselect";
import { AppState } from "../../types";

export const selectChannelsState: (s: AppState) => AppState["channels"] = ({
  channels,
}) => channels;

export const selectChannels = createSelector(
  selectChannelsState,
  ({ channels }) => channels
);

export const selectSelectedChannelId = createSelector(
  selectChannelsState,
  ({ selectedChannelId }) => selectedChannelId
);

export const selectChannel = (channelId: number) =>
  createSelector(selectChannelsState, (state) =>
    state.channels.find((channel) => channel.id === channelId)
  );
