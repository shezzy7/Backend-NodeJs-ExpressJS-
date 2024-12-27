/*
One to Squillion - Store a referance to the parent document inside the child.
This is third the catagory of one to many where one datapoint can be connected to millions of other datapoint.In this scenario we store objectId of parent inside the child document.
For example there are biilions of users on instagram and each user have some posts.So instead of storing info of all the posts inside users info we store objectId of user inside each post he creates.
*/

const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.listen(8080,()=>{
    console.log("App is listening on port number : 8080")
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/relations")
}
let {Schema} = mongoose;
let person_schema = new Schema({
    username : String,
    email : String
})
let posts_schema = new Schema({
    content : String,
    likes : Number,
    user : { //each only one user can be associated to a post so we will not create an array
        type : Schema.Types.ObjectId,
        ref : "Person"
    }
})

let Post = mongoose.model("Post" , posts_schema);
const Person =  mongoose.model("Person" , person_schema);
const addPost = async()=>{
    await Person.insertMany([{
        username : "shezzy",
        email :"shezzy@gmail.com"
    },{
        username : "malang",
        email:"malang@gmail.com"
    }])
}
addPost();
// let addPersons =async ()=>{
//     let person1 = new Person({
//         username :"Hania",
//         email : "hania@gmail.com"
//     })

//     let post1 = new Post({
//         content :"Hello world",
//         likes : 25,
//     })
//     post1.user = person1;
//     await person1.save().then(res=>{console.log("Person1's data saved")})
//     await post1.save().then(res=>{console.log("Post1's data saved")});
// }
// addPersons();


