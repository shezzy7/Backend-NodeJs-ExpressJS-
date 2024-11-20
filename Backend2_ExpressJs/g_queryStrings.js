//As we know about query strings that these are like key value pairs which we write in search bar while searching for a specific thing.
//For example if we want to search for figlet on npm then we write -> npmjs.com/search?q=figlet
//Here q=figlet is a query string.We can also pass these query strings in our search path as follows.
const express = require("express");
let app =  express();
app.listen(8000,()=>{
    console.log("Listening on port no : ",8000);
});
/*
app.get("/search" , (req,res)=>{
    //req's mehtod 'query' contains all the query strings in it as key value paris and we can access then using it
    //for example here if here we search -> localhose:8000/search?q=apple&color=red
    //then this query method will create an object and in this object it will create two key value pairs like ->{q : "apple" , color : "red"} 
    // here we can destruct them as 
    let {q , color} = req.query;
    if(!q){
        res.send("<h1>Searched for nothing </h1>");
    }
    res.send(`<h1>You have searched for ${q} of color ${color}!</h1>`);
})*/


app.get("/search" , (req,res)=>{
    let {name , age} = req.query;
    res.send(`<h1>His name is ${name} with age ${age}</h1>`);
})