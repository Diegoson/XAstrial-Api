const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const getMSG = path.join(__dirname, 'messages.json');

async function readMessages() {
    try {
        const messagesJson = await fs.readFile(getMSG, 'utf8');
        return JSON.parse(messagesJson);
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function writeMessagesToFile(messages) {
    try {
        await fs.writeFile(getMSG, JSON.stringify(messages, null, 2));
    } catch (error) {
        console.error(error);
    }
}

app.get('/api/messages', async (req, res) => {
    const messages = await readMessages();
    res.json(messages);
});

app.post('/api/messages', async (req, res) => {
    const { username, message } = req.body;
    const timestamp = new Date().toLocaleString();
    const newMessage = { username, message, timestamp };

    try {
        const messages = await readMessages();
        messages.push(newMessage);
        await writeMessagesToFile(messages);
        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).send('error message');
    }
});

app.get('/messages.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'messages.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
          
