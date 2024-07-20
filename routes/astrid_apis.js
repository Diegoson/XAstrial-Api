const express = require('express');
const axios = require('axios');
const app = express();
const router = express.Router();
const config = require('../config.json');

router.get('/search/google', async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).send({ error: 'Missing query parameter' });
  }
  try {
    const response = await axios.get(`https://www.google.com/search`, {
      params: { q },
    });
    const results = response.data;
    res.send({
      data: results,
      apiOwner: config.NAME,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error searching Google' });
  }
});

router.get('/lyrics/:title/:artist', async (req, res) => {
  try {
    const { title, artist } = req.params;
    const data = await geniusLyric(title, artist);
    res.json({
      data,
      apiOwner: config.NAME,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use('/api', router);
});
