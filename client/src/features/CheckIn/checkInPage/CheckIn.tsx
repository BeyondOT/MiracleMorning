import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { dateParser } from "../../../utils/utils";
import { getUser } from "../checkInSlice";
import styles from "./checkin.module.scss";

const CheckIn = () => {
  const [date] = useState(new Date(Date.now()));
  const { user, loading } = useAppSelector((state) => state.checkIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (loading) {
    return <div>laoding</div>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{dateParser(date)}</h1>
        <h2> You are on a {user.streak.currentStreak} streak </h2>
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
