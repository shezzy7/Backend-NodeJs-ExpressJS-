let mongoose = require("mongoose");

let chatSchema = new mongoose.Schema({
    to:{
        type:String,
        required : true,
        maxLength:30
    } , 
    from : {
        type:String,
        required : true,
        maxLength:30
    },
    msg :{
        type:String,
        maxLength:50
    },
    created_At:{
        type:Date,

    }

})

let Chat = mongoose.model("Chat" , chatSchema);

module.exports = Chat;