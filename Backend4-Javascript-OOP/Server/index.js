let express = require("express");
let app = express();
let port = 8080;

app.use(express.urlencoded({extended:true})) //we have to write this line,bcz xpress.urlencoded() parses incoming form data  into req.body object.
app.listen(port , ()=>{
    console.log("Listening on Port number : " , port);
})
app.get("/register"  , (req , res)=>{
    let {user} = req.query;
    res.send(`Standard get method.Welcome ${user}`);
})


// app.post("/register"  , (req , res)=>{    
//     res.send(`Standard Post method`);
// })

//for fecthing data in post request we do it in following way
app.post("/register" , (req , res)=>{
    let {user,pass} = req.body;
    res.send(`Standard Post Request ${user}`);
})