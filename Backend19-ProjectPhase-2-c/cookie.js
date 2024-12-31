const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());


app.listen(3000,()=>{
    console.log("App is listening on port number",3000);
})

app.get("/send",(req,res)=>{
    res.cookie("name" , "Manlang");//we send cookie by using this method.And we can send as many cookies as many we want and our cookies are sended in the form of key value pairs
    res.cookie("age",21);
    //To make our cookie avaliable to our all routes, we have to first go on that route which is sending them once we have sended them then they are available at any route and we can access them at each route.
    res.send("cookie sended");
})

app.get("/getCookie",(req,res)=>{
    //we can destructure our cookies through req.cookies and for this purpose we must install and require cookie-parsor through npm and then use that required cookie parsor as a middleware like -> app.use(cookieParsor())
    let {name = "anynomous" } = req.cookies;//we can also by default values
    res.send(name);
})


//we can also send signed cookies which means if anyone changed 