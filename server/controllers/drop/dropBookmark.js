const Drop = require('../../models/drop')
const User = require('../../models/user')

const bookmarkDrop = async (req, res) => {
    
    const drop = await Drop.findById(req.params.id);

    const user = await User.findById(req.user.id);

    if(!drop || !user) {
        return res.status(404).json({message: "Drop or User not found"});
    }

    if(drop.bookmarks.includes(user._id) && user.bookmarks.includes(drop._id)) {
        
        await drop.updateOne({$pull: {bookmarks: user._id}});
        await user.updateOne({$pull: {bookmarks: drop._id}});

        res.status(200).json({message: "Bookmark removed"});
    } else if(!drop.bookmarks.includes(user._id) && !user.bookmarks.includes(drop._id)) {
        
        await drop.updateOne({$push: {bookmarks: user._id}});
        await user.updateOne({$push: {bookmarks: drop._id}});

        res.status(200).json({message: "Bookmark added"});
    } else {
        if(drop.bookmarks.includes(user._id)) {
            await drop.updateOne({$pull: {bookmarks: user._id}});
        } else {
            await user.updateOne({$pull: {bookmarks: drop._id}});
        }
    }
}

module.exports = { bookmarkDrop };