const jwt = require("jsonwebtoken");
// In production, use Redis or database
const blacklist = new Set(); 

// Use environment variables for secret and expiration
const secret = process.env.JWT_SECRET || "fallbacksecret"; // Always have a fallback for development
const expiration = process.env.JWT_SECRET || "2h";

module.exports = {
   // Add token to blacklist (for logout functionality)
  blacklistToken: function (token) {
    blacklist.add(token);
  },

  // Check if token is blacklisted
  isTokenBlacklisted: function (token) {
    return blacklist.has(token);
  },

  // Authentication middleware for GraphQL context
  authMiddleware: function ({ req }) {
    // Extract token from various locations
    let token = req.body?.token || req.query?.token || req.headers?.authorization;

    // Handle "Bearer <token>" format
    if (req.headers?.authorization) {
      token = token.split(' ').pop().trim();
    }
    
    // If no token, return request unchanged
    if (!token) {
      return req;
    }
     // Check if token is blacklisted
    if (this.isTokenBlacklisted(token)) {
      console.log("Blacklisted token attempted use");
      return req; // Or throw error if preferred
    }

    // verify token and attach usert data to request
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch(error) {
        console.log("Invalid token", error.message);
         // In GraphQL, we don't throw HTTP errors but can handle in resolvers
    }

    return req;
    // send to next endpoint
    // next();
  },
   // Function to sign tokens
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
    // function to verify token (useful for standalone verification)
     verifyToken: function (token) {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
};
