const express = require("express");
const app = express();
app.listen(3000,()=>{
    console.log("App is listening on port number : ",3000);
})


app.use("/random",(req,res,next)=>{ //this will run only when we make a request for /random path
    console.log("Hi , i'm 1st middleware");
    console.log("Request method : ",req.method);
    console.log("Request path : " , req.path);
    next();
})
app.use((req,res,next)=>{ //this will run every time
    console.log("Hi , i'm 2nd middleware");
    next();
})
app.get("/" , (req,res)=>{
    console.log("Hi,i'm root");
    res.send("Hi , i'm root");
})

app.get("/random" , (req,res,next)=>{
    console.log("Hi , i'm random root");
    res.send("random root here");
})

