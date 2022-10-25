const { parser } = require('html-metadata-parser');

const extract = async (url) => {
    const result = await parser(url);
    return result;
}

module.exports = { extract };