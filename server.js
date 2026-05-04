import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import { sequelize } from './models/index.js';
import typeDefs from './schema/schema.js';
import resolvers from './resolvers/index.js';
import authMiddleware from './middleware/authMiddleware.js';
import { createInitialAdmin } from './services/authService.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initializes and starts the Express & Apollo GraphQL server
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
        const { user } = await authMiddleware({ req });
        return { user, req };
      },
    })
  );

  const PORT = process.env.PORT || 4000;

  try {
    // Sync models
    await sequelize.sync({ alter: true });
    console.log('Database synced');
    
    // Optional: create a default admin if none exists
    await createInitialAdmin('Admin User', 'admin@example.com', 'admin123');

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
  }
};

startServer();
