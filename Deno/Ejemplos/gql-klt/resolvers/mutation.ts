import { GraphQLError } from "graphql";
import { KLTModel, KLTModelType } from "../db/klt.ts";
import { PersonModel, PersonModelType } from "../db/person.ts";
import mongoose from "mongoose";

export const Mutation = {
   addKLT: async (
    _: unknown,
    args: { reference: string; mould: string; type: number; parts: number; date: Date; owner: string }
  ): Promise<KLTModelType> => {
    const KLT = {
      reference: args.reference,
      mould: args.mould,
      type: args.type,
      parts: args.parts,
      date: args.date,
      owner: new mongoose.Types.ObjectId(args.owner),
    };
    const newKLT = await KLTModel.create(KLT);
    return newKLT;
  },
  deleteKLT: async (
    _: unknown,
    args: { id: string }
  ): Promise<KLTModelType> => {
    const KLT = await KLTModel.findByIdAndDelete(args.id);
    if (!KLT) {
      throw new GraphQLError(`No KLT found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return KLT;
  },
  updateKLT: async (
    _: unknown,
    args: { id: string  ;reference: string; mould: string; type: number; parts: number; date: Date; owner: string }
  ): Promise<KLTModelType> => {
    const KLT = await KLTModel.findByIdAndUpdate(
      args.id,
      { reference: args.reference, mould: args.mould, type:args.type,parts:args.parts,date:args.date,owner: args.owner },
      { new: true, runValidators: true }
    );
    if (!KLT) {
      throw new GraphQLError(`No KLT found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return KLT;
  },

  addPerson: async (
    _: unknown,
    args: { name: string; age: number }
  ): Promise<PersonModelType> => {
    const person = {
      name: args.name,
      age: args.age,
    };
    const newPerson = await PersonModel.create(person);
    return newPerson;
  },

  deletePerson: async (
    _: unknown,
    args: { id: string }
  ): Promise<PersonModelType> => {
    const person = await PersonModel.findByIdAndDelete(args.id);
    if (!person) {
      throw new GraphQLError(`No person found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return person;
  },

  updatePerson: async (
    _: unknown,
    args: { id: string; name: string; age: number }
  ): Promise<PersonModelType> => {
    const person = await PersonModel.findByIdAndUpdate(
      args.id,
      { name: args.name, age: args.age },
      { new: true, runValidators: true }
    );
    if (!person) {
      throw new GraphQLError(`No person found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return person;
  },
};
