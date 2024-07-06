const crypto = require('crypto');
const { client, Url } = require('./DB');
const consistentHashing = require('hashring');
const hr = new consistentHashing();

// add servers and we their port numbers

hr.add('5432')
hr.add('5433')
hr.add('5434')


const add = async (req, res, next) => {
    let url = req.query.url;
    if (!url) {
        return res.status(404).json({ error: 'Url not found' });
    }
    const hashedUrl = crypto.createHash('sha256').update(url).digest('hex');
    const urlId = hashedUrl.substring(0, 5);
    const server = hr.get(urlId);
    url = new Url(url, urlId);
    url.store(server);
    return res.send({
        'urlId': url.urlId,
        'url':url.url,
        'server': server
    })
}

module.exports = {
    add
}
