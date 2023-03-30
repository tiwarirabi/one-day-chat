import React from "react";
import { Link } from "react-router-dom";
import { withChat } from "store/Chat";

import styles from "./ChannelSelector.module.scss";

const ChannelSelector = (props: any) => {
  const { channels, selectedChannel } = props.chat;

  return (
    <section className={styles.ChannelSelectorContainer}>
      <p className={styles.SectionTitle}>Channels</p>
      <ul className={styles.ChannelSelectorList}>
        {channels.map((channel: any) => (
            <li key={channel.channelId}>
            <Link
              className={
                channel.channelId === selectedChannel.channelId
                  ? styles.SelectedLink
                  : ""
              }
              to={channel.channelId}
            >
              {channel.channelId} Channel
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default withChat(ChannelSelector);
