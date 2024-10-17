const mongoose = require('mongoose')
const { schema } = mongoose
const UserSchema = new mongoose.Schema ({
    name:{
        type : String,
        required:true
    },
    location:{
        type : String,
        required:true
    }, 
    email:{
        type : String,
        required:true
    },
     password:{
        type : String,
        required:true
    },
    date:{
        type : Date,
        default:Date.now,
        required : true
    },
});

module.exports = mongoose.model('user',UserSchema)