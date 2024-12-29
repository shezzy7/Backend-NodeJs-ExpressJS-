/*In MySQL there are types of relationships between tables.
    1-One to One(here one table is connected with one other table.For example if we use primary key of a table as foreign key in another table then a one to one relationship will be created between these tables.)
    2-One to Many (If we connect a table with many other tables then the resultant relationship will be a one to many.For example if we use primary key of a table as foreign key in many other tables then a relationship will be created between this table and all other tables using its primary key as a foreign key in them which will be one to many.)
    3-Many to Many (If we use primary keys many tables as foriegn keys in amny other tables such that many tables are connected together.)


    So in MySQL relationship takes place between tables and we connect tables for storing info in a mannered way.
    But in MongoDb we don't create relationship between collections instead we put all the info of a document in the entry.
    Lets suppose we have e-commerce website and we want to allow our users that they can add their multiple addresses together and at the time of order they have to tell that at which address they wanna get this order.So if we use mysql then we will create two tables.One table containg all the info about users and other one storing addresses of all the users alongside userid.So a user can add as many addresses as many he wants.Our address storing table will store addresses alongside with userid.
    But MongoDb offers us to add as many entries in a single attribute as many we want without creating any other collection.For example like above if we want to store addresses of users in our db and users can add multiple addresses.Then while defining our schema in address section we will create an array and isnide this array and in this array we will places addresses of users.Each address will be a document type in which here we are storing locationa and city both of type string.
*/



const express = require("express");
const app = express();
const mongoose = require("mongoose");

let mongo_url = "mongodb://127.0.0.1:27017/relations";
async function main() {
    await mongoose.connect(mongo_url);
}
main().then(() => {
    console.log("Database connected successfully");
})

let { Schema } = mongoose;
// Here we will be implementing one to few relationship.It is similiar to one to may but in this we deal a small number of data mean in tens.Like here we are storing addresses and we know that a single user will probably enter addresses not more than 10.So we call it one to few relationship.
//Here we will be storing child documetn isnide a parent document.


/*
One to Many(details)
    We also divide one to many in three catagories.
    One is that a datapoint is connected to little amount of other datapoints (1-1000).We also call it One to few.
    In second catagory we think that a datapoint can be connected to thousands of other datapoints.
    Third catagory think we think is that a datapoint can connect to laks/millions of other datapoints.

*/

/*
One to Few
   In one to few relaitonship we insert child document inside parent. 
    Lets suppose we order food online from foodpanda.In foodpanda a user can sometime order food from office or hostel or college.So a user store a very little count of addresses.So in this case we use one to few approach.
*/
let user_schema = new Schema({
    username: String,
    addresses: [
        {
            //whenever a user will store a new address a new id will be associated with this address.This is because each address here is a document and in mongo a new id is created for each document automatically.But here we don't that each address should have its own id.Then we can apply a constraint on adresses(set _id:false)
            _id:false, 
            location: String,
            city: String
        }
    ]
})

let User = mongoose.model("User", user_schema);

//lets add some data and we will be add this data using a function
let addUser = async () => {
    let user1 = new User({
        username: "Pak Spy",
        addresses: [
            {
                location : "Grand Hotel , Buyuk Ada",
                city : "Istanbul"
            },
            {
                location : "Burger King , Istaqlal Street",
                city : "Istanbul"
            }
        ]
    })
    //now as we have created an object of User type of and also have stored some data in it.We can also store more addresses using our push method as addresses is an array type
    user1.addresses.push({
        location : "Sikandar House , Cehangir",
        city : "Istanbul"
    })
    //now lets save this user in our User collection
    user1.save().then((res)=>{
        console.log("Data save successfully",res);
    })    

}
addUser();


/*
One to Many
    In this approach we store a referance to child document inside the parent document instead storing child documents.
    Lets take example of a some popular shop that takes online order of something and sends this to the client.Now the system of this shop should be such that they have to store info of user and all the info of the order placed by this user.So instead of storing orders info inside the user info we place order's info in some other collection and a referance to this info will be placed inside users info.
    This approach is implemented in customer.js
*/



app.listen(8080, () => {
    console.log("App is listening on port no 8080");
})
