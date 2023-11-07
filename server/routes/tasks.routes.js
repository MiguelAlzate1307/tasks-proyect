import { Router } from "express";
import {
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/tasks", auth, createTask);
router.get("/tasks/:id", auth, getTask);
router.get("/tasks", auth, getTasks);
router.put("/tasks/:id", auth, updateTask);
router.delete("/tasks/:id", auth, deleteTask);

export default router;
