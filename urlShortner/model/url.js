const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    shortId :{
        type : String,
        required : true,
        unique : true,
    },
    redirectUrl : {
        required: true,
        type :  String,
    },
    visitHistory : [{timestamp : {type : Number}}],
}, {timestamps : true});
const URL = mongoose.model('url' , urlSchema);
module.exports = URL;
