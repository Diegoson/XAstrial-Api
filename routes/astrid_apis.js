const express = require('express');
const axios = require('axios');
const app = express();
const router = express.Router();
const config = require('../config.json');
app.use(express.json());

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

router.get('/downloader/instagram/:url', async (req, res) => {
  const url = req.params.url;
  try {
    const result = await instagram(url);
    res.json({
      data: result,
      apiOwner: config.NAME,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/search/playstore/:search', async (req, res) => {
  const search = req.params.search;
  try {
    const result = await PlayStore(search);
    res.json({
      data: result.data,
      apiOwner: config.NAME
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const GITHUB_API_URL = 'https://api.github.com/users/';
router.get('/stalker/github/user/:username', async (req, res) => {
    const username = req.params.username;
    const url = `${GITHUB_API_URL}${username}`;

    try {
        const response = await axios.get(url);

        const data = response.data;
        res.json({
            apiOwner: config.NAME,
            login: data.login,
            id: data.id,
            avatar_url: data.avatar_url,
            html_url: data.html_url,
            name: data.name,
            company: data.company,
            blog: data.blog,
            location: data.location,
            email: data.email,
            bio: data.bio,
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            created_at: data.created_at,
        });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
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
