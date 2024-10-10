const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  const { receiverId, message } = req.body;
  try {
    const newMessage = new Message({
      sender: req.userId,
      receiver: receiverId,
      message
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Error sending message' });
  }
};

exports.getMessages = async (req, res) => {
  const { receiverId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.userId, receiver: receiverId },
        { sender: receiverId, receiver: req.userId }
      ]
    }).sort('sentAt');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
};
