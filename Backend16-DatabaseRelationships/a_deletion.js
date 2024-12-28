/*
Handling Deletion:-
    As we have learned how to connect different collections in different scenarios(one to many etc).
    But what to do when it comes to delete in a collection some data connected to other data in another collection.For example we have a collection users and another collection posts.Each post is connected to a user.So when we delete a post then its simple that we can delete this post by using its id.But if we want that when we delete a user from collection then all the posts related to that user must be deleted from posts collection.
    By using simple method if we delete a user by using its id then the user will be delete from its collection but posts refering to this user will not be deleted from posts collection.
*/


const express = require("express");
const app = express();
let mongoose = require("mongoose");
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relations");
}
main().then(() => { console.log("Database connected a successfully") }).catch((err) => { console.log(`Some error occured in connecting with database ${err}`) });

app.listen(8080, () => {
    console.log("App is listening on port number : 8080");
})

/*
One to Many
    In this approach we store a referance to child document inside the parent document instead storing child documents.
    Lets take example of a some popular shop that takes online order of something and sends this to the client.Now the system of this shop should be such that they have to store info of user and all the info of the order placed by this user.So instead of storing orders info inside the user info we place order's info in some other collection and a referance to this info will be placed inside users info.
*/
let { Schema } = mongoose;
let order_Schema = new Schema({
    item: String,
    price: Number
})


const Order = mongoose.model("Order", order_Schema);

let addOrders =async () => {
    await Order.deleteMany({})
    await Order.insertMany([
        {
            item: "Cake",
            price: 1500
        },
        {
            item:"Barfi",
            price : 2400
        }
    ])
}
// addOrders();


let customer_Schema = new Schema({
    
    name: String,
    orders: [
        {

            type: Schema.Types.ObjectId,
            ref: "Order" 
        }
    ]
})
const Customer = mongoose.model("Customer" , customer_Schema);
let addCustomer =async ()=>{
    await Customer.deleteMany({})
    let order1 = await Order.findOne({item:"Cake"});
    let order2 = await Order.findOne({item:"Barfi"});
    let cusotmer1 = new Customer({
        name : "Goodo"
    })
    cusotmer1.orders.push(order1);
    cusotmer1.orders.push(order2);
    await cusotmer1.save();
}
// addCustomer();
// console.log(await Customer.find({}))


const findCustomer = async()=>{
    let data1 = await Customer.findOne({name:"Goodo"});
    console.log("Data without using populate method " ,data1);
    let data2 = await Customer.findOne({name:"Goodo"}).populate("orders");
    console.log("Data by using populate method " ,data2);
}
// findCustomer();


//So if we want to delete posts refering to this id then for this purpose we use mongoose middlewares.Keep in ming that express middlewares are different from mongoose middlewares and we know that middleware is like a function that executes after request has been received but response have not been sent.So middleware after doing its work hands over the compilation to next method defined in it.
//In our users collection we have user with id : "676ee175f965aed45ce7cf36" , and a post also refering to this user
//now we will delete this user by using mongoose middleware and this will also delete all the posts refering to this user.
//There are two types of middlewares that we can use for such type of operations one is Pre(run before the query is executed) and other is post(run after the query is executed)
//We can see these middlewares in documetation on link -> mongoose.com/docs/middleware.html#pre

//according to mongoose documentation we have following syntax for deleting a a datapoint and all other datapoints related to that one data point
/*
schemaNameOfThatOneDataPoint.middlewareType(post/pre)("findOneAndDelete" , async (argument)=>{
    //body
})
    */

//If we go into mongoose documentation and go to models section and there we will see query findByIdAndDelete inside its details we  see that this query triggers a middleware when we execute this middleware is findOneAndDelete.So when we will define a middleware with this name findOneAndDelete and execute query findByIdAndDelete then this will call middleware findOneAndDelete and we will do this following

let deleteCustomer = async ()=>{
    let customer = await Customer.findByIdAndDelete("676f8ba2836731668b91fb61");
    // console.log(customer);
    // here we have deleted user with this id.Here this id was belonging to username : shahzad and we are here deleting shahzad and after deleting it we will see that only shahzad will be deleted from users collection but posts refering to shahzad will not be deleted from posts collection.
}
// deleteCustomer();

customer_Schema.post("findOneAndDelete" , async (customer)=>{
    console.log("post middleware called");
    if(customer.orders.length){
        let res = await Order.deleteMany({_id : {$in:customer.orders}});
        console.log(res);
    }
})

order_Schema.pre("findOneAndDelete" , async ()=>{
    console.log("pre middleware")
})
order_Schema.post("findOneAndDelete" , async ()=>{
    console.log("post middleware")
})

async function delOrder(){
    await Order.findByIdAndDelete("676f8b8d9b7e103dd114d222")
}

delOrder()