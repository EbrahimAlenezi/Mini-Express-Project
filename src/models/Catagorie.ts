import { Schema, model, Types } from "mongoose";

const CatagorieSchema = new Schema({
  name: { type: String, required: true },
  books: [{ type: Types.ObjectId, ref: "Book" }],
});
export default model("Catagorie", CatagorieSchema);
