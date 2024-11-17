let express = require('express');
let app = express();
let port = 3000;
let path = require("path");
app.listen(port,()=>{
    console.log("Listening on port number ",port);
})
app.set("views" , path.join(__dirname , "/views"));
app.set("view engine" , "ejs");
app.get("/ig/:username" , (req,res)=>{
    let {username} = req.params;
    res.render("instagram" , {username});
})