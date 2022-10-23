const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    url: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Link', linkSchema);