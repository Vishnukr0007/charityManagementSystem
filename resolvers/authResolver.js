import { adminLogin } from '../services/authService.js';

const authResolver = {
  Mutation: {
    // Authenticates admin credentials and returns a JWT
    login: async (_, { email, password }, context) => {
      // Access IP from context (requires context to be set up in server.js)
      const ipAddress = context.req?.ip || 'unknown';
      return await adminLogin(email, password, ipAddress);
    },
  },
};

export default authResolver;
