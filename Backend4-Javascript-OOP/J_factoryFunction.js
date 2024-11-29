//Factory Function :- We take this function as a factory that creates objects.For example we want to store data of some persons and all these persons have common type of data including their name,age,and a functiontalk.
//Then for creating individual objects for each we can create a function which receives name and age of a person and creates object of this info and returns object

function Person(name , age){
    let person = {
        name : name,
        age : age,
        talk(){
            console.log("Hi")
        }
    }
    return person;
}
let p1 = Person("Adam" , 20);
console.log(p1.name);
//now we can create as many objects as many we want by using this factory function.
let p2 = Person("Eve" , 18);

//But this method has some disadvantages as well.For example for each object a new function talk will be created in memory.But this function is doing same work for each object like some methods which are present in our prototypes of arrays/strings.So we can do this in such an efficient way that talk function should not be created each time for each object in memory for this we use new operator method.