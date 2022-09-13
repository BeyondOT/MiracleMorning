"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const day_routes_1 = __importDefault(require("./routes/day.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello");
});
// Routes
app.use("/api/user", user_routes_1.default);
app.use("/api/days", day_routes_1.default);
app.listen(process.env.PORT, () => console.log(`Server is running on Port ${process.env.PORT}`));
