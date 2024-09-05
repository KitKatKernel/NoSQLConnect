const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/socialNetworkDB', {
  // Use the new URL parser to avoid deprecation warnings
  useNewUrlParser: true, 
  // Using topology engine for better connection management
  useUnifiedTopology: true, 
});

// Export connection object
module.exports = mongoose.connection; 
