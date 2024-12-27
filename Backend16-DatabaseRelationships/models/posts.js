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
main().then(res=>{
    console.log("Database connected a successfully")
});
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

const Person =  mongoose.model("Person" , person_schema);
let Post = mongoose.model("Post" , posts_schema);
const addPost = async()=>{
    // await Person.deleteMany({});
    // await Post.deleteMany({});
    // let person1 = new Person({
    //     username : "shezzy",
    //     email : "shezzy@gmail.com"
    // })
    // let post1 = new Post({
    //     content : "Hello world!",
    //     likes : 25,

    // })

    // post1.user = person1;
    // await person1.save();
    // await post1.save();


    // now lets add second post in first person after successfull adding person1 and post1 by person1
    let person1 = await Person.findOne({username:"shezzy"});
    let post2 = new Post({
        content : "Bye Bye",
        likes : 15
    })
    post2.user = person1;
    await post2.save();
}
// addPost();

//Now if we print data in our collection posts then we will find two documents where each document will contain same user id as same person have posted both of those posts.
//So we use this method when we handle a large amount of data connected to a single datapoint.We share id of that one datapoint inside each document associated to that datapoint.


// We should also read the documentation in details given on mongoDb about these relationships between collections.And also follow the six rules of thumb for mongoDb schema given there while handling and managing a large amount of data.
//Link -> https://mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design


