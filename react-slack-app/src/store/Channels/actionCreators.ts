import { Message } from "../../types";
import * as actionTypes from "./actionTypes";

export type SelectedChannelIdAction = {
  type: string;
  id: number | null;
};

export function setSelectedChannelId(id: number | null) {
  const action: SelectedChannelIdAction = {
    type: actionTypes.SET_SELECTED_CHANNEL_ID,
    id,
  };
  return action;
}

export type AddMessageAction = {
  type: string;
  message: Message;
};

export function addMessage(message: Message) {
  const action: AddMessageAction = {
    type: actionTypes.ADD_MESSAGE,
    message,
  };
  return action;
}

export type ChannelsActionTypes = SelectedChannelIdAction | AddMessageAction;
