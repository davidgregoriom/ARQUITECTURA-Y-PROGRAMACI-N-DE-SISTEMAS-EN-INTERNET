import { GraphQLError } from "graphql";
import { PersonModel, PersonModelType } from "../db/person.ts";
import { KLTModelType,KLTModel } from "../db/klt.ts";

export const Query = {
  klts: async (): Promise<KLTModelType[]> => {
    const klts = await KLTModel.find().exec();
    return klts;
  },

  KLT: async (_: unknown, args: { id: string }): Promise<KLTModelType> => {
    const klt = await KLTModel.findById(args.id);
    if (!klt) {
      throw new GraphQLError(`No klt found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return klt;
  },

  persons: async (): Promise<PersonModelType[]> => {
    const persons = await PersonModel.find().exec();
    return persons;
  },

  person: async (
    _: unknown,
    args: { id: string }
  ): Promise<PersonModelType> => {
    const person = await PersonModel.findById(args.id);
    if (!person) {
      throw new GraphQLError(`No person found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return person;
  },
};
