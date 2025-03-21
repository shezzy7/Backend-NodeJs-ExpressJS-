
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");//for using requests like put/delete
const session = require("express-session");
const flash = require("connect-flash");
let ExpressError = require("./utils/ExpressError.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const port = 8080;
app.use(methodOverride("_method"));
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
    try{

        await mongoose.connect(Mongo_URL);
    }
    catch(err){
        console.log("An unexpected error occured while connecting to database" ,err )
    }
}
main()
//setting views dir as default path for ejs files.
app.set("views",path.join(__dirname,"views") );
app.set("view engine" , "ejs");//setting engine to execute ejs files.
app.use(express.urlencoded({extended:true}));//for reading coming from request.
app.engine('ejs' , ejsMate);
app.use(express.static(path.join(__dirname , "public")));
const sessionOptions = {
    secret : "mysupersecretoptions",
    resave:false,
    saveUninitialized:true,

    // If we go to github on a browser and sign-in to our account.And then exit from browser without loging-out then if we go to our github again through the same device and same browser before 7 days then our account will be loged in automatically.This is because github saved our login info in the form of cookies.And it has setted its expiry date for a week from current loged in.
    //So if we go to express documentation and there go to cookie and see options that we can pass to cookies we will an option expires and maxAge.In these variables we can set time for which our cookie will store given data.Bydefult expiry date for cookies in maximum browsers is that when someone exits from browser then cookies are expired,but we can set our expiry date.
    //Here in our code we are setting an expiry date for our cookies for a week and for this purpose we have to send time in milliseconds.
    cookie:{
        expires : Date.now()*7*24*60*60*1000, //here we are passing expiry date that from now to 7 days. 
        maxAge:7*24*60*60*1000,//in maxAge we pass the time passed above
        httpOnly : true
        //now if we to go our webpage and go to cookies there we will see an option named expires/maxAge inside this column our expiry date will be given.
    }
}
app.use(session(sessionOptions));
// we will use flash after using session and before using our routes
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next()
})
app.use("/listings" , listings);
app.use("/listings/:id/review" , reviews);//Variables values does not pass to child paths like :id value here will not be going to review.js file and will be accessible to app.js only.For making it accessible to chile paths we go to file of child paths like review here and there while calling router through express we pass an option in it which is {mergeParams:true} 
//a route handling invalid routes
app.all("*" , (req,res,next)=>{
    next(new ExpressError(404 , "Page not found!"))
})

//middleware
app.use((err,req,res,next)=>{
    let {statusCode=500 , message="Something  wrong"} = err;
    res.status(statusCode).render("./listing/error.ejs" , {message});
})