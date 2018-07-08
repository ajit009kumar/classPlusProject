"use strict"
var express = require('express');
var app = express();
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const passport = require('passport');
const config = require('./../config');

require('./models').connect('mongodb://localhost:27017/classplus');


app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json({ limit: '50gb' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(express.static('public'));

const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

const authCheckMiddleware = require('./middleware/auth-check');
app.use('/api', authCheckMiddleware);

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use((req, res, next) => {
    // set headers in each response
    res.set({
      'Access-Control-Allow-Origin': '*', // req.header('origin')
      'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,HEAD,DELETE',
      'Access-Control-Allow-Headers': 'Authorization,Content-Type,Accept,Accept-Language,Content-Encoding,X-Requested-With',
    });
    return next();
  });


app.get('*',function(req,res){
	res.sendFile(path.resolve(__dirname,'./../public','index.html'))
})

app.set('port', (process.env.PORT || 3000));

app.listen(3000,function(){
	console.log('app is listening on port 3000');
})
