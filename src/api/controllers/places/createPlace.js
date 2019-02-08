import Place from "../../models/place";
import { validationResult } from "express-validator/check";

export const createPlace = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      throw error;
    }
    const data = { ...req.body };
    console.log("---+++++---" + JSON.stringify(data));
    console.log("---+++++---" + data.placeName);

    const place = new Place({
      placeName: data.placeName,
      province: data.province,
      description: data.description,
      kindOfPlace: data.kindOfPlace,
      rating: data.rating,
      creator: "mati"
    });

    await place.save();
    res.status(200).json({ message: "ok" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getAllPlaces = (req, res, next) => {};
