const router = require('express').Router(); // Import express Router
const userRoutes = require('./userRoutes'); // Import userRoutes
const thoughtRoutes = require('./thoughtRoutes'); // Import thoughtRoutes

// User-related routes
router.use('/users', userRoutes); 
// Thought-related routes
router.use('/thoughts', thoughtRoutes); 

// Export the router
module.exports = router; 