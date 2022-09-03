import express from "express";
import authController from "../controllers/authController.js";
import avatarController from "../controllers/avatarController.js";
import chatController from "../controllers/chatController.js";

const router = express.Router();

//? ENDPOINT API AUTHENTICATION
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
//? END OF ENDPOINT API OF AUTHENTICATION

//? ENDPOINT API SET AVATAR
router.post("/setAvatar/:id", avatarController.setAvatar);
//? END OF ENDPOINT API OF SET AVATAR

//? ENDPOINT API CHAT
router.get("/allUser/:id", chatController.getAllUser);
router.post("/message", chatController.addMessage);
router.get("/message/:from/:to", chatController.getAllMessage);
//? END OF ENDPOINT API OF CHAT

export default router;
