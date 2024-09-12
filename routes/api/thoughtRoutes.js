const router = require('express').Router();
const { Thought, User } = require('../../models');

// Get all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a thought by id
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.id });
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new thought
router.post('/', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'Thought created but no user with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a thought
router.put('/:id', async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a thought
router.delete('/:id', async (req, res) => {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.id });
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    // Remove thought from user's thoughts array
    await User.findOneAndUpdate(
      { thoughts: req.params.id },
      { $pull: { thoughts: req.params.id } },
      { new: true }
    );
    res.json({ message: 'Thought deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a reaction to a thought
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Remove a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;