//we have to create a page where each searcher will search with its username and its page will be reloaded

let express = require("express");
let app = express();
let port = 8000;
app.listen(port,()=>{
    console.log("Listening on Port No : ",port);
})

app.set("view engine" , "ejs");

app.get("/ig/:username" , (req,res)=>{
    let {username} = req.params;
    let followers = ["hania" , "goodo" , "fiza"];
    res.render("instagram" , {username , followers});
})

app.get("*" , (req,res)=>{
    res.send("Path not available");
})