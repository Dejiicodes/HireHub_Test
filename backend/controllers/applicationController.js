const Application = require('../models/Application');
const Job = require('../models/Job');

exports.applyToJob = async (req, res) => {
  const { jobId, proposal } = req.body;
  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const application = new Application({
      job: jobId,
      applicant: req.userId,
      proposal
    });
    await application.save();
    res.status(201).json({ message: 'Application submitted', application });
  } catch (err) {
    res.status(500).json({ error: 'Error submitting application' });
  }
};

exports.getApplicationsForJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    const applications = await Application.find({ job: jobId }).populate('applicant', 'name');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching applications' });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  const { appId } = req.params;
  const { status } = req.body;
  try {
    const application = await Application.findByIdAndUpdate(appId, { status }, { new: true });
    if (!application) return res.status(404).json({ error: 'Application not found' });
    res.json(application);
  } catch (err) {
    res.status(500).json({ error: 'Error updating application status' });
  }
};
