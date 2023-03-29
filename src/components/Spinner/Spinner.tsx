import React from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './Spinner.module.scss';

const Spinner = () => { 
    return (<section className={styles.Container}> <FontAwesomeIcon spin icon={faSpinner} /></section>)
}

export default Spinner;