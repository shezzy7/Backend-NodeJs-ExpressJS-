const express = require("express");
const app = express();
let mongoose = require("mongoose");
let c_ErrorHandling = require("./c_ErrorHandling.js");
app.use(express.urlencoded({extended:true}));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}
let chatSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : true
    },
    age:{
        type:Number,
        required:true
    }
})
main();
let Chat = mongoose.model("Chat" , chatSchema);
// let chat1 = new Chat({
//     name : "Goodo",
//     age:21
// })
// chat1.save().then(res=>console.log(res));

app.listen(3000,()=>{
    console.log("App listening on port number : 3000");
})
app.get("/",(req,res)=>{
    res.send("This is root route");
})

app.get("/chat/:id" ,asyncWrap(async (req,res,next)=>{
    console.log("Entered to chat/:id route")
    let {id} = req.params;
    let chat = await Chat.findById(id);
    if(!chat){
        next(new c_ErrorHandling(505 , "Chat not found in collection"))
    }
    res.send(chat);
}))
//error-handling middleware
app.use((err,req,res,next)=>{
    let {status=404,message="some general error occured"} = err;

    //each error is due to a valid reason we know.And in express each error has its own specific name.These names are given on the base of cause of this error.
    //we can see each error's name and all the detatils of this error by printing it on screens.
    console.log(err.name);//each error has name property
    // console.dir(err);//it will print all detail of error
    //we use these properties when we want to send specific response on specific error type.
    //lets suppose we want to call a function when we get a castError in our code.
    if(err.name==="CastError"){
        err = handleError(err);
    }
    next(err);
})
app.use((err,req,res,next)=>{
    let {status=401 , message="some general occured"} = err;
    res.status(status).send(message);
})

function handleError(err){
    console.log("This is a cast error");
    return err;
}
function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err)=>next(err));
    }
}

