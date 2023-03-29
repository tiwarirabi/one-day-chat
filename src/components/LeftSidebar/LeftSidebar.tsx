import React from "react";

import UserSelector from "components/UserSelector/UserSelector";
import ChannelSelector from "components/ChannelSelector/ChannelSelector";

import styles from "./LeftSidebar.module.scss";

const LeftSidebar = (props: any) => {
  return (
    <section className={styles.Container}>
      <UserSelector />
      <ChannelSelector />
    </section>
  );
};

export default LeftSidebar;
