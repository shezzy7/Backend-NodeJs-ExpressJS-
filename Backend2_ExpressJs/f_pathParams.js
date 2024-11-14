//If we go on google and search for our instagram account like -> instagram/shahzad
//If will fecth my acount and will it on my screen.And like this millions of users are availabel on instagram , so does instagram company creates a new resposen path for each user as we do in routing file.
//No instead of this they use variables as path parameters.We can put any value in path and it will store it in a variable and on the base of this variables value , searc will take it to desired path.
//syntax -> app.get("/:varName", (req,res)=>{body})
const express = require("express");
let app = express();
app.listen(8080 , ()=>{
    console.log("Listening on port : ",8080);
})

app.get("/",(req,res)=>{
    res.send("Connected to root path");
})
/*
app.get("/:username",(req,res)=>{
    //here username will be taken as name of variable as has : before its name.
    //And whatever value will be passed to path it will stored in this variable.
    //and we can print it on screen
    //and this value will be availale in a method of req object 'params'.This params is also an object which cantains name of variables as its key and paths passed during runtime as their value.
    let {username} = req.params;
    res.send(`<h1>Welcome to @${username}!</h1>`);
})
*/
//we can pass as many variables as many we want like if we also want to pass id of username then
app.get("/:user/:id" , (req,res)=>{
    console.log(req.params);
    
})