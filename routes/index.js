const router = require('express').Router(); // Import express
const apiRoutes = require('./api'); // Import API routes from /api

router.use('/api', apiRoutes);

// Catch-all route
router.use((req, res) => { 
  return res.send('Wrong route dummy!');
});

// Export router
module.exports = router; 