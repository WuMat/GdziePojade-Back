import { validationResult } from "express-validator/check";
import bcrypt from "bcryptjs";

import User from "../../models/user";

export const createUser = async (req, res, next) => {
  const data = { ...req.body };
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 404;
      error.data = errors.array();
      throw error;
    }
    const hashPassword = await bcrypt.hash(data.password, 12);
    const user = new User({
      email: data.email,
      name: data.name,
      password: hashPassword
    });
    await user.save();
    res.status(200).json({ message: "User Created", userId: user._id });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
