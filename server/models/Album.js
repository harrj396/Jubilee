const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
// import Song from './Song';

const albumSchema = new Schema({
  albumText: {
    type: String,
    required: "No created album, yet!",
  },
  albumAuthor: {
    type: String,
    required: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  albumSongs: [
    // Song
  ],
});

// const songSchema = new Schema({
//   songName: {
//     type: String,
//     required: "Let's look for some songs!",
//     minlength: 4,
//     maxlength: 10,
//     trim: true,
//   },
//   songArtist: {
//     type: String,
//     required: true,
//     trim: true,
//   },
// });


const Album = model('Album', albumSchema);

module.exports = Album;
