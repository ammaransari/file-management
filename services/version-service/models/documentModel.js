// models/documentModel.js
const mongoose = require('mongoose');
const documentSchema = new mongoose.Schema({
    title: String,
    folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
    versions: [{
        version: String,
        fileUrl: String,
        uploadedAt: Date
    }]
});
module.exports = mongoose.model('Document', documentSchema);