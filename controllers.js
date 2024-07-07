const crypto = require('crypto');
const { client, Url } = require('./DB');
const consistentHashing = require('hashring');
const hr = new consistentHashing();

// add servers and their port numbers
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
    const isExist = await Url.get(server, urlId);
    if (isExist) {
        return res.send({'invalid':"this url already exists"});
    }
    url = new Url(url, urlId);
    url.store(server);
    return res.send({
        'urlId': url.urlId,
        'url':url.url,
        'server': server
    })
}

const getUrl = async (req, res)=>{
    const { urlId } = req.params;
    if (!urlId) {
        return res.status(404).json({ error: 'Missing input data' });
    }
    const server = hr.get(urlId);
    const url =  await Url.get(server, urlId);
    return res.send({
        'urlId': urlId,
        'url': url[0].url,
        'server': server
    })
}

module.exports = {
    add,getUrl
}
