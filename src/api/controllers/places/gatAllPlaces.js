import Place from "../../models/place";

export const getAllPlaces = async (req, res, next) => {
  try {
    const places = await Place.find();
    if (!places) {
      const error = new Error("Places not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      messega: "Fetched posts successfully",
      places: places
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
