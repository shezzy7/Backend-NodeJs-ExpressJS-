
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");//for using requests like put/delete
let wrapAsync = require("./utils/wrapAsync.js");
let ExpressError = require("./utils/ExpressError.js");
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
//see all
app.get("/listings" ,wrapAsync(async  (req,res)=>{
    const listing = await Listing.find({});
    
    res.render("./listing/index.ejs",{listing});
}))
//add one
app.get("/listings/new" , async (req,res)=>{
    res.render("./listing/create.ejs")
});
app.post("/listings" ,wrapAsync( async (req,res,next)=>{
    //if user does not enter any data and press submit button then in this a error will be generated tho handle this we will first check whether our post request contains any data or not
    if(!req.body.listing){
        throw new ExpressError(400,"Please enter valid data")
    }
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
app.put("/listings/:id" ,wrapAsync(async  (req,res)=>{
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
    let {statusCode=500 , message="Something went wrong"} = err;
    res.status(statusCode).render("./listing/error.ejs" , {message});
})