import { validationResult } from "express-validator/check";

import Place from "../../models/place";
import User from "../../models/user";

export const createPlace = async (req, res, next) => {
  const data = { ...req.body };
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      throw error;
    }

    const place = new Place({
      placeName: data.placeName,
      province: data.province,
      description: data.description,
      kindOfPlace: data.kindOfPlace,
      rating: data.rating,
      author: req.userId
    });

    await place.save();

    // saving place ID in user document
    const user = await User.findById(req.userId);
    await user.places.push(place);
    await user.save();

    res.status(200).json({
      message: "Place is created",
      Place: place,
      author: { id: user._id, name: user.name }
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
