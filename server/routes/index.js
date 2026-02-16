const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ message: 'Jubilee API is running!' });
});

// Serve up react front-end in production
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

// Error handling middleware
router.use((error, req, res, next) => {
  console.error('Route error:', error);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

module.exports = router;
