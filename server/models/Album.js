const { Schema, model } = require("mongoose");

const songSchema = new Schema({
  spotifyId: {
    type: String,
    required: true,
  },
  songTitle: {
    type: String,
    required: "You need a song title!",
    trim: true,
  },
  songArtist: {
    type: String,
    required: true,
    trim: true,
  }
});

const albumSchema = new Schema({
  albumTitle: {
    type: String,
    required: "You need a album title!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  albumArtist: {
    type: String,
    trim: true
  },
  songs: [songSchema],
});

const Album = model('Album', albumSchema);

module.exports = Album;
