const axios = require('axios');
const qs = require('querystring');
const { User } = require('../models');

module.exports = {
  // Redirect to Spotify authentication
  authSpotify: (req, res) => {
    const scopes = 'user-read-private user-read-email user-library-read user-read-playback-state user-modify-playback-state user-read-currently-playing';
    const authUrl = 'https://accounts.spotify.com/authorize?' +
      qs.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scopes,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        state: Math.random().toString(36).substring(7) // CSRF protection
      });
    res.redirect(authUrl);
  },

  // Handle Spotify callback
  spotifyCallback: async (req, res) => {
    try {
      const { code, state, error } = req.query;
      
      if (error) {
        return res.redirect(`${process.env.CLIENT_URL}/login?error=spotify_auth_failed`);
      }

      // Exchange code for tokens
      const tokenResponse = await axios.post('https://accounts.spotify.com/api/token',
        qs.stringify({
          code: code,
          redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
          grant_type: 'authorization_code'
        }),
        {
          headers: {
            'Authorization': 'Basic ' + Buffer.from(
              process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
            ).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const { access_token, refresh_token, expires_in } = tokenResponse.data;

      // Get user profile from Spotify
      const profileResponse = await axios.get('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': `Bearer ${access_token}` }
      });

      const spotifyUser = profileResponse.data;

      // Save or update user in database with Spotify tokens
      // You'll need to implement this based on your auth flow
      
      // Redirect to frontend with tokens (in production, use HTTP-only cookies)
            res.redirect(`${process.env.CLIENT_URL}/dashboard?spotify_connected=true&access_token=${access_token}`);

    } catch (error) {
      console.error('Spotify callback error:', error.response?.data || error.message);
      res.redirect(`${process.env.CLIENT_URL}/login?error=spotify_connection_failed`);
    }
  },

  // Get user's Spotify profile
  getSpotifyProfile: async (req, res) => {
    try {
      // This would require storing Spotify tokens in user model
      const user = await User.findById(req.user._id);
      
      if (!user.spotifyAccessToken) {
        return res.status(401).json({ message: 'Spotify not connected' });
      }

      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': `Bearer ${user.spotifyAccessToken}` }
      });

      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching Spotify profile', error: error.message });
    }
  },

  // Search tracks on Spotify
  searchTracks: async (req, res) => {
    try {
      const { q, type = 'track', limit = 10 } = req.query;
      const user = await User.findById(req.user._id);

      if (!user.spotifyAccessToken) {
        return res.status(401).json({ message: 'Spotify not connected' });
      }

      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: { 'Authorization': `Bearer ${user.spotifyAccessToken}` },
        params: { q, type, limit }
      });

      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Error searching tracks', error: error.message });
    }
  },

  // Get user's playlists
  getUserPlaylists: async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      if (!user.spotifyAccessToken) {
        return res.status(401).json({ message: 'Spotify not connected' });
      }

      const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: { 'Authorization': `Bearer ${user.spotifyAccessToken}` },
        params: { limit: 50 }
      });

      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching playlists', error: error.message });
    }
  }
};
