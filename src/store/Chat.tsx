import React, { createContext, useEffect, useState } from "react";

import useLatestMessages from "graphql/useLatestMessages";
import useMoreMessages from "graphql/useMoreMessages";
import useSendMessage from "graphql/useSendMessage";

import staticData from "./data.json";
import { optimisticSend, sanitizeMessages } from "./helpers";
import {
  IChannel,
  IChannelMessages,
  IChatStore,
  IFetchMoreMessageParamaters,
  IMessage,
} from "../types";

const initialChatStore: IChatStore = {
  users: staticData.users,
  selectedUser: { userId: "" },
  channels: staticData.channels,
  selectedChannel: { channelId: "" },
  channelMessages: {},
  message: "",

  selectUser: () => {},
  selectChannel: () => {},
  updateMessage: () => {},
  fetchMessages: () => {},
  sendMessage: () => {},
};

export const ChatContext: React.Context<IChatStore> =
  createContext(initialChatStore);

export const ChatProvider = (props: any) => {
  const { children, channelId } = props;

  const channelIdFromUrl = staticData.channels.find(
    (c: IChannel) => c.channelId === channelId
  );
  const [selectedChannel, setSelectedChannel] = useState(
    channelIdFromUrl || staticData.channels[0]
  );

  useEffect(() => {
    const channelIdFromUrl = staticData.channels.find(
      (c: IChannel) => c.channelId === channelId
    );
    if (channelIdFromUrl) setSelectedChannel(channelIdFromUrl);
  }, [channelId]);

  const [selectedUser, setSelectedUser] = useState(staticData.users[0]);
  const [channelMessages, setChannelMessages] = useState<IChannelMessages>({});

  const { fetch: getLatestMessages } = useLatestMessages();
  const { fetch: getMoreMessages } = useMoreMessages();
  const { fetch: sendMessageMutation } = useSendMessage();

  // message is persisted in localstorage.
  const [message, setMessage] = useState(localStorage.getItem("message") || "");
  useEffect(() => {
    localStorage.setItem("message", message);
  }, [message]);

  useEffect(() => {
    updateChannelFetching(selectedChannel, true, false);

    let latestMessages: IMessage[] = [];
    getLatestMessages(selectedChannel)
      .then((messages: IMessage[]) => {
        latestMessages = messages;
      })
      .catch((error: any) => {
        latestMessages = channelMessages[selectedChannel.channelId]?.data || [];
        console.error(error);
      })
      .finally(() => {
        updateChannelMessageData(selectedChannel, latestMessages);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChannel]);

  const updateChannelMessageData = (
    selectedChannel: IChannel,
    messageData: IMessage[]
  ) => {
    setChannelMessages({
      ...channelMessages,
      [selectedChannel.channelId]: {
        data: sanitizeMessages(messageData),
        fetchingOld: false,
        fetchingNew: false,
      },
    });
  };

  const updateChannelFetching = (
    selectedChannel: IChannel,
    fetchingNew: boolean,
    fetchingOld: boolean
  ) => {
    setChannelMessages({
      ...channelMessages,
      [selectedChannel.channelId]: {
        data: channelMessages[selectedChannel.channelId]?.data || [],
        fetchingOld,
        fetchingNew,
      },
    });
  };

  const sendMessage = () => {
    const { tempMessageId, messages: optimisticChannelMessages } =
      optimisticSend({
        channelMessages,
        selectedChannel,
        selectedUser,
        message,
      });
    updateChannelMessageData(selectedChannel, optimisticChannelMessages);

    sendMessageMutation(selectedChannel, selectedUser, message)
      .then((data: IMessage) => {
        const currentMessages = optimisticChannelMessages.filter(
          (m) => m.tempMessageId !== tempMessageId
        );

        updateChannelMessageData(selectedChannel, [...currentMessages, data]);
      })
      .catch((error: any) => {
        console.error(error);
        const messages = optimisticChannelMessages.map((m) => {
          if (m.tempMessageId === tempMessageId) {
            return { ...m, sending: false, error: true };
          } else {
            return m;
          }
        });

        updateChannelMessageData(selectedChannel, messages);
      })
      .finally(() => {
        setMessage("");
      });
  };

  const { fetchingNew, fetchingOld } =
    channelMessages[selectedChannel.channelId] || {};

  useEffect(() => {
    let message: IMessage = {
      messageId: "",
      text: "",
      datetime: new Date().toISOString(),
      userId: "",
    };

    if (!channelMessages[selectedChannel.channelId]) return;

    const messagesInThisChannel =
      channelMessages[selectedChannel.channelId].data;
    if (fetchingNew) {
      message =
        messagesInThisChannel.find((m) => !m.sending && !m.error) || message;
    }

    if (fetchingOld) {
      message = messagesInThisChannel.slice(-1)[0];
    }

    if (!message.messageId) return;

    getMoreMessages(selectedChannel, message.messageId, fetchingOld)
      .then((messages: IMessage[]) => {
        const thisChannelMessages =
          channelMessages[selectedChannel.channelId].data;
        updateChannelMessageData(selectedChannel, [
          ...thisChannelMessages,
          ...messages,
        ]);
      })
      .catch((error: any) => {
        console.error(error);
        updateChannelFetching(selectedChannel, false, false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchingNew, fetchingOld]);

  const fetchMessages = (options: IFetchMoreMessageParamaters) => {
    if (options.old === true) {
      updateChannelFetching(selectedChannel, false, true);
    } else {
      updateChannelFetching(selectedChannel, true, false);
    }
  };

  const value = {
    fetchMessages,
    sendMessage,

    selectedUser,
    selectedChannel,

    users: staticData.users,
    channels: staticData.channels,

    channelMessages,
    message,

    selectChannel: (channelId: string) => setSelectedChannel({ channelId }),
    selectUser: (userId: string) => setSelectedUser({ userId }),
    updateMessage: (message: string) => setMessage(message),
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const withChat = (Child: any) => (props: any) =>
  (
    <ChatContext.Consumer>
      {(context) => <Child {...props} chat={context} />}
    </ChatContext.Consumer>
  );
