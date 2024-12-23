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
    res.status(status).send(message);
})
function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err)=>next(err));
    }
}