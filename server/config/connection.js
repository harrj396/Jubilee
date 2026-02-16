const mongoose = require('mongoose');

// MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Remove deprecated options and add new recommended ones:
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  maxPoolSize: 10, // Maintain up to 10 socket connections
  minPoolSize: 5, // Maintain at least 5 socket connections
  maxIdleTimeMS: 10000 // Remove sockets from the pool after 10 seconds of inactivity
};

// Connection function with better error handling
const connectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/Jubilee';
    
    await mongoose.connect(connectionString, options);
    
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);

    // Connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

        mongoose.connection.on('disconnected', () => {
      console.log('ℹ️ MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Handle app termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('ℹ️ MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error);
    process.exit(1);
  }
});

module.exports = { connectDB, mongoose };