
let express = require("express");
let app = express();
let mongoose = require("mongoose");
let path = require("path");
let Listing = require("./models/listing.js");
let methodOverride = require("method-override");
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
app.use(express.urlencoded({extended:true}));
 
//see all
app.get("/listings" ,async  (req,res)=>{
    const listing = await Listing.find({});
    
    res.render("./listing/index.ejs",{listing});
})
//add one
app.get("/listings/new" , async (req,res)=>{
    res.render("./listing/create.ejs")
});
app.post("/listings" , async (req,res)=>{
    let list = new Listing(req.body.listing);
    
    await list.save(list);
    res.redirect("/listings");
})
//see one
app.get("/listings/:id" ,async (req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    res.render("./listing/show.ejs" , {list});
});

//edit
app.get("/listings/:id/edit" , async (req,res)=>{

    let {id} = req.params;
    let list = await Listing.findById(id);
    res.render("./listing/edit.ejs",{list});

})

app.use(methodOverride("_method"));
app.put("/listings/:id" ,async  (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id , {...req.body.listing});
    res.redirect("/listings");
})
//delete
app.delete("/listings/:id" , async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})