import express, { Router } from "express";
import { checkIn, getUser, getUsers } from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router: Router = express.Router();

router.get("/getUsers", authenticateToken, getUsers);
router.get("/getUser", authenticateToken, getUser);
router.patch("/checkin", authenticateToken, checkIn);

export default router;
