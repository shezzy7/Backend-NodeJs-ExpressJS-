//We can export data and import data from one file to other in js using nodeJs's methods.
//For this purpose we we have two terms one is for exporting data and onther is for importing data.
//for exporting something from our this file at the end we write -> module.exports = value;
//And for importing this value into another file where we want to use it we simple write varname where we want to store it and then write require("filePathFromWhereDataIsComing").Like-> let inp = require("./f_peocess");
//we can also export any data directly
module.exports = 123;

//module.exports is a special type of object which contains all the data which a file wants to send to another file.
//require is a built-in function to include external modules that exist in external files.


//Method1 for send info from one file to other 

const sum = (a,b)=> a+b;

const mul = (a,b)=>a*b;

const PI = 3.14;

let obj = {
    sum:sum,
    mul:mul,
    PI:PI
}

module.exports = obj;

//method 2
//we can also pass any data while defining it 
// module.exports.sum=(a,b)=>a+b;
// module.exports.mul=(a,b)=>a*b;
// module.exports.PI=3.14;

// method3
//we can also use below method when we want to export any data directly while defining it
// exports.sum = (a,b)=>a+b;
// exports.mul = (a,b)=>a*b;

// exports.PI = 3.14;
//but we cannot simply write exports = someValue , bcz js will take exports as a variable.