import express from "express";
const router = express.Router();
import { body, validationResult } from "express-validator";
import { userController } from "../controllers/index.js";

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  userController.login
);

router.post("/register", userController.register);

router.get("/profile", userController.getUserProfile);

router.post("/deposit", userController.deposit);

router.post("/withdraw", userController.withdraw);

router.get("/all", userController.viewAllUsers);

export default router;
