import mongoose from "mongoose";
import { KLT } from "../types.ts";

const Schema = mongoose.Schema;

const KLTSchema = new Schema({
  reference: { type: String , required: true},
  mould: { type: String, required: true },
  type: { type: Number, required: true },
  parts: { type: Number, required: true },
  date: { type: Date, required: true },
  owner: { type: Schema.Types.ObjectId, required: true, ref: "Person" },
});

export type KLTModelType = mongoose.Document &
  Omit<KLT, "id" | "owner"> & { owner: mongoose.Types.ObjectId };

// validate if owner exists
KLTSchema.path("owner").validate(async function (
  value: mongoose.Types.ObjectId
) {
  // check if owner has changed
  if (value === this.owner) {
    return true;
  }

  const owner = await mongoose.models.Person.findById(value);
  if (!owner) {
    throw new Error(`Owner with id ${value} does not exist`);
  }
  return true;
});

export const  KLTModel = mongoose.model<KLTModelType>("KLT", KLTSchema);
