import express from "express";
import { logout, signIn, signUp } from "../controllers/auth.controller";
const router = express.Router();

router.post("/register", signUp);
router.post("/login", signIn);
router.get("/logout", logout);

export default router;
