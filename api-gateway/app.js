// api-gateway/app.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const authMiddleware = require('./utils/authMiddleware');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/users', async (req, res) => {
    const response = await axios(`http://user-service:3001${req.url}`, { method: req.method, data: req.body });
    res.json(response.data);
});

// app.use('/api/folders', (req, res) => {¸
//     res.json({
//         url: req.url,
//         method: req.method,
//         body: req.body
//     });
// });

app.use('/api/folders',authMiddleware, async (req, res) => {
    try {
        // Forward the request to hierarchy-service
        const response = await axios({
            url: `http://hierarchy-service:3002${req.url}`,
            method: req.method,
            data: req.body
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error forwarding request:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use('/api/documents',authMiddleware, async (req, res) => {
    const response = await axios(`http://version-service:3003${req.url}`, { method: req.method, data: req.body });
    res.json(response.data);
});

app.listen(3000, () => logger.info('API Gateway running on port 3000'));