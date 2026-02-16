const { VinylOrder } = require('../models');
const { User } = require('../models');

module.exports = {
  // Create new vinyl order
  async createOrder({ user, body }, res) {
    try {
      const orderData = {
        ...body,
        userId: user._id,
        orderDate: new Date(),
        status: 'pending'
      };

      const order = await VinylOrder.create(orderData);

      // Also add to user's orders array
      await User.findByIdAndUpdate(
        user._id,
        { $push: { vinylOrders: order._id } }
      );

      const populatedOrder = await VinylOrder.findById(order._id)
        .populate('userId', 'username email');
      
      res.status(201).json(populatedOrder);
    } catch (error) {
      res.status(400).json({ message: 'Error creating vinyl order', error: error.message });
    }
  },

  // Get user's orders
  async getUserOrders({ user }, res) {
    try {
      const orders = await VinylOrder.find({ userId: user._id })
        .sort({ orderDate: -1 })
        .populate('userId', 'username email');
      
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching vinyl orders', error: error.message });
    }
  },

  // Update order status
  async updateOrderStatus({ params, body }, res) {
    try {
      const order = await VinylOrder.findByIdAndUpdate(
        params.orderId,
        { status: body.status },
        { new: true, runValidators: true }
      ).populate('userId', 'username email');
      
      if (!order) {
        return res.status(404).json({ message: 'Vinyl Order not found' });
      }
      
      res.json(order);
    } catch (error) {
      res.status(400).json({ message: 'Error updating vinyl order', error: error.message });
    }
  },

  // Delete order
  async deleteOrder({ params }, res) {
    try {
      const order = await VinylOrder.findByIdAndDelete(params.orderId);
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      // Also remove from user's orders array
      await User.findByIdAndUpdate(
        order.userId,
        { $pull: { vinylOrders: order._id } }
      );
      
      res.json({ message: 'Vinyl Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
  }
};