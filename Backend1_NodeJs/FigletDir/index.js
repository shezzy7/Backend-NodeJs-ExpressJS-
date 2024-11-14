const fig = require("figlet");
let res = "C o n v e r t e d  F r o m \n \n \t\t G O D O O \n\n T o \n\n \t\t G O O D O";
fig(res , function (error,data){
    if(error){
        return;
    }

    console.log(data);
})