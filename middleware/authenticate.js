const User = require('./models/user');

const authenticate = async (req, res, next) => {
  const apiKey = req.header('Authorization')?.split(' ')[1];

  if (!apiKey) {
    return res.status(401).json({ message: 'API key is missing' });
  }

  try {
    const user = await User.findOne({ apiKey });
    if (!user) {
      return res.status(401).json({ message: 'Invalid API key' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = authenticate;
