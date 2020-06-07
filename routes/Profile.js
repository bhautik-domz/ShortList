var express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
var session_tmp;
const update=require('../models/signup');
const updateRouter = express.Router();

updateRouter.use(bodyParser.json());

/* GET users listing. */
updateRouter.route('/')
.get((req, res, next)=> {
  session_tmp=req.session;
  if(session_tmp.email)
  {
    res.render('profile', {fname:session_tmp.fname,lname:session_tmp.lname,gender:session_tmp.gender,email:session_tmp.email,
                            password:session_tmp.password,phoneno:session_tmp.phoneno
                         }); 
  }
  else
  {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

updateRouter.route('/data')
.post((req, res, next)=> {
  session_tmp=req.session;
  if(session_tmp.email)
  {
        update.updateOne({email:session_tmp.email},{$set:req.body})
        .then((data) => {
            res.redirect('/logout');
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

module.exports = updateRouter;
