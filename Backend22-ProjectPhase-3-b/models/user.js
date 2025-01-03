let mongoose = require("mongoose");
const {Schema} = mongoose;
const passportLocalMongoose = require("passport-local-mongoose")
let userSchema = new Schema({
    email:{
        type:String,
        required:true
    }
    //here we are using passport-local-mongoose as a plugin for user.And this plugin adds username and password bydefault in our schema and we don't need to write them here.And also this plugin adds functionality of salting and hashing to our schema.
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
