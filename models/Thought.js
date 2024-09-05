const { Schema, model, Types } = require('mongoose'); // Import Schema, model, and Types from Mongoose

// Define schema for reactions to thoughts
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId, // Each reaction has unique ObjectId
      default: () => new Types.ObjectId() // Automatically generate a new ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280 // Reaction maxlength of 280 characters
    },
    username: {
      type: String, // The username of the person who reacted
      required: true
    },
    createdAt: {
      type: Date, // Date the reaction was created
      default: Date.now, // Default = current date and time
      get: timestamp => dateFormat(timestamp) // Use getter to format the date
    }
  },
  {
    toJSON: {
      getters: true // Include getters when converting to JSON
    },
    id: false // Disable the default `_id` field
  }
);

// Define schema for thoughts
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date, // Date the thought was created
      default: Date.now, // Default value is current date and time
      get: timestamp => dateFormat(timestamp) // Use a getter to format the date
    },
    username: {
      type: String, // The username of who posted thought
      required: true
    },
    reactions: [ReactionSchema] // Array of reactions, following the ReactionSchema structure
  },
  {
    toJSON: {
      virtuals: true, // Include virtuals when converting to JSON
      getters: true
    },
    id: false
  }
);

// Define a virtual property `reactionCount` to get the total number of reactions for a thought
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length; // Returns the length of the reactions array
});

const Thought = model('Thought', ThoughtSchema); // Create the Thought model using the ThoughtSchema

module.exports = Thought; // Export the Thought model
