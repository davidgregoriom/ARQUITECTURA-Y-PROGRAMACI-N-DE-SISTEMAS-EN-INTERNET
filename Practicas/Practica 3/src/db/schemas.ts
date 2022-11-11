import {ObjectId} from "mongo";
import {Test} from "../types.ts";

export type SlotSchema = Omit<Slot,"id"> & {_id: ObjectId};