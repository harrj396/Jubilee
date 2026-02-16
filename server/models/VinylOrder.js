const { Schema, model } = require("mongoose");

const vinylOrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  // Spotify track information
  trackId: {
    type: String,
    required: true
  },
  trackName: {
    type: String,
    required: true
  },
  artistName: {
    type: String,
    required: true
  },
  albumName: String,
  albumImage: String,
  previewUrl: String,
  durationMs: Number,

  // Vinyl customization options
  vinylColor: {
    type: String,
    enum: ['black', 'red', 'blue', 'green', 'clear', 'multicolor'],
    default: 'black'
  },
  vinylSize: {
    type: String,
    enum: ['7inch', '12inch'],
    default: '12inch'
  },
  // Shipping information
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'US'
    }
  },
  // Order status and pricing
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  estimatedDelivery: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

// Virtual for order summary
vinylOrderSchema.virtual('orderSummary').get(function() {
  return `${this.trackName} by ${this.artistName} on ${this.vinylColor} ${this.vinylSize} vinyl`;
});

const VinylOrder = model("VinylOrder", vinylOrderSchema);
module.exports = VinylOrder;