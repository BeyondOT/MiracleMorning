import { Schema, Types } from "mongoose";

import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

enum Roles {
  Admin = "Admin",
  User = "User",
}

interface Achievements {
  stars: number;
}

interface Streak {
  currentStreak: number;
  highestStreak: number;
  starStreak: number;
}

export interface User {
  _id: Types.ObjectId;
  pseudo: string;
  email: string;
  password: string;
  picture: string;
  pictureKey: string;
  days: Date[];
  latestCheckIn: Date;
  streak: Streak;
  achievements: Achievements;
  roles: String;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new Schema<User>(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    picture: {
      type: String,
      default: "./uploads/profile/random-user.png",
    },
    pictureKey: {
      type: String,
    },
    days: {
      type: [Date],
      default: [],
    },
    latestCheckIn: {
      type: Date,
      default: null,
    },
    streak: {
      currentStreak: {
        type: Number,
        default: 0,
      },
      highestStreak: {
        type: Number,
        default: 0,
      },
      starStreak: {
        type: Number,
        default: 0,
      },
    },
    achievements: {
      stars: {
        type: Number,
        default: 0,
      },
    },
    roles: {
      type: String,
      enum: Roles,
      default: Roles.User,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<User>("users", userSchema);

export default UserModel;
