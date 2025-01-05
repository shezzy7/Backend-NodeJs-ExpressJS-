// In this file we are going to create a model which will store user reveiews in it.

let mongoose = require("mongoose");

const {Schema} = mongoose;

let reviews_schema = new Schema({
    comment : {
        type : String,
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        required : true 
    },
    created_at : {
        type:Date,
        default : Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

let Review = mongoose.model("Review" , reviews_schema)
module.exports=Review;