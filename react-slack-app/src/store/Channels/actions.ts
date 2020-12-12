import { Channel, Message } from "../../types";
import * as actionTypes from "./actionTypes";

export type SelectedChannelIdAction = {
  type: "SET_SELECTED_CHANNEL_ID";
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

export type SetChannelIdAction = {
  type: "SET_SELECTED_CHANNEL_ID";
  id: number | null;
};

export type SetChannelsAction = {
  type: "SET_CHANNELS";
  channels: Channel[];
};
export function setChannels(channels: Channel[]) {
  const action: SetChannelsAction = {
    type: actionTypes.SET_CHANNELS,
    channels,
  };
  return action;
}

export async function fetchChannels(dispatch: any, getState: any) {
  var response = await (await fetch("http://localhost:8999/channels"))
    .json()
    .catch((error) => console.log("error: ", error));
  dispatch({ type: actionTypes.SET_CHANNELS, channels: response });
}

export type ChannelsActionTypes =
  | SelectedChannelIdAction
  | AddMessageAction
  | SetChannelsAction;
