let express = require("express");
let app = express();
let port = 8080;

app.listen(port,()=>{
    console.log("Listening on Port number : ",port);
})

//For using EJS in our file , first we have to set engine to ejs in set method of app
app.set("view engine" , "ejs");

//For creating we made a directiry named as views.Then in this directory we create files with extension ejs.
//Then while sending response from res method , instead writing res.send(data) we write res.render("fileName from views folder");

// our res method first of all will find 'views' named directory then will 
app.get("/",(req,res)=>{
    
    res.render("home.ejs");
})

//view directory:-
//If we run our server from outside our of our current directory then it will run successfuly.But if on browser we search for our root path result then it will give an error ,this is becuase our express tries to find views folder in directory from where we are running our server but we know that our views folder is present inside this main directory but as we are running it from outside this direcotry so an error will ge generated.
//For avoiding from this error we use a path method of express where we tell express where to find views folder every time.
//for this we have to first import 'path'.
let path = require("path");
//then for setting path we write
app.set("views",path.join(__dirname,"/views")); 

app.get("/hello",(req,res)=>{
    res.send("Hello!");
})