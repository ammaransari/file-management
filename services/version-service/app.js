// services/version-service/app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const documentRoutes = require('./routes/documentRoutes');

dotenv.config();
const app = express();
app.use(express.json());
app.use('/documents', documentRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Version Service DB Connected');
    app.listen(3003, () => console.log('Version Service running on port 3003'));
});