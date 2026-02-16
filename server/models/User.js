const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
       trim: true
    },
    email: {
      type: String,
      require: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    // Spotify integration fields
    spotifyId: {
      type: String,
      unique: true,
      sparse: true // Allows null values while maintaining uniqueness
    },
    spotifyAccessToken: String,
    spotifyRefreshToken: String,
    spotifyTokenExpiry: Date,

    // Reference to vinyl orders
    vinylOrders: [{
      type: Schema.Types.ObjectId,
      ref: "VinylOrder"
    }],

    // Saved favorite tracks for quick re-ordering
    favoriteTracks: [{
      trackId: String,
      trackName: String,
      artistName: String,
      albumName: String,
      albumImage: String
    }]
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.password; // Remove password from JSON output
        return ret;
      }
    }
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Validate password method
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Virtual for order count
userSchema.virtual("orderCount").get(function () {
  return this.vinylOrders.length;
});

// Check if Spotify token is expired
userSchema.methods.isSpotifyTokenExpired = function () {
  if (!this.spotifyTokenExpiry) return true;
  return Date.now() >= this.spotifyTokenExpiry;
};


const User = model("User", userSchema);
module.exports = User;
