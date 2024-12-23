//as we see we use try catch method when have to handle multiple types of errors.
//But in according to professionalisim this method is not a good method.
//Programmers use a different method for handling errors.

//A function named asyncWrap takes a function fn as an argumetn and return a funtion in which we pass req,res,next as arguments and inside this function we call fn function in we pass arguments req,res,next and also attach a catch method with it.



let express = require("express");
let app = express();
let mongoose = require("mongoose");
let c_ErrorHandling = require("./c_ErrorHandling");
app.use(express.urlencoded({extended:true}));
app.listen(8080 , ()=>{
    console.log("App is listening of port number 8080");
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}
main().then(()=>{
    console.log("DB connected successfully");
}).catch(err=>{
    console.log("Error in connection to DB" , err);
})
let chatSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    age : {
        type:Number , 
        required : true
    }
})

let Ptc = mongoose.model("Ptc" ,chatSchema );

app.get("/",(req,res)=>{
    res.send("Root route");
})

app.get("/chat/:id", asyncWrap(async (req,res,next)=>{
    let {id} = req.params;
    let chat = await Ptc.findById(id);
    if(!chat){
        next(new c_ErrorHandling(404 , "Chat not found"));
    }
    res.send(chat);
}))


function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err)=>next(err));
        //this fn will execute.If any error occurs due to any reson then it will call next
    }
}

app.use((err,req,res,next)=>{
    let {status=404 , message="Some error occured"} = err;
    res.status(status).send(message);
})

// let ptc1 = new Ptc({
//     name : "shahzad",
//     age:13
// })
// ptc1.save().then(()=>{
//     console.log("Entry saved");
// })










