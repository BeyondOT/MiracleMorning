import express, { Router } from "express";
import {
  logout,
  refreshToken,
  signIn,
  signUp,
} from "../controllers/auth.controller";
import { checkIn, getUsers } from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

interface BaseParams {
  id: string;
}

interface Empty {

}

const router: Router = express.Router();

router.post("/register", signUp);
router.post("/login", signIn);
router.get("/logout", logout);

router.get("/getUsers", authenticateToken, getUsers);
router.post("/refreshToken", refreshToken);
router.patch("/checkin/:id",authenticateToken,checkIn);

export default router;
