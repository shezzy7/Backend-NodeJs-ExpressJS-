//for using express in our code ,first we have to import it in our file.
const express = require("express");
let app = express();
//express returns a object and this object contains a prop named as listen which is used for listening requests from client
//this listen gets two props one is port number(ports are logical endpoints of a network connection that is used to exchange info from web server to a web client)

//ports like 3000,8080 are used to build custom servers

let port = 3000;

//listen method of express() gets two props one is port and other is callback function.And we execute this code then our server starts getiing requests and didn't stop. it continuously goes on accepting requests even if requests are coming or not.For closing this server on terminal we press ctrc+C.
app.listen(port , ()=>{
    console.log("Server is listening on port number ->",port);
})

//now after running this code our server will start and we can see it on browser by searching localhost:portNumber
// express object contains a use method which is used to send response.It takes two params which are objects(In whatever form request came our express will parse it into an object so that our js code should understand this) one contains detail of request and with the help of other(response) we can send response to that request.
app.use((req,res) => {
    console.log("Request received");

    //we can also print our request object
    //for seeeing this response on REST window we first need to run our code and also need to open it on browser by -> localhost:portNumber
    //our response object also contains many method.We can check them on express documentation.One of its method is send().With the help of this method we can send response back to client.
    //res.send("Response sended");//after running our code in REST window and searching this port on browser we will this msg on browser as a response.
    //we can send response in any form like an object or any html code
    // res.send("<h1>Response encoded in an h1 tag</h1>");
    //note : we cannot send more then a single response at same time.
    let obj = {
        name: "shahzad",
        fatherName: "Muhammad Hussain"
    }
    // res.send(obj);
    let html = "<h1>Abdul Qadir + Sakian Mai</h1> <ul><li>Muhammad Hussain <ul><li>Shahzad Hussain</li><li>Sadia Hussain</li><li>Asia Hussain</li><li>Rabia Hussain</li><li>Jawad Hussain</li><li>Hania Hussain</li></ul></li><li>Sughra Akhtar<ul><li>Kadija Akhtar</li><li>Fizza Akhtar</li><li>Ayesha Akhtar</li></ul></li></ul>";
    res.send(html);
    console.log("response sended");
})
//So this was how we send response back from server.This use method sends response for all the paths mean if we send response through this use method then it will send response to all the paths of our site.

