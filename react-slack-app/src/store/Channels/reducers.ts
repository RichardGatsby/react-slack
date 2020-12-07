import { ChannelsState } from "../../types";
import {
  ChannelsActionTypes,
  SelectedChannelIdAction,
  AddMessageAction,
} from "./actionCreators";
import * as actionTypes from "./actionTypes";


//TODO: make mock API for channels
const initialState: ChannelsState = {
  channels: [
    { name: "General", id: 0, messages: [] },
    { name: "Development", id: 1, messages: [] },
    { name: "General", id: 2, messages: [] },
  ],
  selectedChannelId: null,
};

const reducer = (
  state: ChannelsState = initialState,
  action: ChannelsActionTypes
): ChannelsState => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_CHANNEL_ID:
      return {
        ...state,
        selectedChannelId: (action as SelectedChannelIdAction).id,
      };
    case actionTypes.ADD_MESSAGE: {
      const message = (action as AddMessageAction).message;
      const channels = state.channels.map((channel) => {
        if (channel.id === message.channelId) {
          channel.messages.push(message);
        }
        return channel;
      });

      return {
        ...state,
        channels,
      };
    }
  }
  return state;
};

export default reducer;
