let express = require("express");
let router = express.Router({mergeParams:true});//mergeParams provides us values of variables given in parent path
let wrapAsync = require("../utils/wrapAsync.js");
let ExpressError = require("../utils/ExpressError.js");
let {reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


//validate review
const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((err)=>err.message).join(",");
        throw new ExpressError(400 , errMsg);
    }
    next();
}
// add Review
router.post("/" ,validateReview,wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
   
    let review = new Review(req.body.review);
    
    list.reviews.push(review);
    await review.save();
    await list.save();
    req.flash("success","Review added sucessfully!");

    res.redirect(`/listings/${id}`);
}))
//delete a review
// for deleting a review we should also delete it from Review collection and also delete this id from listing.reviews array
router.delete("/:reviewId" , wrapAsync(async (req,res,next)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull:{reviews:reviewId}});//pull method is given by mongoose which pulls(pulling is like removing an element) specific element from a collection.Here we are finding a document in Listing with id and inside this documetn it will go to reviews array and inside this array it will a review with objectId equall to reviewId and will pull this entry out of reviews array.
    await Review.findByIdAndDelete(reviewId);//we will also remove 
    req.flash("success","Review Delted sucessfully!");

    res.redirect(`/listings/${id}`);
}))

module.exports = router;