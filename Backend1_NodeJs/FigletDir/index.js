const fig = require("figlet");
let res = "C o n v e r t e d   F r o m \n P O O T E R \n T o \n R A B I A";
fig(res , function (error,data){
    if(error){
        return;
    }

    console.log(data);
})