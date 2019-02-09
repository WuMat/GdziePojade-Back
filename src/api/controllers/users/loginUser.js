import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator/check";

import User from "../../models/user";

export const loginUser = async (req, res, next) => {
  const data = { ...req.body };
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("validation Failed");
      error.statusCode = 404;
      throw error;
    }
    const user = await User.findOne({ email: data.email });
    if (!user) {
      const error = new Error("Cant find user");
      error.statusCode = 401;
      throw error;
    }

    const checkPasswor = await bcrypt.compare(data.password, user.password);
    if (!checkPasswor) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        iserId: user._id.toString()
      },
      process.env.TOKEN_SROKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token: token, userId: user._id.toString() });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
