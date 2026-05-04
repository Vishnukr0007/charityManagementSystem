import { getAllDonations, getDonationById, getDonationsByDonor, createDonation } from '../services/donationService.js';

const donationResolver = {
  Query: {
    // Fetch all donations including linked donor and charity details
    getDonations: async (_, __, context) => {
      if (!context.user) throw new Error('Not Authorized');
      return await getAllDonations();
    },
    // Fetch a specific donation by its ID
    getDonationById: async (_, { id }, context) => {
      if (!context.user) throw new Error('Not Authorized');
      return await getDonationById(id);
    },
    // Fetch all donations made by a specific donor
    donationsByDonor: async (_, { donorId }, context) => {
      if (!context.user) throw new Error('Not Authorized');
      return await getDonationsByDonor(donorId);
    },
  },
  Mutation: {
    // Create a new donation linking a donor and a charity
    addDonation: async (_, { amount, donorId, charityId, payment_method }, context) => {
      if (!context.user) throw new Error('Not Authorized');
      return await createDonation({ amount, donorId, charityId, payment_method });
    },
  },
  Donation: {
    // Map Sequelize's uppercase included models to GraphQL's lowercase fields
    charity: (parent) => parent.Charity || parent.charity,
    donor: (parent) => parent.Donor || parent.donor,
  }
};

export default donationResolver;
