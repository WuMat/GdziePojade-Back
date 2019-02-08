import Place from "../../models/place";

export const getOnePlace = async (req, res, next) => {
  const placeId = req.params.placeId;

  try {
    const place = await Place.findById(placeId);

    if (!place) {
      const error = new Error("Place not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ place: place });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
