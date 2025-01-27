const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
let {listingSchema,reviewSchema} = require("./schema.js");
let ExpressError = require("./utils/ExpressError.js");

module.exports.validateListing = (req,res,next)=>{
    //this function will check whether given input is in correct formate if it is then it will call next method which will execute wrapAsync else this will throw a error
     
    let {error} = listingSchema.validate(req.body);
    
    if(error){
        // throw new ExpressError(400,"Entered data is incorrect or missing something")
        //we can also do a better thing which is that our error contains a property details which contains detail of each error.Inside this detail object there is a property which is message.So we can get messages and send them to client as our error message.For this first we have extract all the messages
        let errMsg = error.details.map((err)=>err.message).join(",");
        throw new ExpressError(400 , errMsg);
    }
    next();
}
//validate review
module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((err)=>err.message).join(",");
        throw new ExpressError(400 , errMsg);
    }
    next();
}
//islogedin
module.exports.isLoggedIn = (req,res,next)=>{
    //in our req object a property named 'originalUrl' through this property we can access name of path through which this request has beed asked for.For example if a user is not logged in and he tries to add a new list or edit a listing then in this case our server will ask him to login first we after successfully loggin our server should redirect our user to path he was asking for.To implement this feature we must get name of path for which user was asking and then we must save this path in some global variable like inside req.session
    
    if(!req.isAuthenticated()){ //isAuthenticated method is provided by passport which is used for authentication while is there any user logged-in in current session or not.If logged in then it will return true else false.
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in first!");
        return res.redirect("/login");
    }
    next()
}

// as we know that when a new user will login then all the data present in session object will be cleared so here above as we have stored originalUrl in session object but we want to use this one in our user.js file so for this we must store it in another variable or somewhere else from where we can access it easily.
//For this purpose we have defined middleware belowed.
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next()
}

// middleware that will check whether current user is the owner of that listing or not.He is the owner then we will allow him to edit.
module.exports.isOwner  = async (req,res,next)=>{
    let {id} =  req.params;
    let list = await Listing.findById(id);

    if(!(res.locals.currUser && res.locals.currUser._id.equals(list.owner._id))){
        req.flash("error","Sorry , you're not the owner of that listing!")
        return res.redirect(`/listings/${id}`)
    }
    next();
}

//only that user can delete a review who is the author of this review
module.exports.isAuthor = async (req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(review.author._id.equals(res.locals.currUser._id)){
        return next();
    }
    req.flash("error","You're not the author of this review!")
    res.redirect(`/listings/${id}`)
}