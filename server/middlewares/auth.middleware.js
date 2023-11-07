import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const auth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res.status(401).json({ message: "No autorizado, inicie sesión" });

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).json({ message: "No autorizado" });

      req.user = user;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al verificar el token", error: error.message });
  }
};
