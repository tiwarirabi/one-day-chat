import { gql, useLazyQuery } from "@apollo/client";
import { IChannel } from "types";

const FETCH_LATEST_MESSAGES = gql`
  query MessagesFetchLatest($channelId: ChannelId!) {
    MessagesFetchLatest(channelId: $channelId) {
      messageId
      text
      datetime
      userId
    }
  }
`;

const useLatestMessages = () => {
  const [send] = useLazyQuery(FETCH_LATEST_MESSAGES);

  const fetch = (
    selectedChannel: IChannel,
  ) => {
    return send({
      variables: {
        channelId: selectedChannel.channelId,
      },
    }).then((result: any) => {
      if (!result?.data?.MessagesFetchLatest) return [];

      return result.data.MessagesFetchLatest;
    });
  };

  return { fetch };
};


export default useLatestMessages;