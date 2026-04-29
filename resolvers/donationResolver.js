const { getAllDonations, getDonationById, createDonation } = require('../services/donationService');

const donationResolver = {
  Query: {
    getDonations: async (_, __, context) => {
      if (!context.user) throw new Error('Not Authorized');
      return await getAllDonations();
    },
    getDonationById: async (_, { id }, context) => {
      if (!context.user) throw new Error('Not Authorized');
      return await getDonationById(id);
    },
  },
  Mutation: {
    makeDonation: async (_, { amount, donorId, charityId }, context) => {
      if (!context.user) throw new Error('Not Authorized');
      return await createDonation({ amount, donorId, charityId });
    },
  },
};

module.exports = donationResolver;
