import { ChannelsState } from "../../types";
import {
  ChannelsActionTypes,
  SelectedChannelIdAction,
  AddMessageAction,
  SetChannelsAction,
} from "./actions";
import * as actionTypes from "./actionTypes";

const initialState: ChannelsState = {
  channels: [],
  selectedChannelId: null,
  messages: [],
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

      return {
        ...state,
        messages: [...state.messages, message],
      };
    }
    case actionTypes.SET_CHANNELS: {
      const channels = (action as SetChannelsAction).channels;
      return {
        ...state,
        channels,
      };
    }
  }
  return state;
};

export default reducer;
