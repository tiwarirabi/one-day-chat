import { gql, useLazyQuery } from "@apollo/client";
import { IChannel } from "types";

const FETCH_MORE_MESSAGES = gql`
  query MessagesFetchMore(
    $channelId: ChannelId!
    $messageId: String!
    $old: Boolean!
  ) {
    MessagesFetchMore(channelId: $channelId, messageId: $messageId, old: $old) {
      messageId
      text
      datetime
      userId
    }
  }
`;

const useMoreMessages = () => {
  const [send, { refetch, called }] = useLazyQuery(FETCH_MORE_MESSAGES);

  const fetch = (
    selectedChannel: IChannel,
    messageId: string,
    old: boolean
  ) => {
    const variables = {
      channelId: selectedChannel.channelId,
      messageId,
      old,
    };

    const fetchPromise = called ? refetch(variables) : send({ variables });

    return fetchPromise.then((result: any) => {
      
      if (!result?.data?.MessagesFetchMore) return [];

      return result.data.MessagesFetchMore;
    });
  };

  return { fetch };
  
};


export default useMoreMessages;