/*      installations

    npm inint -y
    npm i express
    npm i mongoose
    npm i path
    npm i ejs
    npm i method-override
*/

// Here we creating model for whatsaap which will have functioanlities of (_id , from , to , message , created_At)

let express = require("express");
let app = express();
let mongoose = require("mongoose");
let path = require("path");
let Chat = require("./models/chat.js");
let methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,("public"))));
app.use(express.urlencoded({extended:true}));
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
main().then(res => {
    console.log("database connected");
}).catch(err => {
    console.log(err);
})
app.listen(8080, () => {
    console.log("Listening on port no : 8080");
})

app.get("/", (req, res) => {
    res.send("Root working");
})


//now we have to create our models/collection for performing opertation on them.
//So professionally we don't create our models in our index.js file and don't define their scehmas here.We create them in a separate folder and then require them from there.The reason is that in a single file we may also need to create multiple models with different schemas so for avoiding from misunderstanding we creat them in a separate folder and for each model we create a separate js file and import that from that file.
//As here we are requiring Chat model 


//lets add some data in this model
let chat1 = new Chat(
    {
        to: "goodo",
        from: "shezzy",
        msg: "Into the same river no man can enter twice",
        created_At: new Date()
    }
)

// chat1.save().then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })

//now we have some sample data into our chats collection using init.js file.

//See all the chats
app.get("/chats", async(req,res)=>{
    let chats = await Chat.find();//our collection may take some time to return data so we will make it a async function for using await keyword with Chat
    res.render("chats.ejs" , {chats});
})

// route for showing page that will input for new user's details
app.get("/chats/new" , (req,res)=>{
    res.render("new.ejs");

})

//after inputing data adding into collections
app.post("/chats" , (req,res)=>{
    let {to,from,msg} = req.body;
     let chat = new Chat({
        to : to,
        from : from , 
        msg : msg,
        created_At : new Date()
     });
    chat.save().then(res=>{
        console.log(res);
    })
    res.redirect("/chats");
})

//edit
app.get("/chats/:id/edit" , async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs" , {chat});
})

//update
app.put("/chats/:id" , async (req,res)=>{
    let {id} = req.params;
    let {newMsg} = req.body;
    await Chat.findByIdAndUpdate(id , {msg:newMsg});
    res.redirect("/chats");

} )
// delete
app.delete("/chats/:id" , async (req,res)=>{
    
    let {id} = req.params;
    console.log(id);
    await Chat.findByIdAndDelete(id).then(res=>{
        console.log(res);
    });
    res.redirect("/chats");
})

//see in detail
app.get("/chats/:id/view" ,async (req,res)=>{
    let {id} = req.params;
     let chat = await Chat.findById(id);
    res.render("view.ejs" , {chat}); 
})


