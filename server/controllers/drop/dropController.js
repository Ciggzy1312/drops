

const createDrop = async (req, res) => {
    res.status(200).json({ message: "Create drop" });
}

const getDrops = async (req, res) => {
    res.status(200).json({ message: "Get drops" });
}

const getDrop = async (req, res) => {
    res.status(200).json({ message: "Get drop by id" });
}

module.exports = { createDrop, getDrops, getDrop };