import { getAllDonors, getDonorById, createDonor } from '../services/donorService.js';

const donorResolver = {
  Query: {
    // Fetch all donors (Requires Admin or Sub Admin role)
    getDonors: async (_, __, context) => {
      if (!context.user || (context.user.role !== 'Admin' && context.user.role !== 'Sub Admin')) {
        throw new Error('Not Authorized');
      }
      return await getAllDonors();
    },
    // Fetch a single donor by its ID
    getDonorById: async (_, { id }, context) => {
      if (!context.user) throw new Error('Not Authorized');
      return await getDonorById(id);
    },
  },
  Mutation: {
    // Register a new donor
    addDonor: async (_, { name, email, phone }, context) => {
      if (!context.user) throw new Error('Not Authorized');
      return await createDonor({ name, email, phone });
    },
  },
};

export default donorResolver;
