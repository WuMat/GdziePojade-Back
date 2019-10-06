import mongoose, { Schema } from "mongoose";

const placeSchema = new Schema(
  {
    placeName: { type: String, required: false },
    province: { type: String, required: false },
    description: { type: String, required: false },
    kindOfPlace: { type: String, required: false },
    rating: { type: Number, required: false },
    author: { type: Schema.Types.ObjectId, ref: "User", required: false }
  },
  { timestamps: true }
);

const place = mongoose.model("Place", placeSchema);
export default place;
