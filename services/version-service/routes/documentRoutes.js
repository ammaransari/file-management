// routes/documentRoutes.js
const express = require('express');
const { createDocument } = require('../controllers/documentController');
const router = express.Router();
router.post('/', createDocument);
module.exports = router;
