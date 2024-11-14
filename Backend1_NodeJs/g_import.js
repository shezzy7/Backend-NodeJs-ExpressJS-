const inp = require("./g_export-files");
//require method will go to given file and will check whether its exporting any data if exporting then it will put all the exporting data/variables/variables in an object and will return this object which will be stored in variable where will be assiging it like here 'inp' variable.
// console.log(inp);
//but if our required file does not export any data from it then an empty object will be returned from require method.
console.log("Sum ->",inp.sum(2,3));
// console.log("Mul is -> ",inp.mul(2,3));
// console.log("PI ->",inp.PI);


