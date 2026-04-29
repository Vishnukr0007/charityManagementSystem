const { getAllDonors, getDonorById, createDonor } = require('../services/donorService');

const donorResolver = {
  Query: {
    getDonors: async (_, __, context) => {
      if (!context.user || (context.user.role !== 'Admin' && context.user.role !== 'Sub Admin')) {
        throw new Error('Not Authorized');
      }
      return await getAllDonors();
    },
    getDonorById: async (_, { id }, context) => {
      if (!context.user) throw new Error('Not Authorized');
      return await getDonorById(id);
    },
  },
  Mutation: {
    addDonor: async (_, { name, email, phone }, context) => {
      if (!context.user) throw new Error('Not Authorized');
      return await createDonor({ name, email, phone });
    },
  },
};

module.exports = donorResolver;
