import express, { Request, Response } from "express";
import "./config/database";
import dayRoutes from "./routes/day.routes";
import userRoutes from "./routes/user.routes";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/days", dayRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on Port ${process.env.PORT}`)
);
