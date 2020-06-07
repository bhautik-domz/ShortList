const session = require('express-session');
var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

var session_tmp;

const signup=require('../models/signup');

const signupRouter = express.Router();

signupRouter.use(bodyParser.json());

/* GET users listing. */
signupRouter.route('/')
.get((req, res, next)=> {
    session_tmp=req.session;
    if(session_tmp.email)
    {
        res.redirect('/');
    }
    else
    {
    res.render('signup');
    }
});

signupRouter.route('/data')
.post((req, res, next)=> {
    signup.create(req.body)
    .then((signup) => {
        console.log('\n Rigistration is Sucessful ', signup);
        res.redirect("/");
        
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = signupRouter;
