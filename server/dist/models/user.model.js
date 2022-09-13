"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
var Roles;
(function (Roles) {
    Roles["Admin"] = "Admin";
    Roles["User"] = "User";
})(Roles || (Roles = {}));
const userSchema = new mongoose_1.Schema({
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
        validate: [isEmail_1.default],
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
            type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
const UserModel = mongoose_2.default.model("users", userSchema);
exports.default = UserModel;
