import authResolver from './authResolver.js';
import donorResolver from './donorResolver.js';
import charityResolver from './charityResolver.js';
import donationResolver from './donationResolver.js';

const resolvers = {
  Query: {
    ...donorResolver.Query,
    ...charityResolver.Query,
    ...donationResolver.Query,
  },
  Mutation: {
    ...authResolver.Mutation,
    ...donorResolver.Mutation,
    ...charityResolver.Mutation,
    ...donationResolver.Mutation,
  },
  Charity: {
    ...charityResolver.Charity,
  },
  Donation: {
    ...donationResolver.Donation,
  }
};

export default resolvers;
