import { Schema } from "mongoose";

import bcrypt from "bcrypt";
import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

enum Roles {
  Admin = "Admin",
  User = "User",
}

const userSchema = new mongoose.Schema(
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
    days: [
      {
        type: Schema.Types.ObjectId,
        ref: "Day",
      },
    ],
    streak: {
      type: {
        currentStreak: Number,
        highestStreak: Number,
      },
    },
    stars: {
      type: Number,
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

userSchema.statics.login = async function (email: string, password: string) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect e-mail");
};

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;