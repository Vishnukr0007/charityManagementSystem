const authResolver = require('./authResolver');
const donorResolver = require('./donorResolver');
const charityResolver = require('./charityResolver');
const donationResolver = require('./donationResolver');

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
};

module.exports = resolvers;
