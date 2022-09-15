import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express from "express";
import "./config/database";
import { authenticateToken } from "./middlewares/auth.middleware";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
dotenv.config();

const app = express();

const corsOptions: CorsOptions = {
  origin: [process.env.CLIENT_URL, process.env.CLIENT_URL_IP],
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// JWT



// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on Port ${process.env.PORT}`)
);
