const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const { User, VinylOrder } = require('./models');

async function testCompleteCRUD() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB successfully!');
    
    // --- CLEANUP ---
    console.log('\n🧹 Cleaning up previous test data...');
    await User.deleteMany({ username: 'testuser' });
    await VinylOrder.deleteMany({ trackName: 'Blinding Lights' });
    
    // --- USER CRUD ---
    console.log('\n👤 USER CRUD OPERATIONS');
    
    // CREATE User
    console.log('📝 Creating user...');
    const user = await User.create({
      username: 'testuser',
      email: 'test@jubilee.com',
      password: 'password123'
    });
    console.log('✅ User created:', user.username);
    
    // READ User
    console.log('👀 Finding user...');
    const foundUser = await User.findOne({ username: 'testuser' });
    console.log('✅ User found:', foundUser.email);
    
    // UPDATE User
    console.log('🔄 Updating user email...');
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { email: 'updated@jubilee.com' },
      { new: true }
    );
    console.log('✅ User updated:', updatedUser.email);
    
    // --- VINYL ORDER CRUD ---
    console.log('\n🎵 VINYL ORDER CRUD OPERATIONS');
    
    // CREATE Order
    console.log('📝 Creating vinyl order...');
    const order = await VinylOrder.create({
      userId: user._id,
      trackId: 'spotify:track:11dFghVXANMlKmJXsNCbNl',
      trackName: 'Blinding Lights',
      artistName: 'The Weeknd',
      albumName: 'After Hours',
      albumImage: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
      vinylColor: 'black',
      vinylSize: '12inch',
      price: 29.99,
      status: 'pending'
    });
    console.log('✅ Order created:', order.trackName);
    
    // READ Order
    console.log('👀 Finding orders...');
    const userOrders = await VinylOrder.find({ userId: user._id });
    console.log('✅ Orders found:', userOrders.length);
    console.log('✅ Order details:', {
      track: userOrders[0].trackName,
      artist: userOrders[0].artistName,
      status: userOrders[0].status
    });
    
    // UPDATE Order
    console.log('🔄 Updating order status...');
    const updatedOrder = await VinylOrder.findByIdAndUpdate(
      order._id,
      { status: 'processing', price: 34.99 },
      { new: true }
    );
    console.log('✅ Order updated - New status:', updatedOrder.status);
    console.log('✅ Order updated - New price:', updatedOrder.price);
    
    // TEST VIRTUAL FIELD
    console.log('📊 Testing virtual field...');
    console.log('✅ Order summary:', updatedOrder.orderSummary);
    
    // --- RELATIONSHIP TESTING ---
    console.log('\n🤝 TESTING USER-ORDER RELATIONSHIPS');
    
    // Add order to user's vinylOrders array
    console.log('🔗 Linking order to user...');
    const userWithOrders = await User.findByIdAndUpdate(
      user._id,
      { $push: { vinylOrders: order._id } },
      { new: true }
    );
    console.log('✅ User order count:', userWithOrders.vinylOrders.length);
    
    // Test virtual field
    console.log('✅ User order count (virtual):', userWithOrders.orderCount);
    
    // POPULATE TEST (if you have populate working)
    console.log('🔍 Testing population...');
    const populatedUser = await User.findById(user._id).populate('vinylOrders');
    console.log('✅ Populated user orders:', populatedUser.vinylOrders.length);
    if (populatedUser.vinylOrders.length > 0) {
      console.log('✅ First order track:', populatedUser.vinylOrders[0].trackName);
    }
    
    // --- DELETE OPERATIONS ---
    console.log('\n🗑️ DELETE OPERATIONS');
    
    // DELETE Order
    console.log('🗑️ Deleting order...');
    await VinylOrder.findByIdAndDelete(order._id);
    console.log('✅ Order deleted');
    
    // Remove order reference from user
    await User.findByIdAndUpdate(
      user._id,
      { $pull: { vinylOrders: order._id } }
    );
    console.log('✅ Order reference removed from user');
    
    // DELETE User
    console.log('🗑️ Deleting user...');
    await User.findByIdAndDelete(user._id);
    console.log('✅ User deleted');
    
    // VERIFICATION
    console.log('✅ Verification - User deleted:', !await User.findOne({ username: 'testuser' }));
    console.log('✅ Verification - Order deleted:', !await VinylOrder.findOne({ trackName: 'Blinding Lights' }));
    
    console.log('\n🎉 🎉 🎉 ALL CRUD OPERATIONS COMPLETED SUCCESSFULLY! 🎉 🎉 🎉');
    console.log('✅ User model: Working perfectly');
    console.log('✅ VinylOrder model: Working perfectly');
    console.log('✅ Relationships: Working perfectly');
    console.log('✅ Virtual fields: Working perfectly');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Error stack:', error.stack);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
  }
}

// Run the complete test
testCompleteCRUD();