// routes/folderRoutes.js
const express = require('express');
const { getRootFolders, createFolder } = require('../controllers/folderController');
const router = express.Router();
router.get('/viewstore', getRootFolders);
router.post('/', createFolder);
module.exports = router;