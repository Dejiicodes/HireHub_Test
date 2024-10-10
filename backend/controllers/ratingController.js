// controllers/ratingController.js
const Rating = require('../models/Rating');

exports.addRating = async (req, res) => {
  const { toUserId, jobId, rating, review } = req.body;
  try {
    const newRating = new Rating({
      fromUser: req.userId,
      toUser: toUserId,
      job: jobId,
      rating,
      review
    });
    await newRating.save();
    res.status(201).json({ message: 'Rating submitted', newRating });
  } catch (err) {
    res.status(500).json({ error: 'Error submitting rating' });
  }
};

exports.getUserRatings = async (req, res) => {
  const { userId } = req.params;
  try {
    const ratings = await Rating.find({ toUser: userId }).populate('fromUser', 'name');
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching ratings' });
  }
};
