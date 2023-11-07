import User from "../models/User.model.js";
import { createAccessToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const userData = {
      user: req.body.user,
      email: req.body.email,
      password: passwordHash,
    };

    const userId = await User.register(userData);

    if (userId instanceof Error)
      return res.status(500).json({
        message: "Error al registrar el usuario",
        error: userId.message,
      });

    const payload = {
      id: userId,
      user: req.body.user,
    };

    const token = await createAccessToken(payload);

    res.cookie("token", token);

    return res.json({
      id: userId,
      user: req.body.user,
      email: req.body.email,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al registrar el usuario", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.login(req.body.email);

    if (user instanceof Error)
      return res.status(500).json({
        message: "Error al recuperar el usuario",
        error: user.message,
      });
    else if (user.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(req.body.password, user[0].password);

    if (!isMatch)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    const payload = {
      id: user[0].id,
      user: user[0].user,
    };

    const token = await createAccessToken(payload);

    res.cookie("token", token);

    return res.json({
      id: user[0].id,
      user: user[0].user,
      email: user[0].email,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al iniciar sesión", error: error.message });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user instanceof Error)
      return res.status(500).json({
        message: "Error al recuperar el usuario",
        message: user.message,
      });

    return res.json({
      id: user[0].id,
      user: user[0].user,
      email: user[0].email,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al recuperar el usuario", error: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const updateProfile = async (req, res) => {
  try {
    const result = await User.updateData(req.body, req.user.id);

    if (result instanceof Error)
      return res
        .status(500)
        .json({
          message: "Error al actualizar el usuario",
          error: result.message,
        });

    const user = await User.findById(req.user.id);

    if (user instanceof Error)
      return res
        .status(500)
        .json({
          message: "Error al recuperar el usuario actualizado",
          error: user.message,
        });

    return res.json({
      id: user[0].id,
      user: user[0].user,
      email: user[0].email,
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error al actualizar el usuario",
        error: error.message,
      });
  }
};
