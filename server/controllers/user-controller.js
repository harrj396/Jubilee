// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  // get a single user by either their id or their username
  async getSingleUser({ user = null, params }, res) {
     try {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],

        }).populate('vinylOrders'); // Populate vinyl orders

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
  } catch (error) {
          res.status(500).json({ message: 'Server error', error: error.message });
    }
     },

    // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    async createUser({ body }, res) {
      try {
      const user = await User.create(body);
      const token = signToken(user);
      res.json({ token, user });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Username or email already exists' });
      }
      res.status(400).json({ message: 'Something went wrong!', error: error.message });
    }
  },

  // login a user
  async login({ body }, res) {
    try {
      const user = await User.findOne({ 
        $or: [{ username: body.username }, { email: body.email }] 
      });
      
      if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
      }

      const correctPw = await user.isCorrectPassword(body.password);
      if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
      }

      const token = signToken(user);
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Save vinyl order
  async saveVinylOrder({ user, body }, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { 
          $addToSet: { 
            vinylOrders: {
              ...body,
              orderDate: new Date(),
              status: 'pending'
            } 
          } 
        },
        { new: true, runValidators: true }
      ).populate('vinylOrders');
      
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: 'Error saving order', error: error.message });
    }
  },
  
    // Get user's vinyl orders
  async getVinylOrders({ user }, res) {
    try {
      const foundUser = await User.findById(user._id).populate('vinylOrders');
      res.json(foundUser.vinylOrders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
  },

  // Delete vinyl order
  async deleteVinylOrder({ user, params }, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { vinylOrders: { _id: params.orderId } } },
        { new: true }
      ).populate('vinylOrders');
      
      if (!updatedUser) {
        return res.status(404).json({ message: "Couldn't find user with this id!" });
      }
      
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: 'Error deleting order', error: error.message });
    }
  }
};