/*
Handling Deletion:-
    As we have learned how to connect different collections in different scenarios(one to many etc).
    But what to do when it comes to delete in a collection some data connected to other data in another collection.For example we have a collection users and another collection posts.Each post is connected to a user.So when we delete a post then its simple that we can delete this post by using its id.But if we want that when we delete a user from collection then all the posts related to that user must be deleted from posts collection.
    By using simple method if we delete a user by using its id then the user will be delete from its collection but posts refering to this user will not be deleted from posts collection.
*/

let express = require("express");
let app = express();
let mongoose = require("mongoose");
app.listen(8080,()=>{
    console.log("App is listening on port number 8080");
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/relations");
}
main().then(()=>{
    console.log("Database connected successfully");
})

let {Schema} = mongoose;
let user_schema = new Schema({
    username : String,
    email : String
})
let User = mongoose.model("User",user_schema);
let posts_schema = new Schema({
    content : String,
    likes : Number,
    user : {
        type : Schema.Types.ObjectId,
        ref : "users",
    }
})
let Post = mongoose.model("Post",posts_schema);
posts_schema("findOneAndDelete" , ()=>{
    await 
})
let addUser =async ()=>{
    let user2 = await User.findById("676edf8c80cb6cd6263fe0a3");

    
    let post2 = new Post({
        content : "Hello!",
        likes : 30,

    })
    post2.user = user2;
    await user2.save();
    await post2.save();
}
// addUser()

let deleteUser = async ()=>{
    let user = await User.findByIdAndDelete("676edf8c80cb6cd6263fe0a3");
    console.log(user);
    // here we have deleted user with this id.Basically this id belongs to shahzad and we are here deleting shahzad and after deleting it we will see that only shahzad will be deleted from users collection but posts refering to shahzad will not be deleted from posts collection.
}
// deleteUser();

//So if we want to delete posts refering to this id then we use mongoose middlewares.Keep in ming that express middlewares are different from mongoose middlewares and we know that middleware is like a function that executes after request has been received but response have not been sent.So middleware after doing its work hands over the compilation to next method defined in it.

