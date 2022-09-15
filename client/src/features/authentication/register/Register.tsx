import { SerializedError } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { UserRegister, UserRegisterErrors } from "../auth.types";
import { register } from "../authSlice";
import styles from "./register.module.scss";

const Register = () => {
  const [pseudo, setPseudo] = useState("");
  const [pseudoError, setPseudoError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const { errors } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const checkErrors = () => {
    if (pseudo === "") {
      setPseudoError("Veuillez saisir votre pseudo.");
    }
    if (email === "") {
      setEmailError("Veuillez saisir votre e-mail.");
    }
    if (password === "") {
      setPasswordError("Veuillez remplir ce champ.");
    }
    if (confirmPassword === "") {
      setConfirmPasswordError("Veuillez remplir ce champ");
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Les mots de passe ne sont pas identiques.");
    }
    if (
      pseudo === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      password !== confirmPassword
    ) {
      return true;
    }
    return false;
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = checkErrors();

    if (!err) {
      const data: UserRegister = { pseudo, email, password };
      await dispatch(register(data))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((error:UserRegisterErrors) => {
          setEmailError(error.email);
          setPseudoError(error.pseudo);
          setPasswordError(error.password);
          console.log(error);
        });
    }
    return;
  };

  return (
    <form className={styles.container} onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Pseudo..."
        onChange={(e) => {
          setPseudo(e.target.value);
          setPseudoError("");
        }}
      />
      <label htmlFor="pseudo">{pseudoError}</label>
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
      <input
        type="password"
        placeholder="Confirm password..."
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setConfirmPasswordError("");
        }}
      />
      <label htmlFor="confirmPassword">{confirmPasswordError}</label>
      <button type="submit">Register</button>
    </form>
  );
};
export default Register;
