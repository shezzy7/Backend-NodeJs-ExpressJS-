//this is gonna be our first model in our project in which we will info about place/hotel/apartment to whome we are uploading on the wonderlust
let mongoose = require("mongoose");
let Review = require("./review.js");
const { type } = require("os");
const {Schema} = mongoose;
let listingSchema = new Schema({
    
    title: {
        type: String,
        required:true
        
    },
    description: {
        type: String,
        required:true
    },
    image: {
        type: String,
        //We are going to use set method here.Which help us in cheking that whether an image line is provided by the user or not if provided then it will set as main link for this entry else we will be setting a default image url for this entry.
        //Here in v it will get value of image provided by the user.If user does not provide any value then it will an empty string
        default : "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set : (v)=>v===""?"https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v
    },
    price: {
        type: Number,
        required:true
    },
    location: {
        type: String,
        required:true,
    },
    country: {
        type: String,
        required : true
    } , 
    reviews : [
        {
            type:Schema.Types.ObjectId,
            ref : "Review"
        }
    ]

});
// we want that when we delete a listing from our collection then all the reviews present in this listing must be also deleted from reviews collection.So for this purpose we use a mongoose middleware 
listingSchema.post("findOneAndDelete" , async (list)=>{

    if(list.reviews){
        await Review.deleteMany({_id:{$in:list.reviews}})
    }
})
let Listing = mongoose.model("Listing" , listingSchema);

module.exports = Listing;