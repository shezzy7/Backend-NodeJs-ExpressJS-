// Create an admin route and send an error with status code 403

const express = require("express");
const app = express();
const ErrorHandling = require("./c_ErrorHandling.js");
app.listen(8080,()=>{
    console.log("App is listening on port no : 8080");
})
app.get("/admin" , (req,res)=>{
    throw new ErrorHandling(403,"self generated error");
})