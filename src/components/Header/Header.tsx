import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.scss";

const Header = (props: any) => {
  return (
    <section className={styles.TitleContainer}>
      <h1>1 day chat App</h1>
      <p>
        <span className={styles.WarningIcon}>
          <FontAwesomeIcon icon={faWarning} />
        </span>
        All messages will be deleted at every 00:00 UTC
      </p>
    </section>
  );
};

export default Header;
