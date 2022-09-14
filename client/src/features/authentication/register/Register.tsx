import { useState } from "react";
import styles from "./register.module.scss";
const Register = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Pseudo..."
        onChange={(e) => {
          setPseudo(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="E-mail..."
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password..."
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Confirm password..."
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <button>Register</button>
    </div>
  );
};
export default Register;
