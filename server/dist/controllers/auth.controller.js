"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (user) => {
    try {
        const token = jsonwebtoken_1.default.sign({ userId: user._id.toString() }, process.env.TOKEN_SECRET, {
            expiresIn: maxAge,
        });
        return token;
    }
    catch (error) {
        console.log(error);
        return;
    }
};
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt();
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    return hashedPassword;
});
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { pseudo, email, password } = req.body;
    try {
        let hashedPassword = yield hashPassword(password);
        const user = yield user_model_1.default.create({
            pseudo,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({ user: user._id });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ error });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            throw "Invalid Email";
        }
        const auth = yield bcrypt_1.default.compare(password, user.password);
        if (!auth) {
            throw "Incorrect password";
        }
        const token = createToken(user);
        console.log("i get here");
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge,
            sameSite: "none",
            secure: true,
        });
        return res.status(200).json({ user: user._id });
    }
    catch (error) {
        return res.status(400).send({ error });
    }
});
exports.signIn = signIn;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("jwt", "", { maxAge: 1 });
    return res.redirect("/");
});
// exports
