import { useState } from "react";
import Login from "../login/Login";
import Register from "../register/Register";
import styles from "./auth.module.scss";
const Auth = () => {
  const [registered, setRegistered] = useState(true);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

      <div className={styles.pick}>
        <span className={!registered ? styles.active : null} onClick={() => setRegistered(false)}>Register</span>
        <span className={registered ? styles.active : null} onClick={() => setRegistered(true)}>Login</span>
      </div>
      <div>
        <span>Welcome !</span>
      </div>
      <div className={styles.formContainer}>
        {registered ? <Login /> : <Register />}
      </div>
      </div>
    </div>
  );
};
export default Auth;
