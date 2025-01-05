//connect-flash:- This is the special area of the session used for storing messages.Messages are written to the flash and cleared after the message is displayed to the user.Typically flash is used in combination with the redirects ,ensuring that the message is available to the next page that is to be rendered.
//We use them when we want to display anything in the form of alerts or in another form when a new thing done with our website.(for example if we want to send an alert which says 'review submitted' when our user submits a review or anything else.)
//We can use connect-flash only when we are using express-session in our server otherwise we can't use connect-flash in our code.
//for using it we need to install it thorugh npm as -> npm i connect-flash
//then require it as we doing below.
const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
app.use(express.urlencoded({extended:true}))
app.set("views",path.join(__dirname,"views") );
app.set("view engine" , "ejs");//setting engine to execute ejs files.
const sessionOptions = {
    secret : "mysupersecretcode",
    resave:false,
    saveUninitialized : true
};
app.use(flash());
app.use(session(sessionOptions ));
app.listen(3000,()=>{
    console.log("App is listening on port number 3000")
})
/*
app.get("/register",(req,res)=>{
    let {name = "anonymous" } = req.query;
    req.session.name = name;
    console.log(req.session.name)
    // we create a flash in following way
    req.flash("success","User registered successfully")
    res.redirect("/sayhello");
})
app.get("/sayhello",(req,res)=>{
    // res.send(`Hello , ${req.session.name}`);
    //we can send our flash messages while rendering a file and can't send them directly as a response.For getting value of specific key in  a flash we pass key name in flash function
    
    let name = req.session.name;
    let msg = req.flash("success");
    //now when we will go to register page and pass a querry string along it with key name and send a value with it then it will redirect us to this /sayhello route and it will render page.ejs file and also pass name and msg in it after getting them from session object and flash method respectively.
    res.render("page.ejs",{name, msg})
    //the file page.ejs will show a msg at top say 'user registered successfully' and when we will reload this then this msg will disappear and will not come again until we make another request through register page.
})
*/

// Our response object contains a property named locals which is also an object in itself.If we use this property to set variable accessible in templates rendered with res.render.The variables set on res.locals are available within a single request-response cycle and will not be shared between requests.
//so here we will use locals

app.get("/register",(req,res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    if(name==="anonymous"){
        req.flash("error" , "user not registered")
    }else{
        req.flash("success","user registered successfull");
    }
    
    res.redirect("/hello");

})

app.use((req,res,next)=>{
    res.locals.errorMsg = req.flash("error");
    res.locals.successMsg = req.flash("success");
    next()
})
app.get("/hello",(req,res)=>{
    
    let {name} = req.session;
    // res.locals.errorMsg = req.flash("error");//we can addd these locals in a middleware so that we don't need to write then in each api
    //once we have defined a variable through locals then we don't need to pass it as an argument while rendering a ejs file as they are accessible direclty there

    // res.locals.successMsg = req.flash("success")
    res.render("./page.ejs",{name})

})