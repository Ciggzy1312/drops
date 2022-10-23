const mongoose = require('mongoose');

const dropSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    links: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link'
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
    },
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    tags: [{
        type: String,
        enum: ['technology', 'sports', 'songs']
    }],
    upvotes: [{
        type: String,
    }]
}, { timestamps: true });

module.exports = mongoose.model('Drop', dropSchema);