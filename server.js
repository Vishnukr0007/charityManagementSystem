const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const cors = require('cors');
const { sequelize } = require('./models');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers');
const authMiddleware = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        return authMiddleware({ req });
      },
    })
  );

  const PORT = process.env.PORT || 4000;

  try {
    // Sync models
    await sequelize.sync({ force: false });
    console.log('Database synced');
    
    // Optional: create a default admin if none exists
    const { createInitialAdmin } = require('./services/authService');
    await createInitialAdmin('admin', 'admin123');

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
  }
};

startServer();
