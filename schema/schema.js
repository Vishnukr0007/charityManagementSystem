const typeDefs = `#graphql
  type Admin {
    id: ID!
    username: String!
    role: String!
  }

  type AuthPayload {
    token: String!
    admin: Admin!
  }

  type Donor {
    id: ID!
    name: String!
    email: String!
    phone: String
    donations: [Donation]
  }

  type Charity {
    id: ID!
    name: String!
    description: String
    donations: [Donation]
  }

  type Donation {
    id: ID!
    amount: Float!
    date: String!
    donor: Donor
    charity: Charity
  }

  type Query {
    getDonors: [Donor]
    getDonorById(id: ID!): Donor
    getCharities: [Charity]
    getCharityById(id: ID!): Charity
    getDonations: [Donation]
    getDonationById(id: ID!): Donation
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    addDonor(name: String!, email: String!, phone: String): Donor
    addCharity(name: String!, description: String): Charity
    makeDonation(amount: Float!, donorId: ID!, charityId: ID!): Donation
  }
`;

module.exports = typeDefs;
