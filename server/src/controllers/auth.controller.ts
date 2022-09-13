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

export const checkIn = async (req: Request<{ id: string }>, res: Response) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid User Id." });
  }
  try {
    let user = await UserModel.findOne({ _id: req.params.id });
    if (!user) {
      return res
        .status(400)
        .json({ error: "This User Id doesn't exist in the Database." });
    }
    

    const checkInTime = new Date(Date.now());

    // If user already checked in he can't check in again
    if(hasCheckedIn(user)){
      return res.status(400).json({error: "User has already checked in."})
    }
    
    // Add check in time to db
    user.days.push(checkInTime);
    user.latestCheckIn = checkInTime;

    // Check if is on streak
    if(!isOnStreak(user)){
      user.streak.currentStreak = 0;
      user.streak.starStreak = 0;
    }

    // Handle streak increment
    user.streak.currentStreak++;
    user.streak.starStreak++;
    if(user.streak.currentStreak >= user.streak.highestStreak){
      user.streak.highestStreak = user.streak.currentStreak;
    }
    
    if(user.streak.starStreak === 21){
      user.achievements.stars++;
      user.streak.starStreak = 0;
    }

    user.save();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const hasCheckedIn = (user: User): boolean => {
  if (!user.latestCheckIn) {
    return false;
  }
  const today = new Date(Date.now());
  if (
    user.latestCheckIn.getDate() === today.getDate() &&
    user.latestCheckIn.getMonth() === today.getMonth() &&
    user.latestCheckIn.getFullYear() === today.getFullYear()
  ) {
    return true;
  } 
  return false;
};

const isOnStreak = (user: User): boolean => {
  if(isYesterday(user.latestCheckIn)){
    return true;
  }
  return false;
}

const isYesterday = (date: Date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (yesterday.toDateString() === date.toDateString()) {
    return true;
  }

  return false;
}
