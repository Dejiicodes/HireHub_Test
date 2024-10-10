// controllers/portfolioController.js
const Portfolio = require('../models/Portfolio');

exports.addPortfolioItem = async (req, res) => {
  const { title, description, projectUrl } = req.body;
  try {
    const newItem = new Portfolio({
      user: req.userId,
      title,
      description,
      projectUrl
    });
    await newItem.save();
    res.status(201).json({ message: 'Portfolio item added', newItem });
  } catch (err) {
    res.status(500).json({ error: 'Error adding portfolio item' });
  }
};

exports.getUserPortfolio = async (req, res) => {
  const { userId } = req.params;
  try {
    const portfolio = await Portfolio.find({ user: userId });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching portfolio' });
  }
};
