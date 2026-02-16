const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const { connectDB } = require('./config/connection'); // Use connectDB instead of db
const routes = require('./routes');

// For environment variables in development
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

// Security and performance middleware
const helmet = require('helmet');
const compression = require('compression');
app.use(helmet());
app.use(compression());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use routes
app.use(routes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Test route to verify Express is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'Express server is working!', timestamp: new Date() });
});

app.get('/api/graphql-test', (req, res) => {
  res.json({ message: 'GraphQL endpoint is available at /graphql' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  // Enable introspection and playground only in development
   // Force enable playground in development
  introspection: true,  // Enable introspection
  playground: true,     // Enable playground
  // introspection: process.env.NODE_ENV !== 'production',
  // playground: process.env.NODE_ENV !== 'production',
});

// Async function to start Apollo Server
const startApolloServer = async (typeDefs, resolvers) => {
  try {
    // Connect to database first
    await connectDB();
    
    await server.start();
    
    // Apply CORS settings if needed
    server.applyMiddleware({ 
      app,
      cors: {
        origin: process.env.CLIENT_URL || "http://127.0.0.1:3000",
        credentials: true
      }
    });
    
    app.listen(PORT, () => {
      console.log(`🚀 API server running on port ${PORT}!`);
      console.log(`🔮 GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
  }
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);