const Link = require('../../models/link');
const Drop = require('../../models/drop');

const { extract } = require('../../helper/extract')

const addLink = async (req, res) => {
    const { url } = req.body;

    const existingLink = await Link.findOne({ url });
    const drop = await Drop.findById(req.params.id);

    if(!drop) {
        return res.status(404).json({message: "Drop not found"});
    }

    if (existingLink) {
        if(drop.links.includes(existingLink._id)) {
            return res.status(400).json({ message: 'Link already exists' });
        } else {
            await drop.updateOne({ $push: { links: existingLink._id } });
            return res.status(200).json({ message: 'Link added' });
        }
    } else {

        const val = await extract(url);

        const link = await Link.create({
            title: val.og.title,
            url: val.og.url,
            description: val.og.description,
            image: val.og.image,
        });

        if(!link) {
            return res.status(400).json({message: "Link not created"});
        }

        if(drop.links.includes(link._id)) {
            return res.status(400).json({ message: 'Link already exists' });
        } else {
            await drop.updateOne({ $push: { links: link._id } });
            return res.status(200).json({ message: 'Link added' });
        }
    }
}

module.exports = { addLink };