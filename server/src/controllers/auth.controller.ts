import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { MongoServerError } from "mongodb";
import UserModel, { User } from "../models/user.model";
import { loginErrors, signUpErrors } from "../utils/errors.utils";

interface UserLogin {
  email: string;
  password: string;
}

interface UserRegister {
  pseudo: string;
  email: string;
  password: string;
}

const maxAge: number = 3 * 24 * 60 * 60 * 1000;

const generateAccessToken = (user: User) => {
  const theUser: Object = {
    id: user._id,
    pseudo: user.pseudo,
    roles: user.roles,
  };
  try {
    const response = jwt.sign(theUser, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: maxAge,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const signUp = async (
  req: Request<never, never, UserRegister>,
  res: Response
) => {
  const { pseudo, email, password } = req.body;

  try {
    let hashedPassword = await hashPassword(password);
    const user = await UserModel.create({
      pseudo,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({ user: user._id });
  } catch (error) {
    if (error instanceof MongoServerError) {
      const errors = signUpErrors(error);
      return res.status(400).json(errors);
    } else {
      return res.status(400).json({ message: "Unexpected error", error });
    }
  }
};

export const signIn = async (
  req: Request<never, never, UserLogin>,
  res: Response
) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne<User>({ email });
    if (!user) {
      throw new Error("Invalid Email");
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      throw new Error("Incorrect password");
    }

    const accessToken = generateAccessToken(user);
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: maxAge,
      sameSite: "none",
      secure: true,
    });
    return res.send({ accessToken });
  } catch (error) {
    if (error instanceof Error) {
      const errors = loginErrors(error);
      return res.status(400).send(errors);
    }
    return res.status(400).json({ error, message: "Unexpected error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 1 });
  return res.status(200).send("Logged out successfully");
};

export const getJwt = (req: Request, res: Response) => {
  res.status(200).send(req.cookies.jwt);
};
