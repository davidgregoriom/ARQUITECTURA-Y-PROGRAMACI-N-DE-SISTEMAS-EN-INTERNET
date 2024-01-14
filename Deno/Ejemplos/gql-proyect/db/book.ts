import mongoose from "mongoose";
import { Book } from "../types.ts";

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
});

export type BookModelType = mongoose.Document &
  Omit<Book, "id" | "library"> & { library: mongoose.Types.ObjectId };

// validate if library exists
BookSchema.path("library").validate(async function (
  value: mongoose.Types.ObjectId
) {
  // check if library has changed
  if (value === this.library) {
    return true;
  }

  const library = await mongoose.models.Person.findById(value);
  if (!library) {
    throw new Error(`library with id ${value} does not exist`);
  }
  return true;
});

export const BookModel = mongoose.model<BookModelType>("Book", BookSchema);
