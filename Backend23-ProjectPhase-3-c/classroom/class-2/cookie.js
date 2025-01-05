const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const { trusted } = require("mongoose");
// app.use(cookieParser());
// we need to send a secret inside our cookie parser for sending signed cookies
app.use(cookieParser("secretcode"))


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
    let {name = "anynomous"  } = req.cookies;//we can also by default values
    let { salary } = req.signedCookies;//for destructruring signed cookies we use req.signedCookies
    res.send(`My name is ${name} and i get salary ${salary}`);
})


//we can also send signed cookies which means if anyone change them on browser then he can't access original values of cookies as we have setted them private like in below we have sended a cookie and sended it as a signed cookie and if we change it in our browser later then its value will changed to empty or false.
app.get("/sendsignedcookie",(req,res)=>{
    res.cookie("salary" , 2500 ,{signed:true} );
    res.send("Signed cookie sended")
})