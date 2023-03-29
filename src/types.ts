export interface IUser {
  userId: string;
}

export interface IChannel {
  channelId: string;
}

export interface IMessage {
  messageId: string;
  text: string;
  datetime: string;
  userId: string;
  sending?: boolean,
  error?: boolean,
  tempMessageId?: string,
  timeString?:string,
}

interface IChannelMessage {
    fetchingOld: boolean;
    fetchingNew: boolean;
    data: IMessage[];
}

export interface IChannelMessages {
  [channelId: string]: IChannelMessage;
}

export interface IFetchMoreMessageParamaters {
  old: boolean;
}

export interface IChatStore {
  users: IUser[];
  selectedUser: IUser;
  channels: IChannel[];
  selectedChannel: IChannel;
  channelMessages: IChannelMessages;
  message: string;
  selectUser: (userId: string) => void;
  selectChannel: (channelId: string) => void;
  updateMessage: (message: string) => void;
  fetchMessages: (variables: IFetchMoreMessageParamaters) => void;
  sendMessage: () => void;
}
