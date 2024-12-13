let initData = require("./data.js");
let mongoose = require("mongoose");
let Listing = require("../models/listing.js");

let mongoURL = "mongodb://127.0.0.1:27017/wonderlust";
async function main(){
    await mongoose.connect(mongoURL);
}
main().then(()=>{
    console.log("Database connected successfully");
}).catch(er=>{
    console.log("Error in connectin with database");
})

const init = async ()=>{

    // await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data inserted successfully");

}

init();