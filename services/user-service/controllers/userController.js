// controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

exports.register = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
};
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  
      const isMatch = await Promise.resolve(bcrypt.compare(password, user.password));
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({ token, user: { id: user._id, email: user.email } });
    // console.log('process.env.JWT_SECRET', process.env.JWT_SECRET)
    // res.json({ user: { id: user._id, email: user.email }, isMatch: isMatch,  "--" :process.env.JWT_SECRET });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };