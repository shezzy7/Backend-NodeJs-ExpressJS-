
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");//for using requests like put/delete
let wrapAsync = require("./utils/wrapAsync.js");
let ExpressError = require("./utils/ExpressError.js");
let listingSchema = require("./schema.js");
app.use(methodOverride("_method"));
const port = 8080;

const ejsMate = require("ejs-mate");//for using same navebar and footer in our all files.Mean we use this for upploading all the content of a file on another file.like here we we pasting all the data of navbar on each file using layout method.
app.listen(port,()=>{
    console.log("App is listening on port number",port);
})
app.get("/",(req,res)=>{
    res.send("Root working");
})
// conecting database
let Mongo_URL = "mongodb://127.0.0.1:27017/wonderlust";
async function main(){
    await mongoose.connect(Mongo_URL);
}
main().then(res=>{
    console.log("Database connected successfully");
}).catch(err=>{
    console.log("Some error occured in connecting with database");
})
//setting views dir as default path for ejs files.
app.set("views",path.join(__dirname,"views") );
app.set("view engine" , "ejs");//setting engine to execute ejs files.
app.use(express.urlencoded({extended:true}));//for reading coming from request.
app.engine('ejs' , ejsMate);
app.use(express.static(path.join(__dirname , "public")));
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
//see all
app.get("/listings" ,wrapAsync(async  (req,res)=>{
    const listing = await Listing.find({});
    
    res.render("./listing/index.ejs",{listing});
}))
//add one
app.get("/listings/new" , async (req,res)=>{
    res.render("./listing/create.ejs")
});
app.post("/listings" ,validateListing , wrapAsync( async (req,res,next)=>{
    //if user does not enter any data and press submit button then in this a error will be generated tho handle this we will first check whether our post request contains any data or not
    //let result = listingSchema.validate(req.body);//this will validate that user's input fine or not according to our defined schema's constraints.
    // if(result.error){
    //     throw new ExpressError(400 , "Please enter all the fields in correct syntax");
    // }
    // if(!req.body.listing){ //Now we don't need this as our joi is working such type of functionality for us.
    //     throw new ExpressError(400,"Please enter valid data")
    // }
    let list = new Listing(req.body.listing);//fetching data from request body.As we have named each input section as a key of an object named lisitng.
    console.log(list)
    await list.save().then(res=>{
        console.log(res);
    });
    res.redirect("/listings");
    
}))
//see one
app.get("/listings/:id" ,wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    res.render("./listing/show.ejs" , {list});
}));

//edit
app.get("/listings/:id/edit" ,wrapAsync( async (req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    res.render("./listing/edit.ejs",{list});
}))
app.put("/listings/:id" ,validateListing,wrapAsync(async  (req,res)=>{
    let result = listingSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400 , "Invalid data entered or something missing.Please recheck!")
    }
    let {id} = req.params; 
    await Listing.findByIdAndUpdate(id , {...req.body.listing});
    res.redirect("/listings");
}))
//delete
app.delete("/listings/:id" , wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}))

//a route handling invalid routes
app.all("*" , (req,res,next)=>{
    next(new ExpressError(404 , "Page not found!"))
})

//middleware
app.use((err,req,res,next)=>{
    let {statusCode=500 , message="Something  wrong"} = err;
    res.status(statusCode).render("./listing/error.ejs" , {message});
})