import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import styles from "./ChatContainer.module.scss";
import ChatMessage from "components/ChatMessage/ChatMessage";
import Spinner from "components/Spinner/Spinner";
import { withChat } from "store/Chat";
import Button from "components/Button/Button";

const ChatContainer = (props: any) => {
  const {
    channelMessages,
    selectedChannel,
    selectedUser,
    fetchMessages,
    message,
    updateMessage,
    sendMessage,
  } = props.chat;

  const { channelId } = selectedChannel;
  const { userId } = selectedUser;

  const { data, fetchingNew, fetchingOld } = channelMessages[channelId] || {};
  const [showReadMore, setShowReadMore] = useState(false);
  const messagesContainerRef = useRef<HTMLInputElement>(null);
  const messageTextArea = useRef<HTMLTextAreaElement>(null);
  const [scrollPosition, setScrollPosition] = useState({
    bottom: false,
    top: false,
  });

  useEffect(() => {
    if (!data || !data.length || fetchingNew || fetchingOld) return;

    if (scrollPosition.bottom) {
      fetchMessages({
        old: false,
      });
    } else if (scrollPosition.top) {
      fetchMessages({
        old: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPosition.bottom, scrollPosition.top]);

  const onScroll = (e: any) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;

    // This is reversed, because we have reversed the flex container by setting flex direction to column-reverse
    // see: ChatContainer.module.scss -> .MessagesContainer
    const top =
      Math.floor(scrollHeight - Math.abs(scrollTop) - clientHeight) === 0;
    const bottom = Math.floor(Math.abs(scrollTop)) === 0;

    if (bottom) {
      setShowReadMore(false);
    } else if (!showReadMore) {
      setShowReadMore(true);
    }

    if (bottom) {
      setScrollPosition({ bottom: true, top: false });
    } else if (top) {
      setScrollPosition({ bottom: false, top: true });
    } else {
      setScrollPosition({ bottom: false, top: false });
    }
  };

  // This is reversed, because we have reversed the flex container by setting flex direction to column-reverse
  // see: ChatContainer.module.scss -> .MessagesContainer
  const scrollToBottom = (e: any) =>
    messagesContainerRef?.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

  const _sendMessage = (e: any) => {
    messageTextArea?.current?.focus();

    return sendMessage(e);
  };

  return (
    <section className={styles.Container}>
      <h1 className={styles.ContainerTitle}>{channelId} Channel</h1>
      <section className={styles.ChatContainer}>
        <section
          className={styles.MessagesContainer}
          ref={messagesContainerRef}
          onScroll={onScroll}
        >
          {fetchingNew ? <Spinner /> : null}
          {data?.length ? (
            data.map((message: any) => (
              <ChatMessage message={message} user={userId} />
            ))
          ) : !data?.length && !fetchingNew && !fetchingOld ? (
            <div className={styles.NoMessages}>
              No Messages!<span>Send your first message.</span>
            </div>
          ) : null}
          {fetchingOld ? <Spinner /> : null}
        </section>
        {showReadMore ? (
          <button className={styles.ReadMoreButton} onClick={scrollToBottom}>
            Read Latest <FontAwesomeIcon icon={faArrowDown} />
          </button>
        ) : null}
      </section>
      <section className={styles.SendContainer}>
        <section className={styles.SendUser}>
          <img
            className={styles.UserImage}
            src={`https://angular-test-backend-yc4c5cvnnq-an.a.run.app/${selectedUser.userId}.png`}
            alt={selectedUser.userId}
          />
        </section>
        <textarea
          autoFocus={true}
          ref={messageTextArea}
          placeholder="Say Hi!"
          rows={3}
          value={message}
          onChange={(e: any) => updateMessage(e.target.value)}
        />
        <Button onClick={_sendMessage}>
          Send <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </section>
    </section>
  );
};

export default withChat(ChatContainer);
