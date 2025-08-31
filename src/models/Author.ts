import { Schema, model, Types } from "mongoose";

const AuthorSchema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  books: [{ type: Types.ObjectId, ref: "Book" }],
});
export default model("Author", AuthorSchema);
