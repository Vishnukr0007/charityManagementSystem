const typeDefs = `#graphql
  type Admin {
    id: ID!
    email: String!
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
    goal_amount: Float
    total_donated: Float
    donations: [Donation]
  }

  type Donation {
    id: ID!
    amount: Float!
    date: String!
    payment_method: String
    donor: Donor
    charity: Charity
  }

  type Query {
    getDonors: [Donor]
    getDonorById(id: ID!): Donor
    charities: [Charity]
    getCharityById(id: ID!): Charity
    getDonations: [Donation]
    getDonationById(id: ID!): Donation
    donationsByDonor(donorId: ID!): [Donation]
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    addDonor(name: String!, email: String!, phone: String): Donor
    addCharity(name: String!, description: String, goal_amount: Float): Charity
    addDonation(amount: Float!, donorId: ID!, charityId: ID!, payment_method: String): Donation
  }
`;

export default typeDefs;
