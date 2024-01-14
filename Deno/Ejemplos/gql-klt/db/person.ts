import mongoose from "mongoose";
import { Person } from "../types.ts";
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

export type PersonModelType = mongoose.Document & Omit<Person, "id" | "klts">;

// if person is deleted, then delete all klts owned by that person
PersonSchema.post("findOneAndDelete", async function (doc: PersonModelType) {
  await mongoose.models.KLT.deleteMany({ owner: doc._id });
});

export const PersonModel = mongoose.model<PersonModelType>(
  "Person",
  PersonSchema
);
