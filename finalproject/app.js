const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const data = require('./routes/data');
const mongoose = require('mongoose');
const app = express();
const area = require('./routes/Area');
const keys = require('./models/keys');
const account = require('./routes/account');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://sid:4Ed9hBn6CWQAbu@ds121622.mlab.com:21622/finalproject');
const hub = require('./routes/hub')
var db=mongoose.connection;
db.on('connected',function(err){
    if(err){
    console.log(err);
    }
    else{
    console.log('connected');
    }
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/account',account);
app.use('/', index);
app.use('/data', data);
app.use('/hub',hub)
app.use('/area',area);
module.exports = app;
