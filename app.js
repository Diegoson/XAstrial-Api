const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authenticate = require('./middleware/authenticate');
const User = require('./models/user');
const userRoutes = require('./routes/user');
const generateApiKey = require('./utils/generateApiKey');

const app = express();
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.json());

app.use('/api', userRoutes);

app.get('/api/search/yt', authenticate, async (req, res) => {
  const query = req.query.query;
  let apiKey = req.query.api_key;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "query" is required' });
  }

  try {
    if (!apiKey || apiKey !== 'Diegoson') {
      apiKey = generateApiKey();       
    }

     const data = await searchYouTube(query);
    return res.json({ result: data, api_key: apiKey });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
