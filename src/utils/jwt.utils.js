import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      userName: user.userName,
      first_name: user.first_name,
      email: user.email,
      role: user.role,
      fact: user.fact,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
