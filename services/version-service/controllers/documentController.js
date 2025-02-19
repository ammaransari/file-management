// controllers/documentController.js
const Document = require('../models/documentModel');
exports.createDocument = async (req, res) => {
    const doc = new Document(req.body);
    await doc.save();
    res.status(201).json(doc);
};