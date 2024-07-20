const express = require('express');
const router = express.Router();
const config = require('../config.json');

router.get('/lyrics/:title/:artist', async (req, res) => {
  try {
    const { title, artist } = req.params;
    const data = await geniusLyric(title, artist);
    res.json({
      data,
      apiOwner: config.NAME
    });
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});

module.exports = router;
