//if we print on console -> console.log(process.argv); and run our code on repl then it will return an array contianing two elements one which will be the path of current file.
//but if we pass some arguments while running our this file then these arguments will be stored in our argv array.
//syntax ->  node fileName.js arg1 arg2 arg3
//we can give any type of data in arguments and we separate them by space and we write arguments after the name of file
let args = process.argv; //on executing this file what we will pass as arguments will be stored in an array and here we are asigining its values to a variable.When we will run a loop on this array we will get all the values passed to it.
for(let i=0;i<args.length;i++){
    if(args[i]%2==0){
        console.log(args[i],"is Even number");
    }
    else{
        console.log(args[i]," is an Odd number");
    }
}
//when we will write command for executing this file and just afer this command before pressing enter the words what we will write will be taken as arguments and will be stored in this argv property which pass ti to our args array and we can then print them using loop. like -> node f_process.js hello welcome 34 . here hello,welcome,23 will be taken as arguemnt
//So basically if we want to take some input as an argument we can write it just after that run command.