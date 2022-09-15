import { MongoServerError } from "mongodb";

export const signUpErrors = (err: MongoServerError) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo")) {
    errors.pseudo = "Incorrect pseudo.";
  }

  if (err.message.includes("email")) {
    errors.email = "Incorrect Email.";
  }

  if (err.message.includes("password")) {
    errors.password = "Password should contain at least 6 characters";
  }

  if (
    err.code === 11000 &&
    Object.keys(err["keyValue"])[0].includes("pseudo")
  ) {
    errors.pseudo = "This pseudo is already used.";
  }

  if (err.code === 11000 && Object.keys(err["keyValue"])[0].includes("email")) {
    errors.email = "This e-mail is already used.";
  }

  return errors;
};

export const loginErrors = (err: Error) => {
  let errors = { email: "", password: "" };
  if (err.message.includes("Email")) {
    errors.email = "Invalid Email.";
  }

  if (err.message.includes("password")) {
    errors.password = "Invalid Credentials.";
  }
  return errors;
};
