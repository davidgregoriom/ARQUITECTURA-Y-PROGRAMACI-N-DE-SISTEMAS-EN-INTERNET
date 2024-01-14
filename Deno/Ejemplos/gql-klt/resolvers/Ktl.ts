import { GraphQLError } from "graphql";
import { PersonModel, PersonModelType } from "../db/person.ts";
import { KLTModelType,KLTModel } from "../db/klt.ts";

export const Pet = {
  owner: async (parent: KLTModelType): Promise<PersonModelType> => {
    const person = await PersonModel.findById(parent.owner).exec();
    if (!person) {
      throw new GraphQLError(`No person found with id ${parent.owner}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return person;
  },
};
