import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { UserLogin } from "../auth.types";
import { signIn } from "../authSlice";
import styles from "./login.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: UserLogin = { email, password };
    await dispatch(signIn(data));
    navigate("/");
  };

  return (
    <form className={styles.container} onSubmit={handleLogin}>
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
      <button type="submit">Login</button>
      <NavLink to={"/"}>Test</NavLink>
    </form>
  );
};
export default Login;
