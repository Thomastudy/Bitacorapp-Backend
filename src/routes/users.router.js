import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const router = Router();

const userController = new UserController();

router.post("/register", userController.register);

router.post("/login", userController.logIn);

router.get("/current", authMiddleWare, userController.getCurrent);

router.get("/search", authMiddleWare, userController.searchUsers);

router.get("/search/:userId", authMiddleWare, userController.searchUserById);

router.post("/logout", authMiddleWare, userController.logOut);

export default router;
