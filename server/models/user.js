const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    drops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drop',
    }],
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drop',
    }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);