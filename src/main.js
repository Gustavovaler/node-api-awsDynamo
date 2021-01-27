const express = require('express');
const app = express();
require('dotenv').config({path: __dirname + '/.env'})

//middleware
app.use(express.json());

//routes

app.use(require('./router/index'));

//settings

app.set('port', process.env.port || 3000)

//server

app.listen(app.get('port'), () => {
    console.log(`Server running at port ${app.get('port')}`);
});