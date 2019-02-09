import express from "express";
import { body } from "express-validator/check";

import User from "../models/user";

import { createUser } from "../controllers/users/createUser";
import { loginUser } from "../controllers/users/loginUser";

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("please enter a valid email")
      .custom(async (value, { req }) => {
        const use = await User.findOne({ email: value });
        if (use) {
          console.log("exist");
          const error = new Error("email exist");
          throw error;
        }
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 }),
    body("name")
      .trim()
      .not()
      .isEmpty()
  ],
  createUser
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .normalizeEmail(),
    body("name")
      .trim()
      .isLength({ min: 5 }),
    body("password")
      .trim()
      .isLength({ min: 5 })
  ],
  loginUser
);

export default router;
