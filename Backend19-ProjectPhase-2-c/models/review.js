// In this file we are going to create a model which will store user reveiews in it.
const { required } = require("joi");
let mongoose = require("mongoose");
const { type } = require("os");
const {Schema} = mongoose;

let reviews_schema = new Schema({
    comment : {
        type : String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required : true 
    },
    created_at : {
        type:Date,
        default : Date.now()
    }
})

let Review = mongoose.model("Review" , reviews_schema)
module.exports=Review;