const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    email: { type: String, required:true },
    picture: String,
    authUserId: { type: String, required:true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }));


exports.User = User; 