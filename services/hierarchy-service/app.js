// services/hierarchy-service/app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const folderRoutes = require('./routes/folderRoutes');

dotenv.config();
const app = express();
app.use(express.json());
app.use('/folders', folderRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Hierarchy Service DB Connected');
    app.listen(3002, () => console.log('Hierarchy Service running on port 3002'));
});