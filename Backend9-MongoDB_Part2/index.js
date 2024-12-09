//for connection our js code with mongodb we need to require mongoose first
const mongoose = require('mongoose');
// then we write function provide on mongoose website.
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");//here in this method htpps is replaced by word mongodb and localhost is replaced by value 127.0.0.1 and 27017 is port number while test is name of the collection in the database,We can chnage collection name at any time we need(should b correct name of a collection)

}
// main funtion will return a promise.
main().then(()=>{
    console.log("Connection was successfull");
})
.catch((err)=>{
    console.log(err)}
);

//first we need to create schema of our collection whose syntax can be seen from docs.
//lets suppose we want to create collection with attributes name,email,age then first we need to define all of these alongside with their datatype as follows we can give any name to our schema.
const collegeSchema = new mongoose.SchemaTypeOptions({
    name:String,
    email:String , 
    age : Number
})

//now lets we want to create a collection college on which we want to apply above schema.
//syntax-> const modelName = mongoose.model("collectionName" , schemaName);Genrally we give name to model same as the name of collection
const College = mongoose.model("College" , collegeSchema);//model in mongoose is class with which we construct documents.
//The collection which we pass here, mongoose creates a collection of this name in our database and sets given scehma on this collection.It also makes some chages in collection like it makes our given collection name to pluraland converts it to small letters foe example here College will be converted to colleges.

//we can also apply same schema on many collections.
const User = mongoose.model("User" , collegeSchema);

///now this model is represntig a collection User of our database.
//now for inserting some data in this model we have to create its instance/objects.As we know that this model is a class type so we can create objects of its type which will be also a document.
//lets create document/object for inserting some data in our collection
let user1 = new User({
    name : "shahzad",
    email : "shezzy@gmail.com",
    age : 22
});
//We will use same schema as we pass will creating our model.
//now for inserting this document in our collection we use another method-> documentName/objectName.save();
user1.save();
//this save method after after saving given instance in collection it returns a promise.
// let user2 = new User({
//     name :"jawad",
//     email :"jawad@gamil.com",
//     age:12
// });

// user2.save().then(res=>{
//     console.log(res);
// });
// //so this is the method of inserting a single document in our collection.

// //we can also insert many documents together in our in our database.For this purpose we have method insertMany.In this method we wrap up our documents in a array and pass it in this method.This method is present in our model so we call it by our model name.
// //Syntax-> ModelName.insertMany([{doc1} , {doc2},..])

// User.insertMany([
//     {
//         name:"goodo" , 
//         email :"goodo@gmail.com" ,
//         age:21
//     } ,
//     {
//         name : "ahtesham" , 
//         age:22,
//         email:"ahit@gamil.com"
//     }
// ]).then(res=>{
//     console.log(res);
// })

//Note : Each time when we will run our code all these queries will run and each time this data will be added tou our database so after adding our data one time if we make some changes in our code and run our code again we should comment out our quries line for preventing from again adding the same data in our database.

// Note : Mongoose use Operation Buffering
//Which means mongoose lets us start using our models immdediately , without waiting for mongoose to establish a connection to MongoDB.

//We can also find specific data from our collections in our js code using find method
//for this purpose we write modelName.find() and this will return all the data present in our model/collection.This method returns a Query Object on which we can perform .then method
//Note it returns a Query Object not a promise.

//let print all the data print in our user model

User.find().then(res=>{console.log(res)});

//we can also find data on specific condition.Lets we want to find data where age is equall to 22

User.findOne({age:{$eq:22}}).then(res=>{console.log(res)});
// we also have method for finding one entry only
//These methods return the data of all the documetns wrapped in in an array.So we can also fetch required data from array.


//Another method findById  is used very much for finding data by using its id.Syntax-> Model.findById("id");
User.findById("6756852b2e2eccc887a7e22a").then(res=>{
    console.log(res);
})

//we can all these method on mongoose documentation.