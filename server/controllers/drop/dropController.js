const Drop = require('../../models/drop');

const createDrop = async (req, res) => {
    const { name, description, tags } = req.body;

    if(!name || !description || !tags) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    const drop = await Drop.create({
        name, description, tags, author: req.user.id
    });

    if(drop) {
        return res.status(201).json({ message: "Drop created", drop });
    } else {
        return res.status(400).json({ message: "Invalid drop data" });
    }
}

const getDrops = async (req, res) => {

    const drops = await Drop.find({}).populate('author', 'username');

    if(drops) {
        return res.status(200).json({ message: "Drops fetched", drops });
    } else {
        return res.status(400).json({ message: "Invalid drop data" });
    }
}

const getDrop = async (req, res) => {
    const drop = await Drop.findById(req.params.id).populate('author');

    if(drop) {
        return res.status(200).json({ message: "Drop fetched", drop });
    } else {
        return res.status(400).json({ message: "Invalid drop data" });
    }
}

const updateDrop = async (req, res) => {
    const { name, description, tags } = req.body;

    if(!name || !description || !tags) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    const drop = await Drop.findById(req.params.id);

    if(drop && (drop.author.toString() !== req.user.id)){
        return res.status(401).json({ message: "User not authorized to update this drop" });
    };

    const updatedDrop = await Drop.findByIdAndUpdate(req.params.id, {
        name, description, tags
    }, { new: true });

    if(drop) {
        return res.status(200).json({ message: "Drop updated", updatedDrop });
    } else {
        return res.status(400).json({ message: "Invalid drop data" });
    }
}

const deleteDrop = async (req, res) => {

    const drop = await Drop.findById(req.params.id);

    if (drop && (drop.author.toString() !== req.user.id)) {
        return res.status(401).json({ message: "User not authorized to delete this drop" });
    };

    const deletedDrop = await Drop.findByIdAndDelete(req.params.id);

    if(drop) {
        return res.status(200).json({ message: "Drop deleted", deletedDrop });
    } else {
        return res.status(400).json({ message: "Invalid drop data" });
    }
}

module.exports = { createDrop, getDrops, getDrop, updateDrop, deleteDrop };