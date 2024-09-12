const mongoose = require('mongoose');
const { User, Thought } = require('./models');

mongoose.connect('mongodb://localhost/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Seed user data
const userData = [
  {
    username: 'lernantino',
    email: 'lernantino@techfriends.dev',
  },
  {
    username: 'thinkerer',
    email: 'thinkerer@techfriends.dev',
  },
  {
    username: 'codingwizard',
    email: 'codingwizard@techfriends.dev',
  },
];

// Seed thought data
const thoughtData = [
  {
    thoughtText: 'Here\'s a cool thought...',
    username: 'lernantino',
  },
  {
    thoughtText: 'Have you ever wondered about the vastness of the universe?',
    username: 'thinkerer',
  },
  {
    thoughtText: 'Coding is like solving puzzles with logic!',
    username: 'codingwizard',
  },
];

// Function to actually seed the db
const seedDatabase = async () => {
  try {
    // Clear the database
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create users
    const createdUsers = await User.create(userData);

    // Create thoughts and associate them with users
    for (let i = 0; i < thoughtData.length; i++) {
      const thought = await Thought.create(thoughtData[i]);
      const user = createdUsers.find(user => user.username === thought.username);
      user.thoughts.push(thought._id);
      await user.save();
    }

    console.log('Database seeded!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();