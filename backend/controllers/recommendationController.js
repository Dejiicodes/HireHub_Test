// controllers/recommendationController.js
const Job = require('../models/Job');
const User = require('../models/User');

exports.recommendJobs = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const skills = user.skills;  // Assuming 'skills' is an array of user skills

    const jobs = await Job.find({ tags: { $in: skills } });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching job recommendations' });
  }
};
