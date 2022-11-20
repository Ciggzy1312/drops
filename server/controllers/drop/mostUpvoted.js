const Drop = require('../../models/drop');

const mostUpvoted = async (req, res) => {
    const drops = await Drop.find().sort({ upvotes: -1 }).limit(4).populate('author', 'username');

    res.status(200).json(drops);
}

module.exports = mostUpvoted;