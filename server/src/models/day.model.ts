import { Schema } from "mongoose";
import mongoose from "mongoose";

const daySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const DayModel = mongoose.model("days", daySchema);

module.exports = DayModel;
