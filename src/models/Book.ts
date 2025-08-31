import { Schema, model, Types } from "mongoose";

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Types.ObjectId, required: true, ref: "Author" },
  catagories: [{ type: Types.ObjectId, required: true, ref: "Catagorie" }],
});

export default model("Book", BookSchema);
