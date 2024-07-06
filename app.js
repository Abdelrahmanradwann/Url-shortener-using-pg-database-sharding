require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes')
const DB = require('./DB')

app.use(express.json())

DB.connect();

app.use(routes);


app.listen(process.env.PORT, async () => {
    console.log('Connected' );
})


