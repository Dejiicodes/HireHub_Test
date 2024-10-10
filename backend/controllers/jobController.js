const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  const { title, description, skills } = req.body;
  try {
    const job = new Job({ title, description, skills, postedBy: req.userId });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: 'Error creating job' });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching jobs' });
  }
};
