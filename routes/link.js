const Str = require('@supercharge/strings')
var express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
var session_tmp;
const link=require('../models/link');
const linkRouter = express.Router();

linkRouter.use(bodyParser.json());
var random;

/* GET users listing. */
linkRouter.route('/')
.get((req, res, next)=> {
  session_tmp=req.session;
  if(session_tmp.email)
  { 
      var finaldata = [];
    link.find({'email':session_tmp.email})
        .then((data) => {
            
            res.render('links',{data:data,email:session_tmp.email,fname:session_tmp.fname,lname:session_tmp.lname,host:req.headers.host});
            
        }, (err) => next(err))
        .catch((err) => next(err));
  }
  else
  {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});


linkRouter.route('/:shorturl')
.get((req, res, next)=> {
    link.findOne({'short':req.params.shorturl})
    .then((url) => {
        if(url == null)
        {
            var err = new Error('Url Not Avaliable !....');
            err.status = 403;
            next(err);
        }
        else
        {
            res.redirect(url.orignal);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

linkRouter.route('/data')
.post((req, res, next)=> {
  session_tmp=req.session;
  if(session_tmp.email)
  {
    random = Str.random(5);
    link.create({email:session_tmp.email,orignal:req.body.url,short:random})
        .then((data) => {
            res.redirect('/link');
        }, (err) => next(err))
        .catch((err) => next(err));
  }
  else
  {
    res.redirect('/login?error=1');
  }
});

module.exports = linkRouter;
