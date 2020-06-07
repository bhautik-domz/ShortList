var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var Schema = mongoose.Schema;

var contactus = new Schema({
    name :{
        type:String,
        default:'',
        require: true
    },
    email :{
        type:String,
        required: true,
        unique: true
    },
    phoneno:{
        type: Number,
        require: true
    },
    message:{
        type: String,
        default: '',
        require: true
    }
});


module.exports = mongoose.model('contactus',contactus);