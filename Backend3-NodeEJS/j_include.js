let express = require('express');
let app = express();
let port = 3000;
let path = require("path");
app.listen(port,()=>{
    console.log("Listening on port number ",port);
})

// app.use(express.static("public"));//for using folders in our js files.But if we try to run this file on terminal outside of our this directory then this code will not work this is bcz our code will try to public folder in that direcotory from where we are running it so to avoid from this error we have to set main path to public folder.In following way
app.use(express.static(path.join(__dirname,"public")));
app.set("views" , path.join(__dirname , "/views"));
app.set("view engine" , "ejs");
app.get("/ig/:username" , (req,res)=>{
    let {username} = req.params;
    res.render("instagram" , {username});
})