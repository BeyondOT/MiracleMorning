import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { UserLogin, UserLoginErrors } from "../auth.types";
import { signIn } from "../authSlice";
import styles from "./login.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const checkErrors = () => {
    if (email === "") {
      setEmailError("Veuillez saisir votre e-mail.");
    }
    if (password === "") {
      setPasswordError("Veuillez remplir ce champ.");
    }
    if (email === "" || password === "") {
      return true;
    }
    return false;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = checkErrors();
    if (!err) {
      const data: UserLogin = { email, password };
      dispatch(signIn(data))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((error: UserLoginErrors) => {
          console.log(error);
          
          setEmailError(error.email);
          setPasswordError(error.password);
        });
    }
    return;
  };

  return (
    <form className={styles.container} onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="E-mail..."
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError("");
        }}
      />
      <label htmlFor="email">{emailError}</label>
      <input
        type="password"
        placeholder="Password..."
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordError("");
        }}
      />
      <label htmlFor="password">{passwordError}</label>
      <button type="submit">Login</button>
    </form>
  );
};
export default Login;
