//New operator lets developers create an instances of a user defined object type or one of the built in object types that has a constructor function.

function Person(name , age){//here person will be treated as a constructor whenever called a new operator.It does not returns anything.
    this.name  = name;
    this.age = age;
}

//for creating methods like talk we can create them in prototype of this function Person and this method will be added in prototype of this Funtion Person(as we will be calling this function with new operator so it will be treated as object.So when we add some funciton in its prototype then for each object no new copy will be generated in memeory)
Person.prototype.talk = function(){
    console.log(`Hi , i'm ${this.name}`);
}
let p1 = new Person("Adam" , 20);
let p2 = new Person("Eve" , 18);

console.log(p2.name);
console.log(p1.talk===p2.talk);//true.As both are pointing to same memory location.
//so in this way we can add as many methods in this prototype as many we want and each will not occupy space for each object rather all of htem will be be pointing to sam ememory location.
console.log(p2.talk());

//But we can write all code above in a different way using our classes.