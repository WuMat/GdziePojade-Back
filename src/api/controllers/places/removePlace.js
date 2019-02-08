import Place from "../../models/place";

export const removePlace = async (req, res, next) => {
  const placeId = req.params.placeId;
  try {
    const place = await Place.findById(placeId);
    if (!place) {
      const error = new Error("Could not find place");
      error.statusCode = 404;
      throw error;
    }
    await place.remove();
    res.status(200).json({ message: "place removed" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
