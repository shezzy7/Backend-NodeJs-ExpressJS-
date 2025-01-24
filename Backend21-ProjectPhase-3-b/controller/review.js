
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
   
    let review = new Review(req.body.review);
    //the user who is currently loged will be the author of that review
    review.author = req.user;
    list.reviews.push(review);
    await review.save();
    await list.save();
    req.flash("success","Review added sucessfully!");

    res.redirect(`/listings/${id}`);
}

module.exports.destroyReview = async (req,res,next)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull:{reviews:reviewId}});//pull method is given by mongoose which pulls(pulling is like removing an element) specific element from a collection.Here we are finding a document in Listing with id and inside this documetn it will go to reviews array and inside this array it will a review with objectId equall to reviewId and will pull this entry out of reviews array.
    await Review.findByIdAndDelete(reviewId);//we will also remove 
    req.flash("success","Review Delted sucessfully!");

    res.redirect(`/listings/${id}`);
}