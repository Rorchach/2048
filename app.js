var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '.'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));

app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


mongoose.connect('mongodb://www.csser.com/csser');

module.exports = app;

app.get('/', function(req, res){
  res.send(req.online.length + ' users online');
});

app.listen(8080);