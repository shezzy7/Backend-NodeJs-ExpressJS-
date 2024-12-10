//here we will sample data into our chats collection
let mongoose = require("mongoose");
let Chat = require("./models/chat.js");
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main().then(res=>{
    console.log("Connection successful");
}).catch(err=>{
    console.log("Error in connected with database")
})

let allChats = [
    {
        to : "Goodo",
        from : "shezzy",
        msg : "Hahahahaha",
        created_At : new Date()
    },
    {
        to : "eman",
        from : "Zainab",
        msg : "Flowers",
        created_At : new Date()
    },
    {
        to : "Hania",
        from : "Shahzad",
        msg : "Love",
        created_At : new Date()
    },
    {
        to : "Fiza",
        from : "Khadija",
        msg : "Missing you",
        created_At : new Date()
    },
]

Chat.insertMany(allChats);



