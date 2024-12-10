//for connection our js code with mongodb we need to require mongoose first
const mongoose = require('mongoose');
// then we write function provide on mongoose website.
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");//here in this method htpps is replaced by word mongodb and localhost is replaced by value 127.0.0.1 and 27017 is port number while test is name of the database,We can change database name at any time we need(should be correct name of a database)

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
// const collegeSchema = new mongoose.Schema({
//     name:String,
//     email:String , 
//     age : Number
// })

//now lets we want to create a collection college on which we want to apply above schema.
//syntax-> const modelName = mongoose.model("collectionName" , schemaName);Genrally we give name to model same as the name of collection
//const College = mongoose.model("College" , collegeSchema);//model in mongoose is class with which we construct documents.
//The collection which we pass here, mongoose creates a collection of this name in our database and sets given scehma on this collection.It also makes some chages in collection like it makes our given collection name to pluraland converts it to small letters foe example here College will be converted to colleges.

//we can also apply same schema on many collections.
// const User = mongoose.model("User" , collegeSchema);

///now this model is represntig a collection User of our database.
//now for inserting some data in this model we have to create its instance/objects.As we know that this model is a class type so we can create objects of its type which will be also a document.
//lets create document/object for inserting some data in our collection
// let user1 = new User({
//     name : "shahzad",
//     email : "shezzy@gmail.com",
//     age : 22
// });
//We will use same schema as we pass will creating our model.
//now for inserting this document in our collection we use another method-> documentName/objectName.save();
// user1.save();
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

// User.find().then(res=>{console.log(res)});

//we can also find data on specific condition.Lets we want to find data where age is equall to 22

// User.findOne({age:{$eq:22}}).then(res=>{console.log(res)});
// we also have method for finding one entry only
//These methods return the data of all the documetns wrapped in in an array.So we can also fetch required data from array.


//Another method findById  is used very much for finding data by using its id.Syntax-> Model.findById("id");
// User.findById("6756852b2e2eccc887a7e22a").then(res=>{
//     console.log(res);
// })

//we can all these method on mongoose documentation.


//We can also update sepcific or all documents here using our update meethod.
//Syntax for updating one documetn-> User.update(<filter>,<update>)
//lets suppose we want to set age of user with name 'Goodo' to 19
// User.updateOne({name:"goodo"} , {age:19}).then(res=>{
//     console.log(res);
// })

//we can also update many documents by using updateMany method.
//lets suppose we want to set age of all the users to 20 whose age is greater then 20
// User.updateMany({age:{$gt:20}} , {age:20}).then(res=>{
//     console.log(res);
// })
//when we print result here then it returns some metadata like {acknowledged: true,modifiedCount: 16,upsertedId: null,upsertedCount: 0, matchedCount: 16}
//But we want this result should print our updated value.Then for this purpose we use another method 
// User.findOneAndUpdate({age:12} , {age:15}).then(res=>{
//     console.log(res);
// })
//This will print the whole document whichhit has updated but will print previous value mean value before updating.
//If we want to print result value after updating then we use an option.Options are given in mongoose documentation.
// User.findOneAndUpdate({name:"goodo"} , {age:15} , {new : true}).then(res=>{
//     console.log(res);
// })

//we also updtae by id
// User.findByIdAndUpdate("67567d50f58775b014e28c44" , {name:"Goodo"} , {new : true}).then(res=>{
//     console.log(res);
// })



//Delete
//Model.deleteOne(<filter>)
//For deleting purpose we use our deleteOne/deleteMany command.
//Lets suppose we want to delete only one user where name is shahzad
// User.deleteOne({name:"shahzad"}).then(res=>{
//     console.log(res);
// }) 
//this method will find and delete only one user with attribute name : shahzad
//we can also delete all the users where name is shahzad
// User.deleteMany({name:"shahzad"}).then(res=>{
//     console.log(res);
// })

//but both of above methods in result return an object like this : { acknowledged: true, deletedCount: 12 }
//but if we want to get all the documents that we get in return , then we use follwoing methods
// Model.findOneAndDelete(<filter>)
// User.findOneAndDelete({name:"jawad"}).then(res=>{
//     console.log(res);
// })
//here this method will find document where attribute name has value "jawad" , will delete it from database and then will store all the info about this document in the result 
//we can also delete a documents on the basis of i
// User.findByIdAndDelete("67567d50f58775b014e28c44").then(res=>{
//     console.log(res);
// })


//We can write our sschema by applying some constraints on it.Now lets implement schema by adding constraints
//Basicalyy the main method is little but diffrent from above one and is as following
const amazonSchema = new mongoose.Schema({
    name : {
        type:String ,
        required : true, //it is like not null in sql
        maxLength : 20
    } , 
    price : {
        type:Number , 
        min:1 // value must be >=1

    }  ,
    rating:{
        type : Number
    }
})
let Amazon = mongoose.model("Amazone" , amazonSchema);
// let pdct1 = new Amazon( { name:"Sweater" , price:2500 , rating:5  });

// pdct1.save().then(res=>{
//     console.log(res);
// })
//now if we want to add a document where name is abset then it will not be added in our collection.
//let pdct2 = new Amazon({price:23 , rating:5});//this will give us an error bcz name is not given here while in schema we are requiring it.
// pdct2.save().then(res=>{
//     console.log(res);
// }).then(err=>{
//     console.log(err);
// })
//There is long documentation avaialable on schema contraints in mongo.

// Updation
//Contraints are applied on documents only during insertion not when updation.For example as have setted the price must be not less then 1.And when we will insert a new document in the collection then we will have to keep value of price above then 1 otherwise it will give us error.And after adding a valid value we update our this document and set it price to any value even a negative value then it will ve updated which means that our constraints are applied only during insertion.
//This code will run successfully and will update price with 0.
// Amazon.findByIdAndUpdate("6757ca9dbdb12aa490847e86" , {price:0}).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })

//To solve this issue we have to set a property in our updating query which is runValidators.We have to use this as follows
// Amazon.findByIdAndUpdate("6757ca9dbdb12aa490847e86" , {price:0} , {runValidators:true}).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })
//this above code will give us error which will be that price must be >=1