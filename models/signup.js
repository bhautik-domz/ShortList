var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var Schema = mongoose.Schema;

var signup = new Schema({
    fname :{
        type:String,
        default:'',
        require: true
    },
    lname :{
        type:String,
        default:'',
        require: true
    },
    email :{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        unique: true
    },
    phoneno:{
        type: Number,
        require: true
    },
    gender:{
        type: String,
        default: '',
        require: true
    }
});


module.exports = mongoose.model('signup',signup);