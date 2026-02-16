const router = require('express').Router();
const {
  authSpotify,
  spotifyCallback,
  getSpotifyProfile,
  getUserPlaylists,
  searchTracks,
  refreshSpotifyToken
} = require('../../controllers/spotify-controller');

const { authMiddleware } = require('../../utils/auth');

// Spotify authentication flow
router.get('/auth', authSpotify);
router.get('/callback', spotifyCallback);

// Spotify data routes (require authentication)
router.get('/profile', authMiddleware, getSpotifyProfile);
router.get('/playlists', authMiddleware, getUserPlaylists);
router.get('/search', authMiddleware, searchTracks);
router.post('/refresh', authMiddleware, refreshSpotifyToken);

module.exports = router;