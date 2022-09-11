import express, { Request, Response } from "express";
import "./config/database"
import userRoutes from "./routes/user.routes"
import dayRoutes from "./routes/day.routes"

const app = express();

app.get("/", (req: Request, res:Response) => {
  res.send("Hello");
})

// Routes
app.use("/api/user", userRoutes);
app.use("/api/days", dayRoutes);

app.listen(5000, () => console.log("Server is running"));