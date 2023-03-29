import React from "react";

import LeftSidebar from "components/LeftSidebar/LeftSidebar";
import ChatContainer from "components/ChatContainer/ChatContainer";

import { withChat } from "store/Chat";
import styles from "./Chat.module.scss";
import Header from "components/Header/Header";

const Chat = () => {
  return (
    <section className={styles.Container}>
      <Header />
      <section className={styles.ContentContainer}>
        <section className={styles.SideBarLayoutContainer}>
          <LeftSidebar />
        </section>
        <section className={styles.ChatLayoutContainer}>
          <ChatContainer />
        </section>
      </section>
    </section>
  );
};

export default withChat(Chat);
