import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", authRoutes);
app.use("/api", tasksRoutes);

export default app;