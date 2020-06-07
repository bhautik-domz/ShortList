var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

const contactus=require('../models/contactus');

const contactusRouter = express.Router();

contactusRouter.use(bodyParser.json());

/* GET users listing. */
contactusRouter.route('/')
.get((req, res, next)=> {
  res.redirect("/#contactus");
});

contactusRouter.route('/data')
.post((req, res, next)=> {
  contactus.create(req.body)
    .then((contact) => {
        console.log('Concate is Created ', contact);
        res.redirect("/");
        
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = contactusRouter;
