const Drop = require('../../models/drop');

const createDrop = async (req, res) => {
    const { name, description, tags } = req.body;

    if(!name || !description || !tags) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    const drop = await Drop.create({
        name, description, tags
    });

    if(drop) {
        return res.status(201).json({ message: "Drop created", drop });
    } else {
        return res.status(400).json({ message: "Invalid drop data" });
    }
}

const getDrops = async (req, res) => {
    res.status(200).json({ message: "Get drops" });
}

const getDrop = async (req, res) => {
    res.status(200).json({ message: "Get drop by id" });
}

module.exports = { createDrop, getDrops, getDrop };