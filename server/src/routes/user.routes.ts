import express, { Router } from "express";
import {
  logout,
  signIn,
  signUp,
} from "../controllers/auth.controller";
import { checkIn } from "../controllers/user.controller";

interface BaseParams {
  id: string;
}

interface Empty {

}

const router: Router = express.Router();

router.post("/register", signUp);
router.post("/login", signIn);
router.get("/logout", logout);

router.patch("/checkin/:id", checkIn);

export default router;
