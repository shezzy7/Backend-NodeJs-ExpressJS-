

//for practicing on sql we can generate random data by using a method know as faker.First we have to install faker in our system by using command -> npm i @faker.js/faker
//After installing we have to require it in following way and can use it in following way.
//Note : All the info about faker can be found on mdn. 
const { faker } = require('@faker-js/faker');

// const getRandomUser = ()=> {
//   return {
//     userId: faker.string.uuid(),
//     username: faker.internet.username(), // before version 9.1.0, use userName()
//     email: faker.internet.email(),
//     password: faker.internet.password(),

//   };
// }
// console.log(getRandomUser());//each time we call it , it will return us an object each with random data


// for interacting our server with our database we have to first connect our server with our database(mySql).
//We doing this because we know that our client side sends a request to the server and now our server will interact with database to perform opertion on the basis of request by client.And after interacting with database a reponse is given back to server and this response is then sended to client.

// So for connecting our database with server we have to install a package known as MySQL2.We can serach for it on mdn.command for installing -> npm i mysql2
// Using method is given on mdn.
let mysql = require("mysql2");
const connection =mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    database: 'apna_database', //for creating a connection we must first create a database.And place name of that database here
    password:'hania46636' //we write password here which we setted while creating it.
  }
);
/*
//for inserting data we save our queiries in variables and do this in following way
let q = "INSERT INTO posts(id,username , email, password) VALUES (?, ?,?,?)";//Here question mark will be taken as placeholder mean we have to get some data here
let data = ["1","Shezzy","shezzy@gmail.com","hania46636"];//we will pass values in arrays
try{
  connection.query(q , data ,  (err , result)=>{
      if(err) throw err;
      console.log(result);
  })
}
catch(err){
  console.log(err);
}
  */
 //What if we want to add many rows together
//and in insertion command we replace all question marks by single one ? mark
let q2 = "INSERT INTO posts(id,username,email,password) VALUES ?"; 
//we send all the rows in a 2d array
let data2 = [
  ["2" , "goodo" , "goodo@gmail.com" , "goodo46636"],
  ["3" , "hania" , "hania@gmail.com" , "hania5264"]
];
//send 2d array's name in a square bracket
// try{
//     connection.query(q2 , [data2] ,  (err , result)=>{
//         if(err) throw err;
//         console.log(result);
//     })
// }
// catch(err){
//     console.log(err);
// }
//after executing this code of database we must end our connection 


// but we want to use faker here.
//WE want that faker should give data of 100 person to whome we can add in our table
//first of we will change our faker funtion to return an array instead of objects(we will remove all the keys)
let getRandomUser  = ()=>{
  return [
     faker.string.uuid(),
     faker.internet.username(), // before version 9.1.0, use userName()
     faker.internet.email(),
     faker.internet.password()
  ]
}
//now we will create an empty array and will run a loop for 100 time and each time we will be calling this function and will push array returned from this functiion into our res array
let data3 = [];
let q3 = "INSERT INTO posts(id,username,email,password) VALUES ?"; 
for(let i=0;i<100;i++){
  data3.push(getRandomUser());
}
//now insert the data in table
try{
  connection.query(q3,[data3] , (err , result)=>{
    if(err) throw err;
    console.log(result);
  })
}
catch(err){
  console.log(err);
}


connection.end();