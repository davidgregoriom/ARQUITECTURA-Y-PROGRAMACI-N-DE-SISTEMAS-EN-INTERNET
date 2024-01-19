export type Book = {
  id: string;
  name: string;
  state: string;
  library: Library;
};
export type Library = {
  id : string;
  Books: Book[];
  owner: Person;
}

export type Person = {
  id: string;
  name: string;
  age: number;
  library: Library;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: Date;
  startHour: number;
  endHour: number;
};
