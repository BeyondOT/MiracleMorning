import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import { isValidObjectId, Types } from "mongoose";
import UserModel, { User } from "../models/user.model";

interface UserLogin {
  email: string;
  password: string;
}

interface UserRegister {
  pseudo: string;
  email: string;
  password: string;
}

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (user: User) => {
  try {
    const token: string = jwt.sign(
      { userId: user._id.toString() },
      process.env.TOKEN_SECRET,
      {
        expiresIn: maxAge,
      }
    );
    return token;
  } catch (error) {
    console.log(error);
    return;
  }
};

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const signUp = async (
  req: Request<never, never, UserRegister>,
  res: Response<{ user: Types.ObjectId } | { error: unknown }>
) => {
  console.log(req.body);
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
    console.log(error);

    return res.status(400).json({ error });
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
      throw "Invalid Email";
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      throw "Incorrect password";
    }

    const token = createToken(user);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({ user: user._id });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 1 });
  return res.redirect("/");
};
