import express from "express";
import * as usersController from "../controllers/userController";

const router = express.Router();

router.get("/", usersController.getUser);
router.post("/register", usersController.signUp);
router.post("/login", usersController.login);

export default router;