import Place from "../../models/place";

export const getAllPlaces = async (req, res, next) => {
  try {
    const places = await Place.find();
    res.status(200).json({
      messega: "Fetched posts successfully",
      places: places
    });
  } catch (err) {
    console.log(err);
  }
};
