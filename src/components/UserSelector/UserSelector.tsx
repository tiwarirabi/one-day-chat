import React from "react";
import { withChat } from "store/Chat";

import styles from "./UserSelector.module.scss";

const UserSelector = (props: any) => {
  const { users, selectedUser, selectUser } = props.chat;
  return (
    <section className={styles.Container}>
      <p className={styles.SectionTitle}>Choose your user</p>
      <section className={styles.UserSelectorContainer}>
        {users.map((user: any) => (
          <section
            onClick={() => selectUser(user.userId)}
            className={`${styles.SingleUserContainer} ${
              user.userId === selectedUser.userId
                ? styles.SelectedUserContainer
                : ""
            }`}
          >
            <img
              className={styles.UserImage}
              src={`https://angular-test-backend-yc4c5cvnnq-an.a.run.app/${user.userId}.png`}
              alt={user.userId}
            />
            <div>{user.userId}</div>
          </section>
        ))}
      </section>
    </section>
  );
};

export default withChat(UserSelector);
