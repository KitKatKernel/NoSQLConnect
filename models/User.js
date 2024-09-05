const { Schema, model } = require('mongoose'); // Import Schema and model from Mongoose

const UserSchema = new Schema( // Define new Mongoose schema for User model
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String, 
      required: true, 
      unique: true,
      match: [/.+@.+\..+/, 'Must match a valid email address'] // RegEx to validate email format
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId, // Array of references to Thought model
        ref: 'Thought' // Links to Thought model
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId, // Array of references to other User models
        ref: 'User' // Links to User model
      }
    ]
  },
  {
    toJSON: {
      virtuals: true // Include virtuals when converting to JSON
    },
    id: false // Disable the default `_id` virtual field
  }
);

UserSchema.virtual('friendCount').get(function() { // Define virtual field 'friendCount'
  return this.friends.length; // Returns length of the friends array
});

// Create the User model using the UserSchema
const User = model('User', UserSchema); 

// Export User model
module.exports = User; 