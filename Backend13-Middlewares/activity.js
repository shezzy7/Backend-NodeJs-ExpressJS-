let express = require("express");
const { nextTick } = require("process");
let app = express();

// app.use("/api" , (req,res,next)=>{
//     let {token} = req.query;
//     if(token==="abcdef"){
//         next();
//     }
//     res.send("Access Denied");
// })
// app.get("/api",(req,res)=>{
//     res.send("Welcome!");
// })
app.listen(8080 , ()=>{
    console.log("App listening on port number 8080");
})

//Here in the above code we are protecting our api route that users with correct token can come to this route others will get a access denied.
// And majorly this is the main task of middleware.We use them as a protecting layer to a specific route that users with complete info can come to this route.
// And our middleware will check token only when we make a request for /api route.

//we can also pass our middleware in many paths where we want like this.First we will enclose our middleware in a function and then we will pass this function with request where we want.Like as following

let checkToken = (req,res,next)=>{
    let {token} = req.query;
    if(token==="abcdef"){
        next();
    }
    res.send("Access denied");
}
app.get("/api1" , checkToken , (req,res)=>{
    res.send("Welcome to api1 route");
})
// we can also pass this middleware to another path
app.get("/api2" ,checkToken, (req,res)=>{
    res.send("Welcome to api2 route");
})
