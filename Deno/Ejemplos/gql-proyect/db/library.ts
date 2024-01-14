import mongoose from "mongoose";
import { Library } from "../types.ts";

const Schema = mongoose.Schema;

const LibrarySchema = new Schema({
  name: { type: String, required: true },
  book: { type: Schema.Types.ObjectId, required: true, ref: "Person" },
});

export type LibraryModelType = mongoose.Document &
  Omit<Library, "id" | "ownder"> & { book: mongoose.Types.ObjectId };

// validate if book exists
LibrarySchema.path("book").validate(async function (
  value: mongoose.Types.ObjectId
) {
  // check if book has changed
  if (value === this.book) {
    return true;
  }

  const book = await mongoose.models.Person.findById(value);
  if (!book) {
    throw new Error(`book with id ${value} does not exist`);
  }
  return true;
});

LibrarySchema.post("findOneAndDelete", async function (doc: LibraryModelType) {
    await mongoose.models.Pet.deleteMany({ book: doc._id });
});

export const LibraryModel = mongoose.model<LibraryModelType>("Library", LibrarySchema);
