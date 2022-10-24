const Drop = require('../../models/drop');
const User = require('../../models/user');

const upvoteDrop = async (req, res) => {
    const drop = await Drop.findById(req.params.id);

    const user = await User.findById(req.user.id);

    if(!drop || !user) {
        return res.status(404).json({message: "Drop or User not found"});
    }

    if(drop.upvotes.includes(user._id)) {
        
        await drop.updateOne({$pull: {upvotes: user._id}});

        res.status(200).json({message: "Upvote removed"});
    } else {
            
        await drop.updateOne({$push: {upvotes: user._id}});
    
        res.status(200).json({message: "Upvote added"});
    }
}

module.exports = { upvoteDrop };