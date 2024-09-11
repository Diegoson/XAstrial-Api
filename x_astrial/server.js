const express = require('express');
const axios = require('axios');
const qs = require('qs');
const cheerio = require('cheerio');
const app = express();
const port = 3000; 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const fb_dl = require('./function').fb_dl;
app.get('/api/fb_dl', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ error: 'url parameter is required' });
    } try {
        const results = await fb_dl(url); 
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }});
app.use(express.static('public')); 
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
          
