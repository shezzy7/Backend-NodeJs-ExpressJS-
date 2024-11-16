//The data which we show in our ejs tags will be mostly coming from databases.So we have to pass this data from there to our ejs files.
//we can pass data to our ejs files in following way

const express = require("express");
let app = express();
let path = require("path");
let port = 3000;
app.listen(port,()=>{
    console.log(`Listening on Port ${port}`);
})
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
//root path
app.get("/",(req,res)=>{
    res.send("hello to my world")
})
app.get("/diceroll",(req,res)=>{
    //We create a variable which will be generating value from 1-6 randomly.We assume that this variable is coming from a database and we have to pass this data to our ejs file.Then for sending it we write res.render("fileName",{key:variableName});Now in our ejs file we will access this value by this key name.We can also send varibale name only in curly braces

    let diceVal = Math.floor(Math.random()*6)+1;
    // res.render("diceroll.ejs" , {num:diceVal}); or
    res.render("diceroll" , {diceVal});
    
})
