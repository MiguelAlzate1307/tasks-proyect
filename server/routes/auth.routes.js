import { Router } from "express";
import {
  login,
  logout,
  profile,
  register,
  updateProfile,
} from "../controllers/auth.controllers.js";
import { validateSchema } from "../middlewares/validate.schema.js";
import { registerSchema, loginSchema } from "../schemas/auth.schemas.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", auth, logout);
router.get("/profile", auth, profile);
router.put("/profile", auth, updateProfile);

export default router;
