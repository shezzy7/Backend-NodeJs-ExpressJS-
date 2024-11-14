//Routing is a concept of selecting a path for traffic in a network or between or across multiple networks.
//Mean if we want to send response for a speacific path or wanna send multiple responses for multiple paths then we can do this using get method of app object.get methos takes two parameters one is path and other is callback.This is alternate of use method for sending response but it is used when we have to send some specific responses for specific paths.

const express = require('express');
let app = express();
let port = 8080;
app.listen(port,()=>{
    console.log(`server listening on port no ${port}`);
})
//syntax for send get method -> app.get(path , (req,res)=>{body})
app.get("/",(req,res) => {
    res.send("Connected to root path");
    console.log("Response sended");
})

app.get("/home",(req,res)=>{
    res.send("You contacted main home path");
})

app.get("/about",(req,res)=>{
    res.send("You contacted about path");
})

//now if we search for localhost:8080/  then this will take us to response -> "You contacted root path"
//now if we search for localhost:8080/home  then this will take us to response -> "You contacted home path"
//now if we search for localhost:8080/about  then this will take us to response -> "You contacted about path"
//now if we pass any path other than these pathes then it will return us an error message.

//If we want to set a custome response such that if user searched for a wrong path that does not exists then we can set a custome(default) response for such cases.For this we pass '*' as our path

app.get("*",(req,res)=>{
    
    res.send("You connected default path as given path does not exists");
})

//we can also make our response type post
app.post("/",(req,res)=>{
    res.send("Your contacted a post path");//this will returned when request method will be post.
})