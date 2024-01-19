// The GraphQL schema
export const typeDefs = `#graphql
  type Event {
    id: ID!,
    title: String!,
    description: String!,
    date: Date!,
    startHour: Int!,
    endHour: Int!
  }

  type Book {
    id: ID!
    name: String!
    state: String!
    library: Library!
  }
  type Library {
    id: ID!
    books: [Book!]!
    owner: Person!
  }
  type Person {
    id: ID!
    name: String!
    age: Int!
    library: Library!
  }

  type Query {
    library: Library!
    book(id: ID!): Book!
    persons: [Person!]!
    person(id: ID!): Person!
    events: [Event!]!
  }
  type Mutation {
    addBook(name: String!, state: String!, owner:ID!): Book!
    deleteBook(id: ID!): Book!
    updateBook(id: ID!, name: String, state: String, owner:ID): Book!
    addPerson(name: String!, age: Int!): Person!
    deletePerson(id: ID!): Person!
    updatePerson(id: ID!, name: String, age: Int): Person!
    addEvent(title: String!, description: String!, date: Date!, startHour: Int!, endHour: Int!): Event!
    deleteEvent(id: ID!): Event!
    updateEvent(id: ID!, title: String, description: String, date: Date, startHour: Int, endHour: Int): Event!
  }
`;
