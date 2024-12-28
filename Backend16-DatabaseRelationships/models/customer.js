

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
    orders: [//in this we are going to store objectId of each order placed by this cutomer.
        {

            type: Schema.Types.ObjectId,//we set its type as this for storing ObjectId of any document and this syntax is given in documentation.
            ref: "Order" //referance of the model from which we will save ids.
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
    //after executing this function we will see that only objectIds of the orders have been added to our customer collection even tough we have pushed complete order.

}
// addCustomer();
// console.log(await Customer.find({}))

//A method is defined in mongoose documentation which is used for reading data from this type of documents.Foe example in our customer collection we have stored objectid of order for each document.Now if we want to read data of any document of customer but we also want that objectIds present in orders should also be converted to original data present in orders collection related to these objectIDs.For this purpose we use populate method as follows
const findCustomer = async()=>{
    let data1 = await Customer.findOne({name:"Goodo"});
    console.log("Data without using populate method " ,data1);//here we will Only objectIds in orders section
    let data2 = await Customer.findOne({name:"Goodo"}).populate("orders");
    console.log("Data by using populate method " ,data2);//while here we will details of order refered by those ids.
}
findCustomer();