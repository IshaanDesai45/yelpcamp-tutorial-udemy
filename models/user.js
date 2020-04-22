let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
    username :String,
    password : String,
    
});

userSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User',userSchema);

module.exports = User ;