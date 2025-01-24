const express = require("express");
const app = express();
const session = require("express-session");
app.use(express.urlencoded({extended:true}))
// for using express session in our code we need to set it in a middleware
app.use(session({secret : "mysupersecretcode" , resave:false,saveUninitialized:true}))//There are multiple options that can be passed to session and we can see all of them on express documentation by going into express-session section.Each option is used for different purpose.Here we will be using secret option which is used to sign the session id cookie.
//We use different methods for setting our secret codes but here we are simple using a simple code just to take concept of secret.And two other options resave and saveUninitialized we have used here we can see their detail in documentation.


app.listen(3000,()=>{
    console.log("app is listening on port 3000");
})
app.get("/",(req,res)=>{
    res.send("Response sended")
})

// let use session for storing count of session requests.
// here we will create a variable inside session and we will always increase its value by one whenever a request will be maded to this route
app.get("/count",(req,res)=>{//now we will call for this route as many times this increase value of req.session.count each time and this value is stored in our session package.
    if(req.session.count){
        req.session.count+=1;
    }else{
        req.session.count = 1;
    }
    res.send(`You have sended request on this route ${req.session.count} times`);
})


//we can also access info present in session object in all the routes.
//Here we are creating a register path and we will be sending a querry string to our this path
app.get("/register",(req,res)=>{
    let {name = "anonymous" } = req.query;
    // here we will store this name to session
    req.session.name = name;
    console.log(req.session.name)
    res.send(name);
})
//now when we will call register route with name query string like /register?name=shahzad  .Then this name's value will be stored in req.session.name and we can access it in other routes
app.get("/sayhello",(req,res)=>{
    res.send(`Hello , ${req.session.name}`);//here we will get the value which we passed while calling register 
})

//When we use session in our code then to check wheather this session is working or not we go to our webpage produced by this code and inspect it go to application section there in cookies we will see a key named connect.sid .If this key is present then it means our express-session is working else not.

