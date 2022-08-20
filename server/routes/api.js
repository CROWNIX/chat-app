import express from "express";
import authController from "../controllers/authController.js";
import avatarController from "../controllers/avatarController.js";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.post("/setAvatar/:id", avatarController.setAvatar);

export default router;
