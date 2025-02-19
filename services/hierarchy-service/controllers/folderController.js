// controllers/folderController.js
const Folder = require('../models/folderModel');
exports.getRootFolders = async (req, res) => {
    const folders = await Folder.find({ parentFolder: null });
    res.json(folders);
};
exports.createFolder = async (req, res) => {
    console.log("======");
    
    const folder = new Folder(req.body);
    await folder.save();
    res.status(201).json(folder);
};