const { getAllCharities, getCharityById, createCharity } = require('../services/charityService');

const charityResolver = {
  Query: {
    getCharities: async () => {
      return await getAllCharities();
    },
    getCharityById: async (_, { id }) => {
      return await getCharityById(id);
    },
  },
  Mutation: {
    addCharity: async (_, { name, description }, context) => {
      if (!context.user || context.user.role !== 'Admin') {
        throw new Error('Not Authorized: Only Admin can add charities');
      }
      return await createCharity({ name, description });
    },
  },
};

module.exports = charityResolver;
