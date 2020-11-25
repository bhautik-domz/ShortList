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
    if(req.query.error >= 0 && session_tmp.email == null)
    {
        res.render('signup.ejs', {signup_error:req.query.error,data:req.query.data});
    }
    else if(session_tmp.email)
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
        
    }, (err) => {
        res.redirect('/signup?error=0&data='+err);
    });
});

module.exports = signupRouter;
