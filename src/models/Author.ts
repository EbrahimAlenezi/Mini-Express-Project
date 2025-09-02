import { Schema, model, Types } from "mongoose";

export interface Author extends Document {
  name: string;
  country: string;
  books: Types.ObjectId[];
}
const AuthorSchema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  books: [{ type: Types.ObjectId, ref: "Book" }],
});
export default model<Author>("Author", AuthorSchema);
