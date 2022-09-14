import { useState } from "react";
import { dateParser } from "../../../utils/utils";
import styles from "./checkin.module.scss";

const CheckIn = () => {
  const [date, setDate] = useState(new Date(Date.now()));
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{dateParser(date)}</h1>
      </div>
      <div className={styles.checkContainer}>
        <button className={styles.pushable} disabled>
          <span className={styles.shadow}></span>
          <span className={styles.edge}></span>
          <span className={styles.front}>I'm Awake !</span>
        </button>
        
      </div>
    </div>
  );
};
export default CheckIn;
