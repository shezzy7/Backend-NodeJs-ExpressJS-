let express = require("express");
let app = express();
let mongoose =  require("mongoose");
let ErrorHandling = require("./ErrorHandling.js");
app.use(express.urlencoded({extended:true}));

app.listen(8080,()=>{
    console.log("App is listening on port number : 8080")
})


let chatSchema = new mongoose.Schema({
    name : {
        type : String
    },
    age : {
        type : Number
    }
})
async function main(){

    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}
main().then(()=>{
    console.log("Database connected successfully");
})
let Chat =  mongoose.model("Chat" , chatSchema);

// let chat1 = new Chat({
//     name : "shezzy",
//     age : 22
// })
// chat1.save().then((res)=>{
//     console.log(res);
// })

//for sending errors with async funtion we need to call next function in which pass error as an argument.

app.get("/chat/:id" , async(req,res)=>{
    
    let {id} = req.params;
    console.log(id);
    let chat =await Chat.findById(id)
    if(!chat){
        next( new ErrorHandling(401,"Chat not found"));
    }
    res.send(chat);
})
app.get("/" , (req,res)=>{
    res.send("Root route");
})
app.use((err,req,res,next)=>{
    res.send(err);
})