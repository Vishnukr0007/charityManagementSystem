import { getAllCharities, getCharityById, createCharity } from '../services/charityService.js';

const charityResolver = {
  Query: {
    // Fetch all charities along with their donations
    charities: async () => {
      return await getAllCharities();
    },
    // Fetch a single charity by its ID
    getCharityById: async (_, { id }) => {
      return await getCharityById(id);
    },
  },
  Mutation: {
    // Register a new charity (Requires Admin role)
    addCharity: async (_, { name, description, goal_amount }, context) => {
      if (!context.user || context.user.role !== 'Admin') {
        throw new Error('Not Authorized: Only Admin can add charities');
      }
      return await createCharity({ name, description, goal_amount });
    },
  },
  Charity: {
    // Dynamically calculate the total donated amount based on linked donations
    total_donated: (parent) => {
      const donations = parent.Donations || parent.donations;
      if (!donations || donations.length === 0) return 0;
      return donations.reduce((sum, donation) => sum + donation.amount, 0);
    }
  }
};

export default charityResolver;
