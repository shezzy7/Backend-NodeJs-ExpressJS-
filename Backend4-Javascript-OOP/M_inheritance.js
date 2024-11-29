//Inheritance :- Inheritance is a mechanism that allows us to create new classes on the basis of classes that already exist.
//For example there is a class that contains some properties and we want to create another class but the class that already exists has properties that are common with the class that we are going to create.Then inside of writing code for this again , we can inherit properties from already existing class(parent) to new class(child).
//For inheriting we use syntax ->
/*
    class childClass extends parentClass{
        
        
        constructor(params){
            //for using construcotr of parentClass we use super keyword like as 
            super(params);

        }
    }
    */

class Person{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    talk(){
        console.log(`Hi , i'm ${this.name}`);
    }
}

//now we want to creat another class student and this stdent has also name and age and a talk method for each objec

class Student extends Person{
    constructor(name , age , marks){
        super(name , age);
        this.marks = marks;
    }
}

class Teacher extends Person{
    constructor(name , age , subject){
        super(name , age);
        this.subject = subject;
    }
}
let p1 = new Person("Zainab" , 22);
let c1 = new Student("Fizza" , 14 , 82);
let t1 = new Teacher("Sughra" , 30 , "Islamiyat");

console.log(`Mrs ${p1.name} of age ${p1.age} founded a school where Mam ${t1.name} of age ${t1.age} teaches subject ${t1.subject} to her student ${c1.name} of age ${c1.age} and she got marks round about ${c1.marks}`);