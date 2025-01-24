// we save our secret codes or any secret info in our .env file.env file is a special type of file for using it we also to instal an np which is dotenv
//for getting data from env we rquire it as require("dotenv").configh()
//and for fetching any variable save in our .env file we write process.env.varName
if(process.env.NODE_ENV!="production"){ //later we will be creating a variable in which we will be storing our level that whether we are working on production level or development level.And we will be using our env file only whene we will be in development level.
    require("dotenv").config()
}
console.log(process.env.CLOUD_NAME);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");//for using requests like put/delete
const session = require("express-session");
const flash = require("connect-flash");
let ExpressError = require("./utils/ExpressError.js");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const usersRouter = require("./routes/user.js");
const User = require("./models/user.js");
const passport = require("passport");
const localStrategy = require("passport-local");
const port = 8080;
const ejsMate = require("ejs-mate");//for using same navebar and footer in our all files.Mean we use this for upploading all the content of a file on another file.like here we we pasting all the data of navbar on each file using layout method.

//setting views dir as default path for ejs files.
app.set("views",path.join(__dirname,"views") );
app.set("view engine" , "ejs");//setting engine to execute ejs files.
app.use(express.urlencoded({extended:true}));//for reading coming from request.

app.use(methodOverride("_method"));
app.engine('ejs' , ejsMate);
app.use(express.static(path.join(__dirname , "public")));
app.listen(port,()=>{
    console.log("App is listening on port number",port);
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
app.use(flash());// we will use flash after using session and before using our routes
// for using passport in our code must be using session.This is because we know that in our single session we can move to different pages and while moving to all the pages our session will remain same , so in one session we don't need to log-in again and again
//first we need to initialize the passport through a middleware and then also call session for passport
app.use(passport.initialize());
app.use(passport.session());
// As here we will be using passport locally which means users will be logging-in manually adding their credentials.So we need to set localStrategy like as
passport.use(new localStrategy(User.authenticate()));
// we also need to add following middlewares in our code.
passport.serializeUser(User.serializeUser());//serialize mean storing a info of loged-in user to our session.Which means if a user loged-in to a website then all the info of this user will be stored in our session
passport.deserializeUser(User.deserializeUser());//deserializeUser means when user logs-out from website then remove all the info of that user from session.
app.use((req,res,next)=>{   //variabled defined in locals of res can be accessed directly in ejs templates
    res.locals.success = req.flash("success"); 
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;//our req.user contains info of user loged-in in current session
    next()
})
app.use("/listings" , listingsRouter);
app.use("/" , usersRouter);
app.use("/listings/:id/review" , reviewsRouter);//Variables values does not pass to child paths like :id value here will not be going to review.js file and will be accessible to app.js only.For making it accessible to chile paths we go to file of child paths like review here and there while calling router through express we pass an option in it which is {mergeParams:true} 
//a route handling invalid routes
app.all("*" , (req,res,next)=>{
    next(new ExpressError(404 , "Page not found!"))
})

//middleware
app.use((err,req,res,next)=>{
    let {statusCode=500 , message="Something  wrong"} = err;
    res.status(statusCode).render("./listing/error.ejs" , {message});
})

