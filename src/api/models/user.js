import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  places: [{ type: Schema.Types.ObjectId, ref: "Place" }]
});

const user = mongoose.model("User", userSchema);
export default user;
