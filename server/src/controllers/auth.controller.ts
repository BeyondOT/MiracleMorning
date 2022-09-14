import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import bcrypt from "bcrypt";
import { Types } from "mongoose";
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

interface UserInfos {
  pseudo: string;
  email: string;
  id: string;
}

const maxAge = 3 * 24 * 60 * 60 * 1000;

const generateAccessToken = (user: Object) => {
  try {
    const response = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "3m",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const generateRefreshToken = (user: Object) => {
  try {
    const response = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1y",
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
  res: Response<{ user: Types.ObjectId } | { error: unknown }>
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

    const userInfos: Object = { id: user._id };
    const accessToken = generateAccessToken(userInfos);
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: 1000000000000,
      sameSite: "none",
      secure: true,
    });
    return res.send({ accessToken });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 1 });
  return res.redirect("/");
};

export const refreshToken = (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    // TODO : check en bdd que le user a toujours les droit et qu'il existe toujours
    const newUser: JwtPayload = user as JwtPayload;
    delete newUser.iat;
    delete newUser.exp;

    const refreshedToken = generateAccessToken(newUser as Object);
    res.send({
      accessToken: refreshedToken,
    });
  });
};
