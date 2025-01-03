const express = require("express");
const router = express.Router({mergeParams:true});//mergeParams provides us values of variables given in parent path
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isAuthor} = require("../middleware.js");
const reviewController = require("../controller/review.js")


// add Review
router.post("/" ,isLoggedIn,validateReview,wrapAsync(reviewController.createReview))
//delete a review
// for deleting a review we should also delete it from Review collection and also delete this id from listing.reviews array
router.delete("/:reviewId" ,isLoggedIn,isAuthor, wrapAsync(reviewController.destroyReview))

module.exports = router;