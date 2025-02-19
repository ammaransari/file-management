const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();
app.use(express.json());
app.use('/', userRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('User Service DB Connected');
    app.listen(3001, () => console.log('User Service running on port 3001'));
});