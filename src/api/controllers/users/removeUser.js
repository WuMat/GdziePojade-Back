import User from "../../models/user";
import mongoose from "mongoose";

export const removeUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const validID = mongoose.Types.ObjectId.isValid(userId);
    if (!validID) {
      const error = new Error("user id is not Valid");
      error.statusCode = 404;
      throw error;
    }

    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("Cant find user");
      error.statusCode = 404;
      throw error;
    }

    await User.deleteOne({ _id: userId });
    res.status(200).json({ message: "User is permamently removed" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      throw error;
    }
    next(error);
  }
};
