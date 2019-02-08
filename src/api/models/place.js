import mongoose, { Schema } from "mongoose";

const placeSchema = new Schema(
  {
    placeName: { type: String, required: true },
    province: { type: String, required: true },
    description: { type: String, required: true },
    kindOfPlace: { type: String, required: true },
    rating: { type: Number, required: true },
    creator: { type: String, default: "mati" }
  },
  { timestamps: true }
);

const place = mongoose.model("Place", placeSchema);
export default place;
