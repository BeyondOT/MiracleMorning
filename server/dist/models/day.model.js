"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const daySchema = new mongoose_2.default.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    users: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, {
    timestamps: true,
});
const DayModel = mongoose_2.default.model("days", daySchema);
module.exports = DayModel;
