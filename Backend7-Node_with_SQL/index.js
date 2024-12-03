

//for practicing on sql we can generate random data by using a method know as faker.First we have to install faker in our system by using command -> npm i @faker.js/faker
//After installing we have to require it in following way and can use it in following way.
//Note : All the info about faker can be found on mdn. 
const { faker } = require('@faker-js/faker');

const getRandomUser = ()=> {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    password: faker.internet.password(),

  };
}
console.log(getRandomUser());

// for interacting our server with our database we have to first connect our server with our database(mySql).
//We doing this because we know that our client side sends a request to the server and now our server will interact with database to perform opertion on the basis of request by client.And after interacting with database a reponse is given back to server and this response is then sended to client.

// So for connecting our database with server we have to install a package known as MySQL2.We can serach for it on mdn.command for installing -> npm i mysql2
// Using method is given on mdn.
let mysql = require("mysql2");
const connection =mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    database: 'college', //for creating a connection we must first create a database.And place name of that database here
    password:'hania46636' //we write password here which we setted while creating it.
  }
);

try{
    connection.query("SHOW TABLES" , (err , result)=>{
        if(err) throw err;
        console.log(result);
    })
}
catch(err){
    console.log(err);
}
//after executing this code of database we must end our connection 
connection.end();