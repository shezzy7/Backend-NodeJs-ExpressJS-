//this is gonna be our first model in our project in which we will info about place/hotel/apartment to whome we are uploading on the wonderlust
let mongoose = require("mongoose");
let Review = require("./review.js");
let User = require("./user.js");
const { type } = require("os");
const { Schema } = mongoose;
let listingSchema = new Schema({

    title: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true
    },
    image: {
        // now we are changing oru schema for image
        url:String,
        filename:String,
        
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    // here we will be adding the id of user creating this listing
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
});
// we want that when we delete a listing from our collection then all the reviews present in this listing must be also deleted from reviews collection.So for this purpose we use a mongoose middleware 
listingSchema.post("findOneAndDelete", async (list) => {

    if (list.reviews) {
        await Review.deleteMany({ _id: { $in: list.reviews } })
    }
})
let Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;