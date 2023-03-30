import { IChannel, IChannelMessages, IMessage, IUser } from "../types";

/**
 * takes an array of messages and returns sorted messages by date.
 * @date 2023-03-30
 * @param {IMessage[]} messages:IMessage[]
 * @returns {IMessage[]}
 */
const sortMessages = (messages: IMessage[]): IMessage[] => {
  return messages.sort((a, b) =>
    new Date(a.datetime) > new Date(b.datetime) ? -1 : 1
  );
};

/**
 * takes an array of messages and returns only non empty messages in them.
 * @date 2023-03-30
 * @param {IMessage[]} messages:IMessage[]
 * @returns {IMessage[]}
 */
const nonEmpty = (messages: IMessage[]): IMessage[] => {
  return messages.filter((m) => m && m.userId);
};

/**
 * takes an array of messages and returns only unique messages in them.
 * @date 2023-03-30
 * @param {IMessage[]} messages:IMessage[]
 * @returns {IMessage[]}
 */
const unique = (messages: IMessage[]): IMessage[] => {
  return messages.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.messageId === value.messageId)
  );
};

/**
 * add formatted date in al array of messages
 * @date 2023-03-30
 * @param {IMessage[]} messages:IMessage[]
 * @returns {IMessage[]}
 */
const addFormattedTime = (messages: IMessage[]): IMessage[] => {
  return messages.map((m) => ({
    ...m,
    timeString: `${new Date(m.datetime)
      .getHours()
      .toString()
      .padStart(2, "0")}:${new Date(m.datetime)
      .getMinutes()
      .toString()
      .padStart(2, "0")}`,
  }));
};

/**
 * sanitize an array of messages.
 * remove empty, duplicate, sort with date and add formatteed time string.
 *
 * @date 2023-03-30
 * @param {IMessage[]} messages:IMessage[]
 * @returns {IMessage[]}
 */

export const sanitizeMessages = (messages: IMessage[]): IMessage[] => {
  return addFormattedTime(sortMessages(unique(nonEmpty(messages))));
};

/**
 * Optimistic Send Messages and update the state before getting the response.
 * 
 * @param {IChannelMessages} channelMessages
 * @param {IChannel} selectedChannel
 * @param {IUser} selectedUser
 * @param {string} message

 * @returns {{ tempMessageId: string; messages: IMessage[] }}
 */
export const optimisticSend = ({
  channelMessages,
  selectedChannel,
  selectedUser,
  message,
}: {
  channelMessages: IChannelMessages;
  selectedChannel: IChannel;
  selectedUser: IUser;
  message: string;
}): { tempMessageId: string; messages: IMessage[] } => {
  const tempMessageId = new Date().getTime().toString();
  const optimisticMessage = {
    sending: true,
    text: message,
    datetime: new Date().toISOString(),
    userId: selectedUser.userId,
    tempMessageId,
    messageId: tempMessageId,
  };

  const thisChannel = channelMessages[selectedChannel.channelId];
  const messages = sanitizeMessages([...thisChannel.data, optimisticMessage]);

  return { tempMessageId, messages };
};

// exported forr test.
export default {
  sanitizeMessages,
};
