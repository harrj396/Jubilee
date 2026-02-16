const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveVinylOrder,  // Changed from saveAlbum to saveVinylOrder
  deleteVinylOrder, // Changed from deleteAlbum to deleteVinylOrder
  login,
  getVinylOrders   // New function to get user's vinyl orders
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// Put authMiddleware anywhere we need to send a token for verification of user
// Authentication routes
router.route('/').post(createUser);
router.route('/login').post(login);

// User profile routes
router.route('/me').get(authMiddleware, getSingleUser);

// Vinyl order routes - UPDATED FOR JUBILEE
router.route('/orders')
  .get(authMiddleware, getVinylOrders)        // Get user's vinyl orders
  .post(authMiddleware, saveVinylOrder);      // Create new vinyl order

router.route('/orders/:orderId')
  .delete(authMiddleware, deleteVinylOrder);  // Delete specific order
  
module.exports = router;
