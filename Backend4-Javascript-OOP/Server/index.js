let express = require("express");
let app = express();
let port = 8080;

app.listen(port , ()=>{
    console.log("Listening on Port number : " , port);
})
app.get("/register"  , (req , res)=>{
    let {user} = req.query;
    res.send(`Standard get method.Welcome ${user}`);
})
app.post("/register"  , (req , res)=>{    
    res.send(`Standard Post method`);
})