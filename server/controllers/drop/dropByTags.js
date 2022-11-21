const Drop = require('../../models/drop');

const dropByTags = async (req, res) => {
    const { tag } = req.body;
    
    try {
        const drops = await Drop.find({ tags: { $in: tag } }).limit(4).populate('author', 'username');
        res.status(200).json(drops);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = dropByTags;