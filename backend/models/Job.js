// models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],  // Add job tags (e.g. "web development", "design")
  postedAt: { type: Date, default: Date.now }
  // Other fields...
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
