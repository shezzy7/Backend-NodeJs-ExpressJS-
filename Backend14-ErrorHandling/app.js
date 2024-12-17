// In express default error handlers are setted but with the help of middlewares we can write our own error handlers.We can see it on express documentation of error handeling section.

let express = require("express");
let app = express();

app.listen(3000,()=>{
    console.log("App is listening on port number : 3000");
})
app.get("/random" , (req,res)=>{

    res.send("random route");
})

//now if we go on this route then error route will be displayed on screen but if we search for anoterh route or if in another route we write something that can create error then a default error handler of express will  display a default error on scren
app.get("/err",(req,res)=>{
    abcd=abcd;
})
//when we will search for root rout then a error msg will be rendered on screen by express default error handler.

//we can set our own error handlers by using middlewares.
//when we write a middleware for error handling then we pass 4 params instead of 3 or 2.
//thie middleware will send this response in case of any error

//
app.use((err,req,res,next)=>{
    console.log("----ERROR----");
    //now after defining this middleware whenever a error will be created in our code then this middleware function will be called and noe express's default error handler function will be called.
    // And now as this middleware will print this msg on console our page at browser will be stucked as this middleware is not performing any other function.N
    // And for passing control to other middleware we use next method
    // next();
    //when this function will be hitted by compiler then on screen it will print 'cannot GET/err' which means route not existed but here we see that we have defined it.This is bcz when compiler hits the next method then it will search for a middleware that will a non error handling middleware.

    // But if we pass err in this method then it means that this middleware have done his worked for handling error and now it is handing over this error to next error handling middleware.Next error handling middleware can be a custom error handling middleware or express's default error handler.
    next(err);
    //now as we have passed err to next method then it will search for next error handling middleware if it founds it then it will hande over this error to him else this error will be printed on screen by express's default error handler.

})

//Note : When we call next() without passing error in it then it means we want to call next non error handling middleware and when we pass next(err) then it means that we want to call next error handling middleware.

// Here we see that express's default error handler prints the error on screen in a way that don't looks beautiful.
// And for making this error message on screen a custom message then for this purpose we use error class./
