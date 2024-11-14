//As we know about query strings that these are like key value pairs which we write in search bar while searching for a specific thing.
//For example if we want to search for figlet on npm then we write -> npmjs.com/search?q=figlet
//Here q=figlet is a query string.We can also pass these query string in our search path as follows.
const express = require("express");
let app =  express();
app.listen(8000,()=>{
    console.log("Listening on port no : ",8000);
});

app.get()