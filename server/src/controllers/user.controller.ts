import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import UserModel, { User } from "../models/user.model";


export const getUsers = async(req: Request, res: Response) => {
  const response = await UserModel.find();
  console.log(response);
  
  return res.status(200).json(response);
}

export const checkIn = async (req: Request<{ id: string }>, res: Response) => {
  if (!isValidObjectId(req.user.id)) {
    return res.status(400).json({ error: "Invalid User Id." });
  }
  try {
    let user = await UserModel.findOne({ _id: req.user.id }).select("-password");
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

// Get user.
export const getUser = async (req:Request, res: Response) => {
  try{
    const user = await UserModel.findOne({_id: req.user.id}).select("-password");
    return res.status(200).json(user);
  }catch(error){
    console.log(error);
    return res.status(400).json(error);
  }
}