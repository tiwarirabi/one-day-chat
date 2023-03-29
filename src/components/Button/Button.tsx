import React from "react";
import styles from "./Button.module.scss";

const Button = (props: any) => {
  const { onClick, children } = props;
  return (
    <button className={styles.Button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
