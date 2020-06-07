var express = require('express');
const session = require('express-session');
var router = express.Router();

var session_tmp;

/* GET home page. */
router.get('/', function(req, res, next) {
  session_tmp=req.session;
  if(session_tmp.email)
  {
    res.render('index', { email:session_tmp.email,fname:session_tmp.fname,lname:session_tmp.lname });
    
  }
  else
  {
    res.render('index', { title: 'Express' });
  }
});

module.exports = router;
