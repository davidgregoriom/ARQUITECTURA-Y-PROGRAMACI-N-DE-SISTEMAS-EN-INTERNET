export type KLT = {
    id: string;
    reference: string;
    mould:string;
    type: number;
    parts: number;
    date: Date;
    owner: Person;
  };

export type Person = {
    id: string;
    name: string;
    age: number;
    klts: KLT[];
};
