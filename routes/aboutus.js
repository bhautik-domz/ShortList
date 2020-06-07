var express = require('express');
var router = express.Router();
const session = require('express-session');
var session_tmp;

/* GET users listing. */
router.get('/', function(req, res, next) {
  session_tmp=req.session;
  if(session_tmp.email)
  {
    res.render('about', { email:session_tmp.email,fname:session_tmp.fname,lname:session_tmp.lname });
    
  }
  else
  {
    res.render('about', { title: 'Express' });
  }
});

module.exports = router;
