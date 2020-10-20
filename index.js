// ***************** IMPORTS *****************//
const express = require('express');
const app = express();
const authRoute = require('./api/Routes/auth');
const db = require('./api/db/db');
const PORT = process.env.PORT;
var ejs = require('ejs');
var path = require('path');

/////////////////= IMPORTS DONE =/////////////////


// HOMEPAGE


// Middlewares below 

app
    .use(express.static(__dirname + '/public'))
    .use(express.urlencoded({extended:false}))
    .use(express.json())
    .use('/emp', authRoute)
    .set('view-engine', 'ejs')
    .listen(PORT, ()=>{
    console.log(`Connected to port ${PORT}`);
});
