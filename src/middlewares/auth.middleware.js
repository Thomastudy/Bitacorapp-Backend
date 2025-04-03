import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleWare = (req, res, next) => {
  try {
    const token = req.cookies.userCookieToken;

    if (!token) {
      return res
        .status(401)
        .json({ status: "error", message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Token inválido o expirado",
    });
  }
};
