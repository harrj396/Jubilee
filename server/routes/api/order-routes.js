const router = require('express').Router();
const {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  deleteOrder
} = require('../../controllers/order-controller');

const { authMiddleware } = require('../../utils/auth');

// All routes require authentication
router.route('/')
  .get(authMiddleware, getUserOrders)     // Get all user's orders
  .post(authMiddleware, createOrder);     // Create new order

router.route('/:orderId')
  .put(authMiddleware, updateOrderStatus) // Update order status
  .delete(authMiddleware, deleteOrder);   // Delete order

module.exports = router;