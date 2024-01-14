
export const typeDefs = `#graphql
  type KLT {
    id: ID!
    reference: String!
    mould: String!
    type: Int!
    parts: String!
    date: String!
    owner: Person!
  }

  type Person {
    id: ID!
    name: String!
    age: Int!
    klts: [KLT!]!
  }

  type Query {
    klts: [KLT!]!
    klt(id: ID!): KLT!
    persons: [Person!]!
    person(id: ID!): Person!
  }
  type Mutation {
    addKLT(name: String!, breed: String!, owner:ID!): KLT!
    deleteKLT(id: ID!): KLT!
    updateKLT(id: ID!, name: String, breed: String, owner:ID): KLT!
    addPerson(name: String!, age: Int!): Person!
    deletePerson(id: ID!): Person!
    updatePerson(id: ID!, name: String, age: Int): Person!
  }
`;
