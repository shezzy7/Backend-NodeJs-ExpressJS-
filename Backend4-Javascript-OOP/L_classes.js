// Classes are templates for creating objects.We first create a template for creating objects which contains all the properties/attributes described inside the class.
//Constructor method is a special method of a class for creating and initializing an object instance of that class.
//for creating class syntax is as -> 
    /*
    class ClassName{
        //for creating constructors we write as 
        constructor(param1 , param2..){
            this.param1 = param2;
            this.param2 = param2;
        }
        //and if we want ot create some methods for each object we will add write after constructor.
        funcName(){
            //body
        }
    }

    */


class Person {
    constructor(name , age){
        this.name = name;
        this.age = age;
    }

    talk() {
        console.log(`Hi, i'm ${this.name}`)
    }
}

//now the template has been create and we just need to create objects.
let p1 = new Person("Hania" , 4);
let p2 = new Person("Abiha" , 6);
console.log(p1.age);
console.log(p2.talk());