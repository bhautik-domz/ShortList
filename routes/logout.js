var express = require('express');
const session = require('express-session');
var router = express.Router();

var session_tmp;

/* GET home page. */
router.get('/', function(req, res, next) {
  session_tmp=req.session;
  if(session_tmp.email)
  {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');

  }
  else
  {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
