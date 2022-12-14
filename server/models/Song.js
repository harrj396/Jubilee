const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const songSchema = new Schema({
    songText: {
        type: String,
        required: "No created album, yet!",
    },
    songArtist: {
        type: String,
        required: true,
        trim: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
});

const Song = model('Song', songSchema);

module.exports = Song;