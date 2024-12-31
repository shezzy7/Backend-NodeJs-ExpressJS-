let express = require("express");
let router = express.Router();
let wrapAsync = require("../utils/wrapAsync.js");
let ExpressError = require("../utils/ExpressError.js");
let {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");

const validateListing = (req,res,next)=>{
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

//listings

//see all
router.get("/" ,wrapAsync(async  (req,res)=>{

    const listing = await Listing.find({});
    res.render("./listing/index.ejs",{listing});
}))
//add one
router.get("/new" , async (req,res)=>{
    res.render("./listing/create.ejs")
});
router.post("/add" ,validateListing , wrapAsync( async (req,res,next)=>{
    //if user does not enter any data and press submit button then in this a error will be generated tho handle this we will first check whether our post request contains any data or not
    //let result = listingSchema.validate(req.body);//this will validate that user's input fine or not according to our defined schema's constraints.
    // if(result.error){
    //     throw new ExpressError(400 , "Please enter all the fields in correct syntax");
    // }
    // if(!req.body.listing){ //Now we don't need this as our joi is working such type of functionality for us.
    //     throw new ExpressError(400,"Please enter valid data")
    // }
    let list = new Listing(req.body.listing);//fetching data from request body.As we have named each input section as a key of an object named lisitng.
    
    await list.save();
    req.flash("success","New Listing added successfully!");
    res.redirect("/listings");
    
}))
//see one
router.get("/:id" ,wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id).populate("reviews");
    if(!list){
        req.flash("error","Listing you are asking for does not exists!")

        res.redirect("/listings");
    }
    res.render("./listing/show.ejs" , {list});
}));

//edit
router.get("/:id/edit" ,wrapAsync( async (req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    if(!list){
        req.flash("error","Listing you are asking for does not exists!")

        res.redirect("/listings");
    }
    res.render("./listing/edit.ejs",{list});
}))
router.put("/:id" ,validateListing,wrapAsync(async  (req,res)=>{
    
    let {id} = req.params; 
    await Listing.findByIdAndUpdate(id , {...req.body.listing});
    req.flash("success","Listing Updated!");
    
    res.redirect(`/listings/${id}`);
}))
//delete
router.delete("/:id" , wrapAsync(async (req,res)=>{
    let {id} = req.params;
    
    
    // let result = await Listing.findById(id);
    // await Review.deleteMany({_id:{$in:res.orders}})
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted Successfully!");

    res.redirect("/listings");
}))

module.exports = router;