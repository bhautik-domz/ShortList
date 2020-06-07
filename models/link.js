var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var Schema = mongoose.Schema;

var link = new Schema({
    email :{
        type:String,
        required: true,
    },
    orignal:{
        type:String,
        required:true
    },
    short:{
        type:String,
        unique:true,
        required:true
    }
});


module.exports = mongoose.model('link',link);