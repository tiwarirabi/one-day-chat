import { gql, useMutation } from "@apollo/client";
import { IChannel, IUser } from "types";

const SEND_MESSAGE = gql`
  mutation MessagePost(
    $channelId: ChannelId!
    $text: String!
    $userId: UserId!
  ) {
    MessagePost(channelId: $channelId, text: $text, userId: $userId) {
      messageId
      text
      datetime
      userId
    }
  }
`;

const useSendMessage = () => {
  const [send, { loading, error, data }] = useMutation(SEND_MESSAGE);

  const fetch = (
    selectedChannel: IChannel,
    selectedUser: IUser,
    text: string
  ) => {
    return send({
      variables: {
        channelId: selectedChannel.channelId,
        userId: selectedUser.userId,
        text,
      },
    }).then((result: any) => {
      return result.data.MessagePost;
    });
  };

  return { fetch, loading, error, data };
};

export default useSendMessage;
