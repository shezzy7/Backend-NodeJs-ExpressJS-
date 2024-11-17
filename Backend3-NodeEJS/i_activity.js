// We are given a set of data in data.json file we have to print this data on search pages

let express = require("express");
let app = express();

let port = 8000;

app.listen(port , ()=>{
    console.log(`Listening on Port number : ${port}`);
})

app.set("view engine" , "ejs");
app.get("/ig/:username",(req,res)=>{
    let instaData = require("./data.json");
    let { username} = req.params;

    let data = instaData[username];
    if(data){
        res.render("instagram2" , {data});
    }
    else{
        res.render("error");
    }
})