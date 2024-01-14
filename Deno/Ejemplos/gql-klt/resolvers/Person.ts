import { KLTModel, KLTModelType } from "../db/klt.ts";
import { PersonModelType } from "../db/person.ts";

export const Person = {
  klts: async (parent: PersonModelType): Promise<KLTModelType[]> => {
    const klts = await KLTModel.find({ owner: parent._id });
    return klts;
  },
};
