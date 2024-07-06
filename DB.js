const { Client } = require('pg');
const consistentHashing = require('hashring');
const hr = new consistentHashing();

// add servers and we their port numbers
function addServer() {
    hr.add('5432')
    hr.add('5433')
    hr.add('5434')
}


// key is not needed to be the port number but any unique number that differentiate it from the rem servers
const client = {
    5432: new Client({
        "user": 'postgres',
        "password": process.env.password,
        "database": 'postgres',
        "host": 'localhost',
        "port": 5432,
    }),
    5433: new Client({
        "user": 'postgres',
        "password": process.env.password,
        "database": 'postgres',
        "host": 'localhost',
        "port": 5433,
    }),
    5434: new Client({
        "user": 'postgres',
        "password": process.env.password,
        "database": 'postgres',
        "host": 'localhost',
        "port": 5434,
    }),
};


async function connect() {
    try {
        await client['5432'].connect();
        await client['5433'].connect();
        await client['5434'].connect();
    } catch (err) {
        console.log(err.message)
    }
}

class Url{
    constructor(url, urlId) {
        this.url = url
        this.urlId = urlId
    }

   async store(server) {
        if (!this.url || !this.urlId) {
            throw new Error('Invalid Url object');
       }
       try {
           await client[server].query("INSERT INTO URL_TABLE (URL,URL_ID) values ($1,$2)",[this.url, this.urlId]);
       } catch (err) {
           throw err;
       }   
    }

}
module.exports = {
    addServer,
    client,
    Url,
    connect
}
