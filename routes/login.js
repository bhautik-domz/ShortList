const session = require('express-session');
var express = require('express');
const bodyParser = require('body-parser');
const login=require('../models/signup');

var session_tmp;

const loginRouter = express.Router();

loginRouter.use(bodyParser.json());

/* GET users listing. */
loginRouter.route('/')
.get((req, res, next)=> {
    session_tmp=req.session;
    if(req.query.error >= 0 && session_tmp.email == null)
    {
        res.render('login.ejs', {login_error:req.query.error});
    }
    else if(session_tmp.email)
    {
        res.redirect('/');
    }
    else{
        res.render('login');
    }
});

loginRouter.route('/data')
.post((req, res, next)=> {  
    login.findOne({'email':req.body.email,'password':req.body.password})
    .then((logindata) => {
        if(logindata == null)
        {
            res.redirect('/login?error=0');
        }
        else
        {
            session_tmp=req.session;
            session_tmp.email=logindata.email;
            session_tmp.fname=logindata.fname;
            session_tmp.lname=logindata.lname;
            session_tmp.gender=logindata.gender;
            session_tmp.phoneno=logindata.phoneno;
            session_tmp.password=logindata.password;
            session_tmp.id=logindata._id;
            console.log("Currently Login User "+ logindata);
            res.redirect('/link');
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = loginRouter;
