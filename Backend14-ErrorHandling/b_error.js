// we will set our own error status and error name.And will print it on screen

let express = require("express");
let app = express();
//requiring class from ErrorHandling file
let ErrorHandling = require("./c_ErrorHandling.js");

app.listen(8080 , ()=>{
    console.log("App is listening on port 8080");

})

app.get("/api",(req,res)=>{
    let {token} = req.query;
    if(token==="giveaccess"){
        res.send("Welcome!")
    }
    throw new ErrorHandling(401,"Access Denied");//here we are return a object of ErrorHanlding class that is taking to params for constructor.And will return it
    //AS our request api hits error's return statement then it will look for a error handling middleware and will pass control to it and also will pass this error object to it.
    //if not found then express's default error handler will be called will print this error on screen
})

app.use((err,req,res,next)=>{
    
    //now here if we send this err 
    res.send(err);//this will print error thrown by above api 
})