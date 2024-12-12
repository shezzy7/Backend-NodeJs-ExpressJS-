
let express = require("express");
let app = express();
let mongoose = require("mongoose");
let path = require("path");
let Listing = require("./models/listing.js");
let port = 8080;
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

app.set("views",path.join(__dirname,"views") );
app.set("view engine" , "ejs");

 
app.get("/seeListings" ,async  (req,res)=>{
    const listing = await Listing.find({});
    console.log(listing);
    res.render("./listing/index.ejs",{listing});
})
  