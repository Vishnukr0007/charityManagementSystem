const { adminLogin } = require('../services/authService');

const authResolver = {
  Mutation: {
    login: async (_, { username, password }) => {
      return await adminLogin(username, password);
    },
  },
};

module.exports = authResolver;
