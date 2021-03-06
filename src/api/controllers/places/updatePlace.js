import Place from "../../models/place";
import { validationResult } from "express-validator/check";

export const updatePlace = async (req, res, next) => {
  const data = { ...req.body };
  const placeId = req.params.placeId;
  const errors = validationResult(req);
  const user = req.userId;
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      throw error;
    }
    const place = await Place.findById(placeId);
    if (!place) {
      const error = new Error("place not founded");
      error.statusCode = 404;
      throw error;
    }

    if (place.author !== req.auhtor) {
      const error = new Error("Not authorized");
      error.statusCode = 403;
      throw error;
    }

    await Place.updateOne({ _id: placeId }, { $set: data });
    res.status(200).json({ message: "place updated" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
