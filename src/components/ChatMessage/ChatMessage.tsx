import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faSpinner,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./ChatMessage.module.scss";

const Status = (props: any) => {
  const { sending, error, isSent } = props;

  if (!isSent) return null;

  if (sending) {
    return (
      <section
        className={`${styles.MessageSentStatus} ${styles.MessageSentStatusSending}`}
      >
        <FontAwesomeIcon icon={faSpinner} spin={true} />
        <span>Sending</span>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className={`${styles.MessageSentStatus} ${styles.MessageSentStatusError}`}
      >
        <FontAwesomeIcon icon={faTimesCircle} />
        <span>Error</span>
      </section>
    );
  }

  return (
    <section
      className={`${styles.MessageSentStatus} ${styles.MessageSentStatusSuccess}`}
    >
      <FontAwesomeIcon icon={faCheckCircle} />
      <span>Sent</span>
    </section>
  );
};

const ChatMessage = (props: any) => {
  const { user, message } = props;

  const { text, userId, timeString, sending, error } = message;

  const isSent = userId === user;

  let containerClassName = styles.Container;
  let messageClassName = styles.Message;

  if (isSent) {
    containerClassName = `${containerClassName} ${styles.ContainerRight}`;
    messageClassName = `${messageClassName} ${styles.MessageRight}`;
  } else {
    containerClassName = `${containerClassName} ${styles.ContainerLeft}`;
    messageClassName = `${messageClassName} ${styles.MessageLeft}`;
  }

  if (!isSent && (sending || error)) return null;

  return (
    <section className={containerClassName}>
      <section className={styles.SenderInfo}>
        <img
          className={styles.SenderImage}
          src={`https://angular-test-backend-yc4c5cvnnq-an.a.run.app/${userId}.png`}
          alt={userId}
        />
        <span className={styles.SenderName}>{userId}</span>
      </section>
      <section className={styles.MessageBlock}>
        <section className={messageClassName}>
          <section
            className={`${styles.MessageContainer} ${
              error ? styles.MessageContainerWithError : ""
            }`}
          >
            {text}
          </section>
          <section className={styles.StatusTimeContainer}>
            <Status isSent={isSent} sending={sending} error={error} />
            <section className={styles.MessageTime}>{timeString}</section>
          </section>
        </section>
      </section>
    </section>
  );
};

export default ChatMessage;
