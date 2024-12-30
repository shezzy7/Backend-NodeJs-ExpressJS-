
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");//for using requests like put/delete
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

app.use("/listings" , listings);
app.use("/listings/:id/review" , reviews);//Variable values does not pass to child paths like :id value here will not be going to review.js file and will be accessible to app.js only.For making it accessible to chile paths we go to file of child paths like review here and there while calling router through express we pass an option in it which is {mergeParams:true} 
//a route handling invalid routes
app.all("*" , (req,res,next)=>{
    next(new ExpressError(404 , "Page not found!"))
})

//middleware
app.use((err,req,res,next)=>{
    let {statusCode=500 , message="Something  wrong"} = err;
    res.status(statusCode).render("./listing/error.ejs" , {message});
})