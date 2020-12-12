//STATE TYPES
export interface AppState {
  user: UserState;
  channels: ChannelsState;
}

export type UserState = {
  user: User | null;
};

export type ChannelsState = {
  channels: Channel[];
  messages: Message[];
  selectedChannelId: number | null;
};


//USER RELATED TYPES
export interface User {
  id: number;
  userName: string;
}


//CHANNEL & MESSAGE TYPES
export interface Message {
  channelId: number;
  userName: string;
  content: string;
  timeStamp: string;
}

export interface Channel {
  id: number;
  name: string;
}
